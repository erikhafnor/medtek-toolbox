---
title: "Ventilator Lab"
course: "MTE200"
shortTitle: "Ventilator"
description: "Operation, periodic maintenance, and functional testing of a mechanical ventilator"
equipment:
  - "Dräger Evita XL"
  - "Test lung"
  - "Fluke VT900A Gas Flow Analyzer"
  - "Various tools and spare parts (SV diaphragm assembly)"
prerequisites:
  - "Dräger Evita XL service and user manual documentation"
  - "Lecture notes on mechanical ventilation and respiratory physiology"
duration: "2.5 hours"
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
- Before any cover comes off: switch the ventilator off, disconnect the mains cable, close the compressed air and O₂ supplies, disconnect the gas hoses, and vent the residual pressure in the inspiratory block as the service manual describes. The supply runs at 3–6 bar and the block stays pressurised after the hoses come off.
- Keep the ventilator switched off and unplugged for as long as any internal assembly is exposed. Evita XL units are commonly fitted with an internal battery, so switching off at the front panel does not make the device dead.
- Keep oil and grease away from every part that carries O₂. Hydrocarbons plus oxygen under pressure are an ignition hazard, so handle O₂ fittings only with clean, grease-free hands and tools.
- Reconnect the gas supplies only once the ventilator is fully reassembled and closed, at the start of Part 2.
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

**1.2** Inspect the SV diaphragm assembly mounted in the inspiratory block of the ventilator per the service manual. Check that the diaphragm is not cracked, hardened, or otherwise damaged and that it seats cleanly. Record your findings in your lab notebook — this is the condition you will compare the new assembly against.

**1.3** Replace the *SV diaphragm assembly* following the step-by-step instructions in the service manual. Document each step in your lab notebook as you perform it.

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

**2.4** Test gas delivery at three tidal volume settings. Connect a calibrated gas flow analyser (Fluke VT900A) at the patient wye, between the circuit and the test lung — the ventilator's own display is derived from its own flow sensors and cannot verify its own delivery. For each setting, allow at least 1 minute of stable cycling, then record both the ventilator display value and the analyser value:

| Tidal volume setting | Ventilator display Vt (mL) | Analyser Vt (mL) | Error vs set (%) |
|---|---|---|---|
| 300 mL | | | |
| 500 mL | | | |
| 800 mL | | | |

**Acceptance criterion:** |error| ≤ 10% or ≤ 10 mL, whichever is greater (see the Clinical Engineering Formulas reference page).

**2.5** Comment on any discrepancies between the set value, the ventilator display value and the measured volume. If the display agrees with the setting but the analyser does not, what does that tell you about the ventilator's own flow sensors?

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
3. **Acceptance criterion:** the disconnect alarm must annunciate within 15 s of disconnection. The 15 s is our local acceptance value, taken from the ventilator reference page. The current particular standard for critical care ventilators, ISO 80601-2-12:2020 — which replaced the withdrawn IEC 60601-2-12:2001 — requires a disconnection alarm condition but does not fix a single detection time; the manufacturer declares the alarm delay, so also check what the Evita XL manual states and note it next to your measurement.

**High pressure alarm:**
1. Set the high pressure alarm limit to 30 cmH₂O.
2. Partially occlude the test lung circuit to generate elevated airway pressure.
3. Record the pressure at which the alarm triggers.

**Apnoea alarm:**
1. Switch to a spontaneous breathing mode (e.g., CPAP).
2. Do not simulate any spontaneous breaths on the test lung.
3. Measure the time until the apnoea alarm activates.

Record all alarm test results in a summary table in your lab notebook.

---

### Part 4 — Review Questions (30 min)

Answer the following questions in your lab notebook. You will talk through your answers with the lab engineer when you present for approval.

1. Explain the purpose of the SV diaphragm and what happens if it fails. In your answer, address the consequences for both supply pressure faults and power failure scenarios.

2. Compare volume-controlled vs pressure-controlled ventilation modes — what are the key differences in how the ventilator delivers breaths? Discuss which parameter is guaranteed (volume or pressure) in each mode and what varies.

3. The Evita XL is pneumatically driven: it has no internal turbine or blower, and takes its drive gas from the compressed air and O₂ supplies at 3–6 bar (where medical air is not piped, an external compressor unit supplies it). What happens to ventilation if the air supply fails while O₂ is still connected, and what does the safety valve (SV) diaphragm do if both gas supplies or the mains fail? Compare this with a turbine-driven ventilator such as the Dräger Savina, and explain why turbine machines are preferred for transport and for sites without piped medical air.

4. Our acceptance value is that the disconnect alarm annunciates within 15 s. Why is rapid disconnect detection clinically critical, and what could happen to a patient if the alarm were delayed well beyond that? Where in the manufacturer's documentation would you find the alarm delay declared for the Evita XL, and why does ISO 80601-2-12 leave that figure to the manufacturer instead of fixing it in the standard?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your inspection findings for the SV diaphragm assembly (1.2) and the replacement you carried out (1.3), walked through step by step from the service manual, together with your answer to 1.4
- Your completed gas delivery table from 2.4 — set, displayed and measured tidal volume with the error at each setting — and whether each result meets the ±10% / ±10 mL acceptance criterion, plus the discrepancies you identified in 2.5
- Your ventilation mode table from 3.1 and your alarm test results from 3.2, including the measured disconnect and apnoea times held against the acceptance criteria
- Your answers to the four review questions in Part 4

There is no written hand-in.
