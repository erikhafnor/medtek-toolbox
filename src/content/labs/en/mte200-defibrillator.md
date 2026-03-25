---
title: "Defibrillator Lab"
course: "MTE200"
description: "Operation, testing, and preventive maintenance of a defibrillator"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP"
  - "Keysight InfiniiVision oscilloscope"
prerequisites:
  - "LIFEPAK 15 user and service manual documentation"
  - "Fluke Impulse 7000DP documentation"
  - "Lecture notes on defibrillation"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Identify the major controls, connectors, and accessories of the LIFEPAK 15 defibrillator/monitor
- Operate the Fluke Impulse 7000DP defibrillator analyser to perform a QUICK-COMBO test sequence
- Interpret delivered-energy accuracy results against IEC 60601-2-4 acceptance criteria
- Perform a biphasic waveform output test using an oscilloscope and describe how the waveform relates to the standard
- Apply safe working practices when handling high-voltage test equipment

---

## Safety Notes

> **HIGH VOLTAGE HAZARD.** The LIFEPAK 15 charges its capacitor to several hundred volts. Always connect the device to the approved defibrillator analyser before charging. Never charge the device with pads or paddles disconnected from a load. Keep bystanders clear of the test bench during discharge.

- Do not handle the QUICK-COMBO connector pins while the device is in a charged state.
- Ensure the defibrillator tester is grounded and its leads are rated for the discharge energy used.
- Wear insulating gloves when connecting the oscilloscope probe across the analyser's output terminals.
- If you observe smoke, unusual odour, or sparks, immediately press the shock button to safely discharge the capacitor into the tester, then power off and notify the supervising technician.
- All tests in this lab are performed at **5 J** unless the procedure explicitly states otherwise.

---

## Equipment Setup

1. Place the LIFEPAK 15 on the bench with the front panel facing you. Inspect the housing for physical damage and confirm all connectors are present and undamaged.
2. Connect the QUICK-COMBO therapy cable from the LIFEPAK 15 to the Fluke Impulse 7000DP (use the 50 Ω input — **DEFIB** port).
3. Power on the Fluke Impulse 7000DP and select **DEFIB** mode. Verify the tester displays a ready state.
4. Power on the LIFEPAK 15. Allow it to complete its boot-up self-test sequence. Note any fault messages in your lab notebook.
5. Connect the Keysight oscilloscope: attach the 10× voltage probe across the **DEFIB OUT** BNC terminals on the Fluke Impulse 7000DP. Set the time base to 2 ms/div and vertical scale to 200 V/div as a starting point.

---

## Procedure

### Part 1 — Familiarisation with Controls and Accessories (30 min)

**1.1** Working from the LIFEPAK 15 Quick Reference Card and front panel, locate and record the function of each of the following in your lab notebook:

- Energy selection dial
- Charge button and indicator light
- Shock button
- SYNC mode button
- Pacer rate and output controls
- SpO₂ / NIBP / CO₂ connector ports
- QUICK-COMBO therapy connector
- Data port (USB / Ethernet)

**1.2** Identify the applied-part type for the QUICK-COMBO pads. Record whether they are classified as Type B, BF, or CF and explain why this classification matters for cardiac patients.

**1.3** Note the year of manufacture and the software/firmware version shown on the device status screen. These are needed when searching for service bulletins.

---

### Part 2 — Fluke Impulse 7000DP QUICK-COMBO Test Sequence (60 min)

Perform the following tests in order. For each test, record the selected setting, the tester reading, and whether the result meets the acceptance criterion. Use **5 J** for all discharge tests.

#### 2.1 Delivered Energy Test

1. On the LIFEPAK 15, select **5 J**.
2. Press **Charge**. Wait for the ready tone.
3. Press **Shock** (into the tester — do not touch paddles).
4. Read the delivered energy from the Fluke Impulse 7000DP display.
5. **Acceptance criterion:** Delivered energy within ±15% of selected energy (IEC 60601-2-4 §201.7.9.3). For 5 J, the acceptable range is **4.25 J – 5.75 J**.
6. Repeat three times and record all results. Calculate the mean and standard deviation.

#### 2.2 Charge Time Test

