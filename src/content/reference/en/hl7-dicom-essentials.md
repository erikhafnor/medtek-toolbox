---
title: "HL7 & DICOM Essentials"
description: "Quick reference for healthcare interoperability standards used in medical device integration"
tags: ["HL7", "DICOM", "interoperability", "IHE", "networking"]
order: 4
---

## HL7 v2.x — Message-Based Integration

HL7 (Health Level Seven) version 2.x is the most widely deployed healthcare messaging standard worldwide. It uses pipe-delimited text messages sent over TCP/IP to exchange clinical, administrative, and financial data between hospital systems.

### Message Structure

An HL7 v2.x message consists of **segments**, each starting with a 3-character identifier. Fields within segments are separated by `|` (pipe). Components within fields use `^` (caret).

```
MSH|^~\&|SENDING_APP|SENDING_FAC|RECEIVING_APP|RECEIVING_FAC|TIMESTAMP||MSG_TYPE|MSG_ID|P|VERSION
```

### Common Message Types

| Type | Trigger | Use Case |
|---|---|---|
| **ADT^A01** | Patient admission | Register patient in the system, assign bed |
| **ADT^A02** | Patient transfer | Update patient location (ward/bed change) |
| **ADT^A03** | Patient discharge | Close the encounter |
| **ORU^R01** | Observation result | Vital signs from monitors, lab results |
| **ORM^O01** | Order message | Physician orders (lab, radiology, pharmacy) |
| **SIU^S12** | Schedule information | Appointment scheduling |
| **MDM^T02** | Document management | Clinical documents |

### Key Segments

| Segment | Name | Contains |
|---|---|---|
| **MSH** | Message Header | Sending/receiving systems, message type, version, timestamp |
| **PID** | Patient Identification | Name, MRN, DOB, gender, address |
| **PV1** | Patient Visit | Ward, bed, attending physician, visit number |
| **OBR** | Observation Request | Order information, test type, timestamps |
| **OBX** | Observation Result | Individual measurement (HR, BP, SpO₂, lab value) |
| **EVN** | Event | Trigger event details |
| **NK1** | Next of Kin | Emergency contact information |

### OBX Segment — The Vital Signs Carrier

The OBX segment carries individual observations. For patient monitors, each vital sign is a separate OBX:

```
OBX|1|NM|HR^Heart Rate^LN||78|bpm|60-100||||F
```

| Position | Content | Example |
|---|---|---|
| OBX-1 | Set ID | 1 |
| OBX-2 | Value type | NM (numeric) |
| OBX-3 | Observation identifier | HR^Heart Rate^LN |
| OBX-5 | Value | 78 |
| OBX-6 | Units | bpm |
| OBX-7 | Reference range | 60-100 |
| OBX-11 | Status | F (final) |

---

## DICOM — Medical Imaging Standard

DICOM (Digital Imaging and Communications in Medicine) is the universal standard for medical images. It defines both the file format and the network protocol for transmitting images between modalities, PACS, and viewing workstations.

### DICOM File Structure

A DICOM file contains:
- **Header** — Structured metadata in tag-value pairs (patient info, study info, acquisition parameters)
- **Pixel data** — The actual image data

### Key DICOM Tags

| Tag | Name | Example |
|---|---|---|
| (0010,0010) | Patient Name | HANSEN^ANNA^M |
| (0010,0020) | Patient ID | PAT12345 |
| (0010,0030) | Patient Birth Date | 19520415 |
| (0008,0020) | Study Date | 20260325 |
| (0008,0060) | Modality | CT, MR, US, CR, DX |
| (0008,0070) | Manufacturer | GE MEDICAL SYSTEMS |
| (0008,0080) | Institution Name | Stavanger University Hospital |
| (0020,000D) | Study Instance UID | 1.2.840.113619... (unique study ID) |
| (0020,000E) | Series Instance UID | 1.2.840.113619... (unique series ID) |
| (0028,0010) | Rows | 512 |
| (0028,0011) | Columns | 512 |
| (0028,0030) | Pixel Spacing | 0.5\0.5 (mm) |
| (0028,1050) | Window Center | 40 |
| (0028,1051) | Window Width | 400 |

