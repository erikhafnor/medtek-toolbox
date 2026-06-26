---
title: "Syringe Pump Teardown & Compliance Lab"
course: "MTE210"
description: "Tear down an Alaris CC syringe pump and trace how its construction, servicing and post-repair testing demonstrate conformity with EU MDR 2017/745 and ISO 13485 — using the harmonised standards (IEC 60601-1, IEC 62353, IEC 60601-2-24) as the evidence"
equipment:
  - "CareFusion Alaris CC Syringe Pump (one per group)"
  - "ESD-safe bench mat and wrist strap"
  - "Torx driver set (T6, T8, T10, T20) and a torque screwdriver"
  - "Digital multimeter (DMM)"
  - "Two-channel oscilloscope with ×10 probes"
  - "Fluke ESA615 Electrical Safety Analyzer (with a valid calibration certificate)"
  - "Camera or phone for documentation"
prerequisites:
  - "Alaris CC Syringe Pump Technical Service Manual (1000SM00001) and Directions for Use (DFU)"
  - "Lecture notes on EU MDR 2017/745 (classification, GSPRs, UDI) and ISO 13485"
  - "Lecture notes on IEC 60601-1 and risk management (ISO 14971)"
  - "Completion of the Electrical Safety Testing Lab (IEC 62353)"
  - "Reference: IEC 60601-1 Essentials (on this site)"
checklist:
  - title: "Before you dive in"
    items:
      - "Read the whole thing once. Big picture: a real infusion pump is a stack of EU MDR requirements made physical — you'll take it apart, prove each piece exists to satisfy a rule, put it back, and prove it's still safe."
      - "Two power sources bite back here — mains *and* a battery. Switch off, pull the battery first, then unplug the mains."
  - title: "4.1 — Know what you're holding"
    items:
      - "Read the rating label like a detective: model, serial, and all those little symbols."
      - "Work out its MDR risk class. Hint: pushing strong drugs into a big vein nudges it up a class."
      - "Find the UDI and the CE + Notified-Body number — the device's passport and its 'someone independent checked this' stamp."
  - title: "4.2 — Take it apart (carefully)"
    items:
      - "Photograph every step before you disconnect anything — cables especially."
      - "Lay every part on the grid and write down its job. You're rebuilding the parts list from scratch."
  - title: "4.3 — Why is every part shaped like a rule?"
    items:
      - "For each subsystem ask two things: which MDR requirement forced this design? and which standard proves they met it?"
      - "This is the heart of the lab — watching regulation turn into screws, barriers, sensors and alarms."
  - title: "4.4 — Measure it dead"
    items:
      - "Meters only, no power. Check the earth bond, the fuse, and the gap between the dangerous (mains) and safe sides."
  - title: "4.5 — Put it back together"
    items:
      - "Rebuild to the exact torque numbers — a loose earth screw is a genuine real-world failure."
      - "Power on and let it pass its own self-test. If it sulks, you missed a cable."
  - title: "4.6 — Watch it think (on battery)"
    items:
      - "Scope the motor, the pressure sensor and the alarm while it runs on battery — safe, because there's no mains lurking inside."
  - title: "4.7 — Earn the right to use it again"
    items:
      - "Run the IEC 62353 test with a *calibrated* analyser, then write the service record — that's ISO 13485 in the flesh."
      - "Opening the box disturbed its safety barriers; this test is how you prove they're intact again."
  - title: "Wrap up"
    items:
      - "Answer the review questions — they tie what your hands did back to the rules behind it."
      - "Hand in your tables, photos, the service record and a short reflection."
duration: "6 hours"
---

This lab uses a real infusion device as a lens on the **regulatory system** that lets it reach a patient. In the EU, a manufacturer may CE-mark and sell this pump only by (a) meeting the **General Safety and Performance Requirements (GSPRs)** of **EU MDR 2017/745**, Annex I, (b) doing so inside a certified **ISO 13485** quality management system, and (c) typically demonstrating it with **harmonised standards** (IEC 60601-1, IEC 60601-2-24, IEC 60601-1-8, …) that grant a *presumption of conformity*. After the device is in service, **ISO 13485** servicing and **IEC 62353** recurrent/after-repair testing keep it safe. You will see all of this in the hardware.

---

## 1. Learning objectives

By the end of this lab you will be able to:

