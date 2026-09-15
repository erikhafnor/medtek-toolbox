---
title: "Electrical Safety Testing Lab"
course: "MTE210"
shortTitle: "Electrical Safety"
description: "A periodic electrical safety test of a LIFEPAK 20e with the Fluke ESA615, to IEC 62353 and the manufacturer's own inspection procedure"
equipment:
  - "LIFEPAK 20e defibrillator/monitor"
  - "Fluke ESA615 Electrical Safety Analyzer"
  - "ECG patient cable (3- or 5-lead) for the LIFEPAK 20e"
  - "Test leads and an alligator clip for the ground stud"
prerequisites:
  - "LIFEPAK 20/20e service manual, the Performance Inspection Procedure chapter"
  - "Fluke ESA615 users manual"
  - "Reference: IEC 60601-1 Essentials (on this site)"
  - "Reference: Leakage Current Measurement Guide (on this site)"
duration: "2 hours 45 minutes"
---

## Purpose

To carry out a complete periodic electrical safety test of one device — a **LIFEPAK 20e defibrillator/monitor** — using the **Fluke ESA615**, and to understand why the same device produces different numbers depending on which standard, which method and which supply system you measure under.

---

## Learning Objectives

After this lab you will be able to:

- Classify a device (protection class and applied part type) from its service manual
- Choose the correct leakage current method using the IEC 62353 flowchart, and justify the choice
- Measure protective earth resistance with the correct test current, and judge the result against several limits
- Measure equipment leakage and applied part leakage current to IEC 62353
- Work through the manufacturer's own Performance Inspection Procedure for the LIFEPAK 20e and compare it with IEC 62353
- Explain why the measurements change between an IT supply and a TN supply, and what that means for passing a device
- Document a test so that someone else can check it

---

## Safety Notes

> **SHOCK HAZARD.** These tests energise the device at mains voltage with protective earth interrupted, and the isolation test (ISO TEST / MAP) puts mains voltage onto the ECG connections. **Do not touch the ECG snaps on the ESA615, the patient cable, or the device connections while a test is running.**

- Read the warning in the service manual before you start: a test performed incorrectly can let excessive leakage current pass undetected. Get familiar with the ESA615 before you connect the patient cable.
- The LIFEPAK 20e is a defibrillator. Do not charge or discharge it in this lab — only electrical safety is being tested here. Leave the energy controls alone.
- When switching between normal and reversed polarity on the analyser, pause in the centre (off) position on the way.
- The device must sit on a dry, insulated surface with no earth connection other than its power cord. An additional earth connection invalidates the direct method (see Part 1).
- Report any equipment damage or unexpected behaviour to the supervising technician.

---

## Background — two standards, one device

**The Norwegian regulation on handling medical devices, § 11**, requires maintenance to be planned, systematic and based on the device's own instructions and a risk assessment, and requires that the work carried out is documented. That duty is what your test discharges.

Two standards meet in this lab:

- **IEC 60601-1** is the product standard. It applies when equipment is designed and type-approved, and it defines many separate leakage current measurements. The manufacturer's inspection procedure for the LIFEPAK 20e is built on it.
- **IEC 62353** is the standard for *periodic testing and testing after repair*. It exists because 60601-1 is poorly suited to repeated testing out in the departments, and it reduces the work to **two** leakage measurements. It is not mandatory in Norway, but it is adopted by the Norwegian Electrotechnical Committee as **NEK IEC 62353:2014**.

IEC 62353 does not replace IEC 60601-1 — it checks equipment that was already built to it.

> The background and structure of this lab draw on course material on IEC 62353 and the Fluke ESA615 by **Frode Knudsen, Nordic Service Group Norway AS**, used in teaching by agreement.

---

## Equipment Setup

1. Place the LIFEPAK 20e on the bench, on a dry, insulated surface. Check that it has no earth connection other than its own power cord.
2. Connect the ESA615 to an earthed mains socket. It runs a self-test at power-up — read the message it gives before continuing (you will come back to it in Part 6).
3. Connect the LIFEPAK 20e power cord to the **DUT outlet** on the ESA615.
4. Have the LIFEPAK 20/20e service manual to hand. You will read the limits out of it yourself.
5. Do not connect the ECG patient cable yet — that comes in Part 4.

---

## Procedure

### Part 1 — Classification and choice of test method (20 min)

Everything else in this lab follows from this step. IEC 62353 says to start with the service manual.

**1.1** Look up the LIFEPAK 20/20e service manual and record in your lab notebook:

| Question | Answer | Where you found it |
|---|---|---|
| Protection class (I or II)? | | |
| Applied part type for ECG (B, BF or CF)? | | |
| Applied part type for SpO₂ (if fitted)? | | |
| Is the power cord fixed or detachable? | | |
| Which limits does the manual itself state? | | |

