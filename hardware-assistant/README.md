# 🖥️ Hardware Troubleshooting Assistant

A beginner-friendly chat assistant that guides users through common hardware problems step by step.  
Built with **Node.js + Express** on the backend and **Dialogflow ES** as the NLU/chatbot engine.

> **Local development only.** Do not deploy this application publicly without adding authentication and HTTPS.

---

## Features

- Dark-themed, responsive single-page chat UI
- Sidebar with one-click troubleshooting shortcuts
- Safe DOM rendering (no raw HTML injection)
- Dialogflow ES integration via the official `@google-cloud/dialogflow` Node.js client
- Clear setup/error messages if credentials are missing
- Loading indicator, Enter-to-send, Shift+Enter for newline
- Covers 10 common hardware topics + fallback and welcome intents

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 9.0.0 |
| Google Cloud account | Free tier is fine |
| Dialogflow ES agent | See setup below |

---

## Quick Start

### 1. Clone / Download the project

```bash
# If using git
git clone <your-repo-url> hardware-assistant
cd hardware-assistant
```

Or simply place this folder wherever you keep projects.

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
copy .env.example .env       # Windows
# or
cp .env.example .env         # macOS / Linux
```

Open `.env` and fill in your values:

```
DIALOGFLOW_PROJECT_ID=your-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS=./keys/service-account.json
DIALOGFLOW_LANGUAGE_CODE=en
PORT=3000
```

### 4. Add your service-account key

```bash
mkdir keys
```

Place your downloaded service-account JSON key file into the `keys/` folder.  
Name it `service-account.json` (or update the path in `.env` accordingly).

> **Security:** The `keys/` directory is listed in `.gitignore`. Never commit key files.

### 5. Start the server

```bash
node server.js
```

Visit **http://localhost:3000** in your browser.

---

## Setting Up Dialogflow ES

### Step 1 – Create a Google Cloud project

1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Click **Select a project → New Project**.
3. Give it a name (e.g., `hardware-assistant`) and click **Create**.
4. Note the **Project ID** (shown below the project name).

### Step 2 – Enable the Dialogflow API

1. In the Cloud Console, search for **Dialogflow API**.
2. Click **Enable**.

### Step 3 – Create a Dialogflow ES agent

1. Go to [https://dialogflow.cloud.google.com/](https://dialogflow.cloud.google.com/)
2. Click **Create Agent**.
3. Set the agent name (e.g., `HardwareAssistant`).
4. Set **Google Project** to the project you created above.
5. Set **Default Language** to **English (en)**.
6. Click **Create**.

### Step 4 – Populate intents

Follow the detailed instructions in [`DIALOGFLOW_INTENTS.md`](./DIALOGFLOW_INTENTS.md) to create all 13 intents with training phrases and responses.

### Step 5 – Create a service account (credentials)

> **Why?** The Node.js server needs a service account key to authenticate with the Dialogflow API. This key stays **only on the server** — never in the browser.

1. In Google Cloud Console → **IAM & Admin → Service Accounts**.
2. Click **+ Create Service Account**.
3. Name: `hardware-assistant-sa` → click **Create and Continue**.
4. Role: Select **Dialogflow API Client** → click **Continue → Done**.
5. Click the new service account → **Keys** tab → **Add Key → Create new key → JSON**.
6. The JSON file downloads automatically. **Move it to `keys/service-account.json`** (inside this project).

### Step 6 – Configure `.env`

```dotenv
DIALOGFLOW_PROJECT_ID=your-actual-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS=./keys/service-account.json
DIALOGFLOW_LANGUAGE_CODE=en
PORT=3000
```

The `GOOGLE_APPLICATION_CREDENTIALS` value is the path to the JSON key file relative to `server.js`.

---

## Project Structure

```
hardware-assistant/
├── public/
│   └── index.html          # Complete single-page frontend
├── keys/                   # Service-account key (NOT committed)
│   └── service-account.json
├── server.js               # Express server + Dialogflow client
├── package.json
├── .env                    # Your local secrets (NOT committed)
├── .env.example            # Template to share safely
├── .gitignore
├── DIALOGFLOW_INTENTS.md   # All intent names, phrases & responses
└── README.md
```

---

## API Reference

### `GET /health`

Returns server and configuration status.

**Response (configured):**
```json
{
  "status": "ok",
  "message": "Hardware Assistant is running.",
  "timestamp": "2026-10-14T05:01:00.000Z"
}
```

**Response (not configured):**
```json
{
  "status": "misconfigured",
  "message": "Missing required environment variables: DIALOGFLOW_PROJECT_ID, ..."
}
```

---

### `POST /chat`

Sends a message to Dialogflow and returns the bot reply.

**Request body:**
```json
{
  "message": "My PC won't turn on",
  "sessionId": "abc123"
}
```

**Successful response:**
```json
{
  "reply": "Let's check the most common reasons...",
  "intent": "pc_wont_turn_on"
}
```

**Validation errors (400):**
```json
{
  "error": "invalid_request",
  "message": "Request body must include a non-empty 'message' string."
}
```

**Configuration errors (503):**
```json
{
  "error": "setup_required",
  "message": "Missing required environment variables..."
}
```

---

## Testing

### Check syntax

```bash
node --check server.js
```

### Check health endpoint

```bash
# PowerShell
Invoke-WebRequest http://localhost:3000/health | Select-Object -ExpandProperty Content