- **1.1** Determine the device's **EU MDR risk class** from Annex VIII and read its **UDI**, CE mark and Notified-Body number, and explain what each tells you (MDR Art. 27, Annex I GSPR 23).
- **1.2** Safely isolate, de-energise and fully disassemble a mains- and battery-powered medical device, observing stored-energy, ESD and mechanical-pinch precautions.
- **1.3** Map each subsystem to the **MDR GSPR (Annex I)** it satisfies and the **harmonised standard** that demonstrates it, and explain *presumption of conformity*.
- **1.4** Relate the design to **risk management (ISO 14971)** and single-fault safety, and identify the means of protection (MOOP/MOPP) and insulation/creepage barriers in IEC 60601-1.
- **1.5** Take and interpret DMM and oscilloscope measurements (protective-earth bonding, fuse, creepage, stepper drive, sensor, alarm) against concrete acceptance criteria.
- **1.6** Reassemble to the manufacturer's torque specification, verify function, perform a **post-repair IEC 62353** test with **calibrated** equipment, and complete an **ISO 13485 service record**.

---

## 2. Safety first

> **MAINS AND STORED-ENERGY HAZARD.** This pump runs from the mains and from an internal battery. The switched-mode power supply has a mains **primary** side whose capacitors can hold a charge **after** the mains lead is removed. The service manual gives **no** discharge time — treat the primary side and any large capacitor as live until proven otherwise. An electric-shock hazard exists whenever the casing is open (service manual p.6).

- **2.1 Isolate first, battery first.** Switch the pump OFF, remove the **battery before anything else** (battery cover = two screws), *then* disconnect the mains lead. Removing the internal source first de-energises the pump before you open it.
- **2.2 Treat the PSU primary side and capacitors as charged.** Do not probe the mains inlet, fuse holder or PSU primary side on a reassembled, recently-powered pump. All electrical-safety measurements in §4.4 are made with the pump **de-energised and open**.
- **2.3 No live or leakage measurements during disassembly.** The only powered work is the post-reassembly oscilloscope captures (§4.6, on **battery only**) and the IEC 62353 test (§4.7) — both on a reassembled pump and both only with the supervising technician's authorisation.
- **2.4 ESD precautions.** Wear the wrist strap and work on the ESD mat at all times — the PCBs are static-sensitive (service manual p.6, p.47). The PCBs are **non-serviceable**: never attempt board-level repair or touch component leads. Do not touch or short the soldered backup cell on the Control PCB.
- **2.5 Mechanical pinch hazard.** Keep fingers clear of the plunger/lead-screw drive — the carriage and half-nut can move, and the gripper can declutch. Never load the force sensor beyond 10 kgf.
- **2.6 Battery handling.** The NiMH pack contains a thermal fuse and thermal cut-out. Do not short the terminals, crush or puncture it. Keep it on the ESD mat, terminals up.
- **2.7 Authorisation.** Only the supervising technician authorises any powered step — the battery scope captures, the self-test, and the IEC 62353 test.

---

## 3. Bench setup

1. **3.1** Set up an **ESD-safe bench**: grounded mat and wrist strap. Lay out a clean tray or a sheet marked with a labelled grid for the parts inventory.
2. **3.2** Collect tools: **Torx T6/T8/T10/T20** drivers, a **torque screwdriver** (cNm/Nm), DMM, oscilloscope with ×10 probes, and the Fluke **ESA615** — and note the ESA615's **calibration due date** (you will need it for the service record in §4.7).
3. **3.3** Have the **Technical Service Manual (1000SM00001)** and the **DFU** open. You will refer to the exploded views (Corrective Maintenance, p.47–78) and the torque guide (p.91–92) throughout.
4. **3.4 Baseline functional check (before teardown).** With the technician's authorisation, power the pump on and confirm it completes its **power-on self-test** without errors, runs on battery, and sounds an alarm. Record the result — you will compare against it after reassembly. *A pump must be shown to work before you take it apart, or post-repair verification proves nothing.*
5. **3.5** Switch OFF, **remove the battery**, then disconnect the mains lead before starting §4.2.

---

## 4. Procedure

### 4.1 Identify & classify the device — EU MDR (35 min)

Working from the rating label, the serial/status label and the DFU, complete the table. This part anchors to **EU MDR 2017/745** (classification — Annex VIII; UDI — Art. 27, Annex VI; markings — Annex I **GSPR 23**) and to **IEC 60601-1 Clause 7**.

