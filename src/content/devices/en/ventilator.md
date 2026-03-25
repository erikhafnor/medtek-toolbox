---
title: "Ventilators"
category: "ventilator"
description: "Reference guide for critical care ventilator maintenance, testing, and troubleshooting"
equipment:
  - "Dräger Evita V500"
  - "Hamilton C6"
  - "Fluke VT900A Gas Flow Analyzer"
  - "Dräger test lung"
standards:
  - "IEC 60601-2-12 (Critical care ventilators)"
  - "ISO 80601-2-12 (Home care ventilators)"
  - "IEC 62353 (Recurrent testing)"
order: 3
---

## Overview

Critical care ventilators deliver a precisely controlled mixture of air and oxygen to patients who cannot breathe adequately on their own. They range from ICU ventilators supporting full mechanical ventilation with advanced modes (pressure-controlled, volume-controlled, pressure-support, APRV) to transport ventilators with simplified controls. Clinical engineers are responsible for ensuring gas delivery accuracy (tidal volume, flow, pressure, FiO₂), alarm function, and patient circuit integrity — failures can be immediately life-threatening.

---

## How It Works

A critical care ventilator uses either a turbine-driven blower (increasingly common) or compressed gas from wall outlets (air + O₂) to generate inspiratory flow. An electronic mixing valve or blender sets the oxygen fraction (FiO₂). Inspiratory and expiratory flow sensors measure delivered and returned gas volumes. The difference between inspired and expired volume indicates leaks or patient gas exchange. Pressure sensors at the patient wye monitor airway pressure in real-time.

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| Tidal volume accuracy | ±10% or ±10 mL (whichever is greater) | Inaccurate Vt causes hypo/hyperventilation, lung injury |
| FiO₂ accuracy | ±3–5% of set value | Hypoxia (too low) or oxygen toxicity (too high) |
| PEEP accuracy | ±2 cmH₂O | PEEP maintains alveolar recruitment; inaccuracy causes atelectasis or barotrauma |
| Peak pressure alarm | Set by clinician (typical 35–40 cmH₂O) | High pressure indicates obstruction, bronchospasm, or pneumothorax |
| Disconnect/low pressure alarm | ≤ 15 s detection time | Delayed disconnect detection can cause hypoxia and death |
| Inspiratory flow accuracy | ±10% of set flow | Affects delivered volume and patient-ventilator synchrony |
| Battery backup | ≥ 30 min (IEC 60601-2-12) | Transport and power failure survival |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| Circuit leak alarm (high leak %) | Patient circuit connection loose, cracked humidifier chamber, damaged tubing, cuff leak | Systematic leak check: tighten connections, inspect circuit, perform occlusion test with VT900A | Replace faulty component; retighten connections |
| Tidal volume inaccuracy (under-delivery) | Expiratory flow sensor contaminated/failed, circuit compliance not compensated, leak | Measure delivered Vt with VT900A at patient wye; compare to ventilator display | Clean or replace flow sensor; recalibrate circuit compliance |
| FiO₂ alarm (low or high) | O₂ cell depleted, O₂ blender malfunction, wall O₂ supply pressure low | Verify wall O₂ pressure (4–5 bar); calibrate O₂ cell; test FiO₂ with external analyser | Replace O₂ cell; repair blender; check wall supply |
| Apnoea alarm in spontaneous mode | Sensitivity too low, patient effort weak, trigger type mismatch | Adjust trigger sensitivity; switch between pressure and flow trigger; check for auto-PEEP | Optimise trigger settings; address auto-PEEP |
| High airway pressure alarm | Patient coughing/biting, bronchospasm, kinked circuit, mucus plug, tension pneumothorax | Check circuit for kinks, suction patient, assess clinically, measure circuit resistance with VT900A | Clinical intervention first; replace kinked circuit; rule out pneumothorax |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer (typically annually for ICU ventilators, with interim checks every 6 months).

1. **Visual and mechanical inspection** — Check housing, wheels/brakes, mounting arm, power cord, and all gas connections (NIST/DISS fittings). Verify the breathing circuit connections are secure. Inspect the humidifier for cracks or calcium build-up.

2. **Electrical safety testing** — Per IEC 62353: protective earth resistance (< 0.3 Ω), enclosure leakage current, and patient leakage current (CF applied part limits: ≤ 10 µA normal, ≤ 50 µA single fault).

3. **Gas delivery accuracy** — Using a calibrated gas flow analyser (e.g., Fluke VT900A), verify tidal volume delivery at 200 mL, 500 mL, and 800 mL in volume-controlled mode at a compliance of 50 mL/cmH₂O. Each must be within ±10% or ±10 mL.

4. **FiO₂ accuracy** — Using the VT900A's oxygen analyser, verify FiO₂ at 21%, 50%, and 100%. Each must be within ±3–5% of set value.

5. **Pressure accuracy** — Verify PEEP at 5, 10, and 15 cmH₂O against the VT900A pressure measurement. Verify peak inspiratory pressure limiting. Each must be within ±2 cmH₂O.

6. **Alarm testing** — Test disconnect alarm (response time ≤ 15 s), high pressure alarm, low pressure alarm, apnoea alarm, and power failure alarm. Each must activate within specified limits.

7. **Leak test** — Occlude the patient wye and run a circuit leak test per the manufacturer's procedure. Maximum allowable leak varies by manufacturer (typically < 200 mL/min at 60 cmH₂O).

8. **Battery test** — Run the ventilator on battery with a test lung at typical settings until low-battery alarm. Must provide ≥ 30 minutes per IEC 60601-2-12.

9. **Oxygen cell check** — Record the O₂ cell reading at room air (20.9%) and 100% O₂. If the cell cannot calibrate, replace it.

---

## Related Standards

- **IEC 60601-2-12:2014** — Particular requirements for critical care ventilators. Specifies performance, alarm, and safety requirements.
- **ISO 80601-2-12:2020** — Particular requirements for home care ventilators. Covers ventilator-dependent patients outside the ICU.
- **ISO 80601-2-80:2018** — Particular requirements for ventilatory support equipment (CPAP/BiPAP for obstructive sleep apnoea).
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance.

---

## Related Scenarios

Practice diagnosing ventilator faults with guided simulation scenarios:

- [Circuit leak alarm — Dräger Evita V500](/en/scenarios/vent-leak-alarm/) *(Level 1)*
- [Tidal volume inaccuracy](/en/scenarios/vent-volume-inaccuracy/) *(Level 2)*
- [FiO₂ delivery failure](/en/scenarios/vent-oxygen-failure/) *(Level 2)*
