---
title: "Leakage Current Measurement Guide"
description: "Practical guide to measuring leakage currents on medical equipment per IEC 62353"
tags: ["electrical safety", "leakage current", "IEC 62353", "measurement"]
order: 3
---

## Why Leakage Current Matters

Leakage current is the small current that flows through or across the insulation of medical equipment under normal or fault conditions. In healthy individuals, surface contact with leakage currents below a few milliamperes is generally harmless. But in patients with direct cardiac connections (central venous catheters, pacemaker leads, intracardiac catheters), currents as low as **50 µA** can cause ventricular fibrillation.

This is why leakage current limits for CF (cardiac floating) applied parts are ten times stricter than for Type B or BF parts.

---

## Equipment You Need

| Item | Purpose |
|---|---|
| **Electrical safety analyser** (e.g., Fluke ESA615, Rigel 288) | Measures all leakage types per IEC 62353 |
| **IEC 62353 test leads** | Connect the analyser to the device under test |
| **Mains supply (known good)** | Clean, stable mains — avoid extension cords with poor earth |
| **Device under test (DUT)** with all applied parts connected | Test the complete device as used clinically |
| **Documentation forms or software** | Record all results |

---

## The Three Leakage Current Types

### 1. Earth Leakage Current (Protective Earth Current)

**What it is:** Current flowing from the mains part to the protective earth (PE) conductor under normal operation.

**Why it matters:** If the PE connection breaks (single fault), this current would flow through any person touching the device chassis.

**How to measure:**
1. Connect the DUT to the safety analyser
2. Measure the current in the PE conductor
3. Test under normal condition (NC) and with PE open (SFC)

| Condition | Limit |
|---|---|
| Normal | ≤ 500 µA |
| Single fault (PE open) | ≤ 1000 µA |

**Applies to:** Class I equipment only (equipment with a PE connection).

---

### 2. Enclosure (Touch) Leakage Current

**What it is:** Current that would flow from any accessible conductive part of the enclosure to earth if a person touched it.

**Why it matters:** This is the current a person (staff or patient) would experience by touching the device housing.

**How to measure:**
1. Connect the analyser's measurement probe to each accessible conductive part of the enclosure (metal panels, screws, ports)
2. Measure current to earth
3. Test under normal condition and single fault (PE open)

| Condition | Limit |
|---|---|
| Normal | ≤ 100 µA |
| Single fault (PE open) | ≤ 500 µA |

**Applies to:** All equipment classes.

---

### 3. Patient Leakage Current

**What it is:** Current that flows from the applied parts (parts that contact the patient) through the patient to earth.

**Why it matters:** This is the most critical measurement for patient safety. Applied parts are in direct contact with the patient, and in the case of CF parts, may provide a pathway directly to the heart.

**How to measure:**
1. Connect each applied part to the analyser's patient measurement terminal
2. Measure current from applied part to earth
3. Test under normal condition and single fault conditions

| Applied Part Type | Normal Condition | Single Fault Condition |
|---|---|---|
| Type B | ≤ 100 µA | ≤ 500 µA |
| Type BF | ≤ 100 µA | ≤ 500 µA |
| Type CF | ≤ **10 µA** | ≤ **50 µA** |

**Applies to:** All equipment with applied parts.

---

## Applied Part Classification — Quick Reference

| Type | Symbol Hint | Isolation | Example Devices |
|---|---|---|---|
| **B** (Body) | No F suffix | Connected to earth | Ultrasound transducers (body surface), physiotherapy equipment |
| **BF** (Body Floating) | F = floating | Isolated from earth | ECG monitors (surface electrodes), pulse oximeters, NIBP cuffs |
| **CF** (Cardiac Floating) | C = cardiac | Highest isolation | Defibrillators, intracardiac ECG, pacemaker programmers, cardiac catheter equipment |

> **Rule of thumb:** If the applied part could provide a direct electrical pathway to the heart (even theoretically), it's CF.

---

## IEC 62353 vs IEC 60601-1

| Aspect | IEC 60601-1 (Type testing) | IEC 62353 (Recurrent testing) |
|---|---|---|
| **Purpose** | Design qualification (factory) | In-service testing (field) |
| **Performed by** | Manufacturer / test lab | Clinical engineering department |
| **Dielectric test** | 1500 V AC for 60 s | 500 V DC for 1 s (optional, after repair only) |
| **Earth bond test current** | Up to 25 A | ≤ 200 mA |
| **Risk level** | Destructive to sensitive circuits | Safe for assembled equipment |

**Key point:** IEC 62353 provides equivalent safety verification to IEC 60601-1 but at test levels that are safe for in-service equipment with sensitive electronics installed.

---

## Measurement Methods (IEC 62353)

IEC 62353 defines three equivalent methods for measuring equipment leakage current. Your choice depends on your analyser and the DUT:

### Direct Method
- Measures actual current flow using a measuring device (MD) in the circuit
- Most intuitive — you see the real current
- Requires the device to be powered from mains during the test

### Differential Method
- Measures the difference between line and neutral current (any difference = leakage)
- Advantage: safe for the operator because the measuring circuit is not in the current path
- Commonly used in modern safety analysers

### Alternative Method
- Applies mains voltage to the device and measures the current that flows
- Does not require the device to be connected to mains supply during the test
- Useful for devices that are difficult to test while powered

All three methods are accepted by IEC 62353. Most modern analysers (Fluke ESA615, Rigel 288) support multiple methods.

---

## Step-by-Step Test Procedure

### Before Testing

1. Visually inspect the device: power cord condition, housing integrity, strain reliefs, connector condition
2. Verify the safety analyser is within calibration date
3. Record the DUT information: manufacturer, model, serial number, applied part type(s)
4. Ensure the DUT is complete — all cables, applied parts, and accessories connected as in clinical use

### Test Sequence

1. **Earth bond / PE resistance** (Class I only)
   - Measure resistance from PE pin on mains plug to each accessible metal part
   - Limit: < 0.3 Ω
   - A high reading indicates a damaged ground wire or poor connection

2. **Earth leakage current** (Class I only)
   - Measure in normal condition (NC)
   - Measure in single fault condition (SFC: PE open)
   - Limits: 500 µA (NC), 1000 µA (SFC)

3. **Enclosure leakage current**
   - Probe each accessible metal part
   - Measure in NC and SFC
   - Limits: 100 µA (NC), 500 µA (SFC)

4. **Patient leakage current** (if device has applied parts)
   - Connect each applied part to the analyser
   - Measure in NC and SFC
   - Limits depend on applied part type (B, BF, or CF)

### After Testing

1. Record all results with pass/fail status
2. Apply a test label to the device with: test date, next test due, tester ID
3. Enter results in the equipment management system
4. If any test fails: remove from service, investigate, repair, and retest before returning to clinical use

---

## Common Pitfalls

| Pitfall | Consequence | Prevention |
|---|---|---|
| Testing without all applied parts connected | Incomplete safety assessment | Always connect ALL cables and applied parts as in clinical use |
| Using an uncalibrated analyser | Invalid results | Check calibration date before every test session |
| Testing through an extension cord | Adds resistance, masks PE faults | Connect DUT directly to the analyser's mains outlet |
| Not testing in SFC (single fault) | Misses faults that only appear under fault conditions | Always test both NC and SFC |
| Recording only pass/fail | Loses trending data | Record actual values — a reading trending toward the limit indicates developing insulation degradation |
| Forgetting to label the device | No visible proof of testing | Apply a test label immediately after passing all tests |
