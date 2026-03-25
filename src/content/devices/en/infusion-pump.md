---
title: "Infusion Pumps"
category: "infusion-pump"
description: "Reference guide for infusion pump maintenance, testing, and troubleshooting"
equipment:
  - "B. Braun Infusomat Space"
  - "Alaris GP Volumetric Pump (BD)"
  - "IDA-5 Infusion Device Analyzer (Fluke Biomedical)"
standards:
  - "IEC 60601-2-24 (Infusion pumps and controllers)"
  - "IEC 62353 (Recurrent testing)"
order: 2
---

## Overview

Infusion pumps deliver fluids, medications, and nutrients to patients at controlled rates — from as low as 0.1 mL/h for neonatal drug infusions to over 999 mL/h for rapid fluid resuscitation. They are among the most ubiquitous devices in any hospital, and their failure modes can range from nuisance alarms to life-threatening over- or under-infusion. Clinical engineers are responsible for ensuring flow rate accuracy, alarm function, and safety mechanisms (particularly free-flow prevention and air-in-line detection).

---

## How It Works

A volumetric infusion pump uses a peristaltic mechanism (linear or rotary) to propel fluid through a disposable administration set. The pump segment of the tubing is compressed sequentially by fingers or rollers, pushing fluid forward at a calibrated rate. An optical or ultrasonic drop sensor, or a direct volumetric measurement, provides closed-loop flow control.

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| Flow rate accuracy | ±5% of set rate (steady state) | Over-infusion of vasoactive drugs can cause hemodynamic instability |
| Occlusion alarm pressure | 100–900 mmHg (adjustable) | High threshold delays detection of infiltration or disconnection |
| Bolus on occlusion release | ≤ 0.5 mL (IEC 60601-2-24) | Uncontrolled bolus after clearing occlusion can deliver a toxic dose |
| Air-in-line detection | ≤ 50 µL single bubble (typical) | Large air emboli risk cerebral or cardiac complications |
| Free-flow prevention | Anti-siphon valve in set | Gravity-driven free-flow can deliver the entire bag in minutes |
| Start-up time (trumpet curve) | Stabilises within ±5% in < 5 min | Delayed onset affects time-critical medications |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| Frequent false occlusion alarms | Worn pump mechanism (finger/roller wear), incorrect set loading, kinked tubing | Test with IDA-5 at set pressure thresholds; inspect pump fingers for wear marks | Replace worn pump mechanism; retrain staff on set loading |
| Flow rate inaccuracy (over- or under-infusion) | Pump mechanism wear, incorrect set type, calibration drift | Measure flow rate with IDA-5 at low (5 mL/h), medium (100 mL/h), and high (500 mL/h) rates | Recalibrate or replace pump mechanism; verify correct set type |
| Air-in-line alarm with no visible air | Contaminated ultrasonic sensor, sensor misalignment, micro-bubbles in fluid | Clean sensor with lint-free wipe; test with IDA-5 air detection module; check IV fluid for dissolved gas | Clean or replace sensor; degas fluid; check for leaks upstream |
| Free-flow event | Anti-siphon valve failure in administration set, door interlock bypassed | Test anti-siphon valve function; verify door interlock switch operation | Replace administration set; repair door interlock; report as safety incident |
| Drug library errors / wrong concentration | Outdated drug library, manual override of guardrails | Verify library version against pharmacy-approved current version | Update drug library; review override logs with pharmacy |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer and your facility's PM programme (typically annually for high-risk infusion pumps).

1. **Visual and mechanical inspection** — Check housing for cracks or fluid ingress, inspect the pump door mechanism and latch, verify the tubing clamp and anti-free-flow mechanism operate smoothly. Check the power cord and strain relief.

2. **Flow rate accuracy test** — Using a calibrated infusion device analyser (e.g., IDA-5), measure flow rate at a minimum of three set points: low (5–10 mL/h), medium (100 mL/h), and high (500+ mL/h). Each result must be within ±5% of the set rate after stabilisation (IEC 60601-2-24 §201.12.1).

3. **Occlusion alarm test** — Using the IDA-5 in pressure mode, verify the pump detects occlusion at the set alarm pressure threshold. Test both upstream (inlet) and downstream (outlet) occlusion. Record alarm pressure and response time.

4. **Bolus after occlusion test** — Occlude the line, allow pressure to build, then release. Measure the bolus volume delivered on release. Must be ≤ 0.5 mL per IEC 60601-2-24.

5. **Air-in-line detection test** — Using the IDA-5 air detection module, inject calibrated air bubbles and verify the pump alarms at or below the manufacturer's specified detection threshold.

6. **Electrical safety testing** — Per IEC 62353, measure protective earth resistance (< 0.3 Ω for Class I devices), enclosure leakage current, and patient leakage current if applicable.

7. **Battery test** — Run the pump on battery until the low-battery alarm activates. Verify the battery provides at least the manufacturer-specified run time (typically ≥ 4 hours at 125 mL/h).

---

## Related Standards

- **IEC 60601-2-24:2012** — Particular requirements for infusion pumps and controllers. Specifies flow rate accuracy, occlusion detection, bolus limits, air detection, and free-flow prevention requirements.
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance.
- **IEC 80001-1:2021** — Application of risk management for IT-networks incorporating medical devices (relevant for networked pump systems and drug library management).
- **EN 1789:2020** — Medical vehicles and their equipment — Road ambulances (relevant for transport infusion pumps).

---

## Related Scenarios

Practice diagnosing infusion pump faults with guided simulation scenarios:

- [False occlusion alarms — B. Braun Infusomat Space](/en/scenarios/pump-occlusion-alarm/) *(Level 1)*
- [Free-flow incident investigation](/en/scenarios/pump-free-flow/) *(Level 3)*
- [Drug library dose error](/en/scenarios/pump-dose-error/) *(Level 2)*
