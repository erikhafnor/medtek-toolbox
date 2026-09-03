---
title: "Defibrillator Lab"
course: "MTE200"
shortTitle: "Defibrillator"
description: "Operation, testing, and preventive maintenance of a defibrillator"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP"
  - "Keysight InfiniiVision oscilloscope"
prerequisites:
  - "LIFEPAK 15 user and service manual documentation"
  - "Fluke Impulse 7000DP documentation"
  - "Lecture notes on defibrillation"
duration: "2.5 hours"
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

> **HIGH VOLTAGE HAZARD.** The LIFEPAK 15 charges its capacitor to as much as 2 kV — that is what it reaches at the 360 J setting used once in Part 3.2. Always connect the device to the approved defibrillator analyser before charging. Never charge the device with pads or paddles disconnected from a load. Keep bystanders clear of the test bench during discharge.

- Do not handle the QUICK-COMBO connector pins while the device is in a charged state.
- Ensure the defibrillator tester is grounded and its leads are rated for the discharge energy used.
- Never connect an oscilloscope probe directly across the high-voltage therapy output or the analyser's 50 Ω load terminals. Use the analyser's **Scope Output** jack instead, and make and break oscilloscope connections only with the LIFEPAK 15 switched off and disarmed.
- If you observe smoke, unusual odour, or sparks, do **not** press the shock button. Disarm the LIFEPAK 15 instead — select **DISARM** on the display, or switch the device off; either discharges the capacitor internally. Keep clear of the therapy cable and connector until the charge indicator has cleared, then notify the supervising technician. Never deliberately discharge a device that is smoking or arcing: the fault may lie in the therapy cable or the output relay, and the shock would put the full stored energy into it.
- All tests in this lab are performed at **5 J** unless the procedure explicitly states otherwise — the maximum-energy discharge in Part 3.2 is the one exception.
- Use low energy (5 J) while getting familiar with the device, to avoid draining the battery unnecessarily. Part 3.2 needs a discharge at 360 J; take no more high-energy shocks than the capture requires. After completing the lab, set the defibrillators to charge so the battery is ready for the next group.
- Leakage current measurements would normally be part of the safety check but will be covered in a separate electrical safety lab.

---

## Equipment Setup

1. Place the LIFEPAK 15 on the bench with the front panel facing you. Inspect the housing for physical damage and confirm all connectors are present and undamaged.
2. Connect the QUICK-COMBO therapy cable from the LIFEPAK 15 to the Fluke Impulse 7000DP (use the 50 Ω input — **DEFIB** port).
3. Power on the Fluke Impulse 7000DP and select **DEFIB** mode. Verify the tester displays a ready state.
4. Power on the LIFEPAK 15. Allow it to complete its boot-up self-test sequence. Note any fault messages in your lab notebook.
5. Connect the Keysight oscilloscope to the **Scope Output** BNC on the rear panel of the Fluke Impulse 7000DP with a BNC lead (or a 1× probe). This jack carries an isolated, scaled-down copy of the discharge, and its ratio autoranges (2000:1, 400:1 or 80:1, depending on the range in use) — so read the ratio that applies to your capture off the analyser before you convert anything, and multiply every voltage you read on the oscilloscope by it. Do **not** put a standard 10× passive probe (commonly rated 300 V CAT II) across the high-voltage output: the LIFEPAK 15 reaches roughly 2 kV at maximum energy, far beyond the probe's rating. Set the time base to 2 ms/div; set the vertical scale after the first discharge (see 3.1).

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

Perform the following tests in order. For each test, record the selected setting, the tester reading, and whether the result meets the acceptance criterion. Use **5 J** for all discharge tests in this part; the one high-energy discharge comes later, in Part 3.2.

#### 2.1 Delivered Energy Test

1. On the LIFEPAK 15, select **5 J**.
2. Press **Charge**. Wait for the ready tone.
3. Press **Shock** (into the tester — do not touch paddles).
4. Read the delivered energy from the Fluke Impulse 7000DP display.
5. **Acceptance criterion:** IEC 60601-2-4:2010+AMD1:2018 requires the delivered energy into a 50 Ω load to be within **±15% of the selected energy, or ±4 J, whichever is greater**. At 5 J the ±4 J term governs (1 J – 9 J), so this setting cannot separate a healthy device from a faulty one. Use the ±15% band (**4.25 J – 5.75 J**) here only as a working figure, compare it with the energy-accuracy specification in the LIFEPAK 15 service manual, and apply the criterion again to the 360 J discharge in Part 3.2, where ±15% (**306 J – 414 J**) is the binding limit.
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
2. On the Fluke Impulse 7000DP, select **PACER** mode and set the pacer load as instructed — the load is selectable, and the readings mean nothing without it.
3. Record the following from the tester display:
   - Pacer load used (Ω)
   - Measured rate (ppm)
   - Pulse width (ms)
   - Amplitude (mA)
