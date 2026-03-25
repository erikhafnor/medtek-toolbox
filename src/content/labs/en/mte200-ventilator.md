---
title: "Ventilator Lab"
course: "MTE200"
description: "Operation, periodic maintenance, and functional testing of a mechanical ventilator"
equipment:
  - "Dräger Evita XL"
  - "Test lung"
  - "Various tools and spare parts (SV Diaphragm)"
prerequisites:
  - "Dräger Evita XL service and user manual documentation"
  - "Lecture notes on mechanical ventilation and respiratory physiology"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Describe the function of the inspiratory block and its key components, including the SV diaphragm assembly
- Inspect and replace the SV diaphragm assembly following the Dräger Evita XL service manual
- Assemble ventilator circuits with a test lung and verify correct operation
- Distinguish between volume-controlled and pressure-controlled ventilation modes
- Perform gas delivery verification and alarm testing on a mechanical ventilator

---

## Safety Notes

> **ESD HAZARD.** This lab involves direct contact with electronics. Electrostatic discharge can damage sensitive components. Set up appropriate ESD precautions before beginning work.

- Wear an ESD wrist strap connected to the bench ground point whenever handling internal components.
- Do not apply power to the ventilator while internal assemblies are exposed.
- When testing with a test lung, ensure all circuit connections are secure before starting ventilation.
- Report any equipment damage or unexpected behaviour to the supervising technician.

---

## Equipment Setup

1. Place the Dräger Evita XL on the bench. Inspect the housing for physical damage and confirm the mains cable and gas supply connections are present and undamaged.
2. Ensure the physical copy of the Dräger Evita XL service manual is available at your workstation.
3. Locate the spare SV diaphragm assembly and the required tools.
4. Do not connect gas supplies or the test lung until instructed in the procedure.

---

## Procedure

### Part 1 — Inspiratory Block Inspection and SV Diaphragm Replacement (60 min)

**1.1** Read through the chapter on the *Inspiratory Block* in the service manual (physical copy in the lab) under Chapter 3 *Repair Instructions*. Familiarise yourself with the layout and function of the inspiratory block before beginning any hands-on work.

**1.2** Inspect the O2 diaphragm mounted in the inspiratory block of the ventilator per the service manual. Check that the diaphragm is not cracked or otherwise damaged. Record your findings in your lab notebook.

**1.3** Replace the *SV diaphragm assembly* following the step-by-step instructions in the service manual. Document each step as you perform it.

**1.4** Answer the following in your lab notebook: Why is the SV diaphragm assembly important regarding supply pressure faults or power failure on the ventilator? (Hint: see section 3.3 in the service manual on the equipment register.)

---

### Part 2 — Gas Delivery Verification (45 min)

**2.1** Assemble a ventilator circuit with the test lung. Do not use a humidifier for this test.

**2.2** Power on the Evita XL and configure the following baseline settings:

| Parameter | Setting |
|---|---|
| Mode | VC-CMV |
| Tidal volume (Vt) | 500 mL |
| Respiratory rate (RR) | 12 breaths/min |
| PEEP | 5 cmH₂O |
| FiO₂ | 0.21 |

**2.3** Allow the ventilator to cycle for at least 2 minutes to stabilise. Observe the waveforms on the ventilator display and confirm normal operation.

**2.4** Test gas delivery at three tidal volume settings. For each setting, allow at least 1 minute of stable cycling, then record the ventilator display readings and the test lung response:

| Tidal Volume Setting | Ventilator Display Vt (mL) | Test Lung Observation |
|---|---|---|
| 300 mL | | |
| 500 mL | | |
| 800 mL | | |

**2.5** Comment on any discrepancies between the set values and the delivered volumes.

---

### Part 3 — Ventilation Modes and Alarm Testing (45 min)

#### 3.1 Ventilation Mode Comparison

Review the operation and controls of the Evita XL following the user manual. Test the different ventilation modes available on the device. For each mode tested, record:

- Mode name and abbreviation
- Whether the mode is volume-controlled or pressure-controlled
- Key parameter settings required for that mode

Complete the following table in your lab notebook:

| Mode | Control Type (Volume/Pressure) | Key Parameters |
|---|---|---|
| VC-CMV | | |
| PC-CMV | | |
| SIMV | | |
| CPAP/ASB | | |
| Other modes available | | |

#### 3.2 Alarm Testing

Test the following alarms and record your observations:

**Disconnect alarm:**
1. With the ventilator running in VC-CMV mode, disconnect the patient circuit from the test lung.
2. Measure the time from disconnection to alarm activation.
3. **Acceptance criterion:** The disconnect alarm should trigger within 15 seconds (IEC 60601-2-12).

**High pressure alarm:**
1. Set the high pressure alarm limit to 30 cmH₂O.
2. Partially occlude the test lung circuit to generate elevated airway pressure.
3. Record the pressure at which the alarm triggers.

**Apnoea alarm:**
1. Switch to a spontaneous breathing mode (e.g., CPAP).
2. Do not simulate any spontaneous breaths on the test lung.
3. Measure the time until the apnoea alarm activates.

Record all alarm test results in a summary table.

---

### Part 4 — Review Questions (30 min)

Answer the following questions in your lab notebook. You will discuss your answers with the group at the end of the session.

1. Explain the purpose of the SV diaphragm and what happens if it fails. In your answer, address the consequences for both supply pressure faults and power failure scenarios.

2. Compare volume-controlled vs pressure-controlled ventilation modes — what are the key differences in how the ventilator delivers breaths? Discuss which parameter is guaranteed (volume or pressure) in each mode and what varies.

3. Why does the Evita XL have both a turbine/blower and compressed gas connections? When would each be used? Consider both normal hospital operation and emergency/transport scenarios.

4. IEC 60601-2-12 requires that the disconnect alarm triggers within 15 seconds. Why is rapid disconnect detection clinically critical? What could happen to a patient if the alarm were delayed beyond this limit?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- Completed inspection findings from Part 1, including the condition of the O2 diaphragm and the SV diaphragm replacement procedure
- A ventilation mode comparison table (Part 3.1) identifying which modes are volume-controlled and which are pressure-controlled
- Gas delivery verification results table (Part 2.4)
- Alarm test results table (Part 3.2), including measured times and comparison against acceptance criteria
- Written answers to the four review questions (Part 4)
- A brief conclusion (200–300 words) discussing your overall findings and the clinical engineering significance of routine ventilator maintenance
- A reference list citing IEC 60601-2-12, the Dräger Evita XL service and user manuals, and any other sources used
