# Dialogflow ES Intent Reference

> **Purpose:** This file documents every intent that must be created in your Dialogflow ES agent.
> Copy the training phrases and responses exactly into the Dialogflow Console.
> The intent **Display Name** must match the strings listed below — the backend returns them for debugging.

---

## Table of Contents

1. [Default Welcome Intent](#1-default-welcome-intent)
2. [Default Fallback Intent](#2-default-fallback-intent)
3. [pc_wont_turn_on](#3-pc_wont_turn_on)
4. [black_screen](#4-black_screen)
5. [overheating](#5-overheating)
6. [slow_computer](#6-slow_computer)
7. [unexpected_restarts](#7-unexpected_restarts)
8. [strange_noise](#8-strange_noise)
9. [wifi_not_working](#9-wifi_not_working)
10. [usb_not_detected](#10-usb_not_detected)
11. [no_sound](#11-no_sound)
12. [battery_not_charging](#12-battery_not_charging)
13. [choose_next_step](#13-choose_next_step)

---

## Safety Notice (All Intents)

**IMPORTANT — Build these warnings into relevant responses:**

- If you see **smoke, sparks, a burning smell, or liquid damage**, power off immediately, unplug the device, and seek professional repair.
- **Never** open a power supply unit (PSU).
- **Never** handle live electrical parts.
- **Never** puncture or bend a battery — swollen batteries are a fire hazard.
- **Do not** format or erase a storage device if it may contain important data.
- These responses are **predefined troubleshooting guidance**. The assistant cannot inspect or diagnose your actual hardware.

---

## 1. Default Welcome Intent

**Display Name:** `Default Welcome Intent`
**Events:** `WELCOME`

### Training Phrases

1. Hi
2. Hello
3. Hey there
4. Good morning
5. What can you do?
6. Help me with my computer
7. I need help
8. Start

### Response (Text)

```
👋 Welcome to Hardware Assistant!

I can walk you through step-by-step checks for common hardware problems. Choose a topic:

• PC won't turn on
• Black screen
• Overheating
• Slow computer
• Unexpected restarts
• Strange noise
• Wi-Fi not working
• USB not detected
• No sound
• Laptop battery not charging

Just type your problem or pick a topic from the sidebar. What's happening with your computer?
```

---

## 2. Default Fallback Intent

**Display Name:** `Default Fallback Intent`
**Is Fallback:** ✅ Yes

### Training Phrases

_(Leave empty — Dialogflow uses this intent automatically when no other intent matches.)_

### Response (Text)

```
I'm sorry, I didn't understand that. I'm trained to help with specific hardware topics.

Try describing your problem in simpler terms, or choose one of these:

• "My PC won't turn on"
• "Black screen"
• "Computer is overheating"
• "Computer is slow"
• "Unexpected restarts"
• "Strange noise"
• "Wi-Fi not working"
• "USB not detected"
• "No sound"
• "Laptop battery not charging"

You can also use the sidebar shortcuts. What would you like to troubleshoot?
```

---

## 3. pc_wont_turn_on

**Display Name:** `pc_wont_turn_on`

### Training Phrases

1. My PC won't turn on
2. Computer doesn't start
3. I press the power button and nothing happens
4. My desktop is dead, it won't boot
5. The computer won't power up
6. PC is completely unresponsive
7. No lights, no fans, nothing when I press power
8. My computer won't switch on at all
9. Computer is not turning on
10. I can't get my computer to start

### Response (Text)

```
Let's check the most common reasons a PC won't turn on. Work through these steps in order:

**Step 1 – Check the power source**
1. Make sure the power cable is firmly plugged into the back of your PC and into the wall outlet.
2. Try a different wall outlet to rule out a dead socket.
3. If you use a power strip or surge protector, check that it is switched on and working.

**Step 2 – Check the power supply switch**
4. Look at the back of your PC tower for a small rocker switch near the power cable. Make sure it is set to ON (the "I" symbol, not "O").

**Step 3 – Check the monitor (desktop PCs)**
5. Confirm the monitor is turned on and connected — a computer that is actually running may just appear dead because the monitor has no signal.

**Step 4 – Listen and look**
6. Press the power button. Do you hear any fan spin-up, see any lights, or hear beeps? Tell me what (if anything) happens.

⚠️ If you see sparks, smell burning, or notice visible damage to the power cable or outlet — do NOT proceed. Unplug immediately and contact a professional.

What happens when you press the power button?
```

---

## 4. black_screen

**Display Name:** `black_screen`

### Training Phrases

1. I have a black screen
2. My monitor shows nothing
3. Screen is black but computer is on
4. Display is blank
5. Monitor is not showing anything
6. Black screen of death
7. My screen stays black after startup
8. No display on monitor
9. Screen goes black when I turn on the computer
10. Monitor shows no signal

### Response (Text)

```
A black screen usually means a display, connection, or boot problem. Let's narrow it down:

**Step 1 – Is the computer actually on?**
1. Check if the power LED on your PC case is lit and if fans are spinning.
2. Listen for hard drive activity or beep codes.

**Step 2 – Check the display connection**
3. Unplug and firmly re-plug the video cable (HDMI, DisplayPort, or VGA) at both the monitor end and the PC end.
4. Try a different cable if you have one.
5. If your PC has both a graphics card and built-in video ports, make sure you are using the correct one (usually the graphics card port, not the motherboard port).

**Step 3 – Check the monitor itself**
6. Press the monitor's power button — look for its own indicator light.
7. Use the monitor's menu button to confirm the input source matches your cable type (e.g., HDMI 1).

**Step 4 – Basic restart test**
8. Hold the power button for 10 seconds to force a shutdown, wait 30 seconds, then power on again.

Is the computer's power LED on, and do you hear the fans running?
```

---

## 5. overheating

**Display Name:** `overheating`

### Training Phrases

1. My computer is overheating
2. Computer gets really hot
3. PC shuts down because of heat
4. Fan is running at full speed all the time
5. Computer is too hot
6. Laptop is burning hot to the touch
7. CPU temperature is very high
8. Computer overheats and shuts off
9. My PC feels very warm
10. Thermal shutdown keeps happening

### Response (Text)

```
Overheating is serious — it can damage components over time. Here are safe checks you can do:

**Step 1 – Improve airflow immediately**
1. Make sure the PC or laptop has clearance on all sides — never place a laptop on a bed, pillow, or carpet that blocks vents.
2. For a desktop PC, check that the case is not pushed against a wall blocking the intake or exhaust vents.

**Step 2 – Check the fans**
3. Listen: are all fans spinning? A stopped CPU fan or GPU fan is a common cause of overheating.
4. If you have a desktop PC, look through the case vents — you should see the CPU fan spinning.

**Step 3 – Clean the vents (safest method)**
5. Use a can of compressed air to blow dust out of every vent opening from the outside. Do this in a well-ventilated area. Short bursts only.
6. For laptops, focus on the exhaust vent (usually on the back or side) where warm air comes out.

**Step 4 – Check software**
7. Open Task Manager (Windows: Ctrl+Shift+Esc) and look for any process using 90–100% CPU. A runaway program can cause heat buildup.

⚠️ Do NOT open a laptop or PC case if you are not experienced — improper reassembly can cause more damage. If cleaning the outside vents doesn't help, take it to a repair shop.

After trying these steps, is the computer still running hot?
```

---

## 6. slow_computer

**Display Name:** `slow_computer`

### Training Phrases

1. My computer is very slow
2. Computer is running slow
3. Everything takes forever to load
4. PC is lagging
5. My laptop is sluggish
6. Programs take a long time to open
7. Computer freezes frequently
8. Windows is really slow
9. My computer used to be fast but now it's slow
10. System performance is terrible

### Response (Text)

```
A slow computer usually has one or more fixable causes. Let's check the most common ones:

**Step 1 – Restart first**
1. If you haven't restarted recently, do so now. A fresh start clears temporary files and frees memory.

**Step 2 – Check what is using your resources**
2. Press Ctrl+Shift+Esc to open Task Manager.
3. Click the "CPU" and "Memory" column headers to sort by highest usage.
4. If any program is using a very high percentage, note its name.

**Step 3 – Manage startup programs**
5. In Task Manager, click the "Startup" tab.
6. Disable any programs you don't need at startup by right-clicking → Disable. This speeds up boot time.

**Step 4 – Check free disk space**
7. Open File Explorer → This PC. Check how much free space your main drive (C:) has.
8. Windows needs at least 10–15 GB of free space to run well. If it is nearly full, delete unnecessary files or move them to an external drive.

**Step 5 – Check for malware**
9. Run a full scan with Windows Defender (search "Windows Security" in the Start menu) or your installed antivirus.

⚠️ Do NOT format or erase your drive if it contains important data you haven't backed up.

Which of these steps have you already tried?
```

---

## 7. unexpected_restarts

**Display Name:** `unexpected_restarts`

### Training Phrases

1. My computer keeps restarting unexpectedly
2. PC restarts randomly
3. Computer reboots on its own
4. Random restarts without warning
5. Computer crashes and restarts
6. My PC keeps turning off and on by itself
7. Spontaneous reboots
8. Windows restarts without warning
9. Computer shuts down and restarts randomly
10. PC keeps rebooting

### Response (Text)

```
Unexpected restarts usually point to overheating, power issues, or a driver/software problem. Let's narrow it down:

**Step 1 – Check for overheating**
1. Feel whether your PC or laptop is very hot before it restarts — overheating is the most common cause.
2. Clean dust from all vents with compressed air (from the outside only).

**Step 2 – Check Windows crash logs**
3. Press Win+R, type eventvwr, and press Enter.
4. Go to Windows Logs → System.
5. Look for entries marked "Error" or "Critical" at the time of the restart. Note the event description.

**Step 3 – Check for driver issues**
6. Right-click the Start button → Device Manager.
7. Look for any devices marked with a yellow warning triangle (⚠️).

**Step 4 – Check your power supply (desktop PCs)**
8. A failing or underpowered PSU can cause sudden restarts under load (e.g., while gaming or rendering).
9. ⚠️ Do NOT open the PSU itself — this is dangerous and should only be done by a professional.

**Step 5 – Test your RAM (optional, advanced)**
10. Search for "Windows Memory Diagnostic" in the Start menu and run it. It will test RAM on the next boot.

Does the restart happen at a specific time — like during gaming, startup, or randomly?
```

---

## 8. strange_noise

**Display Name:** `strange_noise`

### Training Phrases

1. My computer is making strange noises
2. PC is making a clicking sound
3. Loud grinding noise from computer
4. Computer fan is making noise
5. I hear a rattling sound from my PC
6. Beeping noises from computer
7. Hard drive is clicking
8. Weird sounds coming from my computer
9. Computer making a high-pitched noise
10. Loud fan noise all of a sudden

### Response (Text)

```
Strange noises can tell us a lot about what's failing. Let's identify the type of noise:

**Clicking or grinding from storage:**
- This is a serious warning sign that your hard drive (HDD) may be failing.
- ⚠️ Back up your important files immediately if you can — a clicking hard drive can fail completely with no further warning.
- Do NOT run disk repair tools aggressively on a clicking drive; you may lose data.
- Take the device to a professional for data recovery advice.

**Loud or constant fan noise:**
1. Dust buildup makes fans work harder and louder. Use compressed air to clean vents from the outside.
2. A fan that suddenly becomes loud may have a failing bearing — it may need replacement.
3. Check Task Manager for a process maxing out the CPU, which causes fans to spin fast.

**Beeping at startup (BIOS beeps):**
4. Count the number and pattern of beeps — this is a POST (Power-On Self-Test) error code.
5. Common causes: loose RAM stick, failed GPU. Try reseating the RAM if you are comfortable doing so.

**Rattling:**
6. A loose screw or cable touching a fan can rattle. Gently move the device to listen if the rattle shifts.

⚠️ If you hear crackling, buzzing from the power supply area, or smell burning — shut down immediately and seek professional help.

Can you describe the noise in more detail? (clicking, grinding, beeping, rattling, or loud fan?)
```

---

## 9. wifi_not_working

**Display Name:** `wifi_not_working`

### Training Phrases

1. My Wi-Fi is not working
2. Can't connect to the internet
3. No internet connection
4. Wi-Fi keeps disconnecting
5. Computer won't connect to Wi-Fi
6. Network adapter not working
7. Internet is very slow
8. Wi-Fi shows connected but no internet
9. My laptop can't find any Wi-Fi networks
10. Wireless connection keeps dropping

### Response (Text)

```
Let's troubleshoot your Wi-Fi connection step by step:

**Step 1 – Start with the basics**
1. Check that Wi-Fi is enabled on your device. Look for a Wi-Fi toggle in the system tray (bottom right) or a physical switch/key on a laptop.
2. Try turning Wi-Fi off and back on.

**Step 2 – Restart your router**
3. Unplug your router (and modem if separate) from power.
4. Wait 30 seconds, then plug it back in.
5. Wait 2 minutes for it to fully restart, then try connecting again.

**Step 3 – Check if other devices can connect**
6. Can another phone or laptop connect to the same Wi-Fi? If yes, the problem is with your computer. If no, the problem is with your router or internet service.

**Step 4 – Run the Windows network troubleshooter**
7. Right-click the Wi-Fi icon in the system tray → Troubleshoot problems.
8. Follow the on-screen steps.

**Step 5 – Update the network driver**
9. Right-click Start → Device Manager → Network Adapters.
10. Right-click your Wi-Fi adapter → Update driver → Search automatically.

Can other devices connect to your Wi-Fi, or is the problem only on this computer?
```

---

## 10. usb_not_detected

**Display Name:** `usb_not_detected`

### Training Phrases

1. USB device is not detected
2. USB not working
3. Computer doesn't recognize my USB drive
4. USB port is not detecting anything
5. My USB mouse is not recognized
6. USB device not showing up
7. Flash drive not detected
8. USB keyboard stopped working
9. Device not recognized when I plug in USB
10. USB shows nothing in File Explorer

### Response (Text)

```
Here are the most common fixes for a USB device that isn't detected:

**Step 1 – Test the basics**
1. Unplug the USB device, wait 10 seconds, and plug it back in.
2. Try a different USB port on your computer — ports can fail individually.
3. Try plugging the device into another computer. If it's still not detected, the device itself may be faulty.

**Step 2 – Check Device Manager**
4. Press Win+R, type devmgmt.msc, press Enter.
5. Look under "Universal Serial Bus controllers" for any yellow warning icons (⚠️).
6. If you see "Unknown device", right-click → Update driver.

**Step 3 – Check Disk Management (for USB drives only)**
7. Press Win+R, type diskmgmt.msc, press Enter.
8. Can you see the USB drive listed but without a drive letter? Right-click it → Change Drive Letter and Paths → Add.
9. ⚠️ Do NOT format the drive if it contains important data you haven't backed up.

**Step 4 – Restart USB controllers**
10. In Device Manager → Universal Serial Bus controllers, right-click each "USB Root Hub" → Disable device, then Enable device again.

**Step 5 – Check power management**
11. In Device Manager, right-click your USB Root Hub → Properties → Power Management → uncheck "Allow the computer to turn off this device to save power."

Is this a USB storage drive, a mouse/keyboard, or another type of device?
```

---

## 11. no_sound

**Display Name:** `no_sound`

### Training Phrases

1. There is no sound on my computer
2. Audio is not working
3. Computer has no audio
4. Speakers not working
5. Sound stopped working suddenly
6. No audio output
7. Headphones not working on PC
8. Sound is muted but I can't unmute it
9. Volume is up but no sound
10. My computer audio is broken

### Response (Text)

```
Let's fix your sound problem step by step:

**Step 1 – Check the obvious**
1. Look at the speaker/volume icon in the bottom-right system tray — is it muted? Click it and drag the volume up.
2. Check that your speakers or headphones are physically plugged in to the correct port (usually the green 3.5mm jack, or USB).
3. If using external speakers, make sure they are turned on and their volume knob is up.

**Step 2 – Check the active audio output**
4. Click the speaker icon in the taskbar, then click the arrow (>) next to the volume bar.
5. A list of audio devices appears. Make sure the correct device (your speakers or headphones) is selected.

**Step 3 – Run the audio troubleshooter**
6. Right-click the speaker icon → Troubleshoot sound problems.
7. Follow the on-screen steps.

**Step 4 – Check audio drivers**
8. Right-click Start → Device Manager → Sound, video and game controllers.
9. If you see a yellow warning icon, right-click the audio device → Update driver → Search automatically.
10. If there is no audio device listed at all, the driver may need to be reinstalled from your PC manufacturer's website.

Are you using built-in speakers, external speakers, or headphones — and which connection type (3.5mm jack, USB, or Bluetooth)?
```

---

## 12. battery_not_charging

**Display Name:** `battery_not_charging`

### Training Phrases

1. My laptop battery is not charging
2. Battery not charging
3. Plugged in but not charging
4. Laptop says plugged in not charging
5. Battery percentage keeps dropping even when plugged in
6. Charger is connected but battery won't charge
7. Laptop won't charge
8. Battery stuck at a certain percentage
9. Charging indicator not showing
10. Laptop only works when plugged in, battery is dead

### Response (Text)

```
Here are safe steps to troubleshoot a laptop that won't charge:

**Step 1 – Check the charger and connections**
1. Inspect the charging cable for any kinks, fraying, or bent pins. A damaged cable cannot be used safely.
2. Unplug and firmly re-plug the charger at both the laptop and wall outlet ends.
3. Try a different wall outlet.
4. If you have access to a compatible charger from another device, test with that.

**Step 2 – Check the charging port**
5. Look at the laptop's charging port with a light. Is there any debris, bent pins, or damage?
6. Gently clean out dust with a dry toothpick (laptop unplugged) — but do not use metal tools.

**Step 3 – Remove and reinsert the battery (if removable)**
7. If your laptop has a removable battery, power off completely, remove the battery, wait 30 seconds, reinsert it, and try charging again.

**Step 4 – Software fix — reset power settings**
8. Search for "Device Manager" → expand "Batteries."
9. Right-click "Microsoft ACPI-Compliant Control Method Battery" → Uninstall device.
10. Restart your laptop. Windows will reinstall the battery driver automatically.

**Step 5 – Check battery health (Windows)**
11. Open Command Prompt as Administrator (search cmd → right-click → Run as administrator).
12. Type: `powercfg /batteryreport` and press Enter.
13. Open the generated report (path shown) to check battery health and design capacity vs. full charge capacity.

⚠️ If the battery is visibly swollen, bulging, or deformed — do NOT charge it or press on it. Remove it if it is removable (using gloves), and take the laptop to a professional immediately. A swollen battery is a fire and safety hazard.

Does the laptop run normally when plugged in, or does it shut off even with the charger connected?
```

---

## 13. choose_next_step

**Display Name:** `choose_next_step`

### Training Phrases

1. What should I do next?
2. It didn't work, what now?
3. Still not fixed
4. None of those steps worked
5. I tried everything you said
6. The problem is still there
7. What else can I try?
8. Problem persists after following steps
9. Still having the same issue
10. Next step?

### Response (Text)

```
No worries — some hardware problems need a few tries. Here's what to do next:

1. **Double-check each step** — it's easy to skip one by accident.
2. **Search the exact error message** — if Windows shows an error code or message, search for it online for specific solutions.
3. **Check your PC or laptop manufacturer's support page** — they often have model-specific guides and driver downloads.
4. **Visit a community forum** — sites like Tom's Hardware, Reddit r/techsupport, or the Microsoft Answers forum have helpful communities.
5. **Professional repair** — if the problem involves hardware you can't easily access (power supply, motherboard, or internal battery), a qualified technician can diagnose it safely.

⚠️ Remember: if you ever see smoke, sparks, a burning smell, liquid damage, or a swollen battery — stop immediately and seek professional help. These are safety hazards.

Would you like to go back and try a different troubleshooting topic?
```

---

## How to Create These Intents in Dialogflow ES Console

1. Go to [https://dialogflow.cloud.google.com/](https://dialogflow.cloud.google.com/)
2. Select your agent (or create a new one).
3. Click **Intents** in the left sidebar → **+ CREATE INTENT**.
4. Enter the **Display Name** exactly as shown above (e.g., `pc_wont_turn_on`).
5. Under **Training phrases**, click **Add training phrase** and paste each phrase.
6. Under **Responses → Default**, click **Add Response** and paste the response text.
7. Click **SAVE**.
8. Repeat for every intent.
9. After all intents are saved, click **Train** (top right) and wait for training to complete.

> **Tip:** You can also import intents via the Dialogflow API or the Export/Restore feature using a ZIP file — contact your developer if you want to bulk-import.
