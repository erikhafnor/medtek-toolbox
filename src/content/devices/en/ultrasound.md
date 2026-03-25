---
title: "Ultrasound Systems"
category: "ultrasound"
description: "Reference guide for diagnostic ultrasound system maintenance, testing, and troubleshooting"
equipment:
  - "GE LOGIQ E10"
  - "Philips EPIQ 7"
  - "CIRS Multi-Purpose Ultrasound Phantom (Model 040GSE)"
  - "Fluke ESA615 Electrical Safety Analyzer"
standards:
  - "IEC 60601-2-37 (Diagnostic ultrasound)"
  - "IEC 62359 (Ultrasonics — Field characterisation)"
  - "IEC 62353 (Recurrent testing)"
order: 6
---

## Overview

Diagnostic ultrasound systems use high-frequency sound waves (1–20 MHz) to create real-time images of internal body structures. They are used across virtually every clinical specialty — from obstetrics and cardiology to emergency medicine and interventional procedures. Unlike X-ray or CT, ultrasound uses no ionising radiation, making it safe for repeated use including during pregnancy. Clinical engineers are responsible for image quality assurance, probe integrity, electrical safety, and managing a fleet that may include dozens of systems with hundreds of transducer probes.

---

## How It Works

A piezoelectric transducer (probe) converts electrical pulses into ultrasound waves that propagate into tissue. When the waves encounter interfaces between tissues of different acoustic impedance (e.g., fluid-tissue, tissue-bone), they are partially reflected back to the probe. The returning echoes are converted to electrical signals, processed, and displayed as a 2D image (B-mode), motion trace (M-mode), or blood flow information (Doppler).

### Key Parameters

| Parameter | Typical Specification | Clinical Significance |
|---|---|---|
| Axial resolution | 0.5–2 mm (frequency-dependent) | Determines ability to distinguish closely spaced structures along beam axis |
| Lateral resolution | 1–3 mm (frequency/focus-dependent) | Determines ability to distinguish side-by-side structures |
| Penetration depth | 1 cm (15 MHz) to 30 cm (2 MHz) | Higher frequency = better resolution but less depth |
| Frame rate | 20–100+ fps | Low frame rate affects real-time imaging of moving structures (heart) |
| Dynamic range | 60–100+ dB | Wider range shows more subtle tissue differences |
| Mechanical index (MI) | ≤ 1.9 (diagnostic limit) | Safety limit — higher MI increases risk of cavitation |
| Thermal index (TI) | Displayed to user | Indicates potential for tissue heating — especially relevant in obstetrics |

---

## Common Failure Modes

| Failure | Likely Cause | Diagnostic Steps | Resolution |
|---|---|---|---|
| Dark lines/bands in image (element dropout) | Damaged piezoelectric elements in probe | Scan a phantom or in-air test; count dropout lines; compare to baseline | If < 5% elements: monitor; if > 5%: repair or replace probe |
| Poor image quality / reduced penetration | Acoustic lens damage, gel dried on probe face, system gain/preset misconfigured | Phantom QA test: check uniformity, depth of penetration, cyst detectability | Clean probe face; reconfigure presets; if persistent, probe service |
| Probe connector intermittent | Bent connector pins, worn locking mechanism, corrosion | Inspect connector pins; wiggle test during imaging; try probe on different system | Clean/straighten pins; if persistent, replace connector assembly |
| Electrical safety failure (high leakage) | Probe cable insulation damage, fluid ingress into probe housing, cracked acoustic lens | Electrical safety test per IEC 62353; visual inspection of cable and lens | Replace cable; if fluid ingress, probe requires manufacturer service |
| System freezes or crashes | Software bug, insufficient memory, GPU overheating, corrupted presets | Check error logs, verify software version, test thermal management, reset presets | Software update; clean cooling vents; factory reset if persistent |

---

## Preventive Maintenance

Perform at the interval specified by the manufacturer (typically annually, with quarterly image quality checks).

1. **Visual inspection** — Check system housing, wheels, display, keyboard/trackball, all cable connectors. Inspect each probe: acoustic lens for cracks/delamination, cable for cuts/kinks, connector pins for bending/corrosion, strain relief for damage.

2. **Electrical safety testing** — Per IEC 62353: protective earth resistance (Class I systems), enclosure leakage current, and patient leakage current for each probe (Type BF applied parts: ≤ 100 µA normal, ≤ 500 µA SFC).

3. **Image quality — Phantom test** — Using a tissue-mimicking phantom (e.g., CIRS 040GSE), acquire standardised images and evaluate:
   - **Uniformity** — even brightness across the image field
   - **Depth of penetration** — maximum depth at which targets are visible
   - **Axial and lateral resolution** — smallest resolvable target group
   - **Cyst detectability** — anechoic cysts visible at specified depths
   - **Caliper accuracy** — measured distances match known phantom target separations (±1 mm or ±1%)

4. **Probe element check** — Perform an in-air test or phantom scan to identify element dropout (dark vertical lines in the image). Document the number and location of dropout elements. Baseline at commissioning, track over time.

5. **Monitor calibration** — Verify the display meets DICOM GSDF (Grayscale Standard Display Function) if the system is used for primary diagnosis. Check brightness, contrast, and greyscale uniformity.

6. **Software and preset review** — Verify the software version matches the current approved version. Check that clinical presets (exam types, gain defaults, annotation libraries) are correct and up to date.

---

## Related Standards

- **IEC 60601-2-37:2024** — Particular requirements for the basic safety and essential performance of diagnostic and therapeutic ultrasound equipment. Covers acoustic output limits (MI, TI), transducer safety, and display requirements.
- **IEC 62359:2010+AMD1:2017** — Ultrasonics — Field characterisation: test methods for determining thermal and mechanical indices. Specifies how MI and TI are measured and reported.
- **IEC 62353:2014** — Recurrent test and test after repair of medical electrical equipment.
- **IEC 60601-1:2005+AMD2:2020** — General requirements for basic safety and essential performance.
- **AIUM Practice Parameter for the Performance of Ultrasound Equipment QA** — Provides practical guidance for routine QA testing protocols.

---

## Related Scenarios

Practice diagnosing ultrasound system faults with guided simulation scenarios:

- [Image artifacts and element dropout](/en/scenarios/us-image-artifacts/) *(Level 1)*
- [Probe failure investigation](/en/scenarios/us-probe-failure/) *(Level 2)*
- [Electrical safety after fluid spill](/en/scenarios/us-electrical-safety/) *(Level 2)*