| Property | Recorded value | Where / how you determined it |
|---|---|---|
| Manufacturer (legal manufacturer) | | |
| Model / type and catalogue (REF) number | | |
| Serial number | | |
| **Basic UDI-DI** (if shown / in the DoC) | | |
| **UDI-DI** (device identifier) | | |
| **UDI-PI** (production identifier: lot/serial/date) | | |
| **MDR risk class + Annex VIII rule** | | |
| CE mark + **Notified-Body number** | | |
| Certificate route (legacy MDD or MDR?) | | |
| Protection class (I / II / internally powered) | | |
| How did you determine the class? | | |
| Applied-part type (B, BF, or CF) | | |
| Defibrillation-proof? (symbol present?) | | |
| Which part(s) is/are the applied part? | | |
| Mains rating (V / Hz / VA) and fuse rating | | |
| IP (ingress) rating | | |
| Other symbols observed (list) | | |

**Hints:**
- **Classification.** Under **Annex VIII, Rule 12**, active devices that *administer* medicinal products are **Class IIa** — *unless* delivery is "potentially hazardous" given the substance, the body site and the mode, in which case they are **Class IIb**. A syringe pump used for vasoactive drugs into the central circulation lands in **Class IIb**. Record the rule *and* why it escalates.
- **UDI (Art. 27).** The **UDI-DI** identifies the manufacturer + model; the **UDI-PI** identifies the individual production unit (lot/serial). The UDI carrier appears on the label and packaging and is the key used for **vigilance and field safety corrective actions (Art. 87)**.
- **Markings.** Expect a mains rating near **115–230 V ~ 50–60 Hz, 20 VA**, a fuse marking like **2 × T 1.25 A, 250 V**, **IPX1**, and CE with Notified Body **0086**. The service manual states **Class I, Type CF** (p.33) but does **not** confirm defibrillation protection — record exactly what *your* label shows.

**Questions to consider:** Which markings are required by **MDR Annex I GSPR 23** (label & IFU), and which by **IEC 60601-1 §7**? Why is the UDI the backbone of traceability, recalls and vigilance?

---

### 4.2 Safe disassembly & parts inventory (70 min)

> Confirm the battery is **out** and the mains lead is **disconnected** before you begin. Photograph every stage.

**Disassembly sequence** (service manual Corrective Maintenance chapter, p.47; disassembly steps from p.48 — follow the exploded views):

1. **4.2.1** Confirm OFF, battery removed (2 battery-cover screws), mains disconnected. Fit the pump into the support cradle if available.
2. **4.2.2** Remove the **six main-case screws** (T20).
3. **4.2.3 CC only:** prise out the pressure-transducer **blanking plug / disc-holder cap** and remove its securing screw (p.48).
4. **4.2.4** Carefully separate the front and rear case halves; **photograph the cable routing before disconnecting** any connector.
5. **4.2.5** Remove and lay out each subassembly: power supply unit + speaker (p.50), mains inlet + fuse + PE stud + magnet (p.52), Control PCB and backup cell (p.57–59), Display PCB and keypad (p.60), Chassis PCB + plunger/lead-screw assembly (p.62), syringe-sizing assembly (p.66), and the **CC line-pressure transducer** (p.64, p.73).

**Parts-inventory table** — lay every part on the grid, label it, and complete a row.

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

**Questions to consider:** Which single PCB carries **both** the main processor and the independent safety processor, and why does putting them on one board still allow independent shutdown of the motor? Which parts did the manufacturer make **non-serviceable**, and what does that tell you about how risk is controlled at the design stage (ISO 14971)?

---

### 4.3 Design-for-conformity: MDR GSPRs → harmonised standards (60 min)

This is the core intellectual task. The MDR's **GSPRs (Annex I)** say *what* must be achieved; **harmonised standards** say *how*, and meeting them gives a **presumption of conformity**; **ISO 14971** risk management ties them together (GSPR 3). For each subsystem, complete the mapping — the first row is worked as an example.

