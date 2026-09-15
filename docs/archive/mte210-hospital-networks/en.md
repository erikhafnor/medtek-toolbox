---
title: "Hospital Networks and Medical Device Integration Lab"
course: "MTE210"
shortTitle: "HL7 & DICOM"
description: "HL7 messaging, DICOM image transfer, and network integration of medical devices"
equipment:
  - "HAPI Testpanel (HL7 v2.x test environment, on the lab PC)"
  - "DCM4CHE RIS/PACS (teaching image archive)"
  - "OHIF-viewer (DICOM viewer, on the lab PC)"
  - "Network analysis tools (Wireshark)"
  - "Lab workstations with Ethernet connections"
prerequisites:
  - "Lecture notes on health informatics and interoperability standards"
  - "Basic networking knowledge (TCP/IP, ports, client-server model)"
  - "Introduction to HL7 and DICOM from course lectures"
duration: "2 hours 45 minutes"
---

## Learning Objectives

By the end of this lab you will be able to:

- Explain the role of HL7 and DICOM in hospital information systems
- Read and interpret an HL7 v2.x ADT (Admit-Discharge-Transfer) message
- Identify the key segments in an HL7 ORU (Observation Result) message from a patient monitor
- Use a DICOM viewer to examine DICOM metadata (patient ID, study information, modality)
- Capture and analyse HL7 network traffic using Wireshark
- Describe the role of clinical engineering in medical device network integration and cybersecurity

---

## Background

### HL7 (Health Level Seven)

HL7 is the most widely used messaging standard for exchanging clinical data between hospital information systems. Version 2.x uses pipe-delimited text messages sent over TCP/IP. Common message types include:

- **ADT** (Admit-Discharge-Transfer) — Patient demographics and location
- **ORU** (Observation Result Unsolicited) — Lab results, vital signs from monitors
- **ORM** (Order Message) — Orders from clinicians to lab/radiology

### DICOM (Digital Imaging and Communications in Medicine)

DICOM is the standard for storing, transmitting, and displaying medical images (X-ray, CT, MRI, ultrasound). A DICOM file contains both the image data and structured metadata (patient ID, study date, modality, acquisition parameters).

### IHE (Integrating the Healthcare Enterprise)

IHE provides implementation profiles that specify exactly how HL7 and DICOM should be used together to solve specific clinical workflows (e.g., order-to-image workflow, patient identification).

---

## Procedure

### Part 1 — Reading HL7 Messages (45 min)

**1.1** Examine the following HL7 v2.x ADT message (provided in your lab handout or on screen):

```
MSH|^~\&|ADT_SYSTEM|HOSP|MONITOR_SYS|ICU|20260325120000||ADT^A01|MSG00001|P|2.5
EVN|A01|20260325120000
PID|1||PAT12345^^^HOSP^MR||HANSEN^ANNA^M||19520415|F|||BREIGATA 12^^STAVANGER^^4006^NO
PV1|1|I|ICU^BED-03^^HOSP||||DR001^NILSEN^OLE|||MED|||||||||V12345|||||||||||||||||||||||||20260325120000
```

In your lab notebook, decode each segment and field:
- **MSH:** Identify sending/receiving systems, message type, version
- **PID:** Identify patient name, ID, date of birth, gender, address
- **PV1:** Identify patient class, location (ward/bed), attending physician, visit number

**1.2** Examine the following ORU message (vital signs from a patient monitor):

```
MSH|^~\&|MONITOR|ICU|HIS|HOSP|20260325121500||ORU^R01|MSG00042|P|2.5
PID|1||PAT12345^^^HOSP^MR||HANSEN^ANNA^M
OBR|1||ORD001|VITALS|||20260325121500
OBX|1|NM|8867-4^Heart rate^LN||78|bpm|60-100||||F
OBX|2|NM|59408-5^Oxygen saturation in Arterial blood by Pulse oximetry^LN||96|%|90-100||||F
OBX|3|NM|8480-6^Systolic blood pressure^LN||134|mmHg|90-140||||F
OBX|4|NM|8462-4^Diastolic blood pressure^LN||82|mmHg|60-90||||F
OBX|5|NM|8310-5^Body temperature^LN||37.2|Cel|36.0-38.0||||F
```

