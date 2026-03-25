---
title: "Infusion Pump Lab"
course: "MTE200"
description: "Flow rate accuracy testing, occlusion detection, and preventive maintenance of infusion pumps"
equipment:
  - "B. Braun Infusomat Space (volumetric pump)"
  - "B. Braun Perfusor Space (syringe pump)"
  - "IDA-5 Infusion Device Analyzer (Fluke Biomedical)"
prerequisites:
  - "B. Braun Infusomat Space user and service manual documentation"
  - "B. Braun Perfusor Space user and service manual documentation"
  - "IDA-5 Infusion Device Analyzer documentation"
  - "Lecture notes on infusion technology"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Identify the major controls, indicators, and safety features of the B. Braun Infusomat Space (volumetric pump) and B. Braun Perfusor Space (syringe pump)
- Create test templates on the IDA-5 and operate it to measure flow rate and occlusion pressure
- Interpret flow rate accuracy results against IEC 60601-2-24 acceptance criteria
- Test occlusion pressure detection and investigate how pressure levels affect alarm behaviour
- Test the air-in-line detection and upstream sensor safety systems
- Understand the anti-free-flow mechanism and its role in patient safety

---

## Safety Notes

> **FLUID HAZARD.** This lab uses deionized water as the test fluid. Keep all fluids away from electrical equipment. Wipe up spills immediately. Do not allow water to enter the pump housing.

- The IDA-5 uses precision sensors — handle with care and follow the setup instructions exactly.
- Do not disassemble the pump mechanism.
- Report any equipment damage to the supervising technician.

---

## Equipment Setup

### IDA-5 Test Template Setup

Before connecting the pumps, create the test templates on the IDA-5.

**Creating a template:** Press ESC → Utilities → Edit Templates → Add.

**Volume pump (Infusomat Space) template:**

| Step | Type | Rate | Vol/Press | Time | Tol % |
|---|---|---|---|---|---|
| 1 | Flow | 100 ml/h | 25 ml | 02:30 | 5 |
| 2 | Occlusion | 200 ml/h | 487 mmHg | 01:00 | 5 |

**Syringe pump (Perfusor Space) template:**

| Step | Type | Rate | Vol/Press | Time | Tol % |
|---|---|---|---|---|---|
| 1 | Flow | 100 ml/h | 25 ml | 02:30 | 5 |
| 2 | Occlusion | 200 ml/h | 487 mmHg | 01:00 | 5 |

### Pump and Tubing Setup

1. Place the B. Braun Infusomat Space (volumetric pump) and B. Braun Perfusor Space (syringe pump) on the bench or IV pole mount. Inspect the housings for physical damage.
2. Fill tubing with deionized water. Prime the IDA-5 and tubing according to the IDA-5 manual (page 7).
3. **Volume pump:** Insert a B. Braun IV standard administration set into the Infusomat Space following the set loading guide on the pump door. Connect the administration set to a bag of deionized water. Hang the bag at least 50 cm above the pump. Connect the outlet to IDA-5 **channel 1**.
4. **Syringe pump:** Pre-fill ("prime") a syringe with **15 ml** deionized water. Load the syringe into the Perfusor Space. Connect the syringe outlet to IDA-5 **channel 2**.
5. On the IDA-5, select the appropriate template: Template → Select template → Start → Enter control number.
6. After starting, prime with 5 ml until the IDA-5 shows **Auto Start**. Click Auto Start, then start the pump.
7. **Volume pump settings:** total volume 250 ml, rate 100 ml/h.
8. **Syringe pump settings:** total volume 50 ml, rate 100 ml/h.
9. Power on both pumps and verify they complete their self-tests without errors.

---

## Procedure

### Part 1 — Familiarisation with Controls and Safety Features (20 min)

**1.1** Working from the quick reference guides for both pumps, locate and record the function of each of the following in your lab notebook:

**Infusomat Space (volumetric pump):**
- Flow rate setting (mL/h)
- Volume to be infused (VTBI) setting
- Start/stop button
- Bolus button and bolus rate indicator
- Pressure alarm indicator and threshold setting
- Air-in-line detector
- Upstream sensor
- Door open/close mechanism
- Anti-free-flow clamp (built into the door mechanism)
- Battery status indicator

**Perfusor Space (syringe pump):**
- Flow rate setting (mL/h)
- Volume to be infused (VTBI) setting
- Start/stop button
- Bolus button
- Pressure alarm indicator
- Syringe clamp mechanism
- Battery status indicator

**1.2** Open the Infusomat Space pump door and observe the anti-free-flow clamp. Describe in your notebook how the clamp engages when the door is opened and disengages when the pump starts. Explain why this mechanism is critical for patient safety.

**1.3** Identify the applied-part classification of the infusion pumps. Is it Type B, BF, or CF? Record your answer and explain why.

---

### Part 2 — Flow Rate Accuracy Test (60 min)

Test flow rate accuracy using the IDA-5 templates created during setup. The template runs the flow test at 100 ml/h for 25 ml over 2 minutes 30 seconds with a 5% tolerance.

#### 2.1 Volume Pump (Infusomat Space) — 100 mL/h

