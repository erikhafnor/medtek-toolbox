---
title: "Ultrasound Lab"
course: "MTE200"
shortTitle: "Ultrasound"
description: "Ultrasound examination, IHE Scheduled Workflow in a simulated clinical IT system, and performance testing with an ultrasound phantom"
equipment:
  - "GE LOGIQ S8"
  - "Kyoto Kagaku N-365 ultrasound phantom"
prerequisites:
  - "GE LOGIQ S8 service and user manual"
  - "Kyoto Kagaku N-365 phantom user manual"
  - "Springer Handbook of Medical Technology Chapter 17 (Ultrasound diagnostics)"
  - "Lecture notes on ultrasound"
duration: "2.5 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Perform an ultrasound examination with optimised image settings, measurements, and analysis
- Document examinations from imaging modalities (ultrasound, X-ray, MR, CT, etc.) in a simulated clinical IT system using the IHE Scheduled Workflow (SWF) standard
- Register a patient in a Hospital Information System, transmit HL7 messages, query a worklist, acquire images, store to PACS, and verify in a DICOM viewer
- Perform a performance test of an ultrasound device using an ultrasound phantom and interpret the results
- Explain common ultrasound image optimisation settings and probe designations

---

## Safety Notes

> **HANDLE WITH CARE.** Ultrasound probes are precision instruments with fragile lenses. Lenses are easily damaged by impact or improper contact. Always secure probe cables in their dedicated holders when not in use.

- The phantom should only come into contact with the lens surface of ultrasound probes.
- Ultrasound gel must always be applied between the probe and the phantom surface before scanning.
- Do not drop, strike, or apply excessive pressure to the probes.
- Clean probes after use following the manufacturer's instructions.
- Scanning a person in the group is voluntary, and consent can be withdrawn at any time.
- Any images acquired of a person in this lab are interpreted as non-valid health data and must not be used for diagnostics in any way.

---

## Equipment Setup

1. Power on the lab PC and verify that HAPI Testpanel (HIS), DCM4CHE (RIS/PACS), and the OHIF-viewer (DICOM viewer) are accessible.
2. Power on the GE LOGIQ S8 and allow it to complete its boot-up sequence.
3. Place the Kyoto Kagaku N-365 ultrasound phantom on the bench. Ensure it is at room temperature and has not been exposed to direct sunlight or extreme heat.
4. Apply a generous layer of ultrasound gel to the scanning surface of the phantom before placing any probe on it.
5. Select a probe on the GE LOGIQ S8 and confirm the device is in imaging mode.

---

## Procedure

### Part 1 — IHE Scheduled Workflow (SWF) (30 min)

The UiS medtek lab has the following components that together form a simulated health IT system:

- **HAPI Testpanel** — Hospital Information System (HIS)
- **DCM4CHE** — Radiological Information System (RIS) / Picture Archiving and Communication System (PACS)
- **GE LOGIQ S8** — Modality
- **OHIF-viewer** — Workstation (DICOM viewer)

The IHE Scheduled Workflow (SWF) integration profile defines how these systems communicate to manage patient examinations from order entry through image review. You will follow this workflow step by step.

**1.1** Open the HIS (HAPI Testpanel) on the lab PC. Enter the patient demographics from the HL7 file provided on Canvas. Send the HL7 message to the RIS (DCM4CHE).

**1.2** On the GE LOGIQ S8, query the RIS for today's worklist. Find the patient you registered in the HIS. Start the examination from the worklist.

**1.3** In your lab notebook, document the SWF workflow you followed. Draw a diagram showing the data flow between HIS, RIS, Modality, PACS, and Workstation. For each step, note the communication standard used (HL7, DICOM Worklist, DICOM Store, DICOM Query/Retrieve).

---

### Part 2 — Phantom Performance Test (70 min)

Perform a performance test of the ultrasound device's probes by following all tests described in the Kyoto Kagaku N-365 phantom user manual. Use Chapter 2 of the GE LOGIQ S8 user manual to see how to optimise image settings. Take images during each test to document results and to track changes over time.

