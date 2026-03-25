---
title: "Defibrillators & Monitors"
category: "defibrillator"
description: "Reference guide for defibrillator and patient monitor maintenance, testing, and troubleshooting"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP defibrillator tester"
  - "Keysight InfiniiVision oscilloscope"
standards:
  - "IEC 60601-2-4 (Defibrillators)"
  - "IEC 60601-2-27 (ECG monitoring)"
  - "IEC 62353 (Recurrent testing)"
order: 1
---

## Overview

Defibrillators deliver a controlled electrical shock to the myocardium to terminate life-threatening arrhythmias such as ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT). Modern devices combine defibrillation with 12-lead ECG monitoring, non-invasive pacing, and SpO₂/CO₂ measurement. Clinical engineers are responsible for ensuring these devices perform within specification, particularly for energy delivery accuracy, charge time, and synchronized cardioversion timing.

---

## How It Works

A defibrillator stores energy in a high-voltage capacitor and discharges it through the patient via adhesive pads or paddles. Modern biphasic waveforms (most commonly Biphasic Truncated Exponential, BTE, or Rectilinear Biphasic, RLB) deliver energy in two phases — positive then negative — reducing the peak current required and minimising myocardial damage compared to monophasic designs.

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| Delivered energy (adult) | 120–200 J (biphasic) | Must match selected setting ±15% per IEC 60601-2-4 |
| Charge time (full charge) | ≤ 10 s from a new battery | Delays > 15 s indicate capacitor or battery degradation |
| Synchronisation delay (SYNC mode) | ≤ 60 ms after R-wave peak | Longer delays risk R-on-T phenomenon |
| Patient leakage current (CF) | ≤ 10 µA (normal), ≤ 50 µA (single-fault) | High leakage indicates pad cable or chassis insulation failure |
| ECG bandwidth (monitoring mode) | 0.05–150 Hz (diagnostic) | Narrow bandwidth masks ST changes and HF noise |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| Device will not charge to selected energy | Degraded main capacitor; faulty charge circuit | Measure charge time against spec; compare delivered vs. selected energy on tester | Replace capacitor or charge board; escalate to manufacturer |
| Battery depletes faster than rated | Aged lithium-ion cells; excessive standby time | Perform full charge/discharge cycle; compare run time to BMS data | Replace battery pack; update firmware if BMS issue |
| ECG trace shows 50/60 Hz noise | Broken electrode lead; poor patient skin prep; common-mode interference | Swap lead cable; test with simulator; check ground continuity | Replace cable; improve skin prep; verify mains isolation |
| SYNC mode fails to mark R-wave | Low-amplitude ECG signal; wrong lead selected; filter settings | Increase gain; select lead with tallest R-wave; check notch filter | Adjust signal processing settings; if persistent, suspect ECG amplifier fault |
| "Check pads" alert with pads attached | Pad connector corrosion; cable continuity loss; expired pads | Measure pad impedance with tester (should be 25–180 Ω); inspect connector pins | Clean or replace connector; replace pad cable harness |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer and your facility's PM programme (typically annually, or after a defined number of shocks).

1. **Visual and mechanical inspection** — Check housing for cracks, connector pins for corrosion, cable sheaths for cuts, and pads/paddles for wear. Verify all labels are legible.

2. **Battery capacity test** — Using the device's built-in self-test or a load tester, confirm the battery delivers at least 80% of rated capacity. Record state of health (SoH) from the BMS if accessible.

3. **Energy delivery accuracy test** — Using a calibrated defibrillator tester (e.g., Fluke Impulse 7000DP) at a 50 Ω load, verify delivered energy at 50 J, 100 J, 150 J, and maximum joules. Each result must be within ±15% of the selected energy per IEC 60601-2-4 §201.7.9.3.

4. **Charge time test** — From a full battery, time charge to maximum energy. New devices should charge in ≤ 8 s (LIFEPAK 15 spec); flag if > 10 s.

5. **Electrical safety testing** — Per IEC 62353, measure earth/ground bond resistance (< 0.3 Ω on CF-rated equipment), touch current, and patient leakage current. Defibrillators are Type CF (cardiac floating) — apply the CF limits.

---

## Related Standards

- **IEC 60601-2-4:2010+AMD1:2020** — Particular requirements for defibrillators. Specifies energy delivery accuracy, charge time, synchronisation, and waveform requirements.
- **IEC 60601-2-27:2011+AMD1:2018** — Particular requirements for ECG monitoring equipment. Governs bandwidth, CMRR, electrode polarisation, and pacemaker pulse rejection.
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment. Defines simplified safety test methods for in-service testing.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance (the parent standard).
- **EN 1789:2020** — Medical vehicles and their equipment — Road ambulances (relevant for transport defibrillators).

---

## Related Scenarios

Practice diagnosing defibrillator faults with guided simulation scenarios:

- [Defibrillator won't charge — LIFEPAK 15](/en/scenarios/defib-wont-charge/) *(Level 1)*
- [Battery failure mid-resuscitation](/en/scenarios/defib-battery-failure/) *(Level 2)*
- [ECG noise during monitoring](/en/scenarios/ecg-noise-defib/) *(Level 1)*
- [Synchronized cardioversion won't fire](/en/scenarios/defib-sync-failure/) *(Level 2)*
- ["Check Pads" alert with pads connected](/en/scenarios/defib-pad-alert/) *(Level 1)*