# curl
curl http://localhost:3000/health
```

### Test /chat validation (empty message)

```bash
# PowerShell
Invoke-WebRequest -Method POST `
  -Uri http://localhost:3000/chat `
  -ContentType "application/json" `
  -Body '{"message":"","sessionId":"test123"}' |
  Select-Object -ExpandProperty Content

# curl
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"","sessionId":"test123"}'
```

Expected: `400` with `"error": "invalid_request"`.

### Test a real chat message (requires configured Dialogflow)

```bash
# PowerShell
Invoke-WebRequest -Method POST `
  -Uri http://localhost:3000/chat `
  -ContentType "application/json" `
  -Body '{"message":"My PC won'\''t turn on","sessionId":"test123"}' |
  Select-Object -ExpandProperty Content

# curl
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"My PC wont turn on","sessionId":"test123"}'
```

> **Note:** Dialogflow integration is confirmed working only when a real request returns a non-error `reply` with a matched `intent` name.

---

## Development Mode (auto-restart)

```bash
npm run dev
```

This uses `nodemon` to restart the server automatically on file changes.

---

## Security Notes

| Practice | Implementation |
|---|---|
| Credentials server-only | `GOOGLE_APPLICATION_CREDENTIALS` is read by Node.js; never sent to browser |
| No hardcoded secrets | All config via `.env` |
| Input validation | Message length capped, sessionId pattern enforced |
| Safe DOM rendering | `textContent` used for user input; bot responses parsed node-by-node |
| `.gitignore` | `keys/`, `.env`, and `*.json` (except package files) excluded |

---

## Troubleshooting the Setup

| Symptom | Likely cause | Fix |
|---|---|---|
| `UNAUTHENTICATED` error | Wrong or missing service-account key | Check `GOOGLE_APPLICATION_CREDENTIALS` path |
| `NOT_FOUND` error | Wrong project ID | Check `DIALOGFLOW_PROJECT_ID` |
| `status: misconfigured` | `.env` not created | Copy `.env.example` to `.env` and fill values |
| Intent always falls back | Training phrases not added | Add phrases in Dialogflow Console and re-train |
| Blank/empty reply | Response not set in Dialogflow intent | Add text response to the intent |

---

## Safety & Disclaimer

- Responses are **predefined troubleshooting guidance** — the assistant cannot inspect or automatically diagnose real hardware.
- Users are advised to stop and seek professional help if they observe smoke, sparks, burning smells, liquid damage, or swollen batteries.
- The assistant never instructs users to open power supplies, handle live electrical components, or puncture batteries.
- Users are warned not to format storage devices containing important data.

---

## License

MIT