#### 2.1 Axial Resolution

1. Locate the axial resolution test targets in the phantom.
2. Optimise the image settings (frequency, focus, gain) for maximum resolution.
3. Determine the smallest separation between targets that can be resolved.
4. Capture and save the image.

#### 2.2 Angular Resolution

1. Locate the angular resolution test targets in the phantom.
2. Optimise the image settings for this test.
3. Measure and record the angular resolution.
4. Capture and save the image.

#### 2.3 Resolution of Objects at Close Range

1. Locate the near-field resolution targets.
2. Optimise depth, focus position, and gain for near-field imaging.
3. Record the closest range at which targets can be resolved.
4. Capture and save the image.

#### 2.4 Cyst Measurements

1. Locate the cyst targets in the phantom.
2. Measure the depth and diameter of each cyst target.
3. Compare your measurements with the phantom specifications provided in the user manual.
4. Record the measured values and deviations in a table.
5. Capture and save images with measurements visible.

#### 2.5 String Target Interval Measurements

1. Locate the "string targets" in the phantom.
2. Measure the intervals between the targets using the caliper function on the GE LOGIQ S8.
3. Compare the measured values with the phantom specifications. A measurement passes if it is within ±1 mm or ±1% of the specified target separation, whichever is larger. Flag any target that falls outside that and report it to the lab engineer when you present your results.
4. Record all values and deviations in a table.
5. Capture and save images with measurements visible.

---

### Part 3 — Save Examination and Verify in PACS (15 min)

**3.1** On the GE LOGIQ S8, end and save the ultrasound examination. Send the examination to PACS (DCM4CHE).

**3.2** Open the DICOM viewer (OHIF-viewer) on the lab PC and query PACS. Verify that the examination has been received and that all images are present and viewable.

**3.3** Take a screenshot of the examination displayed in the OHIF-viewer and keep it in your lab notebook — you will show it to the lab engineer when you present your results.

---

### Part 4 — Limited Functional Test (20 min)

**4.1** Start a new examination on the GE LOGIQ S8. Perform a limited functional test as described in the service manual, sections 4.3.6.1 to 4.3.6.7. Record the results of each test in your lab notebook.

**4.2** Optionally, one member of the group may volunteer as the subject — read the safety notes before you start. Wipe all phantom gel off the probe, clean the probe face and cable following the manufacturer's instructions, and apply fresh ultrasound gel before the probe touches skin. Scan the carotid artery or the radial artery, practising the image optimisation techniques used in Part 2. Follow ALARA: use the lowest acoustic output that still gives a usable image, keep the displayed MI and TI as low as the image allows, and keep the scan short. Store the examination under the test patient you registered in Part 1 — never under the volunteer's own name — and ask the lab engineer to delete it from PACS before you leave.

---

### Part 5 — Review Questions (15 min)

Answer the following questions in your lab notebook. You will discuss your answers with the group at the end of the session.

1. What do the letter combinations on the 3 ultrasound probes mean? Describe the probe type and intended clinical application for each.

2. Explain what the following settings mean and how each affects the ultrasound image:
   - **Dynamic range**
   - **Cross Beam**
   - **Focus width**
   - **Suppression**
   - **Line density**

3. Why is it important to perform regular performance tests of ultrasound equipment using a phantom? How do the results relate to quality assurance and patient safety?

4. Describe the role of each component in the IHE Scheduled Workflow (HIS, RIS, PACS, Modality, Workstation). Why is standardised communication between these systems important in a hospital?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your measurement tables from the phantom performance test (Parts 2.1–2.5), including the deviations you recorded, and for the string targets in 2.5 whether each measurement meets the ±1 mm / ±1% criterion
- The SWF workflow diagram from Part 1.3 and the stored examination open in the OHIF-viewer (Part 3), so you can trace the patient from HIS through RIS and modality to PACS
- The results of the limited functional test from Part 4.1
- Your answers to the review questions in Part 5

There is no written hand-in.