4. **Acceptance criteria:** Rate within ±5% of set value; pulse width **20 ms**, within the tolerance given in the LIFEPAK 15 service manual — the LIFEPAK 15 pacing pulse is a fixed-width rectangular constant-current pulse, so a reading anywhere near 40 ms is a fault, not a pass; amplitude within ±10% of set value (verify against LIFEPAK 15 service manual specifications). Quote the pacer load with every reading.

---

### Part 3 — Defibrillator Waveform Output Test (45 min)

This procedure follows the "Test and Calibration Procedures" in the LIFEPAK 15 service manual (pages 203–205).

**3.1 Oscilloscope Setup**

Confirm the Keysight InfiniiVision is configured:
- Coupling: DC
- Vertical scale: set after the first discharge so the waveform fills 60–80% of the screen — the right setting depends on the ratio the analyser's Scope Output is using, so it is not a volts-at-the-therapy-connection figure
- Time base: 2 ms/div
- Trigger: edge trigger on the rising edge of the waveform; level at roughly 10% of the expected peak amplitude at the BNC

**3.2 Waveform Capture**

1. With the therapy cable connected to the Fluke Impulse 7000DP (50 Ω load), select **360 J** on the LIFEPAK 15. This is the only part of the lab that uses high energy: the service manual limits in 3.3 are maximum-energy figures. At 5 J the peak would be only about 235 V and 4.7 A into 50 Ω — nowhere near the 35 A – 42 A in the table — so the table cannot be checked at the familiarisation energy.
2. Arm the oscilloscope in **Single** acquisition mode so it captures the one-shot discharge.
3. Charge and discharge the device into the tester. Record the delivered energy the analyser reports: at 360 J the ±15% term governs, so the acceptable range is **306 J – 414 J**.
4. Adjust the vertical scale so the waveform fills approximately 60–80% of the display, and repeat the capture if the first trace was clipped or too small. Return the energy selector to 5 J when Part 3 is finished.

**3.3 Waveform Analysis**

Record the following measurements from the oscilloscope display or its automatic measurement functions. Use the cursors or built-in measurement tools to determine peak current (I = V / 50 Ω) and pulse widths.

| Parameter | Your Value | Min (service manual) | Max (service manual) |
|---|---|---|---|
| Phase 1 Peak Current (A) | | 35 A | 42 A |
| Phase 1 Pulse Width (ms) | | 6.9 ms | 7.8 ms |
| Phase 2 Pulse Width (ms) | | 4.5 ms | 5.4 ms |
| Phase 1 peak voltage (V) | | — | — |
| Phase 2 peak voltage (V) | | — | — |
| Total waveform duration (ms) | | — | — |

> **Note:** The peak current is calculated from the peak voltage at the therapy connection using Ohm's law and the 50 Ω test load: I = V / 50 Ω. Multiply the voltage you read on the oscilloscope by the ratio the analyser's Scope Output is using before you use it here. For example, a peak voltage of 1900 V corresponds to 38 A.

**3.4** Verify that your measured values fall within the service manual specifications in the table above. If any parameter is out of range, note it in your lab notebook and be ready to explain the likely causes when you present your results orally to the lab engineer.

**3.5** Sketch the captured waveform in your lab notebook, labelling Phase 1, Phase 2, the polarity reversal point, and the truncation point.

---

### Part 4 — Review Questions (15 min)

Answer the following questions in your lab notebook. You will discuss your answers with the group at the end of the session.

1. IEC 60601-2-4 specifies that the delivered energy shall be within ±15% of the selected energy, or ±4 J, whichever is greater. Why is energy accuracy clinically important — what could happen if a defibrillator consistently delivers significantly less energy than selected?

2. Explain why biphasic waveforms are preferred over monophasic waveforms for defibrillation. Reference at least one physiological mechanism in your answer.

3. You observe that the Sync delay measured in Part 2.3 is 85 ms. Does this pass or fail the IEC 60601-2-4 requirement? What are the potential clinical consequences of a prolonged sync delay?

4. The LIFEPAK 15 pads are classified as a Type CF applied part. What does the CF designation mean, and how does it differ from Type BF? How do the patient leakage current limits differ between CF and BF applied parts?

5. A clinical engineer is performing annual PM on a defibrillator and finds that charge time at maximum energy has increased from 8 s (recorded last year) to 13 s. The manufacturer specification is ≤ 10 s. What are the two most likely causes, and what follow-up steps would you recommend?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your delivered-energy, charge-time, sync-delay and pacer readings from Part 2, each judged against its acceptance criterion — including the pacer load you used in 2.4
- The 360 J waveform capture from Part 3.2, the completed measurement table in 3.3 with the peak current worked out from the peak voltage, and your labelled sketch from 3.5
- The controls, connectors and applied-part classification you identified in Part 1, and how you would follow up any parameter that fell outside the service manual limits (3.4)
- Your answers to the five review questions in Part 4

There is no written hand-in.