> **Hint:** if you cannot find the class stated directly, look at which tests the manual asks for. A ground resistance test is only performed on Class I equipment. And the limits for the ECG leads tell you the applied part type — compare them with the table on the leakage current reference page.

**1.2** Use the IEC 62353 flowchart (Table A.2 / Flowchart B.2) to choose the measurement method. Answer both questions and justify them:

1. **Can the device be isolated from earth?**
   - Yes → direct method
   - No → differential or alternative method
2. **Does the device have active components in its power supply** (switch-mode supply, relays, isolating transformer)?
   - Yes → direct or differential method
   - No → alternative method

**1.3** Conclude: which method will you use on the LIFEPAK 20e, and which method is **ruled out**? Write down the reasoning — you will explain it at approval.

**1.4** Why does the result come out artificially low if the device has an additional earth connection and you use the direct method anyway? Draw the current path in your lab notebook.

---

### Part 2 — Visual inspection (15 min)

IEC 62353 clause 5.2. This is the test that most often finds the real fault, and it takes two minutes.

**2.1** Work over the device and note any defects:

- Housing and screen: cracks, impact damage, missing parts
- Power cord and plug: cuts, deformation, loose strain relief, heat damage
- ECG patient cable and leads: cracked insulation, corroded contacts, breaks at the strain relief
- Pad/paddle connection and accessories
- Markings: are the rating plate and the class and type symbols still legible?
- Battery: condition, properly seated?
- Any sign of liquid ingress or overheating?

**2.2** Switch the device on and confirm that it completes its power-on sequence and that the **Service indicator is off**. A device that is itself reporting a service need should not be passed without establishing why.

---

### Part 3 — Protective earth resistance (25 min)

IEC 62353 clause 5.3.2. The device is **switched off** for this test.

**3.1** Null the test leads on the ESA615 (the NULL function) before measuring. Without nulling you are measuring your own lead as well as the device, and at these values that matters.

**3.2** Check the settings against the IEC 62353 requirement: the test current must be **at least 200 mA**, and the test voltage must **not exceed 24 V**.

**3.3** Measure from the earth pin of the plug to the ground stud on the LIFEPAK 20e. Then measure to at least two other accessible conductive parts that are bonded to protective earth.

**3.4** **Flex and gently pull the power cord while measuring.** A broken earth conductor often gives a fine reading at rest and a bad one in motion. Note whether the reading is unstable.

**3.5** Record the measurements and judge them against all three limits:

| Measurement point | Measured (mΩ) | Stable while flexing? |
|---|---|---|
| Ground stud | | |
| Other conductive part 1 | | |
| Other conductive part 2 | | |

| Limit | Source |
|---|---|
| **300 mΩ** (detachable cord: 200 mΩ internal + 100 mΩ cord) | IEC 62353 |
| **200 mΩ** | IEC 60601-1 |
| **0.5 Ω = 500 mΩ** | LIFEPAK 20/20e service manual |

**3.6** The three limits are not the same. Which do you apply for a periodic test in Norway, and why? What do you do if the device passes the manual's limit but fails the 62353 limit? Write the answer down — it is one of the approval questions.

---

### Part 4 — Leakage current to IEC 62353 (35 min)

IEC 62353 clause 5.3.4. Where IEC 60601-1 has six or seven different leakage measurements, IEC 62353 has only **two**: equipment leakage current and applied part leakage current. Use the method you chose in Part 1.

**4.1** Connect the ECG patient cable from the LIFEPAK 20e to the ECG/patient connections on the ESA615.

**4.2** Measure **equipment leakage current**. With the direct method the device is energised at mains voltage and the analyser interrupts protective earth. Measure in **normal and reversed** polarity and record the **highest** value.

**4.3** Measure **applied part leakage current** on the ECG leads, again in both polarities.

**4.4** Record the results:

| Measurement | Normal (µA) | Reversed (µA) | Highest (µA) | Limit | Pass? |
|---|---|---|---|---|---|
| Equipment leakage current | | | | 500 µA (Class I, direct) | |
| Applied part leakage, ECG | | | | see 4.5 | |

**4.5** The applied part limit depends on the applied part type you found in Part 1: **50 µA for Type CF**, **5000 µA for Type BF**. Which applies to the ECG input on the LIFEPAK 20e? What would the consequence have been if you had applied the wrong one?

> **Note:** had you chosen the alternative method, the equipment leakage limit would have been 1000 µA (Class I) rather than 500 µA. The limit follows the method. That is one reason you must always document which method you used.

---