### DICOM Network Services (DIMSE)

| Service | Function |
|---|---|
| **C-STORE** | Send an image from one system to another |
| **C-FIND** | Query a PACS for studies matching criteria |
| **C-MOVE** | Request PACS to send images to a destination |
| **C-ECHO** | Verify DICOM connectivity (like network ping) |
| **N-EVENT-REPORT** | Notify about status changes (print jobs, storage commit) |

### DICOM Workflow Example

```
1. CT scanner acquires images → C-STORE → PACS
2. Radiologist opens viewer → C-FIND (query by patient ID) → PACS returns study list
3. Radiologist selects study → C-MOVE → PACS sends images to viewing workstation
4. Radiologist views images and creates report
```

---

## IHE — Making Standards Work Together

IHE (Integrating the Healthcare Enterprise) is not a standard itself — it's a framework that defines **integration profiles** specifying how HL7, DICOM, and other standards should be used together to solve specific clinical workflows.

### Key IHE Profiles for Clinical Engineering

| Profile | Domain | What It Solves |
|---|---|---|
| **SWF** (Scheduled Workflow) | Radiology | Order-to-image workflow: order in RIS → worklist on modality → images to PACS → report in RIS |
| **PIR** (Patient Information Reconciliation) | IT Infrastructure | Correcting patient ID mismatches across systems |
| **DEC** (Device Enterprise Communication) | Patient Care Devices | How bedside devices (monitors, ventilators) communicate vitals to the EHR |
| **ACM** (Alarm Communication Management) | Patient Care Devices | How device alarms are forwarded to nurse call systems and mobile devices |
| **ATNA** (Audit Trail and Node Authentication) | IT Infrastructure | Security audit logging for medical device network access |

---

## Network Architecture for Medical Devices

### Typical Hospital Network Zones

| Zone | Contents | Security Level |
|---|---|---|
| **Clinical VLAN** | EHR workstations, clinical applications | High — authenticated access |
| **Medical Device VLAN** | Patient monitors, ventilators, infusion pumps | Medium-High — isolated from internet, device-specific firewall rules |
| **Imaging VLAN** | PACS, modalities (CT, MRI, US) | High — large data volumes, DICOM traffic |
| **Guest/Public** | Patient WiFi, visitor access | Low — fully isolated from clinical systems |

### Clinical Engineering's Role in Network Integration

- **Device provisioning:** Configure IP addresses, VLAN assignments, HL7/DICOM parameters
- **Interface testing:** Verify messages flow correctly between devices and receiving systems
- **Cybersecurity:** Participate in device vulnerability assessment, patch management, and incident response
- **Change management:** Coordinate device software updates with IT to prevent service disruption
- **IEC 80001-1 compliance:** Participate in risk management for IT networks incorporating medical devices

---

## Common Integration Problems

| Problem | Cause | Clinical Engineering Action |
|---|---|---|
| Vital signs not appearing in EHR | HL7 interface down, message format mismatch, network connectivity | Check HL7 port connectivity, examine message logs, verify OBX mapping |
| Wrong patient data on monitor | ADT feed not updating, patient ID mismatch | Verify ADT message flow, check PID segment mapping, involve IT |
| DICOM images not reaching PACS | C-STORE association rejected, AE title mismatch, firewall blocking | Verify AE titles match on both ends, check DICOM port (104), test with C-ECHO |
| Alarm notifications not forwarded | ACM profile misconfigured, network latency | Check alarm forwarding rules, verify middleware connectivity |
| Device offline after network change | IP conflict, VLAN change, firewall rule update | Verify device network config, coordinate with IT before network changes |
