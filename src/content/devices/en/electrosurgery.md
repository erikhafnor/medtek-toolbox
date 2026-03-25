---
title: "Electrosurgical Units"
category: "electrosurgery"
description: "Reference guide for electrosurgical unit maintenance, testing, and troubleshooting"
equipment:
  - "Erbe VIO 300 D"
  - "Valleylab FT10 (Medtronic)"
  - "Fluke QA-ES III ESU Analyzer"
standards:
  - "IEC 60601-2-2 (High-frequency surgical equipment)"
  - "IEC 62353 (Recurrent testing)"
order: 4
---

## Overview

Electrosurgical units (ESUs) use high-frequency alternating current (200 kHz – 3.3 MHz) to cut tissue and coagulate bleeding vessels during surgery. Unlike mains-frequency current which causes neuromuscular stimulation at very low levels, high-frequency current passes through tissue with a thermal effect — concentrating heat at the active electrode tip. Clinical engineers are responsible for verifying output power accuracy, return electrode monitoring (REM/CQM), leakage current limits, and ensuring safe interaction with other equipment (e.g., pacemakers, monitoring devices).

---

## How It Works

An ESU generator produces high-frequency AC that flows from the active electrode (surgeon's handpiece) through the patient's tissue to the return electrode (dispersive pad) and back to the generator, completing the circuit. The tissue effect depends on the current density, waveform, and duration:

- **Cut mode** — continuous sinusoidal waveform concentrates heat rapidly at the electrode tip, vaporising cells to create an incision
- **Coagulation mode** — modulated (pulsed) waveform delivers bursts of energy with pauses, desiccating tissue for haemostasis without cutting
- **Blend modes** — combine continuous and modulated waveforms for simultaneous cutting and coagulation

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| Output power (cut) | 1–300 W (Erbe VIO 300 D) | Excessive power causes unintended tissue damage |
| Output power accuracy | ±20% of set value (IEC 60601-2-2) | Inaccurate output affects surgical precision |
| Operating frequency | 350 kHz (typical for Erbe VIO) | Below 200 kHz risks neuromuscular stimulation |
| HF leakage current | ≤ 150 mA (IEC 60601-2-2) | Excess leakage causes unintended burns at contact points |
| Return electrode monitoring (REM) | Alarm if pad impedance > threshold | Prevents burns from poor pad contact |
| Crest factor (coag) | 3–10 depending on mode | Higher crest factor = deeper coagulation, more tissue damage |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| No output / insufficient cutting | Return electrode disconnected, pad dried out, cable fault, power set too low | Check REM alarm status, inspect pad contact, test cable continuity, measure output power with QA-ES III | Reapply return electrode, replace cable, adjust power |
| REM alarm (return electrode monitoring) | Poor pad contact, pad partially peeled, pad gel dried, pad cable fault | Inspect pad application, check cable connector, measure pad impedance | Reapply or replace pad; replace cable if faulty |
| Patient burn at return electrode site | Inadequate pad contact area, REM defeated/bypassed, pad placed over scar/bony prominence | Post-incident investigation: check pad placement, REM function, pad condition, generator REM circuit | Review pad placement protocol, verify REM function, report as safety incident |
| Interference with patient monitoring | ESU activation corrupts ECG/SpO₂ display | Verify ESU operating frequency, check for stray HF coupling to monitoring leads | Use ESU-rated monitoring cables, separate ESU and monitoring lead paths |
| Unintended activation | Foot switch fault (stuck), handpiece button stuck, coupling to nearby metal | Inspect foot switch mechanism, test activation circuits, check for insulation damage | Replace foot switch, replace handpiece, ensure proper draping of active electrode |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer and your facility's PM programme (typically annually).

1. **Visual and mechanical inspection** — Check generator housing, power cord, foot switch cable and pedal mechanism, active electrode cable and connector, return electrode cable and connector. Inspect for insulation damage, frayed cables, and loose connections.

2. **Output power accuracy** — Using a calibrated ESU analyser (e.g., Fluke QA-ES III) with a 200 Ω or 500 Ω load, measure cut and coag output at low (30 W), medium (80 W), and high (200 W) settings. Each must be within ±20% of the set value per IEC 60601-2-2.

3. **Return electrode monitoring (REM) test** — Using the QA-ES III's REM test function, verify the generator detects and alarms when return electrode impedance exceeds the manufacturer's threshold (typically 135 Ω for Erbe REM systems). Test both alarm activation and output disable.

4. **HF leakage current** — Measure high-frequency leakage current from the active electrode to the return electrode and from the patient circuit to earth. Must be ≤ 150 mA per IEC 60601-2-2.

5. **Electrical safety testing** — Per IEC 62353: protective earth resistance (< 0.3 Ω), enclosure leakage current. Note: ESUs are typically Class I equipment with Type BF applied parts.

6. **Foot switch and activation test** — Verify foot switch activates the correct mode (cut/coag), that output stops immediately when the switch is released, and that the handpiece buttons function correctly.

7. **Alarm testing** — Verify all safety alarms: return electrode disconnect, return electrode high impedance, over-temperature, and output fault.

---

## Related Standards

- **IEC 60601-2-2:2017** — Particular requirements for the basic safety and essential performance of high-frequency surgical equipment and accessories. Specifies output accuracy, leakage current limits, REM requirements, and neuromuscular stimulation prevention.
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance.
- **AAMI HF18:2001** — Electrosurgical devices — guide for safe use and care (USA practice guideline).

---

## Related Scenarios

Practice diagnosing electrosurgical unit faults with guided simulation scenarios:

- [ESU won't cut — Erbe VIO 300 D](/en/scenarios/esu-no-cut/) *(Level 1)*
- [Patient burn investigation](/en/scenarios/esu-patient-burn/) *(Level 3)*
- [ESU interference with patient monitoring](/en/scenarios/esu-interference/) *(Level 2)*
