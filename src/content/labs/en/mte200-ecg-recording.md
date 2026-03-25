---
title: "ECG Recording Lab"
course: "MTE200"
description: "Standard 12-lead resting ECG recording and the heart's electrical activity using a patient simulator"
equipment:
  - "Fluke ProSim 8 Vital Signs and ECG Patient Simulator"
  - "Philips PageWriter TC30 electrocardiograph"
prerequisites:
  - "Fluke ProSim 8 user manual"
  - "Philips PageWriter TC30 user and service manual"
  - "Lecture notes on cardiac electrophysiology and ECG"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Identify safety symbols (Type B, BF, CF, defibrillation-proof) and explain their significance for patient safety
- Connect a 12-lead ECG to a patient simulator and acquire diagnostic-quality recordings
- Perform lead wire performance and cardiograph sensitivity tests following the service manual
- Recognise common ECG artifacts (mains interference, muscle movement, baseline wander, respiratory) and explain their causes
- Measure standard ECG intervals (R-R, P-R, ST segment) and calculate heart rate
- Determine the electrical axis of the QRS complex, P-wave, and T-wave using Einthoven's triangle

---

## Safety Notes

> **ELECTRICAL SAFETY.** ECG recording involves connecting all electrical connections to the body, posing a risk of unwanted leakage currents. Inspect the device before use. Ensure it is connected to a grounded outlet and that the patient is not in electrical contact with other devices. Familiarise yourself with warnings in the device's user manual.

---

## Equipment Setup

Familiarise yourself with the ECG device and patient simulator per the user manuals. Pay special attention to the sections explaining ECG lead connections to the patient and the description of buttons and connections available.

The patient simulator generates ECG signals for a range of possible simulated cardiac arrhythmias (arrhythmias, artifacts) and all settings are controlled via the user interface.

1. Connect all 12 ECG electrodes to the patient simulator.
2. Power on the ECG device.
3. ECG traces appear once you press a button on the patient simulator.
4. ECG recordings should be exported as PDF to a USB drive connected to the ECG device (procedure described in the user manual).

Students must write a running protocol during lab work.

---

## Procedure

### Part 1 — Preliminary Questions

The following questions can be completed before arriving at the lab. Use the Philips PageWriter TC30 service manual as your primary reference.

**1.1** Find information about the following symbols in the service manual and explain them:

- Type B applied part symbol
- Type BF applied part symbol
- Type CF applied part symbol
- Defibrillation-proof symbol

**1.2** What criteria must be met to connect the medical device to another device connected to the power grid?

**1.3** Find information about the accuracy of the electrocardiogram the device produces. What is the accuracy requirement for diagnostic ECG display, and in which IEC 60601 protocol are these requirements found?

**1.4** Find the device's filter and cut-off frequency alternatives, e.g., 50 Hz and 60 Hz, and document where to find them.

**1.5** Explain how the anatomical view of electrode placement on the device is obtained. Why is it called a 12-lead ECG when only 10 electrodes are attached to the patient?

---

### Part 2 — Performance and Sensitivity Testing

**2.1 Lead Wire Performance Test**

Perform a performance test of the electrodes by following the service manual procedure "Lead Wire Performance Test (2-15)."

> **Note:** Leads must be disconnected from the patient simulator during this test.

Record the results for each lead and note whether each passes or fails the acceptance criteria.

**2.2 Cardiograph Overall Sensitivity Test**

Perform a sensitivity test by following the service manual procedure "Cardiograph Overall Sensitivity Test (2-19)."

Record the measured sensitivity values and compare them against the specified tolerance.

---

### Part 3 — ECG Artifacts

Apply the following artifacts available on the patient simulator and observe the differences in noise and how the ECG trace changes:

| Artifact | What to Observe |
|---|---|
| 50 Hz mains interference | Regular, fine oscillations superimposed on the trace |
| Muscle movement | Irregular, high-frequency noise |
| Baseline wander | Slow, undulating shift of the baseline |
| Respiratory artifact | Periodic baseline variation synchronised with breathing |

> **Note:** The ECG device has active filtering that in some cases must be deactivated to show the artifact on the ECG. Record which filter settings you used for each observation.

Export a recording of each artifact type to the USB drive for inclusion in your lab report.

---

### Part 4 — ECG Interval Measurements

**4.1** Set the patient simulator to produce a normal sinus rhythm ECG.

**4.2** From the recorded ECG, estimate the patient's heart rate by measuring the R-R interval.

**4.3** Calculate the time for the P-R interval.

**4.4** Measure the duration of the ST segment.

Record all measurements with units in your lab notebook. Compare your measured values against normal reference ranges.

---

### Part 5 — Electrical Axis Determination

**5.1** Simulate a normal ECG on the patient simulator.

**5.2** Using extremity leads *II* and *III* from the ECG device, determine the electrical axis of:

- The QRS complex
- The P-wave
- The T-wave

Use Einthoven's triangle to perform the axis determination. Measure the net amplitude (sum of positive and negative deflections) of each wave in leads II and III, and plot these on the triaxial reference system to find the resultant vector.

**5.3** The standard extremity leads I, II, and III are bipolar because they measure between two electrodes where the signal potential varies at both locations. The augmented extremity leads (aVF, aVL, and aVR) are monopolar/unipolar. How is this achieved when the same 3 electrodes are used?

> **Hint:** Consider how Wilson's central terminal is formed and how the augmented leads modify the reference electrode configuration. Refer to the figure showing the Einthoven triangle and augmented leads.

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- Written answers to the preliminary questions (Part 1)
- Lead wire performance test results and sensitivity test results (Part 2)
- Artifact comparison observations with exported ECG recordings (Part 3)
- ECG interval measurements with calculated heart rate (Part 4)
- Electrical axis determination using Einthoven's triangle, including your plotted vectors (Part 5)
- Written answer to the bipolar vs unipolar lead question (Part 5.3)
- A brief conclusion (200--300 words) discussing your findings and their relevance to clinical engineering quality assurance
- A reference list citing the Philips PageWriter TC30 user and service manuals, IEC 60601 standards referenced, and any other sources used
