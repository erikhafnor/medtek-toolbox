---
title: "Syringe Pump Teardown & Compliance Lab"
course: "MTE210"
description: "Full teardown of an Alaris CC syringe pump: inventory every subsystem, map each design feature to its IEC 60601-1 requirement, take DMM and oscilloscope measurements, then reassemble and verify with a post-repair IEC 62353 safety test"
equipment:
  - "CareFusion Alaris CC Syringe Pump (one per group)"
  - "ESD-safe bench mat and wrist strap"
  - "Torx driver set (T6, T8, T10, T20) and a torque screwdriver"
  - "Digital multimeter (DMM)"
  - "Two-channel oscilloscope with ×10 probes"
  - "Fluke ESA615 Electrical Safety Analyzer"
  - "Camera or phone for documentation"
prerequisites:
  - "Alaris CC Syringe Pump Technical Service Manual (1000SM00001) and Directions for Use (DFU)"
  - "Lecture notes on IEC 60601-1 (means of protection, applied parts, single-fault safety)"
  - "Completion of the Electrical Safety Testing Lab (IEC 62353)"
  - "Reference: IEC 60601-1 Essentials (on this site)"
  - "Reference: Leakage Current Measurement Guide (on this site)"
duration: "6 hours"
---

## Learning Objectives

By the end of this lab you will be able to:

- Classify the syringe pump by protection class and applied-part type from its external markings **and** its internal construction, and tie each marking to IEC 60601-1 Clause 7.
- Safely isolate, de-energise and fully disassemble a mains- and battery-powered medical device, observing stored-energy, ESD and mechanical-pinch precautions.
- Inventory every subsystem and map each observed design feature to the specific IEC 60601-1 (and relevant collateral/particular standard) requirement it satisfies and the hazard it controls.
- Identify means of protection (MOOP/MOPP), insulation barriers and creepage/clearance distances, and explain the role of the independent safety processor in single-fault safety.
- Take and interpret DMM measurements (protective-earth bonding, fuse, creepage/clearance) and oscilloscope captures (stepper drive, force/pressure sensor, supply-rail ripple, alarm) against concrete acceptance criteria.
- Reassemble the pump to the manufacturer's torque specification and verify function with the power-on self-test.
- Perform a post-repair IEC 62353 electrical-safety test and explain why it is mandatory after the enclosure has been opened.

---

## Safety Notes

> **MAINS AND STORED-ENERGY HAZARD.** This pump runs from the mains and from an internal battery. The switched-mode power supply has a mains **primary** side whose capacitors can hold a charge **after** the mains lead is removed. The service manual gives **no** discharge time — treat the primary side and any large capacitor as live until proven otherwise. An electric-shock hazard exists whenever the casing is open (service manual p.6).

- **Isolate first, battery first.** Switch the pump OFF, then remove the **battery before anything else** (battery cover = two screws), *then* disconnect the mains lead. Removing the internal source first de-energises the pump before you open it.
- **Treat the PSU primary side and capacitors as charged.** Do not probe the mains inlet, fuse holder or PSU primary side on a reassembled, recently-powered pump. All electrical-safety measurements in Part 4 are made with the pump **de-energised and open**.
- **No live or leakage measurements during disassembly.** The only powered work in this lab is the post-reassembly oscilloscope captures (Part 6, on **battery only**) and the IEC 62353 test (Part 7) — both on a reassembled pump and both only with the supervising technician's authorisation.
- **ESD precautions.** Wear the wrist strap and work on the ESD mat at all times — the PCBs are static-sensitive (service manual p.6, p.47). The PCBs are **non-serviceable**: never attempt board-level repair or touch component leads. Do not touch or short the soldered backup cell on the Control PCB.
- **Mechanical pinch hazard.** Keep fingers clear of the plunger/lead-screw drive — the carriage and half-nut can move, and the gripper can declutch. Never load the force sensor beyond 10 kgf.
- **Battery handling.** The NiMH pack contains a thermal fuse and thermal cut-out. Do not short the terminals, crush or puncture it. Keep it on the ESD mat, terminals up.
- **Only the supervising technician authorises any powered step** — the battery-powered scope captures, the self-test, and the IEC 62353 test.

