---
title: "Lab Assignment in HL7 and DICOM"
course: "MTE210"
shortTitle: "HL7 & DICOM"
description: "A standardised patient examination workflow through a simulated clinical IT system, following IHE Scheduled Workflow"
equipment:
  - "HAPI TestPanel (HIS) on the lab PC"
  - "DCM4CHE RIS/PACS (pacs.ux.uis.no)"
  - "GE LOGIQ S8 (the modality)"
  - "Kyoto Kagaku N-365 ultrasound phantom"
prerequisites:
  - "Lecture notes on Healthcare IT"
duration: "2 hours 45 minutes"
---

## Purpose

To carry out a standardised workflow for patient examinations from imaging modalities (ultrasound, X-ray, MR, CT and so on) in a simulated clinical IT system, following the Integrating the Healthcare Enterprise (IHE) standard.

---

## Safety Notes

> **Take care with the administrator tools in DCM4CHE PACS.** You are working in a shared teaching archive — deleting or reconfiguring affects every group.

---

## Equipment Setup

All the software is already installed on the lab PC. Check that you have access to:

| Software | Role in the workflow | Address |
|---|---|---|
| HAPI TestPanel | Hospital information system (HIS) | Local, on the lab PC |
| DCM4CHE | Radiology information system (RIS) and image archive (PACS) | pacs.ux.uis.no |
| GE LOGIQ S8 | The modality — the imaging device | In the lab, already connected to the PACS |

The ultrasound system is already set up against the RIS and PACS. You will not configure it, but you will look at how it is configured in Part 5.

---

## Procedure

### Part 1 — The simulated health IT system

This lab introduces you to the standard used for patient data flow in healthcare, **Scheduled Workflow (SWF)**. The UiS medtek lab has the following components, which together make up a simulated health IT system:

- **HAPI TestPanel** — hospital information system (**HIS**)
- **DCM4CHE** — radiology information system (**RIS**) and picture archiving and communication system (**PACS**)
- **GE LOGIQ S8** — the **modality**: the imaging device that pulls the worklist and produces the images