1. Confirm the Infusomat Space is set to **100 ml/h** with total volume **250 ml**.
2. On the IDA-5, select the volume pump template on channel 1. Start the template and enter the control number.
3. Prime with 5 ml until the IDA-5 shows **Auto Start**. Click Auto Start, then start the pump.
4. Allow the IDA-5 template to run. The test measures 25 ml at 100 ml/h over 2:30.
5. Record the IDA-5 flow rate result.
6. **Acceptance criterion:** Mean flow rate within ±5% of set rate (IEC 60601-2-24 §201.12.1). For 100 mL/h, the acceptable range is **95–105 mL/h**.

#### 2.2 Syringe Pump (Perfusor Space) — 100 mL/h

1. Confirm the Perfusor Space syringe is pre-filled with **15 ml** deionized water and the pump is set to **100 ml/h** with total volume **50 ml**.
2. On the IDA-5, select the syringe pump template on channel 2. Start the template and enter the control number.
3. Prime with 5 ml until the IDA-5 shows **Auto Start**. Click Auto Start, then start the pump.
4. Allow the IDA-5 template to run.
5. Record the IDA-5 flow rate result.
6. **Acceptance criterion:** 95–105 mL/h (±5%).

---

### Part 3 — Occlusion Pressure Testing (45 min)

The IDA-5 template step 2 runs an occlusion test at 200 ml/h with a target of 487 mmHg. In this part you will also explore the pump's adjustable pressure levels.

#### 3.1 IDA-5 Occlusion Test (Volume Pump)

1. After the flow test in Part 2.1 completes, the IDA-5 template automatically proceeds to the occlusion step.
2. Record:
   - Time from occlusion to alarm (seconds)
   - Pressure at alarm (mmHg) — read from the IDA-5
3. **Acceptance criterion:** The pump must alarm at or below the set occlusion pressure threshold (487 mmHg with 5% tolerance).

#### 3.2 Investigating Pressure Levels on the Infusomat Space

1. Are occlusion pressure limits the same for all patients? Discuss with your lab partner.
2. Navigate the Infusomat Space display to find how to adjust the pressure level. The display shows the pressure level in mmHg. The pump has pressure levels 0–9.
3. Choose a pressure level and note the corresponding mmHg value from the display.
4. Set the pump to **200 ml/h** and run an occlusion test at your chosen pressure level.
5. Record whether the measured pressure on the IDA-5 matches the expected value from the pump display.

#### 3.3 Syringe Pump Occlusion

1. Repeat the IDA-5 occlusion test for the Perfusor Space (channel 2).
2. From the Perfusor Space service manual, find what tool a clinical engineer uses to quality-check and calibrate the "cut-off" pressure. Record this in your lab notebook.

---

### Part 4 — Air-in-Line Detection Testing (30 min)

The Infusomat Space (volumetric pump) has an air-in-line sensor. In this part you will test how the pump responds to different volumes of air in the tubing.

**Setup:**
1. Disconnect the infusion set from the IDA-5.
2. Mount a drip set under the drip counter.
3. Place the distal end of the tubing in a drip chamber.

#### 4.1 Small Air Volume (0.02–0.3 ml)

1. Set the Infusomat Space to **300 ml/h**.
2. Introduce a small air bubble (0.02–0.3 ml) into the tubing.
3. Observe and record: How does the pump respond? Does it alarm? What type of alarm?

#### 4.2 Large Air Volume (1.5 ml)

1. Reset the pump and set it to **300 ml/h**.
2. Introduce a larger air volume (approximately 1.5 ml) into the tubing.
3. Observe and record: How does the pump respond? Does it stop? What alarm message is displayed?

**4.3** Compare the pump's responses in 4.1 and 4.2. Why does the pump behave differently for small versus large air volumes? What are the clinical implications?

---

### Part 5 — Upstream Sensor Testing (15 min)

The Infusomat Space also has an **upstream sensor** that detects changes in pressure on the inlet side of the pump.

1. With the pump running at **100 ml/h**, attempt to trigger the pump's pressure reduction alarm. The alarm threshold starts at **-120 mbar**.
2. Record what action you took to trigger the alarm and the pump's response.
3. In your lab notebook, explain when this alarm would occur in a clinical setting and why it is important for patient safety.

---

### Part 6 — Review Questions (15 min)

Answer the following questions in your lab notebook:

1. IEC 60601-2-24 specifies that flow rate accuracy shall be within ±5% of the set rate under steady-state conditions. Why is flow rate accuracy clinically critical — give a specific example of a drug where ±5% deviation matters.

2. Explain the "trumpet curve" phenomenon in infusion pumps. Why does the flow rate fluctuate more at low set rates than at high set rates?

3. You tested occlusion pressure at a specific pressure level on the Infusomat Space. Explain the clinical trade-off between setting a high versus low occlusion alarm threshold. How would you decide which pressure level to use for a neonatal patient versus an adult patient?

4. The Infusomat Space's anti-free-flow mechanism is an engineering control in the hierarchy of risk controls. The roller clamp on the administration set is an administrative control (requires user action). Why are both needed? What could happen if only one layer of protection existed?

5. Based on your air-in-line experiments (Part 4), explain the difference between the pump's response to small and large air volumes. What are the clinical consequences of air entering the bloodstream?

6. From the Perfusor Space service manual, what tool does a clinical engineer use to quality-check and calibrate the cut-off pressure? Why is periodic calibration important?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- A completed results table for all measurements in Parts 2, 3, 4, and 5
- Written answers to the six review questions (Part 6)
- A brief conclusion (200–300 words) discussing whether the pumps meet their specifications and the clinical implications of your findings