---

## Equipment Setup

1. Set up an **ESD-safe bench**: grounded mat and wrist strap. Lay out a clean tray or a sheet marked with a labelled grid for the parts inventory.
2. Collect tools: **Torx T6/T8/T10/T20** drivers, a **torque screwdriver** (cNm/Nm), DMM, oscilloscope with ×10 probes, and the Fluke **ESA615**.
3. Have the **Technical Service Manual (1000SM00001)** and the **DFU** open. You will refer to the exploded views (Corrective Maintenance, p.47–78) and the torque guide (p.91–92) throughout.
4. **Baseline functional check (before teardown).** With the technician's authorisation, power the pump on and confirm it completes its **power-on self-test** without errors, runs on battery, and sounds an alarm. Record the result — you will compare against it after reassembly. *A pump must be shown to work before you take it apart, or post-repair verification proves nothing.*
5. Switch OFF, **remove the battery**, then disconnect the mains lead before starting Part 2.

---

## Procedure

### Part 1 — Device Identification & Classification (35 min)

Working from the rating label, the serial/status label and the DFU, record the following. This part anchors to **IEC 60601-1 Clause 7 (marking and labelling)**.

| Property | Recorded value | Where / how you determined it |
|---|---|---|
| Manufacturer and model | | |
| Catalogue / order number | | |
| Serial number | | |
| Software version (Plus / Guardrails?) | | |
| Hardware generation (Mk1–3 or Mk4) | | |
| Protection class (I, II, or internally powered) | | |
| How did you determine the class? | | |
| Applied-part type (B, BF, or CF) | | |
| Defibrillation-proof? (symbol present?) | | |
| Which part(s) is/are the applied part? | | |
| Mains supply rating (V / Hz / VA) | | |
| Fuse rating (from label) | | |
| IP (ingress) rating | | |
| CE mark + notified-body number | | |
| UDI / GTIN present? | | |
| Other symbols observed (list) | | |

**Hints:**
- The rating label is on the rear case. Expect a mains rating near **115–230 V ~ 50–60 Hz, 20 VA**, a fuse marking like **2 × T 1.25 A, 250 V**, **IPX1**, and CE with notified body **0086**.
- The applied-part type is shown by the heart/box symbol; a **defibrillation-proof** part adds a defibrillator-paddle symbol. The service manual states **Class I, Type CF** (p.33) but does **not** confirm defibrillation protection — record exactly what *your* label shows.
- **Look closely at the protection-class symbol.** You may find the label's class symbol conflicts with the manual's own text (p.33 states **Class I**) and with the PE-stud/earthing evidence you collect later. Note the symbol now; you will reconcile it in Parts 3 and 4.

**Questions to consider:** Which of these markings are *required* by IEC 60601-1 Clause 7, and which are required by the EU MDR (e.g. UDI)? Why must the applied-part type be markable without removing the cover?

---

### Part 2 — Safe Disassembly & Parts Inventory (70 min)

> Confirm the battery is **out** and the mains lead is **disconnected** before you begin. Photograph every stage.

**Disassembly sequence** (service manual Corrective Maintenance chapter, p.47; disassembly steps from p.48 — follow the exploded views):

1. Confirm OFF, battery removed (2 battery-cover screws), mains disconnected. Fit the pump into the support cradle if available.
2. Remove the **six main-case screws** (T20).
3. **CC only:** prise out the pressure-transducer **blanking plug / disc-holder cap** and remove its securing screw (p.48).
4. Carefully separate the front and rear case halves; **photograph the cable routing before disconnecting** any connector.
5. Working from the manual, remove and lay out each subassembly: power supply unit + speaker (p.50), mains inlet + fuse + PE stud + magnet (p.52), Control PCB and backup cell (p.57–59), Display PCB and keypad (p.60), Chassis PCB + plunger/lead-screw assembly (p.62), syringe-sizing assembly (p.66), and the **CC line-pressure transducer** (p.64, p.73).

