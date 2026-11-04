// ============================================================
// Hardware Troubleshooting Assistant – Express + Dialogflow ES
// ============================================================
"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const dialogflow = require("@google-cloud/dialogflow");

// ── Environment validation ────────────────────────────────────────────────────

const REQUIRED_ENV = ["DIALOGFLOW_PROJECT_ID", "GOOGLE_APPLICATION_CREDENTIALS"];

function validateEnvironment() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return {
      valid: false,
      message:
        `Missing required environment variables: ${missing.join(", ")}. ` +
        "Please copy .env.example to .env and fill in your values.",
    };
  }
  return { valid: true };
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || "3000", 10);
const PROJECT_ID = process.env.DIALOGFLOW_PROJECT_ID || "";
const LANGUAGE_CODE = process.env.DIALOGFLOW_LANGUAGE_CODE || "en";

// Dialogflow limits: sessions use UUID format, messages ≤ 256 chars is safe
const MAX_MESSAGE_LENGTH = 500;
const SESSION_ID_PATTERN = /^[a-zA-Z0-9_\-]{1,128}$/;

// ── Express setup ─────────────────────────────────────────────────────────────

const app = express();

app.use(express.json({ limit: "8kb" }));
app.use(express.static(path.join(__dirname, "public")));

// ── Health endpoint ────────────────────────────────────────────────────────────

app.get("/health", (req, res) => {
  const envCheck = validateEnvironment();
  res.json({
    status: envCheck.valid ? "ok" : "misconfigured",
    message: envCheck.valid
      ? "Hardware Assistant is running."
      : envCheck.message,
    timestamp: new Date().toISOString(),
  });
});

// ── Chat endpoint ──────────────────────────────────────────────────────────────

app.post("/chat", async (req, res) => {
  // 1. Validate environment before handling any request
  const envCheck = validateEnvironment();
  if (!envCheck.valid) {
    return res.status(503).json({
      error: "setup_required",
      message:
        "The server is not configured yet. " + envCheck.message,
    });
  }

  // 2. Validate request body
  const { message, sessionId } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      error: "invalid_request",
      message: "Request body must include a non-empty 'message' string.",
    });
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return res.status(400).json({
      error: "invalid_request",
      message: "Message cannot be empty or contain only whitespace.",
    });
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: "message_too_long",
      message: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({
      error: "invalid_request",
      message: "Request body must include a non-empty 'sessionId' string.",
    });
  }

  if (!SESSION_ID_PATTERN.test(sessionId)) {
    return res.status(400).json({
      error: "invalid_request",
      message:
        "sessionId may only contain letters, numbers, hyphens, and underscores (1–128 chars).",
    });
  }

  // 3. Call Dialogflow ES
  try {
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(
      PROJECT_ID,
      sessionId
    );

    const dfRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: trimmed,
          languageCode: LANGUAGE_CODE,
        },
      },
    };

    const [response] = await sessionClient.detectIntent(dfRequest);
    const result = response.queryResult;

    const fulfillmentText =
      result.fulfillmentText ||
      "I didn't quite catch that. Could you rephrase or choose a topic from the sidebar?";

    const intentName = result.intent
      ? result.intent.displayName
      : "unknown";

    return res.json({
      reply: fulfillmentText,
      intent: intentName,
    });
  } catch (err) {
    console.error("[Dialogflow Error]", err.message || err);

    // Surface useful messages for common credential/config errors
    const errMsg = err.message || "";
    if (
      errMsg.includes("UNAUTHENTICATED") ||
      errMsg.includes("credentials")
    ) {
      return res.status(503).json({
        error: "auth_error",
        message:
          "Could not authenticate with Dialogflow. Verify that GOOGLE_APPLICATION_CREDENTIALS points to a valid service-account JSON key file.",
      });
    }
    if (errMsg.includes("NOT_FOUND") || errMsg.includes("project")) {
      return res.status(503).json({
        error: "project_not_found",
        message:
          "Dialogflow project not found. Check that DIALOGFLOW_PROJECT_ID matches your GCP project.",
      });
    }

    return res.status(500).json({
      error: "dialogflow_error",
      message:
        "An error occurred while contacting Dialogflow. Please try again.",
    });
  }
});

// ── 404 Handler for unmatched routes ──────────────────────────────────────────

app.use((req, res) => {
  if (req.accepts("html")) {
    return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  }
  if (req.accepts("json")) {
    return res.status(404).json({ error: "not_found", message: "Resource not found" });
  }
  res.status(404).type("txt").send("Resource not found");
});

// ── Start server ───────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log("════════════════════════════════════════════════");
  console.log("  🖥️  Hardware Troubleshooting Assistant");
  console.log("════════════════════════════════════════════════");
  console.log(`  Server  : http://localhost:${PORT}`);
  console.log(`  Health  : http://localhost:${PORT}/health`);
  console.log(`  Project : ${PROJECT_ID || "(not set)"}`);
  console.log(`  Language: ${LANGUAGE_CODE}`);
  console.log("════════════════════════════════════════════════");

  const envCheck = validateEnvironment();
  if (!envCheck.valid) {
    console.warn("\n⚠️  SETUP REQUIRED:", envCheck.message, "\n");
  }
});
