---
title: "Clinical Engineering Formulas & Calculations"
description: "Essential calculations for medical device testing, electrical safety, and clinical engineering"
tags: ["formulas", "calculations", "electrical safety", "testing"]
order: 6
---

## Electrical Safety

### Ohm's Law

The foundation of all electrical measurements:

```
V = I × R
I = V / R
R = V / I
```

Where: V = voltage (volts), I = current (amperes), R = resistance (ohms)

**Application:** Calculating expected leakage current. If a device has insulation resistance of 10 MΩ and is connected to 230 V mains:

```
I = V / R = 230 V / 10,000,000 Ω = 23 µA
```

---

### Power

```
P = V × I
P = I² × R
P = V² / R
```

Where: P = power (watts)

**Application:** Defibrillator energy and ESU output power measurements.

---

### Energy (Defibrillator)

Energy stored in the capacitor:

```
E = ½ × C × V²
```

Where: E = energy (joules), C = capacitance (farads), V = voltage (volts)

**Application:** A defibrillator capacitor of 200 µF charged to 1000 V:

```
E = ½ × 0.0002 × 1000² = 100 J
```

**Delivered energy** is always less than stored energy due to losses in the circuit and patient impedance. IEC 60601-2-4 specifies delivered energy must be within ±15% of the selected setting.

---

### Defibrillator Energy Accuracy

```
Error (%) = ((Delivered - Selected) / Selected) × 100
```

**Acceptance criterion:** |Error| ≤ 15% per IEC 60601-2-4

**Example:** Selected 200 J, delivered 185 J:

```
Error = ((185 - 200) / 200) × 100 = -7.5% → PASS
```

---

### Impedance

For patient-connected devices, impedance determines current flow:

```
Z = V / I   (for AC circuits)
```

**Defibrillator load:** Standard test load is 50 Ω (simulates adult thoracic impedance). Actual patient impedance ranges from 25–180 Ω depending on pad size, placement, skin condition, and thoracic geometry.

**ESU return electrode:** Normal pad impedance is 5–50 Ω. Alarm threshold is typically 135 Ω (Erbe VIO).

---

## Infusion Pump Calculations

### Flow Rate Accuracy

```
Error (%) = ((Measured - Set) / Set) × 100
```

**Acceptance criterion:** |Error| ≤ 5% at steady state per IEC 60601-2-24

**Example:** Set rate 100 mL/h, measured 97 mL/h:

```
Error = ((97 - 100) / 100) × 100 = -3% → PASS
```

---

### Dose Rate Calculation

For weight-based drug infusions:

```
Dose rate (mcg/kg/min) = (Concentration (mg/mL) × Flow rate (mL/h) × 1000) / (Weight (kg) × 60)
```

**Example:** Norepinephrine 4 mg in 250 mL (= 16 mcg/mL), running at 5 mL/h for a 70 kg patient:

```
Dose = (0.016 × 5 × 1000) / (70 × 60) = 0.019 mcg/kg/min
```

---

### Drip Rate (Gravity Infusion)

```
Drops/min = (Volume (mL) × Drop factor (drops/mL)) / Time (min)
```

Standard drop factors: 20 drops/mL (standard set), 60 drops/mL (micro-drip set)

**Example:** 1000 mL over 8 hours using a 20 drops/mL set:

```
Drops/min = (1000 × 20) / (8 × 60) = 41.7 ≈ 42 drops/min
```

---

## Ventilator Calculations

### Minute Ventilation

```
V̇E = Vt × RR
```

Where: V̇E = minute ventilation (L/min), Vt = tidal volume (L), RR = respiratory rate (/min)

**Example:** Vt 500 mL, RR 14:

```
V̇E = 0.5 × 14 = 7.0 L/min
```

---

### Tidal Volume Accuracy

```
Error (%) = ((Measured - Set) / Set) × 100
```

**Acceptance criterion:** |Error| ≤ 10% or ≤ 10 mL (whichever is greater) per IEC 60601-2-12

**Example:** Set 500 mL, measured 465 mL:

```
Error = ((465 - 500) / 500) × 100 = -7% → PASS (within ±10%)
```

Set 200 mL, measured 185 mL:

```
Error = ((185 - 200) / 200) × 100 = -7.5%
Absolute error = 15 mL > 10 mL → Check against ±10% = ±20 mL → 15 mL < 20 mL → PASS
```

---

### Static Compliance

```
Cst = Vt / (Pplateau - PEEP)
```

Where: Cst = static compliance (mL/cmH₂O)

**Normal range:** 50–100 mL/cmH₂O (intubated adult)

**Application:** Trending compliance to detect changes in lung condition (atelectasis, pneumothorax, fluid overload).

---

### Airway Resistance

```
Raw = (PIP - Pplateau) / Flow
```

Where: Raw = airway resistance (cmH₂O/L/s), PIP = peak inspiratory pressure, Flow = inspiratory flow (L/s)

**Normal range:** 5–10 cmH₂O/L/s (intubated adult)

---

## ECG and Monitoring

### Heart Rate from R-R Interval

```
HR (bpm) = 60 / R-R interval (seconds)
```

**Example:** R-R interval = 0.75 s:

```
HR = 60 / 0.75 = 80 bpm
```

---

### Common Mode Rejection Ratio (CMRR)

```
CMRR (dB) = 20 × log₁₀(Vcommon / Vdifferential)
```

**IEC 60601-2-27 requirement:** ≥ 89 dB at 50/60 Hz

A CMRR of 89 dB means the amplifier rejects the common-mode signal (e.g., mains interference) by a factor of approximately 28,000:1 relative to the desired differential signal (ECG).

---

### SpO₂ — Beer-Lambert Principle

Pulse oximetry is based on the ratio of red (660 nm) to infrared (940 nm) light absorption:

```
R = (AC_red / DC_red) / (AC_IR / DC_IR)
```

The R value is mapped to SpO₂ using an empirical calibration curve (stored in the oximeter firmware). This is why SpO₂ accuracy is specified as ±2% — it's based on a calibration curve, not a direct physical measurement.

---

## General Test and Measurement

### Percentage Error

```
Error (%) = ((Measured - True) / True) × 100
```

### Uncertainty

When a measurement has a stated accuracy of ±X%:

```
True value range = Measured ± (Measured × X/100)
```

**Example:** SpO₂ reads 94% with ±2% accuracy:

```
True SpO₂ = 94% ± 2% = 92–96%
```

### Decibel Conversion

```
dB = 20 × log₁₀(V₁/V₂)    (for voltage ratios)
dB = 10 × log₁₀(P₁/P₂)    (for power ratios)
```

| Ratio | dB |
|---|---|
| 2:1 | 6 dB (voltage), 3 dB (power) |
| 10:1 | 20 dB (voltage), 10 dB (power) |
| 100:1 | 40 dB |
| 1000:1 | 60 dB |
| 28,000:1 | ≈ 89 dB (CMRR requirement) |