| Subsystem | Observed design feature | MDR GSPR (Annex I) | Harmonised standard (the evidence) | Hazard controlled |
|---|---|---|---|---|
| Rating / applied-part labels + UDI | Class & type symbols, ratings, CE 0086, UDI carrier | **GSPR 23** (label & IFU); **Art. 27** (UDI) | EN ISO 15223-1; EN 60601-1 §7 | Mis-identification; no traceability / recall |
| Mains inlet + fuse | Time-lag (antisurge) **T 1.25 A** fuse(s) in the supply | **GSPR 18** (active devices); Ch. I **GSPR 4/8** | EN 60601-1 §8.11.5, §11.2 | Over-current / fire |
| PSU mains→15 VDC | Isolated SMPS; primary↔secondary insulation barrier | **GSPR 18**; Ch. I (risk reduction) | EN 60601-1 §8.5 (MOOP/MOPP), §8.8, §8.9 | Electric shock across the mains barrier |
| PE stud + earthed inlet | Chassis bonded to mains earth via the PE stud | **GSPR 18** | EN 60601-1 §8.6 | Shock from an earthed metal part under a single fault |
| Applied-part isolation | Patient-side isolation of fluid path / sensors; Type CF | **GSPR 21** (energy/substance to patient); **GSPR 18** | EN 60601-1 §8.5.1, §8.7.3, §8.5.5 | Micro-shock / cardiac current |
| Battery subsystem | NiMH pack with thermal fuse, thermal cut-out, gas-gauge PCB | **GSPR 20** (mechanical & thermal); **GSPR 18** | EN 60601-1 §15.4.3, §11.1; EN/IEC 62133-1 | Thermal runaway / over-discharge / fire |
| Plunger / lead-screw drive | Enclosed transmission, guarded carriage, manual declutch | **GSPR 20.2** (moving parts) | EN 60601-1 §9.2 | Mechanical pinch; uncontrolled plunger movement |
| Force / occlusion + line-pressure sensing | Force sensor + (CC) line-pressure transducer drive alarms | **GSPR 21.1** (accurate delivery) + alarms | EN 60601-2-24 §201.12.4; EN 60601-1-8 | Occlusion → under-infusion / pressure surge |
| Independent safety processor | Second processor can disable the stepper and alarm on its own | **GSPR 17** (electronic programmable systems) | EN 60601-1 §14 + IEC 62304; §4.7 single-fault | Uncontrolled infusion if the main processor fails |
| Audible alarms (×2) + buzzer | Main speaker **plus** independent backup speaker/piezo | **GSPR 21** / 18 (alarms) | EN 60601-1-8 | Loss of alarm annunciation |
| Display/keypad sealing | Insulator + gasket; IPX1 ingress design | **GSPR 14** (interaction w/ environment) | EN 60601-1 §11.6 (IEC 60529 IP code) | Fluid ingress → shock / malfunction |
| EMC design | Group 1 Class A; immunity raised, fail-safe on RF | **GSPR 18** (electromagnetic compatibility) | EN 60601-1-2 | EMI-induced malfunction |

**Then answer in your notebook:**
1. **4.3.1** Using **Annex VIII Rule 12**, explain why *this* pump is **Class IIb** rather than the Rule 12 default of IIa. Which of the three factors (substance, body site, mode of application) does the escalation hinge on?
2. **4.3.2** Pick one row. State the **GSPR** (the legal requirement) and the **harmonised standard** (the evidence), and explain what *presumption of conformity* means — and whether a manufacturer is allowed to meet the GSPR a different way.

---

### 4.4 Electrical-safety measurements — DMM (de-energised) (45 min)

> **Pump must be OPEN, battery OUT, mains DISCONNECTED.** These are all dead-circuit measurements. Do not power the pump in this part.

| # | Measurement | Method | Acceptance criterion | Reading | Pass/Fail |
|---|---|---|---|---|---|
| 4.4.1 | Protective-earth bonding: mains-inlet earth pin → chassis / PE stud | DMM continuity (Ω) | IEC 60601-1 **§8.6.4**: ≤ **0.1 Ω** PE terminal→earthed parts (no cord); ≤ **0.2 Ω** with a detachable cord. IEC 62353: ≤ **0.3 Ω** (incl. mains cord) | | |
| 4.4.2 | Mains fuse continuity + printed rating | DMM continuity; read fuse body | Continuity ≈ 0 Ω; rating matches label (**T 1.25 A**) | | |
| 4.4.3 | Battery pack open-circuit voltage | DMM DC volts at pack terminals | **7.2 V** nominal (6 × 1.2 V); typically ≈ 8.0–8.4 V charged (manual cal example ≈ 8.21 V, p.21) | | |
| 4.4.4 | Creepage distance, mains **primary ↔ secondary** on the PSU/Power PCB | Calipers / ruler | Teaching target ≈ **8 mm** for 2× MOPP at ~250 V (IEC 60601-1 §8.9, MOPP Tables 13–16) | | |
| 4.4.5 | Air clearance, mains **primary ↔ secondary** | Calipers / ruler | Teaching target ≈ **5 mm** for 2× MOPP at ~250 V (§8.9) | | |
| 4.4.6 | Continuity of L and N from mains inlet to PSU input | DMM continuity | Continuous; no breaks | | |

