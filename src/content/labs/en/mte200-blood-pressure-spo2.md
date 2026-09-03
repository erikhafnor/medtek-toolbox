---
title: "Blood Pressure and Pulse Oximetry Lab"
course: "MTE200"
shortTitle: "Blood pressure & SpO₂"
description: "Non-invasive blood pressure measurement, pulse oximetry monitoring, and invasive blood pressure principles"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Adult NIBP cuff and hose, and SpO2 finger sensor for the LIFEPAK 15"
  - "Fluke ProSim 8 Vital Signs and ECG Patient Simulator (NIBP static-pressure reference)"
  - "One-way hand pump with bleed valve"
prerequisites:
  - "LIFEPAK 15 user manual documentation"
  - "LIFEPAK 15 Performance Inspection Procedure (PIP) from the equipment register"
  - "Lecture notes on hemodynamic monitoring"
duration: "2.5 hours"
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
- Never place the NIBP cuff on an arm with an intravenous line or infusion, a dialysis fistula or shunt, an injury, or a skin condition, and never on the same arm as a second cuff that is being inflated.
- Limit the number of consecutive inflations on the same arm and leave at least a minute between measurements. Repeated or prolonged cuff inflation can cause venous congestion, petechiae, bruising, and nerve compression.
- The person wearing the cuff decides when a measurement stops. Abort and deflate immediately if they report pain, numbness, or tingling.
- Report any equipment damage or unexpected behaviour to the supervising technician.

---

## Procedure

Keep a running protocol in your lab notebook during the lab work, so you can reproduce your results and present them to the lab engineer for approval.

### Part 1 — Non-Invasive Blood Pressure and Pulse Oximetry (75 min)

To measure the body's arterial blood pressure and oxygen saturation, we use the LIFEPAK 15, which is a defibrillator but also has multimonitor functions.

**1.1** Follow the LIFEPAK 15 user manual to perform non-invasive blood pressure measurement on one or more people in the group. Determine from the cuff or cuff packaging which method the LP15 uses for measurement and what the operating principle is.

**1.2** As with all electromedical equipment, the LP15 must have periodic maintenance. The attached document in the equipment register is called "Performance Inspection Procedure" -- a guide for how all procedures should be performed during periodic maintenance. Follow the procedure called "PIP -- NIBP Calibration Check."

> **Note:** Disconnect the cuff and hose from every person before you pressurise the NIBP circuit -- this check is run against a rigid test volume, not against an arm. Pressurise with a one-way hand pump, not with a syringe: a syringe can produce pressure spikes and negative pressure that damage the NIBP transducer.

**Acceptance criterion:** at every pressure point in the PIP, the pressure displayed by the LIFEPAK 15 must agree with the calibrated reference within the tolerance the PIP states -- **±3 mmHg** for the LIFEPAK 15. It is at least as strict as IEC 80601-2-30, the particular standard for automated non-invasive sphygmomanometers (it replaced the withdrawn IEC 60601-2-30), which requires the cuff pressure indication to be within ±3 mmHg, or 2% of the reading where that is greater. Record each reference/displayed pair in your lab notebook and state pass or fail.

**1.3** Non-invasive blood pressure measurements should never be used as the sole vital parameter for diagnostics or treatment. What external factors can manipulate a blood pressure measurement? When adjusting the placement of the cuff relative to the circulatory system's zero point (right atrium), this causes a hydrostatic contribution to the measurement. Test how large a contribution (+/-mmHg) you get by raising and lowering the arm with the cuff.

**1.4** Place the SpO2 sensor on someone in the group as explained in the LP15 user manual under the chapter "Monitoring SpO2, SpCO, and SpMet." Study the plethysmography curve -- what do you see?

**1.5** Have someone in the group wear the SpO2 sensor on the same arm as the BP cuff and perform a BP measurement. What do you observe on the continuous pulse oximetry measurement?

---

### Part 2 — Invasive Blood Pressure (IBP) Monitoring (45 min)

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

- Calibrating transducers against a certified pressure reference, such as a digital pressure calibrator. Mercury manometers must not be used: mercury measuring devices have been banned for professional use in the EU/EEA since 2014 (REACH Annex XVII entry 18a; Regulation (EU) 2017/852)
- Verifying pressure module accuracy across the clinical range (0--300 mmHg)
- Including IBP verification in patient monitor preventive maintenance (PM) procedures
- Documenting calibration results in the equipment management system
- Training clinical staff on correct zeroing and levelling techniques

---

### Part 3 — Review Questions (30 min)

Answer the following questions in your lab notebook.

1. What measurement principle does the LIFEPAK 15 use for NIBP? How does oscillometric measurement work?

2. Why does arm position relative to the heart affect the blood pressure reading? Calculate the hydrostatic pressure difference for a 30 cm height change, using p = ρgh with blood density ρ = 1060 kg/m³, g = 9.81 m/s², and 1 mmHg = 133.3 Pa. Compare your calculated value with the shift you measured in Part 1.3, and state which way the reading moves when the arm is raised.

3. Why does the SpO2 reading become unreliable during a blood pressure measurement on the same arm?

4. Compare the advantages and limitations of NIBP vs IBP monitoring. In what clinical situations is each preferred?

5. What is the purpose of the fast flush (square wave) test in invasive pressure monitoring?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your NIBP readings from Part 1.1, with the measurement principle the LIFEPAK 15 uses, and the hydrostatic contribution in mmHg you measured by raising and lowering the arm in Part 1.3, compared with the value you calculate from p = ρgh
- The NIBP calibration check from Part 1.2: each reference and displayed pressure pair, and whether the LIFEPAK 15 is inside the PIP tolerance
- The plethysmography curve from Part 1.4 and what happened to the continuous SpO2 measurement when the cuff inflated on the same arm in Part 1.5
- Your answers to the review questions in Part 3, including the IBP material in Part 2

There is no written hand-in.
