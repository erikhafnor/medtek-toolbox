---
title: "Electrosurgery Lab"
course: "MTE200"
description: "Operation, periodic maintenance, and performance testing of an electrosurgical unit"
equipment:
  - "Olympus UES-40 electrosurgical unit"
  - "Fluke QA-ES III Electrosurgery Analyzer"
  - "Keysight InfiniiVision oscilloscope"
  - "RapidVac Smoke Evacuator"
prerequisites:
  - "Fluke QA-ES III Electrosurgery Analyzer documentation"
  - "Olympus UES-40 documentation"
  - "Keysight InfiniiVision oscilloscope documentation"
  - "Lecture notes on electrosurgery"
duration: "3 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Identify the major controls, connectors, and functions of the Olympus UES-40 electrosurgical unit
- Operate the Fluke QA-ES III Electrosurgery Analyzer to perform power output measurements and record crest factors
- Capture and interpret waveforms for different cut and coagulation modes using an oscilloscope
- Test the return electrode monitoring (REM/CQM) system and explain its safety function
- Describe the relationship between waveform characteristics, crest factor, and tissue effects
- Apply safe working practices when operating electrosurgical equipment

---

## Safety Notes

> **BURN HAZARD.** The electrosurgical unit is designed for cutting tissue. Careless use can cause burns. Ensure you do not come into direct or indirect contact with the active electrode while the device is energised.

- To avoid overloading, activate the ESU for less than 10 seconds at a time.
- Settings on the Electrosurgery Analyzer must not be changed while the ESU is activated.
- Keep the active electrode in its holster when not in use.
- Ensure the return electrode is securely connected before energising.
- The smoke evacuator must be running during tissue tests (Part 4) — surgical smoke contains hazardous particles and chemicals.
- If you observe unexpected arcing, sparking, or unusual odour, immediately deactivate the ESU and notify the supervising technician.

---

## Equipment Setup

1. Place the Olympus UES-40 on the bench. Inspect the housing, cables, and connectors for physical damage.
2. Connect the Fluke QA-ES III Electrosurgery Analyzer to the monopolar output of the Olympus UES-40 following the analyser manual.
3. Set the isolation impedance on the Fluke QA-ES III to **400 ohm**.
4. Connect the Keysight InfiniiVision oscilloscope to the waveform output on the Fluke QA-ES III. Set the oscilloscope to an appropriate time base and vertical scale as a starting point (adjust during measurements).
5. Power on all equipment and verify that each device completes its self-test without errors.
6. Position the RapidVac Smoke Evacuator near the test area, but do not turn it on until Part 4.

---

## Procedure

### Part 1 — Familiarisation with Controls and Functions (30 min)

**1.1** Working from the Olympus UES-40 documentation, locate and record the function of each of the following in your lab notebook:

- Power switch and indicator
- Monopolar output connectors (CUT and COAG)
- Return electrode connector and REM/CQM indicator
- Bipolar output connectors
- Mode selector (CUT: PURE, URO, BLEND; COAG: COAG. 1, COAG. 2, SPRAY)
- Power setting controls for CUT and COAG
- Footswitch connectors (CUT pedal and COAG pedal)
- Alarm indicators and audio settings

**1.2** Note: only monopolar functions will be used in this lab. Record which connectors and controls are relevant for monopolar operation.

---

### Part 2 — Power Output Measurements (60 min)

Using the Fluke QA-ES III Electrosurgery Analyzer with isolation impedance set to **400 ohm**, measure the power output and crest factor for each of the following modes and settings. Record all results in a table.

#### 2.1 CUT Modes

| Mode | Set Power | Measured Power (W) | Crest Factor |
|---|---|---|---|
| CUT — PURE | 150 W | | |
| CUT — URO | 150 W | | |
| CUT — BLEND | 125 W | | |

1. Select each mode on the Olympus UES-40 and set the specified power.
2. Activate the ESU (for less than 10 seconds) and read the measured power and crest factor from the Fluke QA-ES III display.
3. Record the results.

#### 2.2 COAG Modes

| Mode | Set Power | Measured Power (W) | Crest Factor |
|---|---|---|---|
| COAG. 1 | 60 W | | |
| COAG. 2 | 60 W | | |
| SPRAY | 60 W | | |

1. Select each coagulation mode and set the specified power.
2. Activate the ESU (for less than 10 seconds) and read the measured power and crest factor.
3. Record the results.

---

### Part 3 — Waveform Documentation and Return Electrode Monitoring (45 min)

#### 3.1 Waveform Capture

For each CUT and COAG mode tested in Part 2, capture the output waveform on the oscilloscope using the waveform output on the Fluke QA-ES III.

1. Adjust the oscilloscope time base and vertical scale so the waveform is clearly visible.
2. Capture or sketch the waveform for each mode.
3. In your lab notebook, briefly describe the purpose and characteristics of each waveform:
   - How does the CUT PURE waveform differ from CUT BLEND?
   - How does the COAG waveform differ from the CUT waveforms?
   - How does SPRAY differ from COAG. 1 and COAG. 2?

#### 3.2 Return Electrode Monitoring (REM/CQM)

1. With the ESU in standby, connect the return electrode normally. Verify the REM/CQM indicator shows a normal state.
2. Simulate a partial detachment of the return electrode (follow the analyser manual for the correct procedure).
3. Record the impedance or condition at which the alarm triggers.
4. Discuss in your lab notebook: what happens if the return electrode partially detaches during surgery? What injury could result, and how does the REM/CQM system prevent it?

---

### Part 4 — Tissue Effect Demonstration (30 min)

> **Turn on the RapidVac Smoke Evacuator before beginning this part.**

**4.1** Using the monopolar functions on the Olympus UES-40, test the different CUT and COAG modes on a porcine specimen. Observe and record the tissue effects on different tissue types:

- Fat tissue
- Vascular tissue
- Tissue near bone

**4.2** For each mode, note:
- The visual and audible characteristics during activation
- The tissue effect (clean cut, charring, desiccation, fulguration)
- How the tissue response changes when you adjust the power setting

---

### Part 5 — Review Questions (15 min)

Answer the following questions in your lab notebook. You will discuss your answers with the group at the end of the session.

1. Explain the difference between CUT and COAG waveforms. How does the crest factor relate to the tissue effect (cutting versus coagulation)?

2. Why is the isolation impedance set to 400 ohm for testing? What does this value represent in a clinical context?

3. What is the purpose of the smoke evacuator, and what are the health hazards of surgical smoke? Reference at least two specific hazardous components.

4. A clinical engineer performing annual maintenance on an ESU measures 180 W output when the device is set to 150 W CUT PURE at 400 ohm. Is this acceptable? What steps should be taken?

5. Explain why monopolar electrosurgery requires a return electrode but bipolar electrosurgery does not. What is the risk if the return electrode contact area is too small?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date
- A completed power measurement table for all modes tested in Part 2, including crest factors
- Waveform sketches or screenshots for each mode (Part 3) with annotations describing the waveform characteristics
- REM/CQM test results and discussion (Part 3.2)
- Tissue effect observations from Part 4
- Written answers to the review questions (Part 5)
- A brief conclusion (200–300 words) discussing whether the ESU meets its specifications and the clinical engineering implications of your findings