**Parts-inventory table** — lay every part on the grid, label it, and complete a row. The major subsystems are pre-listed; add the individual parts you find.

| # | Part / component | Subsystem | Qty | Markings / observations |
|---|---|---|---|---|
| 1 | Front & rear case, battery cover | Enclosure / housing | | |
| 2 | Stepper motor, drive belt, leadscrew, carriage, half-nut, plunger gripper | Plunger drive (transmission) | | |
| 3 | Linear-travel potentiometer (and motor encoder, Mk4) | Plunger position sensing | | |
| 4 | Vishay rotary potentiometer + syringe clamp | Syringe-size sensing | | |
| 5 | Chassis PCB force sensor | Force / occlusion sensing | | |
| 6 | Pressure transducer + pressure-disc holder | Line-pressure sensing (CC only) | | |
| 7 | Mains inlet, fuse(s), retainer | Mains input / overcurrent protection | | |
| 8 | Power Supply Unit (PSU) + Power PCB | Power conversion (mains → 15 VDC) | | |
| 9 | PE stud + earth leads | Protective earthing | | |
| 10 | NiMH battery pack (+ gas-gauge PCB) | Rechargeable power / backup | | |
| 11 | Control PCB (Main + Safety processor) + soldered backup cell | Control & safety electronics | | |
| 12 | LCD + CCFL backlight, display insulator/gasket | Display | | |
| 13 | Shelf / On-Off / Options keypads | User input | | |
| 14 | Main speaker + backup speaker + piezo buzzer | Audible alarm | | |

**Questions to consider:** Which single PCB carries **both** the main processor and the independent safety processor, and why does putting them on one board still allow independent shutdown of the motor? Which parts did the manufacturer make **non-serviceable**, and what does that tell you about how risk is controlled at the design stage?

---

### Part 3 — Design-for-Compliance Assessment (60 min)

This is the core intellectual task. For each subsystem, explain **how the manufacturer's design choice maps to a specific standard requirement and the hazard it controls.** Complete the mapping table; the first row is worked as an example.

| Part / subsystem | Observed design feature | Standard & clause it addresses | Hazard it controls |
|---|---|---|---|
| Rating & applied-part labels | Class/type symbols, fuse & mains rating, CE 0086, UDI | IEC 60601-1 **Cl. 7**; symbols ISO 15223-1 / IEC 60417; UDI per EU MDR 2017/745 | Mis-identification; wrong service/spares; traceability |
| Mains inlet + fuse | Time-lag (antisurge) **T 1.25 A** fuse(s) in the supply | IEC 60601-1 **§8.11.5** (mains fuses / over-current), **§11.2** (fire); **§13** (fault conditions) | Over-current / fire |
| PSU mains→15 VDC | Isolated switched-mode supply; primary↔secondary insulation barrier | IEC 60601-1 **§8.5** (MOOP/MOPP), **§8.8** (insulation), **§8.9** (creepage/clearance) | Electric shock across the mains barrier |
| PE stud + earthed inlet | Chassis bonded to mains earth via the PE stud | IEC 60601-1 **§8.6** (protective earthing) | Shock from an earthed metal part under a single fault |
| Applied-part isolation | Patient-side isolation of the fluid path / sensors; Type CF | IEC 60601-1 **§8.5.1** (patient isolation), **§8.7.3** (patient leakage, CF), **§8.5.5** (defib, if marked) | Micro-shock / cardiac current |
| Battery subsystem | NiMH pack with thermal fuse, thermal cut-out, gas-gauge PCB | IEC 60601-1 **§15.4.3** (batteries), **§11.1** (excessive temperature); IEC 62133-1 (NiMH cells) | Thermal runaway / over-discharge / fire |
| Plunger / lead-screw drive | Enclosed transmission, guarded carriage, manual declutch | IEC 60601-1 **§9.2** (moving parts / trapping) | Mechanical pinch; uncontrolled plunger movement |
| Force / occlusion + line-pressure sensing | Force sensor + (CC) line-pressure transducer drive alarms | IEC **60601-2-24 §201.12.4** (accuracy, occlusion alarm & bolus); IEC 60601-1 **§4.7/§13** | Occlusion → under-infusion / pressure surge |
| Independent safety processor | Second processor can disable the stepper and alarm on its own | IEC 60601-1 **§14** (PEMS) + IEC 62304; **§4.7** single-fault | Uncontrolled infusion if the main processor fails |
| Audible alarms (×2) + buzzer | Main speaker **plus** independent backup speaker/piezo | IEC **60601-1-8** (alarm systems) | Loss of alarm annunciation |
| Display/keypad sealing | Insulator + gasket; IPX1 ingress design | IEC 60601-1 **§11.6** (ingress, IEC 60529); **§8.x** insulation | Fluid ingress → shock / malfunction |
| EMC design | Group 1 Class A; immunity raised, fail-safe on RF | IEC **60601-1-2** (collateral EMC) | EMI-induced malfunction |