Through the rest of the lab you will follow the workflow between these three. The Scheduled Workflow diagram is on the [IHE wiki](https://wiki.ihe.net/index.php/Scheduled_Workflow) — study it before going further, and find our four components in it.

---

### Part 2 — Connect the HIS to the PACS

**2.1** Open the **HIS** (HAPI TestPanel) on the lab PC.

**2.2** Configure an HL7 connection between HAPI TestPanel and DCM4CHE PACS by clicking the **"+"** symbol next to "sending connections".

**2.3** Find which port to use. It is in the PACS web interface under *Configurations → HL7 Applications*.

**2.4** Enter **152.94.160.77** as the host — this is the IP address of the PACS.

**2.5** Test the connection by clicking **start**, and check that you receive an **"AA"** message back from the PACS. AA stands for *Application Accept*: the PACS is confirming that it received and accepted the message.

---

### Part 3 — Order an examination with HL7

You will now enter a test patient into the system using the HL7 standard.

A short note on the segments in the message you are about to use:

| Segment | Contents |
|---|---|
| **MSH** | Message header information, such as sender and receiver |
| **PID** | Patient identification information |
| **ORC** | Common order information — including the accession number |
| **OBR** | Information about the examination being ordered |
| **ZDS** | The Study Instance UID, tying the order to the images that arrive later |
| **ZIP** | Helse Vest's own segment for order identifiers |

**3.1** The HL7 message we use as a basis comes from Helse Vest's HIS. Copy the message below and paste it into the text field in HAPI TestPanel.

```text
MSH|^~\&|ADHOCBOOKING_VIA_XTRAY|SENDING_FACILITY|XTRAY|RECEIVING_FACILITY|20240808130111||ORM^O01|K3LGVMMKRKCZHJ20|P|2.3
PID|||14019800513||Danser^Folke (Testpasienten)||19980114|M
ORC|NW||HV-R0MD1CKX6||SC
OBR||||SFY0HK^Ekkokardiografi^^SFY0HK^Ekkokardiografi^XTRAY^^1.0~SFY0HK Ekkokardiografi|||20240808130111||||||||^^^HJERTE|114273^Kardiologisk Avdeling (Stavanger/Egersund)^^^^^^^RESHID^DEPARTMENT||ULINT1USUS^US^Ultralydapparat intensivavdelingen 2M^RESURSID&DIPS||30^IKKE SENSITIV^HV^NORMAL^^CONFIDENTIALITY CODE||||US||||||||||||||^^^^30^KLINISK^HV TILGANGSKATEGORI
ZDS|1.2.752.48.4.1.2.665.20240808.378290079.17207388184^XTRAY^Application^DICOM
NTE||XTRAY ADHOC|Custom segment ZIP based on the Imaging Procedure Control Segment (IPC) from v2.5
ZIP|HV-R0MD1CKX6|HV-R0MD1CKX6|1.2.752.48.4.1.2.665.20240808.378290079.17207388184|HV-R0MD1CKX6
```

**3.2** To make the message unique, you need to change some fields. Every group must have its own patient and its own examination, or you will collide in the PACS. Make the following changes:

| Field | Currently | Change to |
|---|---|---|
| MSH-7 | `20240808130111` | Today's date |
| PID-3 | `14019800513` | A pseudo patient ID |
| PID-5 | `Danser^Folke (Testpasienten)` | A pseudo name |
| PID-7 | `19980114` | A date of birth matching the patient ID |
| PID-8 | `M` | One of the patient sex values: F, M, O, U, A, N |
| ORC-3 | `HV-R0MD1CKX6` | Replace the last 3 letters with 3 other letters |
| OBR-7 | `20240808130111` | Today's date |
| ZDS-1 | `1.2.752…17207388184` | Replace the last 2 digits with 2 other digits |
| ZIP-3 | `1.2.752…17207388184` | The same 2 digits you chose in ZDS-1 |
| ZIP-1, 2 and 4 | `HV-R0MD1CKX6` | The same 3 letters you entered in ORC-3 |

> **Note:** ORC-3 and ZIP-1/2/4 are the accession number and must match each other. ZDS-1 and ZIP-3 are the Study Instance UID and must also match — it is that UID the modality later uses to attach its images to the right order. If they do not line up, the images land in the PACS without being tied to the order.

**3.3** Once the changes are made, send the message to the PACS by clicking **"Send"** at the top of the menu bar.

---

### Part 4 — Find the order in the worklist

**4.1** Open the PACS in your browser and check whether you can find the ordered patient under *Navigation → MWL*. Remember to select **WORKLIST** in the dropdown, and click **SUBMIT** to query the patient list.

**4.2** If the patient is not there, go back to Part 3 and check that the message was actually accepted (the AA response) and that the fields you changed are still valid.

**4.3** Then go to the **GE LOGIQ S8** in the lab.

---

### Part 5 — Perform the examination on the GE LOGIQ S8

Every imaging device has to be set up and configured against the RIS and the PACS. This is one of the many jobs of a clinical engineer in a hospital. The system in the lab is already configured, but you will see how before you use it.

**5.1** Find the DICOM configuration on the LOGIQ S8 and note how it is set up against the archive: the **AE title**, **IP address** and **port** for the PACS, and the system's own AE title. Compare them with what you found in the PACS web interface in Part 2. Use the LOGIQ S8 user manual if you cannot find the menu entries.

**5.2** Bring up the **Modality Worklist** on the system and search for the patient you entered. If it is not there, check that the order really is in the MWL (Part 4) and that the system is querying the right AE title.

**5.3** **Select the patient from the worklist** — do not type the patient details in by hand. This is the whole point of Scheduled Workflow: the patient ID, name and Study Instance UID come across from the order, so the images land on the right patient and the right study without anyone re-entering them. Manual entry at the modality is one of the most common sources of mismatched images in clinical practice.

**5.4** Apply ultrasound gel to the **Kyoto Kagaku N-365 phantom**, select a probe and perform a short examination. Store at least three images. Image quality is not the point here — tying the images to the right order is.

> If you scan each other instead of the phantom, the same rules apply as in the MTE200 ultrasound lab: it is voluntary, consent can be withdrawn at any time, and the measurements are not valid health data.

**5.5** End the examination on the system (**End Exam**) so the images are sent to the PACS.

---

### Part 6 — Verify in the PACS

To verify that the workflow is complete, find your own study again in **DCM4CHE PACS** at **pacs.ux.uis.no**.

**6.1** Log in to the PACS web interface and search for the study — by the patient ID or the name you entered in Part 3, for instance.

**6.2** Check that the images sit on the **right patient**: the same patient ID, name and date of birth as in your HL7 message, and not on another group's patient.

**6.3** Check that the **Study Instance UID** on the study is the one you set in ZDS-1 and ZIP-3 in Part 3. If it matches, the order from the HIS and the images from the modality have found each other, and the data has travelled the whole way: HIS → RIS/PACS → modality → PACS.

**6.4** If the images turn up under a different patient, or as a study of their own with no link to the order, go back and work out where the link broke. It is usually either manual entry at the modality instead of selecting from the worklist (Part 5.3), or UIDs that were not consistent in the HL7 message (Part 3.2).

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- The HL7 connection from Part 2, and the AA response from the PACS showing the message was accepted
- Your own edited HL7 message from Part 3 and which fields you changed — in particular why the accession number and the Study Instance UID have to stay consistent across ORC, ZDS and ZIP
- Your order in the worklist, both in the PACS (Part 4) and on the LOGIQ S8 (Part 5.2), and how the system is configured against the archive (Part 5.1)
- The examination you performed on the system (Part 5.4), and why the patient must be selected from the worklist rather than typed in by hand
- Your own patient and study found again in the PACS (Part 6), with a Study Instance UID matching the one you set in Part 3 — and the route the data took through the three components

There is no written hand-in.
