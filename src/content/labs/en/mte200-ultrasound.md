---
title: "Ultrasound Lab"
course: "MTE200"
description: "Ultrasound examination, IHE Scheduled Workflow in a simulated clinical IT system, and performance testing with an ultrasound phantom"
equipment:
  - "GE Logic S8"
  - "Kyoto Kagaku N-365 ultrasound phantom"
prerequisites:
  - "GE Logic S8 service and user manual"
  - "Kyoto Kagaku N-365 phantom user manual"
  - "Springer Handbook of Medical Technology Chapter 17 (Ultrasound diagnostics)"
  - "Lecture notes on ultrasound"
duration: "3 hours"
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

---

## Equipment Setup

1. Power on the lab PC and verify that HAPI Testpanel (HIS), DCM4CHE (RIS/PACS), and the OHIF-viewer (DICOM viewer) are accessible.
2. Power on the GE Logic S8 and allow it to complete its boot-up sequence.
3. Place the Kyoto Kagaku N-365 ultrasound phantom on the bench. Ensure it is at room temperature and has not been exposed to direct sunlight or extreme heat.
4. Apply a generous layer of ultrasound gel to the scanning surface of the phantom before placing any probe on it.
5. Select a probe on the GE Logic S8 and confirm the device is in imaging mode.

---

## Procedure

### Part 1 — IHE Scheduled Workflow (SWF) (45 min)

The UiS medtek lab has the following components that together form a simulated health IT system:

- **HAPI Testpanel** — Hospital Information System (HIS)
- **DCM4CHE** — Radiological Information System (RIS) / Picture Archiving and Communication System (PACS)
- **GE Logic S8** — Modality
- **OHIF-viewer** — Workstation (DICOM viewer)

The IHE Scheduled Workflow (SWF) integration profile defines how these systems communicate to manage patient examinations from order entry through image review. You will follow this workflow step by step.

**1.1** Open the HIS (HAPI Testpanel) on the lab PC. Enter the patient demographics from the HL7 file provided on Canvas. Send the HL7 message to the RIS (DCM4CHE).

**1.2** On the GE Logic S8, query the RIS for today's worklist. Find the patient you registered in the HIS. Start the examination from the worklist.

**1.3** In your lab notebook, document the SWF workflow you followed. Draw a diagram showing the data flow between HIS, RIS, Modality, PACS, and Workstation. For each step, note the communication standard used (HL7, DICOM Worklist, DICOM Store, DICOM Query/Retrieve).

---

### Part 2 — Phantom Performance Test (75 min)

Perform a performance test of the ultrasound device's probes by following all tests described in the Kyoto Kagaku N-365 phantom user manual. Use Chapter 2 of the GE Logic S8 user manual to see how to optimise image settings. Take images during each test to document results and to track changes over time.

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
2. Measure the intervals between the targets using the caliper function on the GE Logic S8.
3. Compare your measured values with the phantom specifications.
4. Record all values and deviations in a table.
5. Capture and save images with measurements visible.

---

### Part 3 — Save Examination and Verify in PACS (15 min)

**3.1** On the GE Logic S8, end and save the ultrasound examination. Send the examination to PACS (DCM4CHE).

**3.2** Open the DICOM viewer (OHIF-viewer) on the lab PC and query PACS. Verify that the examination has been received and that all images are present and viewable.

**3.3** Take a screenshot of the examination displayed in the OHIF-viewer for your lab report.

---

### Part 4 — Limited Functional Test (30 min)

**4.1** Start a new examination on the GE Logic S8. Perform a limited functional test as described in the service manual, sections 4.3.6.1 to 4.3.6.7. Record the results of each test in your lab notebook.

**4.2** Optionally, use a volunteer in the group as a patient. Perform a scan of the carotid artery or radial artery, practising the image optimisation techniques used in Part 2. Save the examination and send to PACS.

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

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- A SWF workflow diagram with documentation of each step and the communication standard used
- Completed measurement tables for all phantom performance tests (Parts 2.1–2.5) with comparison to phantom specifications
- DICOM screenshots from the OHIF-viewer showing the stored examination
- Results from the limited functional test (Part 4)
- Written answers to the review questions (Part 5)
- A brief conclusion (200–300 words) discussing the condition of the ultrasound device based on your tests and the value of the IHE SWF workflow in clinical practice