1. Select **5 J** on the LIFEPAK 15.
2. Press **Charge** and simultaneously start a stopwatch (or use the tester's built-in timer if available).
3. Stop the timer when the device signals ready.
4. **Acceptance criterion:** Charge time ≤ the manufacturer's specification. For the LIFEPAK 15 at 5 J, the device should charge in under 3 s from a full battery.
5. Repeat three times and record each charge time.

#### 2.3 Synchronised Cardioversion (Sync) Test

1. Connect the ECG simulator output (use the Fluke Impulse 7000DP's built-in ECG source, or the lab's patient simulator) to the ECG lead inputs on the LIFEPAK 15.
2. Select a 60 bpm normal sinus rhythm on the simulator.
3. Press **SYNC** on the LIFEPAK 15. Confirm the device marks R-waves with a sync marker on the display.
4. Select **5 J**. Charge the device. Press **Shock**.
5. The tester will record the synchronisation delay (time from R-wave peak to shock delivery).
6. **Acceptance criterion:** Sync delay ≤ 60 ms (IEC 60601-2-4 §201.12.4.3).

#### 2.4 Pacer Characteristics Test

1. Enable the pacer on the LIFEPAK 15. Set rate to **70 ppm** and output to **20 mA**.
2. On the Fluke Impulse 7000DP, select **PACER** mode.
3. Record the following from the tester display:
   - Measured rate (ppm)
   - Pulse width (ms)
   - Amplitude (mA)
4. **Acceptance criteria:** Rate within ±5% of set value; pulse width 20–40 ms; amplitude within ±10% of set value (verify against LIFEPAK 15 service manual specifications).

---

### Part 3 — Defibrillator Waveform Output Test (45 min)

This procedure follows the waveform verification described in the LIFEPAK 15 service manual.

**3.1 Oscilloscope Setup**

Confirm the Keysight InfiniiVision is configured:
- Coupling: DC
- Vertical scale: 200 V/div (adjust after first discharge)
- Time base: 2 ms/div
- Trigger: edge trigger on the rising edge of the waveform; level at approximately +50 V

**3.2 Waveform Capture**

1. With the therapy cable connected to the Fluke Impulse 7000DP (50 Ω load), select **5 J** on the LIFEPAK 15.
2. Charge and discharge the device.
3. Capture the waveform on the oscilloscope. Use **Single** acquisition mode to capture a single-shot event.
4. Adjust vertical scale so the waveform fills approximately 60–80% of the display.

**3.3 Waveform Analysis**

Record the following measurements from the oscilloscope display or its automatic measurement functions:

| Measurement | Your Value | Expected (biphasic truncated exponential) |
|---|---|---|
| Phase 1 peak voltage (V) | | Positive, higher amplitude |
| Phase 1 duration (ms) | | Typically 6–12 ms |
| Phase 2 peak voltage (V) | | Negative, lower amplitude than phase 1 |
| Phase 2 duration (ms) | | Typically 4–8 ms |
| Total waveform duration (ms) | | Typically < 20 ms |

**3.4** Sketch the captured waveform in your lab notebook, labelling Phase 1, Phase 2, the polarity reversal point, and the truncation point.

---

### Part 4 — Review Questions (15 min)

Answer the following questions in your lab notebook. You will discuss your answers with the group at the end of the session.

1. IEC 60601-2-4 specifies that the delivered energy shall be within ±15% of the selected energy. Why is energy accuracy clinically important — what could happen if a defibrillator consistently delivers significantly less energy than selected?

2. Explain why biphasic waveforms are preferred over monophasic waveforms for defibrillation. Reference at least one physiological mechanism in your answer.

3. You observe that the Sync delay measured in Part 2.3 is 85 ms. Does this pass or fail the IEC 60601-2-4 requirement? What are the potential clinical consequences of a prolonged sync delay?

4. The LIFEPAK 15 pads are classified as a Type CF applied part. What does the CF designation mean, and how does it differ from Type BF? How do the patient leakage current limits differ between CF and BF applied parts?

5. A clinical engineer is performing annual PM on a defibrillator and finds that charge time at maximum energy has increased from 8 s (recorded last year) to 13 s. The manufacturer specification is ≤ 10 s. What are the two most likely causes, and what follow-up steps would you recommend?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- A completed results table for all measurements in Parts 2 and 3
- Your oscilloscope waveform trace (exported image or clear photo) with all measurements annotated
- Written answers to the four review questions (Part 4)
- A brief conclusion (200–300 words) discussing whether the device under test meets its specifications and the clinical engineering implications of your findings
- A reference list citing the IEC 60601-2-4 standard, the LIFEPAK 15 service manual, and any other sources used
