---
title: "Electrical Safety Testing Lab"
course: "MTE210"
description: "Hands-on IEC 62353 electrical safety testing of medical equipment"
equipment:
  - "Fluke ESA615 Electrical Safety Analyzer"
  - "Assorted Class I and Class II medical devices"
  - "Devices with Type B, BF, and CF applied parts"
prerequisites:
  - "Fluke ESA615 operator manual"
  - "Lecture notes on IEC 60601-1 and IEC 62353"
  - "Reference: IEC 60601-1 Essentials (on this site)"
  - "Reference: Leakage Current Measurement Guide (on this site)"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Classify medical devices by protection class (Class I vs Class II) and applied part type (B, BF, CF)
- Operate the Fluke ESA615 to perform a complete IEC 62353 test sequence
- Measure and interpret protective earth resistance, enclosure leakage current, and patient leakage current
- Apply the correct acceptance limits based on equipment class and applied part type
- Determine whether a device passes or fails electrical safety requirements and take appropriate action

---

## Safety Notes

> **ELECTRICAL HAZARD.** You will be working with mains-powered medical equipment. The ESA615 applies test voltages during measurement. Follow all safety instructions.

- Never touch the device under test (DUT) during an active leakage current measurement.
- Ensure the ESA615 is properly grounded before use.
- Do not perform dielectric (hipot) tests unless specifically instructed — these apply high voltage.
- If you are unsure about any step, ask the supervising technician before proceeding.

---

## Equipment Setup

1. Place the Fluke ESA615 on the bench. Connect it to a mains outlet using its own power cord.
2. Verify the ESA615 calibration sticker — the analyser must be within its calibration period.
3. Familiarise yourself with the ESA615 controls: test selection buttons, measurement display, pass/fail indicators.
4. Collect three devices for testing (provided by the lab supervisor):
   - **Device A:** Class I device with Type BF applied parts (e.g., patient monitor)
   - **Device B:** Class I device with Type CF applied parts (e.g., defibrillator or syringe pump with cardiac-rated accessories)
   - **Device C:** Class II device (e.g., battery-powered pulse oximeter)

---

## Procedure

### Part 1 — Device Classification (20 min)

For each of the three devices, identify and record in your lab notebook:

| Property | Device A | Device B | Device C |
|---|---|---|---|
| Manufacturer and model | | | |
| Serial number | | | |
| Protection class (I or II) | | | |
| How did you determine the class? | | | |
| Applied part type (B, BF, or CF) | | | |
| Which parts are the applied parts? | | | |
| Mains voltage rating | | | |
| Fuse rating | | | |

**Hints:**
- Class I devices have a three-pin mains plug (L, N, PE). Class II devices have a two-pin plug or the ⬜ symbol.
- The applied part type is usually marked on the device label with the appropriate symbol (B, BF, or CF in a box/triangle).
- If the applied part type is not immediately visible, check the device's technical specifications or service manual.

---

### Part 2 — Protective Earth Resistance (30 min)

**Applies to:** Device A and Device B (Class I only). Skip this test for Device C (Class II — no PE).

For each Class I device:

1. Connect the device's mains plug to the ESA615 DUT socket.
2. Select **PE Resistance** test on the ESA615.
3. Touch the ESA615 PE test probe to each accessible metal part on the device housing:
   - Metal chassis/frame
   - Mounting screws
   - Connector housings
   - Any exposed metal panel
4. Record the resistance reading for each measurement point.
5. **Acceptance criterion:** < 0.3 Ω at each point.

**Questions to consider:** Why must the PE resistance be low? What happens if the PE wire is broken and a fault occurs inside the device?

---

### Part 3 — Enclosure Leakage Current (30 min)

For all three devices:

1. Connect the DUT to the ESA615.
2. Select **Enclosure Leakage** test.
3. Measure in **Normal Condition (NC):**
   - Touch the ESA615 measurement probe to each accessible conductive part.
   - Record the highest reading.
4. Measure in **Single Fault Condition — Open PE** (Class I devices only):
   - The ESA615 simulates an open PE. Record the reading.
5. **Acceptance criteria:**

| Condition | Limit |
|---|---|
| Normal condition | ≤ 100 µA |
| Single fault — open PE (Class I only) | ≤ 500 µA |

---

### Part 4 — Patient Leakage Current (45 min)

**Applies to:** Devices with applied parts (A and B). If Device C has applied parts, test those too.

For each device with applied parts:

1. Connect the applied part(s) to the ESA615 patient measurement terminals.
2. Select **Patient Leakage** test.
3. Measure in Normal Condition.
4. Measure in Single Fault Condition (open PE for Class I).
5. Record results and compare against the correct limits for the applied part type:

| Applied Part Type | Normal | Single Fault |
|---|---|---|
| Type B | ≤ 100 µA | ≤ 500 µA |
| Type BF | ≤ 100 µA | ≤ 500 µA |
| Type CF | ≤ **10 µA** | ≤ **50 µA** |

**Important:** Note the ten-fold difference in limits between BF and CF. This reflects the additional cardiac risk when applied parts may provide a direct electrical pathway to the heart.

---

### Part 5 — Results Analysis and Reporting (30 min)

Complete the following summary table for all three devices:

| Test | Device A (Class I, BF) | Device B (Class I, CF) | Device C (Class II) |
|---|---|---|---|
| PE resistance (Ω) | | | N/A |
| Enclosure leakage NC (µA) | | | |
| Enclosure leakage SFC (µA) | | | N/A |
| Patient leakage NC (µA) | | | |
| Patient leakage SFC (µA) | | | N/A |
| **Overall: PASS / FAIL** | | | |

For any measurement that approaches or exceeds a limit, describe what action you would take as a clinical engineer.

---

### Part 6 — Review Questions (15 min)

1. Explain the difference between IEC 60601-1 type testing and IEC 62353 recurrent testing. Why does IEC 62353 use lower test voltages for the dielectric withstand test?

2. A Class I patient monitor shows PE resistance of 0.45 Ω. Does this pass or fail? What are the likely physical causes of a high PE resistance, and how would you investigate?

3. Why are Type CF leakage current limits ten times stricter than Type BF limits? Explain the physiological basis.

4. You are testing an infusion pump and measure patient leakage current of 8 µA in normal condition. The pump has Type BF applied parts. Does this pass? Now assume the same pump is used with a central venous catheter that provides a direct path to the heart. Does your assessment change?

5. A clinical engineer performs electrical safety testing on a ventilator after replacing the power supply. Which IEC 62353 tests are mandatory after this specific repair, and why?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- The completed classification table (Part 1) and results summary table (Part 5)
- All individual measurement readings with pass/fail status
- Written answers to the five review questions (Part 6)
- A brief conclusion (200–300 words) discussing the importance of electrical safety testing in clinical engineering and what you learned about the relationship between device classification and safety limits