**Questions to consider:** Your protective-earth reading — does it pass the **IEC 60601-1 type-test** limit, the **IEC 62353 recurrent-test** limit, or both? Why are the two limits different? (The 62353 0.3 Ω limit is for the path *including* the mains cord.) How does a larger creepage distance deliver a higher *means of protection* (MOOP vs MOPP)?

---

### 4.5 Reassembly & functional verification (60 min)

Reassemble the pump **to the manufacturer's torque specification** (service manual torque guide, p.91–92). These pumps are reused by future groups, so rebuild them correctly — assembling to documented work instructions and torque values is itself an **ISO 13485 §7.5** (production & service provision) control.

1. **4.5.1** Reverse the disassembly. Reconnect every cable as photographed.
2. **4.5.2** Torque the key fasteners to spec — record them:

| Fastener | Spec (from manual) | Applied? |
|---|---|---|
| Front ↔ rear case (6 × T20) | **125 cNm** | |
| Battery cover / handle (2 × T20) | **90 cNm** | |
| Chassis PCB → chassis (M3×8) | **75 cNm** | |
| CC pressure transducer → front case | **70 cNm** | |
| Motor plate → chassis | **1.1 Nm** | |
| PE stud nut / earth lead | **hand tight** (per manual) | |

3. **4.5.3** Refit the battery, then connect mains.
4. **4.5.4 Functional verification:** power on and confirm the **power-on self-test** passes (no fault codes), it runs on **battery** and **mains**, the AC indicator lights, the display/backlight is correct, and an **alarm** annunciates.

| Verification step | Expected | Observed | Pass/Fail |
|---|---|---|---|
| Power-on self-test | Completes, no fault codes | | |
| Runs on battery | Battery indicator on, infuses | | |
| Runs on mains | AC indicator on, charging | | |
| Display + backlight | Correct, readable | | |
| Alarm annunciation | Audible + visual alarm | | |

**Questions to consider:** Which calibration/verification steps does the manufacturer require after replacing the Control PCB or the pressure transducer (manual p.47)? Your teardown didn't replace anything — so which still apply, and which don't?

---

### 4.6 Signal measurements — oscilloscope, on battery (40 min)

> **Authorised, battery-only.** With the technician's authorisation, run the reassembled pump on its **internal battery (mains lead disconnected)**. Because the mains primary is now absent, all internal nodes are SELV/low-energy. Probe only the points the technician indicates.

| # | Signal | How to capture | What a healthy trace looks like | Observation |
|---|---|---|---|---|
| 4.6.1 | Stepper-motor drive (one coil) | Probe a motor coil lead; run a low rate (e.g. 100 mL/h) | Regular chopped/PWM current bursts, one packet per step, no missing steps | |
| 4.6.2 | Force / line-pressure sensor output | Probe the sensor analogue line while gently loading the plunger / occluding | Smooth, monotonic DC ramp that rises with force/pressure (cf. cal: 0 kgf ≈ 1.68 V, 10 kgf ≈ 3.15 V) | |
| 4.6.3 | Internal supply-rail ripple | Probe a regulated DC rail (battery/logic rail) | Stable DC, low ripple (tens of mV pp); no large switching spikes | |
| 4.6.4 | Alarm / buzzer drive | Trigger an alarm; probe the piezo/speaker drive | Periodic tone-burst (square/AC drive at the buzzer frequency) | |

Record your scope settings (V/div, time/div) for each capture.

**Questions to consider:** From the stepper-drive trace, how does the pump achieve a smooth, accurate low flow rate from discrete motor steps (link this to **GSPR 21.1** delivery accuracy)? Why is it safe to take these captures on battery but **not** with the mains lead connected and the case open?

---

### 4.7 Post-repair IEC 62353 test & ISO 13485 service record (35 min)