**Then answer in your notebook:**
1. The manual's text (p.33) and the hardware (a PE stud bonded to the chassis, an earthed mains inlet) both indicate **Class I**, yet the rating-label class symbol may be drawn as **Class II (double square)**, and the pump also has an internal battery (internally powered). Using the IEC 60601-1 definitions of **Class I**, **Class II** and **internally powered**, and the difference between a **protective earth** and a **functional earth**, reconcile what you see. Which classification governs, and why?
2. Pick one subsystem and explain how it provides **two means of protection** (e.g. 2× MOPP). What are the two independent barriers, and what happens if one fails (single-fault safety)?

---

### Part 4 — Electrical-Safety Measurements: DMM (de-energised) (45 min)

> **Pump must be OPEN, battery OUT, mains DISCONNECTED.** These are all dead-circuit measurements. Do not power the pump in this part.

Complete the measurement table and compare each result to the acceptance criterion.

| # | Measurement | Method | Acceptance criterion | Reading | Pass/Fail |
|---|---|---|---|---|---|
| 1 | Protective-earth bonding: mains-inlet earth pin → chassis / PE stud | DMM continuity (Ω) | IEC 60601-1 **§8.6.4**: ≤ **0.1 Ω** between the PE terminal and earthed parts (no cord); ≤ **0.2 Ω** if the path includes a detachable cord. IEC 62353: ≤ **0.3 Ω** (incl. mains cord) | | |
| 2 | Mains fuse continuity + printed rating | DMM continuity; read fuse body | Continuity ≈ 0 Ω; rating matches label (**T 1.25 A**) | | |
| 3 | Battery pack open-circuit voltage | DMM DC volts at pack terminals | **7.2 V** nominal (6 × 1.2 V); typically ≈ 8.0–8.4 V charged (manual cal example ≈ 8.21 V, p.21) | | |
| 4 | Creepage distance, mains **primary ↔ secondary** on the PSU/Power PCB | Calipers / ruler | Teaching target ≈ **8 mm** for 2× MOPP at ~250 V (IEC 60601-1 §8.9, MOPP Tables 13–16) | | |
| 5 | Air clearance, mains **primary ↔ secondary** | Calipers / ruler | Teaching target ≈ **5 mm** for 2× MOPP at ~250 V (§8.9) | | |
| 6 | Continuity of L and N from mains inlet to PSU input | DMM continuity | Continuous; no breaks | | |

