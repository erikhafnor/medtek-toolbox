---
title: "Blood Pressure and Pulse Oximetry Lab"
course: "MTE200"
description: "Non-invasive blood pressure measurement, pulse oximetry monitoring, and invasive blood pressure principles"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
prerequisites:
  - "LIFEPAK 15 user manual documentation"
  - "Lecture notes on hemodynamic monitoring"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Perform non-invasive blood pressure (NIBP) and oxygen saturation (SpO2) measurements using the LIFEPAK 15
- Identify the measurement principle used by the LIFEPAK 15 for NIBP and explain its operating principle
- Carry out an NIBP calibration check following the Performance Inspection Procedure
- Quantify the hydrostatic contribution to blood pressure readings caused by arm position relative to the heart
- Interpret a plethysmography curve and explain the effect of cuff inflation on continuous SpO2 monitoring
- Describe the components and principles of invasive arterial blood pressure monitoring

---

## Safety Notes

> **IMPORTANT.** In this lab, only connect NIBP and SpO2 sensors to the LIFEPAK 15. Familiarise yourself with warnings and precautions for NIBP monitoring on page 82 of the LIFEPAK 15 user manual.

- It is voluntary to perform measurements on yourself.
- Measurements outside the normal range must not be used for diagnostics in any way.
- All measurements performed are interpreted as non-valid health data.

---

## Procedure

Students must write a running protocol during the lab work so they can reproduce the results after the assignment and get it approved in the lab.

### Part 1 — Non-Invasive Blood Pressure and Pulse Oximetry

To measure the body's arterial blood pressure and oxygen saturation, we use the LIFEPAK 15, which is a defibrillator but also has multimonitor functions.

**1.1** Follow the LIFEPAK 15 user manual to perform non-invasive blood pressure measurement on one or more people in the group. Determine from the cuff or cuff packaging which method the LP15 uses for measurement and what the operating principle is.

**1.2** As with all electromedical equipment, the LP15 must have periodic maintenance. The attached document in the equipment register is called "Performance Inspection Procedure" -- a guide for how all procedures should be performed during periodic maintenance. Follow the procedure called "PIP -- NIBP Calibration Check."

> **Note:** Use a one-way hand pump instead of a syringe pump due to risk of equipment damage.

**1.3** Non-invasive blood pressure measurements should never be used as the sole vital parameter for diagnostics or treatment. What external factors can manipulate a blood pressure measurement? When adjusting the placement of the cuff relative to the circulatory system's zero point (right atrium), this causes a hydrostatic contribution to the measurement. Test how large a contribution (+/-mmHg) you get by raising and lowering the arm with the cuff.

**1.4** Place the SpO2 sensor on someone in the group as explained in the LP15 user manual under the chapter "Monitoring SpO2, SpCO, and SpMet." Study the plethysmography curve -- what do you see?

**1.5** Have someone in the group wear the SpO2 sensor on the same arm as the BP cuff and perform a BP measurement. What do you observe on the continuous pulse oximetry measurement?

---

### Part 2 — Invasive Blood Pressure (IBP) Monitoring

This section covers the principles of invasive arterial blood pressure monitoring. While we do not perform invasive procedures in this lab, understanding the IBP system is essential for clinical engineers who maintain and calibrate patient monitors in critical care environments.

#### 2.1 System Components

An invasive blood pressure monitoring system consists of the following components:

- **Arterial catheter** -- a short cannula inserted into an artery (typically radial, femoral, or brachial)
- **Pressure tubing** -- rigid, non-compliant tubing connecting the catheter to the transducer
- **Transducer** -- a disposable pressure sensor that converts mechanical pressure to an electrical signal
- **Flush device** -- a pressurised saline bag (maintained at 300 mmHg) providing a continuous slow flush (approximately 3 mL/h) to prevent clot formation in the catheter
- **Patient monitor** -- displays the continuous arterial waveform and derived values (systolic, diastolic, mean arterial pressure)

#### 2.2 Zeroing Procedure

Before measurements can be taken, the system must be zeroed:

1. Position the transducer at the level of the phlebostatic axis (4th intercostal space, mid-axillary line).
2. Open the transducer stopcock to atmosphere (turn the stopcock off to the patient).
3. Press the zero function on the patient monitor.
4. Confirm the monitor displays 0 mmHg.
5. Close the stopcock to atmosphere and reopen to the patient.

#### 2.3 Dynamic Response Testing

The square wave (fast flush) test is used to assess the natural frequency and damping coefficient of the catheter-transducer system:

1. Activate the fast flush valve briefly (pull the pigtail or squeeze the flush device) to generate a square wave input.
2. Release the flush and observe the resulting waveform on the monitor.
3. Interpret the response:
   - **Optimally damped:** 1--2 oscillations after the square wave before returning to baseline. This indicates accurate pressure reproduction.
   - **Overdamped:** No oscillations, slow return to baseline. Common causes include air bubbles in the tubing, clot at the catheter tip, or compliant tubing. Results in underestimation of systolic and overestimation of diastolic pressure.
   - **Underdamped:** Multiple oscillations (ringing) after the square wave. Common causes include excessive tubing length, catheter whip, or resonance. Results in overestimation of systolic and underestimation of diastolic pressure.

#### 2.4 Sources of Error

| Source of Error | Effect on Waveform | Corrective Action |
|---|---|---|
| Air bubbles in tubing | Overdamped | Flush all air from the system |
| Clot at catheter tip | Overdamped | Aspirate and flush; replace catheter if persistent |
| Catheter whip / resonance | Underdamped | Shorten tubing; add a damping device |
| Incorrect transducer level | Systematic offset | Re-level to phlebostatic axis |
| Loose connections | Signal dropout or damping | Tighten all Luer-lock connections |

#### 2.5 When IBP Is Preferred Over NIBP

Invasive blood pressure monitoring is indicated when:

- The patient is haemodynamically unstable (e.g., septic shock, cardiogenic shock)
- Continuous beat-to-beat monitoring is required during surgery or critical care
- Vasoactive drug titration demands real-time pressure feedback
- Frequent arterial blood sampling is needed (blood gases, lactate)
- NIBP readings are unreliable (e.g., morbid obesity, arrhythmias, severe peripheral vasoconstriction)

#### 2.6 Clinical Engineering Role

Clinical engineers are responsible for:

- Calibrating transducers using a certified pressure source (e.g., mercury or digital manometer)
- Verifying pressure module accuracy across the clinical range (0--300 mmHg)
- Including IBP verification in patient monitor preventive maintenance (PM) procedures
- Documenting calibration results in the equipment management system
- Training clinical staff on correct zeroing and levelling techniques

---

### Part 3 — Review Questions

Answer the following questions in your lab notebook.

1. What measurement principle does the LIFEPAK 15 use for NIBP? How does oscillometric measurement work?

2. Why does arm position relative to the heart affect the blood pressure reading? Calculate the hydrostatic pressure difference for a 30 cm height change.

3. Why does the SpO2 reading become unreliable during a blood pressure measurement on the same arm?

4. Compare the advantages and limitations of NIBP vs IBP monitoring. In what clinical situations is each preferred?

5. What is the purpose of the fast flush (square wave) test in invasive pressure monitoring?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- NIBP measurement data from Part 1.1
- Calibration check results from Part 1.2
- Hydrostatic effect measurements from Part 1.3 with recorded values in mmHg
- SpO2 observation documentation from Parts 1.4 and 1.5
- Written answers to the review questions (Part 3)
- A brief conclusion (200--300 words) discussing your findings and their clinical engineering relevance
- A reference list citing the LIFEPAK 15 user manual and any other sources used