Opening the enclosure disturbs the pump's means of protection (PE bond, insulation barriers, applied-part isolation). **IEC 62353 requires an electrical-safety retest before the device may be returned to use**, and **ISO 13485 §7.5.4 (servicing)** requires it to be **recorded**, with **§7.6** requiring the test instrument to be **calibrated and traceable**. The pump is **Class I, Type CF** — apply the **CF limits**.

| IEC 62353 test | Limit (Class I / Type CF) | Reading | Pass/Fail |
|---|---|---|---|
| Protective-earth resistance | ≤ **0.3 Ω** (incl. mains cord) | | |
| Equipment leakage current (alternative / direct method) | ≤ **500 µA** (Class I) | | |
| Applied-part leakage current (Type CF) | ≤ **50 µA** | | |
| Insulation resistance — mains ↔ PE *(optional)* | ≥ **2 MΩ** | | |
| Insulation resistance — mains ↔ applied part *(optional)* | per your ESA615 preset | | |
| **Overall: PASS / FAIL** | | | |

> **IEC 62353 vs IEC 60601-1.** In the Electrical Safety lab you measured *enclosure* and *patient* leakage to 60601-1 limits (≤ 100/500 µA; CF ≤ 10/50 µA, normal/single-fault). IEC 62353 consolidates these into one **equipment-leakage** figure (≤ 500 µA, Class I) and one **applied-part-leakage** figure (≤ 50 µA, Type CF). Record what your ESA615 reports in 62353 mode and relate the two models.

**4.7.1 Service record (ISO 13485 §7.5.4).** Complete a minimal record you could file against this device:

| Field | Entry |
|---|---|
| Device model + **serial / UDI-PI** | |
| Work performed | Teardown, reassembly, post-repair safety test |
| Test instrument + **calibration due date** (§7.6) | |
| IEC 62353 result (PASS/FAIL) | |
| Technician + date | |

**Questions to consider:** Which tests specifically re-check the MOPs you disturbed? Would a passing self-test (§4.5) alone be enough to return the device to service — why or why not? At what point does a "repair" become **remanufacturing** under the MDR, and why does that distinction matter for who holds regulatory responsibility?

---

### 4.8 Review questions (15 min)

1. **Classification.** Under **Annex VIII Rule 12**, why is a vasoactive-drug syringe pump **Class IIb** rather than IIa? Which factor(s) drive the escalation, and how would the class change for a device that only delivered into the gut?
2. **Presumption of conformity.** Explain how a **harmonised standard** (e.g. EN 60601-1) relates to an **MDR GSPR**. Can a manufacturer satisfy a GSPR *without* the harmonised standard? What must they then do?
3. **UDI & vigilance.** Distinguish **UDI-DI**, **UDI-PI** and **Basic UDI-DI**. How is the UDI used when a manufacturer issues a **field safety corrective action** or reports a **serious incident** (Art. 87)?
4. **ISO 13485 servicing.** Why must your **ESA615 be calibrated** (§7.6) and the after-repair test **recorded** (§7.5.4)? What belongs in the service record, and who might later read it?
5. **After-repair testing.** Which means of protection did your teardown disturb, and which **IEC 62353** tests are therefore mandatory before return to service? If protective-earth resistance came back at **0.45 Ω**, does it pass — and what would you investigate?
6. **Type CF & the class puzzle.** Explain why a central-line drug pump is **Type CF** and why CF patient-leakage limits are ten times stricter than BF. Separately, reconcile the protection-class evidence you found (PE stud + earthed inlet → Class I, vs a possible Class II label symbol, plus an internal battery): is the PE a **protective** or a **functional** earth, and which classification governs?

---

## 5. What to submit

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code, and date.
- The completed **classification table** (§4.1), **parts-inventory table** (§4.2), and **GSPR→standard mapping table** (§4.3).
- The completed **measurement tables** from §4.4, §4.6 and §4.7, with pass/fail status and your recorded scope settings/traces.
- The completed **service record** (§4.7.1) and the **torque-spec reassembly record** (§4.5).
- **Photographs** documenting the disassembly stages and the laid-out parts inventory.
- Written answers to the six review questions (§4.8).
- A brief conclusion (200–300 words) on how the Alaris CC demonstrates conformity with **EU MDR 2017/745** through **ISO 13485** processes and harmonised standards — and why a post-repair **IEC 62353** test is mandatory after the enclosure has been opened.