**Questions to consider:** Your protective-earth reading — does it pass the **60601-1 type-test** limit, the **62353 recurrent-test** limit, or both? Why are the two limits different? (Note the 62353 0.3 Ω limit is for the path *including* the mains cord.) Compare your measured creepage to the teaching target: how does a larger creepage distance deliver a higher *means of protection* (MOOP vs MOPP)?

---

### Part 5 — Reassembly & Functional Verification (60 min)

Reassemble the pump **to the manufacturer's torque specification** (service manual torque guide, p.91–92). These pumps are reused by future groups, so rebuild them correctly.

1. Reverse the disassembly. Reconnect every cable as photographed.
2. Torque the key fasteners to spec — record them:

| Fastener | Spec (from manual) | Applied? |
|---|---|---|
| Front ↔ rear case (6 × T20) | **125 cNm** | |
| Battery cover / handle (2 × T20) | **90 cNm** | |
| Chassis PCB → chassis (M3×8) | **75 cNm** | |
| CC pressure transducer → front case | **70 cNm** | |
| Motor plate → chassis | **1.1 Nm** | |
| PE stud nut / earth lead | **hand tight** (per manual) | |

3. Refit the battery, then connect mains.
4. **Functional verification:** power on and confirm the **power-on self-test** passes (no error/fault codes). Confirm it runs on **battery** and on **mains**, the AC-power indicator lights, the LCD/backlight is correct, and at least one **alarm** annunciates (e.g. drive-disengaged or check-syringe).

| Verification step | Expected | Observed | Pass/Fail |
|---|---|---|---|
| Power-on self-test | Completes, no fault codes | | |
| Runs on battery | Battery indicator on, infuses | | |
| Runs on mains | AC indicator on, charging | | |
| Display + backlight | Correct, readable | | |
| Alarm annunciation | Audible + visual alarm | | |

**Questions to consider:** Which calibration/verification steps does the manufacturer require after replacing the Control PCB or the pressure transducer (manual p.47)? Your teardown didn't replace anything — so which of those still apply, and which don't?

---

### Part 6 — Signal Measurements: Oscilloscope (battery-powered) (40 min)

> **Authorised, battery-only.** With the technician's authorisation, run the reassembled pump on its **internal battery (mains lead disconnected)**. Because the mains primary is now absent, all internal nodes are SELV/low-energy. Probe only the points the technician indicates.

Capture each signal, sketch/print the trace, and describe whether it is "healthy."

| # | Signal | How to capture | What a healthy trace looks like | Observation |
|---|---|---|---|---|
| 1 | Stepper-motor drive (one coil) | Probe a motor coil lead; run a low rate (e.g. 100 mL/h) | Regular chopped/PWM current bursts, one packet per step, no missing steps | |
| 2 | Force / line-pressure sensor output | Probe the sensor analogue line while gently loading the plunger / occluding | Smooth, monotonic DC analogue ramp that rises with force/pressure (cf. cal: 0 kgf ≈ 1.68 V, 10 kgf ≈ 3.15 V) | |
| 3 | Internal supply-rail ripple | Probe a regulated DC rail (battery/logic rail) | Stable DC, low ripple (tens of mV pp); no large switching spikes | |
| 4 | Alarm / buzzer drive | Trigger an alarm; probe the piezo/speaker drive | Periodic tone-burst (square/AC drive at the buzzer frequency) | |

Record your scope settings (V/div, time/div) for each capture.

**Questions to consider:** From the stepper-drive trace, how does the pump achieve a smooth, accurate low flow rate from discrete motor steps? Why is it safe to take these captures on battery but **not** to probe the same board with the mains lead connected and the case open?

---

### Part 7 — Post-Repair IEC 62353 Electrical-Safety Test (35 min)

Opening the enclosure disturbs the pump's means of protection (the PE bond, insulation barriers and applied-part isolation). **IEC 62353 requires an electrical-safety retest before the device may be returned to use.** Perform the test on the **reassembled** pump with the Fluke **ESA615**, as in the *Electrical Safety Testing Lab*. The pump is **Class I, Type CF** — apply the **CF limits**.

