---
title: "Electrical Safety Testing Lab"
course: "MTE210"
shortTitle: "Electrical safety"
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
   - **Device C:** Class II device — mains-powered, with a two-pin (unearthed) plug and the double-insulation symbol (e.g., a mains-powered pulse oximeter, or a device fed from a double-insulated external power supply). Do **not** pick a purely battery-powered device: internally powered equipment is a separate IEC 60601-1 category, is neither Class I nor Class II, and cannot be connected to the ESA615 DUT socket for the leakage measurements in Parts 3 and 4.

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
- Class I devices have a three-pin mains plug (L, N, PE). Class II devices have a two-pin plug and carry the double-insulation symbol — a small square inside a larger square (IEC 60417-5172).
- The applied part type is marked with an IEC 60417 pictogram, not with letters: a human figure for **Type B** (5840), a human figure inside a box for **Type BF** (5333), and a heart inside a box for **Type CF** (5335). A defibrillation-proof applied part adds a defibrillator paddle symbol beside the pictogram.
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
5. **Acceptance criteria** — these are the **IEC 60601-1** enclosure leakage limits for normal condition (NC) and single fault condition (SFC):

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
5. Record results and compare against the correct limits for the applied part type. These are the **IEC 60601-1** patient leakage limits for normal condition (NC) and single fault condition (SFC):

| Applied Part Type | Normal condition (NC) | Single fault condition (SFC) |
|---|---|---|
| Type B | ≤ 100 µA | ≤ 500 µA |
| Type BF | ≤ 100 µA | ≤ 500 µA |
| Type CF | ≤ **10 µA** | ≤ **50 µA** |

**Important:** Note the ten-fold difference in limits between BF and CF. This reflects the additional cardiac risk when applied parts may provide a direct electrical pathway to the heart.

**Which standard are you reading?** The NC/SFC pairs in Parts 3 and 4 are IEC 60601-1 limits. IEC 62353 does not test NC and SFC separately: it consolidates them into a single *equipment leakage current* (≤ 500 µA for Class I, ≤ 100 µA for Class II, by the direct or differential method) and a single *applied part leakage current* (≤ 50 µA for Type CF). Check which standard the ESA615 is set to before you judge a reading against this table.

---

### Part 5 — Results Analysis and Oral Presentation (30 min)

Complete the following summary table for all three devices. You will present it to the lab engineer in the lab, so be ready to justify every pass/fail verdict from your own readings:

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

4. You are testing an infusion pump and measure patient leakage current of 45 µA in normal condition. The pump has Type BF applied parts. Does this pass? Now assume the same pump is used with a central venous catheter that provides a direct path to the heart. Does your assessment change, and what would you do about a device whose applied part classification does not match how the ward is actually using it?

5. A clinical engineer performs electrical safety testing on a ventilator after replacing the power supply. Which IEC 62353 tests are mandatory after this specific repair, and why?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your completed classification table from Part 1 and the results summary table from Part 5, including every individual PE resistance, enclosure leakage and patient leakage reading you took
- How you operated the ESA615 in Parts 2–4, and why each device was judged against the limits it was — including why Device B is held to the Type CF limits and why Device C is exempt from the PE resistance test
- Your pass/fail verdict for each device, and the action you would take as a clinical engineer for any reading that approaches or exceeds a limit (Part 5)
- Your answers to the five review questions in Part 6

There is no written hand-in.