Decode:
- What vital signs are reported, and what are their values?
- What are the reference ranges?
- Which patient do these readings belong to?
- What is the "F" flag in the OBX segments?

**1.3** Answer: If the SpO₂ reading were 88% instead of 96%, which field would change? Would the HL7 message structure change, or just the value?

---

### Part 2 — HL7 Network Traffic Analysis (45 min)

**2.1** On your lab workstation, open Wireshark and start capturing on the Ethernet interface.

**2.2** The lab supervisor triggers a series of HL7 messages between the test HL7 server and a client application. The client runs on **your own workstation**, so the messages pass through the interface you are capturing on. (On a switched network a workstation only sees traffic addressed to itself — to capture traffic between two other hosts, the supervisor must first enable port mirroring on the lab switch, or your capture will stay empty.)

**2.3** In Wireshark, filter for HL7 traffic:
- Filter by the HL7 port (typically TCP port 2575): `tcp.port == 2575`
- Locate the HL7 messages in the packet list
- Select a packet and examine the HL7 payload in the packet detail pane

**2.4** In your notebook, answer:
- What transport protocol does HL7 v2.x use? (TCP or UDP?)
- Is the HL7 message encrypted in transit? What are the security implications?
- How could a clinical engineer verify that a patient monitor is sending correct HL7 data to the central station?

---

### Part 3 — DICOM Image Exploration (45 min)

**3.1** Open the OHIF-viewer — the lab's DICOM viewer, the same one used in the ultrasound lab — on your lab workstation.

**3.2** Load the provided sample DICOM dataset (a set of anonymised medical images from the teaching archive).

**3.3** For each image series, examine the DICOM header and record:

| Field | Value |
|---|---|
| Patient Name (0010,0010) | |
| Patient ID (0010,0020) | |
| Study Date (0008,0020) | |
| Modality (0008,0060) | |
| Manufacturer (0008,0070) | |
| Institution Name (0008,0080) | |
| Pixel Spacing (0028,0030) | |
| Window Center/Width (0028,1050/1051) | |

**3.4** Change the window/level settings in the viewer. Observe how the displayed image changes. Explain in your notebook what Window Center and Window Width control and why they are clinically important.

**3.5** Answer: If you received a DICOM study where the Patient ID in the DICOM header did not match the patient ID in the hospital system (RIS/PACS), what would be the clinical risk and what steps would you take?

---

### Part 4 — Integration Challenges and Cybersecurity (30 min)

This is a discussion-based section. Working in your lab group, discuss and record your answers:

**4.1** A new patient monitor is being installed in the ICU. List the steps a clinical engineer would take to integrate it with the hospital's central monitoring system and the electronic health record (EHR), including:
- Network configuration (IP, VLAN, firewall rules)
- HL7 interface configuration (message types, receiving system)
- Testing and validation before going live
- Ongoing monitoring

**4.2** The hospital's IT security team reports that a patient monitor on the network has been detected communicating with an unexpected external IP address. As a clinical engineer, what is your response? Consider:
- Immediate actions (patient safety vs. investigation)
- Who you notify
- How you investigate
- What **IEC 80001-1:2021** (*Application of risk management for IT-networks incorporating medical devices — Part 1: Safety, effectiveness and security in the implementation and use of connected medical devices or connected health software*) says about risk management for networked medical devices — check that you are reading the 2021 edition, which replaced and restructured the 2010 edition (titled *Roles, responsibilities and activities*), because older lecture material still points at the withdrawn one

**4.3** Discuss the tension between medical device availability (the device must work 24/7) and cybersecurity (the device should be patched and updated). How would you approach a situation where a critical ventilator runs an operating system that is no longer supported with security patches?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your decoded HL7 messages from Part 1 — the segments and fields of the ADT message (1.1), the vital signs, reference ranges and result status in the ORU message (1.2), and your answer to 1.3
- Your Wireshark capture of the HL7 traffic (2.1–2.2), the display filter you used to find it (2.3), and your answers to 2.4
- The DICOM header table you filled in for each image series (3.3), what changing Window Center and Window Width did to the image (3.4), and your answer to 3.5 on a mismatched patient ID
- The answers your group reached on the discussion questions in Part 4 (4.1–4.3)

There is no written hand-in.