| IEC 62353 test | Limit (Class I / Type CF) | Reading | Pass/Fail |
|---|---|---|---|
| Protective-earth resistance | ≤ **0.3 Ω** (incl. mains cord) | | |
| Equipment leakage current (alternative / direct method) | ≤ **500 µA** (Class I) | | |
| Applied-part leakage current (Type CF) | ≤ **50 µA** | | |
| Insulation resistance — mains ↔ PE *(optional)* | ≥ **2 MΩ** | | |
| Insulation resistance — mains ↔ applied part *(optional)* | per your ESA615 preset | | |
| **Overall: PASS / FAIL** | | | |

> **IEC 62353 vs IEC 60601-1.** In the Electrical Safety lab you measured *enclosure* and *patient* leakage to 60601-1 limits (≤ 100/500 µA; CF ≤ 10/50 µA, normal/single-fault). IEC 62353 consolidates these into one **equipment-leakage** figure (≤ 500 µA, Class I) and one **applied-part-leakage** figure (≤ 50 µA, Type CF), measured by the alternative/direct/differential method rather than the normal-vs-open-PE manipulation. Record what your ESA615 reports in 62353 mode and relate the two models.

Compare your protective-earth result here against your **Part 4** DMM reading and your **baseline** (Equipment Setup). If any value approaches or exceeds a limit, state what action you would take as a clinical engineer.

**Questions to consider:** Which of these tests specifically re-checks the MOPs you disturbed during teardown? If this were a real return-to-service, would a passing self-test (Part 5) be sufficient on its own? Why or why not?

---

### Part 8 — Review Questions (15 min)

1. A syringe pump used for **vasoactive drugs** is often connected via a central line that provides a direct electrical path toward the heart. Explain why this drives a **Type CF** applied-part classification and why CF patient-leakage limits are ten times stricter than BF. Separately: is **defibrillation-proof** protection (§8.5.5) the same as Type CF or an additional requirement — and how would you tell from the markings?
2. Describe how the **occlusion/force sensing** and the **independent safety processor** together implement **single-fault safety** (IEC 60601-1 §4.7) and the occlusion requirements of **IEC 60601-2-24**. What happens to the motor if the main processor hangs?
3. You measured a creepage distance between the mains primary and secondary on the PSU. Relate your value to **§8.9** and the concept of **2× MOPP**. Why does patient isolation demand larger distances than operator isolation?
4. Reconcile the **protection-class evidence** you gathered: PE stud + earthed inlet (Class I) vs a possible Class II label symbol, plus an internal battery (internally powered). Is the PE a **protective** earth or a **functional** earth? Cite the relevant definitions.
5. After opening the enclosure, **which IEC 62353 tests are mandatory** before return to service, and why? Which specific means of protection did your teardown disturb? If protective-earth resistance came back at **0.45 Ω**, does it pass — and what would you investigate?
6. The mains fuse is a **time-lag (antisurge) T 1.25 A** type in the supply. Why time-lag rather than fast-blow for a switched-mode supply? How does the **1.25 A / 20 VA** rating relate, and how do the fuse, protective earthing and insulation together form the overall protection strategy (§8.11, §11.2)?

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date.
- The completed **classification table** (Part 1), **parts-inventory table** (Part 2), and **design-for-compliance mapping table** (Part 3).
- The completed **measurement tables** from Parts 4, 6 and 7, with pass/fail status and your recorded scope settings/traces.
- **Photographs** documenting the disassembly stages and the laid-out parts inventory.
- The **torque-spec reassembly record** (Part 5) and the functional-verification results.
- Written answers to the six review questions (Part 8).
- A brief conclusion (200–300 words) discussing how the Alaris CC's construction reflects the IEC 60601-1 design requirements, what the teardown revealed about layered (single-fault) safety, and why a post-repair electrical-safety retest is mandatory after the enclosure has been opened.