### Part 5 — The manufacturer's inspection procedure (40 min)

Now make the same measurements the way the **LIFEPAK 20/20e service manual** requires them. The manual is built on IEC 60601-1 and AAMI/ANSI DF2/DF39, and it splits the work into several separate measurements with their own limits.

In the manual's language:

- **Normal Condition (N.C.)** — mains applied in normal *or* reversed polarity, with protective earth **intact**
- **Single Fault Condition (S.F.C.)** — the same, but with protective earth **interrupted** (LIFT GND)

Measure in both normal and reversed polarity throughout, and record the highest value.

**5.1 Chassis leakage.** Analyser clip on the ground stud, device on.

| Condition | Measured (µA) | Limit |
|---|---|---|
| N.C. (earth intact) | | < 90 µA |
| S.F.C. (LIFT GND) | | < 450 µA at 240 V |

**5.2 Earth leakage.**

| Condition | Measured (µA) | Limit |
|---|---|---|
| Neutral closed | | < 450 µA |
| Neutral open | | < 900 µA |

**5.3 ECG lead leakage, lead to ground (Lead – Gnd), all leads.**

| Condition | Measured (µA) | Limit |
|---|---|---|
| N.C. | | < 10 µA |
| S.F.C. (LIFT GND) | | < 50 µA |

**5.4 ECG lead leakage, lead to lead (Lead – Lead).** Repeat for RA, LA and LL — and for RL and C if the device is 5-lead. Same limits as 5.3.

**5.5 Lead isolation test (Lead Iso / MAP).** **Switch the device off first.**

> **SHOCK HAZARD.** During this test mains voltage is present on the ECG snaps of the analyser. Do not touch the snaps, the patient cable or the device connections while ISO TEST is pressed.

Press ISO TEST momentarily, read the value, and release. Limit: **< 45 µA**.

**5.6** Compare Parts 4 and 5 in your lab notebook:

- How many measurements did IEC 62353 require? How many did the manual require?
- Did the two approaches agree about whether the device is safe?
- If the device had failed one but not the other — what would you do, and what would you write in the report?

---

### Part 6 — IT supply, TN supply and documentation (20 min)

**6.1** Go back to the message the ESA615 gave during its self-test at setup. On an **IT supply** the analyser typically reports:

> Fault detected… No ground or isolated mains detected.

Why does that message appear on an IT supply, and does it mean the analyser is faulty? Explain it from the difference between the systems:

- **IT supply** (Isolated Terra): the transformer star point is not earthed. The most common system in Norway. 230 V between phases, with no distributed neutral. It tolerates a first earth fault without the system collapsing.
- **TN supply** (Terra Neutral): a PEN conductor runs from the transformer and splits into PE and N at the distribution board. Dominant in the rest of Europe, and common in newer Norwegian installations.
- **IT-M** (IT Medical) is required in all **Group II** medical rooms — operating theatres and similar — with an isolating transformer and insulation monitoring.

**6.2** The same device, the same analyser and the same measurement (direct equipment leakage, limit 500 µA) give different numbers on the two systems:

| Supply | Normal polarity, earth open | Reversed, earth open |
|---|---|---|
| IT supply | 78.7 µA | 79.1 µA |
| TN supply | 122.8 µA | 122.3 µA |

Both pass. But the value is nearly **twice as high** on the TN supply. What follows from that for which supply you should test portable equipment on, if you want the worst case? And what does it mean for comparing measurements over time, if a device was tested on one supply last year and the other this year?

**6.3** Write up your test report (IEC 62353 clauses 6.1 and 6.2). It must contain at least:

- Device identity: model, serial number, department
- Which standard and which **measurement method** you used, and why
- Test instrument, with its **calibration due date**
- Every measured value, with the limits it was judged against
- Which supply system the test was performed on
- Findings from the visual inspection and the functional test
- Conclusion: can the device be returned to use? Date and signature

**6.4** Finally: disconnect, return the device to its normal operating state, and confirm that it starts up without a fault message (IEC 62353 clauses 5.4 and 5.2).

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- Your classification from Part 1 and your **choice of measurement method** — which method you used on the LIFEPAK 20e, which was ruled out, and why
- The earth resistance measurements from Part 3, how the reading behaved while you flexed the cord, and which of the three limits you applied
- The two IEC 62353 measurements from Part 4 with the correct limit for the applied part type, and what the limit would have been with a different method
- The completed table from the manufacturer's inspection procedure in Part 5, and what the comparison with Part 4 showed
- Why the ESA615 reports an isolated supply, and what the difference between an IT and a TN supply does to the measured values (Part 6)
- Your test report from 6.3, which a colleague should be able to check

There is no written hand-in.
