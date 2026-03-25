---
title: "Patient Monitors & ECG"
category: "patient-monitor"
description: "Reference guide for patient monitor and ECG equipment maintenance, testing, and troubleshooting"
equipment:
  - "Philips IntelliVue MX800"
  - "GE CARESCAPE B650"
  - "Fluke ProSim 8 Patient Simulator"
  - "Fluke ESA615 Electrical Safety Analyzer"
standards:
  - "IEC 60601-2-27 (ECG monitoring equipment)"
  - "IEC 60601-2-49 (Multi-function patient monitoring)"
  - "IEC 60601-2-30 (NIBP monitoring)"
  - "IEC 62353 (Recurrent testing)"
order: 5
---

## Overview

Patient monitors continuously measure and display vital signs — ECG, SpO₂, non-invasive blood pressure (NIBP), temperature, respiratory rate, and optionally invasive pressures, capnography (EtCO₂), and cardiac output. They are the most numerous medical devices in acute care, with hundreds of units across a typical hospital. Clinical engineers manage a large fleet where alarm management, signal quality, and network connectivity are as important as hardware function. The primary safety concern is alarm reliability — both missed true alarms and excessive false alarms (alarm fatigue).

---

## How It Works

A patient monitor acquires physiological signals through multiple channels simultaneously:

- **ECG** — Differential amplifiers measure the voltage between electrode pairs on the patient's skin. The raw signal is filtered, digitised, and processed to extract heart rate, rhythm analysis, ST-segment measurements, and arrhythmia detection.
- **SpO₂** — A pulse oximeter probe transmits red (660 nm) and infrared (940 nm) light through tissue. The ratio of absorbed light at the two wavelengths indicates arterial oxygen saturation.
- **NIBP** — An inflatable cuff occludes an artery. As the cuff deflates, the monitor detects oscillometric pressure variations to calculate systolic, diastolic, and mean arterial pressure.
- **Temperature** — Thermistor probes (skin, rectal, oesophageal) provide continuous or spot temperature readings.

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| ECG bandwidth (diagnostic) | 0.05–150 Hz | Narrow bandwidth masks ST changes and pacemaker spikes |
| ECG CMRR | ≥ 89 dB at 50/60 Hz | Low CMRR allows mains interference onto the trace |
| SpO₂ accuracy | ±2% (70–100% range) | Inaccurate SpO₂ may delay hypoxia detection |
| NIBP accuracy | ±3 mmHg (static) | Treatment decisions depend on accurate BP readings |
| Heart rate accuracy | ±1% or ±1 bpm | Used for drug dosing and arrhythmia detection |
| Alarm response time | ≤ 10 s for critical alarms | Delayed alarms compromise patient safety |
| Patient leakage current (CF) | ≤ 10 µA normal, ≤ 50 µA SFC | ECG electrodes have direct cardiac risk pathway |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| Noisy ECG trace / false arrhythmia alarms | ECG cable fault (broken lead wire), poor electrode contact, EMI from nearby equipment | Systematic cable/lead test with ProSim 8; check electrode impedance; identify EMI sources | Replace cable; improve skin prep; remove EMI source |
| False asystole/VF alarms | Lead disconnect not detected, ECG amplitude too low, lead-off detection fault | Test lead-off detection with ProSim 8; verify alarm thresholds; check electrode impedance | Replace cable; adjust sensitivity; retrain staff on electrode placement |
| SpO₂ reading erratic or absent | Probe positioned incorrectly, ambient light interference, low perfusion, nail polish | Check probe placement and finger perfusion; test with ProSim 8 SpO₂ simulation; shield from ambient light | Reposition probe; use different site; clean sensor |
| NIBP error / unable to determine | Cuff size incorrect, cuff leak, air hose kinked, excessive patient movement | Inspect cuff and hose for leaks; verify cuff size; test with NIBP simulator | Replace cuff/hose; select correct size; retry when patient is still |
| Alarm fatigue (excessive non-actionable alarms) | Alarm thresholds too tight, default settings not customised, arrhythmia algorithm over-sensitive | Audit alarm logs; review threshold settings against clinical needs; compare alarm rates across units | Customise thresholds per unit/patient acuity; disable non-critical alarms per protocol |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer (typically annually, with interim checks for high-use units).

1. **Visual and mechanical inspection** — Check housing, display, mounting arm, power cord, battery compartment, and all cable connectors. Verify the touchscreen or controls respond correctly. Inspect ECG cables, SpO₂ sensors, NIBP cuffs, and temperature probes for damage.

2. **Electrical safety testing** — Per IEC 62353: protective earth resistance (< 0.3 Ω for Class I), enclosure leakage current, and patient leakage current. ECG inputs are Type CF applied parts — apply CF limits (≤ 10 µA normal, ≤ 50 µA SFC).

3. **ECG accuracy** — Using a patient simulator (e.g., Fluke ProSim 8), verify: heart rate accuracy at 30, 60, 120, and 240 bpm; ECG waveform morphology; ST-segment detection; pacemaker spike detection and rejection; respiratory rate via impedance pneumography.

4. **SpO₂ accuracy** — Using the ProSim 8 SpO₂ simulation, verify readings at 98%, 90%, 85%, and 80%. Each must be within ±2% of the simulated value.

5. **NIBP accuracy** — Using an NIBP simulator or calibrated manometer, verify static pressure accuracy (±3 mmHg) and that the monitor correctly determines simulated systolic/diastolic values.

6. **Alarm testing** — Verify all critical alarms: asystole, VF/VT, bradycardia, tachycardia, SpO₂ low, apnoea. Each must activate within specified response times with appropriate audio/visual annunciation.

7. **Battery test** — Run the monitor on battery until low-battery alarm. Verify the battery provides at least the manufacturer-specified run time (typically ≥ 2 hours for bedside monitors, ≥ 4 hours for transport).

8. **Network connectivity** — Verify the monitor connects to the central station and that waveforms, alarms, and data transfer correctly. Test alarm notification forwarding if applicable.

---

## Related Standards

- **IEC 60601-2-27:2011+AMD1:2018** — Particular requirements for ECG monitoring equipment. Governs bandwidth, CMRR, electrode polarisation, pacemaker pulse rejection, and defibrillation protection.
- **IEC 60601-2-49:2018** — Particular requirements for multi-function patient monitoring. Covers integration of multiple measurement parameters.
- **IEC 60601-2-30:2018** — Particular requirements for non-invasive blood pressure monitoring.
- **IEC 60601-2-61:2017** — Particular requirements for pulse oximeters.
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance.

---

## Related Scenarios

Practice diagnosing patient monitor faults with guided simulation scenarios:

- [False asystole alarm — Philips IntelliVue](/en/scenarios/ecg-false-asystole/) *(Level 1)*
- [NIBP measurement failure](/en/scenarios/monitor-nbp-failure/) *(Level 1)*
- [Alarm fatigue investigation](/en/scenarios/monitor-alarm-fatigue/) *(Level 2)*
