---
title: "Formler og beregninger for klinisk ingeniørfag"
description: "Viktige beregninger for testing av medisinsk utstyr, elektrisk sikkerhet og klinisk ingeniørfag"
tags: ["formler", "beregninger", "elektrisk sikkerhet", "testing"]
order: 6
---

## Elektrisk sikkerhet

### Ohms lov

Grunnlaget for alle elektriske målinger:

```
V = I × R
I = V / R
R = V / I
```

Der: V = spenning (volt), I = strøm (ampere), R = motstand (ohm)

**Anvendelse:** Beregning av forventet lekkstrøm. Hvis et apparat har isolasjonsmotstand på 10 MOhm og er tilkoblet 230 V nettspenning:

```
I = V / R = 230 V / 10,000,000 Ω = 23 µA
```

---

### Effekt

```
P = V × I
P = I² × R
P = V² / R
```

Der: P = effekt (watt)

**Anvendelse:** Defibrillatorenergi og målinger av ESU-utgangseffekt.

---

### Energi (defibrillator)

Energi lagret i kondensatoren:

```
E = ½ × C × V²
```

Der: E = energi (joule), C = kapasitans (farad), V = spenning (volt)

**Anvendelse:** En defibrillatorkondensator på 200 uF ladet til 1000 V:

```
E = ½ × 0.0002 × 1000² = 100 J
```

**Levert energi** er alltid lavere enn lagret energi på grunn av tap i kretsen og pasientimpedans. IEC 60601-2-4 spesifiserer at levert energi må være innenfor +/-15 % av valgt innstilling.

---

### Nøyaktighet for defibrillatorenergi

```
Error (%) = ((Delivered - Selected) / Selected) × 100
```

**Akseptkriterium:** |Avvik| <= 15 % i henhold til IEC 60601-2-4

**Eksempel:** Valgt 200 J, levert 185 J:

```
Error = ((185 - 200) / 200) × 100 = -7.5% → GODKJENT
```

---

### Impedans

For pasienttilkoblet utstyr bestemmer impedans strømflyten:

```
Z = V / I   (for AC circuits)
```

**Defibrillatorbelastning:** Standard testbelastning er 50 Ohm (simulerer voksen thorakal impedans). Faktisk pasientimpedans varierer fra 25--180 Ohm avhengig av elektrodestørrelse, plassering, hudtilstand og thorakal geometri.

**ESU-returelektrode:** Normal elektrodemotstand er 5--50 Ohm. Alarmgrense er typisk 135 Ohm (Erbe VIO).

---

## Infusjonspumpeberegninger

### Nøyaktighet for volumstrøm

```
Error (%) = ((Measured - Set) / Set) × 100
```

**Akseptkriterium:** |Avvik| <= 5 % ved stabil tilstand i henhold til IEC 60601-2-24

**Eksempel:** Innstilt hastighet 100 mL/t, målt 97 mL/t:

```
Error = ((97 - 100) / 100) × 100 = -3% → GODKJENT
```

---

### Doseberegning

For vektbaserte legemiddelinfusjoner:

```
Dose rate (mcg/kg/min) = (Concentration (mg/mL) × Flow rate (mL/h) × 1000) / (Weight (kg) × 60)
```

**Eksempel:** Noradrenalin 4 mg i 250 mL (= 16 mcg/mL), infusjonshastighet 5 mL/t for en pasient på 70 kg:

```
Dose = (0.016 × 5 × 1000) / (70 × 60) = 0.019 mcg/kg/min
```

---

### Drypphastighet (gravitasjonsinfusjon)

```
Drops/min = (Volume (mL) × Drop factor (drops/mL)) / Time (min)
```

Standard dråpefaktorer: 20 dråper/mL (standardsett), 60 dråper/mL (mikrodråpesett)

**Eksempel:** 1000 mL over 8 timer med et 20 dråper/mL-sett:

```
Drops/min = (1000 × 20) / (8 × 60) = 41.7 ≈ 42 drops/min
```

---

## Respiratorberegninger

### Minuttventilasjon

```
V̇E = Vt × RR
```

Der: V̇E = minuttventilasjon (L/min), Vt = tidalvolum (L), RR = respirasjonsfrekvens (/min)

**Eksempel:** Vt 500 mL, RR 14:

```
V̇E = 0.5 × 14 = 7.0 L/min
```

---

### Nøyaktighet for tidalvolum

```
Error (%) = ((Measured - Set) / Set) × 100
```

**Akseptkriterium:** |Avvik| <= 10 % eller <= 10 mL (det som er størst) i henhold til IEC 60601-2-12

**Eksempel:** Innstilt 500 mL, målt 465 mL:

```
Error = ((465 - 500) / 500) × 100 = -7% → GODKJENT (innenfor ±10%)
```

Innstilt 200 mL, målt 185 mL:

```
Error = ((185 - 200) / 200) × 100 = -7.5%
Absolute error = 15 mL > 10 mL → Check against ±10% = ±20 mL → 15 mL < 20 mL → PASS
```

---

### Statisk compliance

```
Cst = Vt / (Pplateau - PEEP)
```

Der: Cst = statisk compliance (mL/cmH2O)

**Normalområde:** 50--100 mL/cmH2O (intubert voksen)

**Anvendelse:** Trendfølging av compliance for å oppdage endringer i lungetilstand (atelektase, pneumothorax, væskeoverlast).

---

### Luftveismotstand

```
Raw = (PIP - Pplateau) / Flow
```

Der: Raw = luftveismotstand (cmH2O/L/s), PIP = toppinspiratorisk trykk, Flow = inspiratorisk flow (L/s)

**Normalområde:** 5--10 cmH2O/L/s (intubert voksen)

---

## ECG og overvåking

### Hjertefrekvens fra R-R-intervall

```
HR (bpm) = 60 / R-R interval (seconds)
```

**Eksempel:** R-R-intervall = 0,75 s:

```
HR = 60 / 0.75 = 80 bpm
```

---

### Common Mode Rejection Ratio (CMRR)

```
CMRR (dB) = 20 × log₁₀(Vcommon / Vdifferential)
```

**IEC 60601-2-27-krav:** >= 89 dB ved 50/60 Hz

En CMRR på 89 dB betyr at forsterkeren demper fellessignalet (f.eks. nettfrekvensinterferens) med en faktor på omtrent 28 000:1 i forhold til det ønskede differensielle signalet (ECG).

---

### SpO2 -- Beer-Lamberts prinsipp

Pulsoksymetri er basert på forholdet mellom absorbansen av rødt (660 nm) og infrarødt (940 nm) lys:

```
R = (AC_red / DC_red) / (AC_IR / DC_IR)
```

R-verdien kartlegges til SpO2 ved hjelp av en empirisk kalibreringskurve (lagret i oksymeterfirmwaren). Dette er grunnen til at SpO2-nøyaktighet er spesifisert som +/-2 % -- den er basert på en kalibreringskurve, ikke en direkte fysisk måling.

---

## Generell test og måling

### Prosentvis avvik

```
Error (%) = ((Measured - True) / True) × 100
```

### Målenøyaktighet

Når en måling har en oppgitt nøyaktighet på +/-X %:

```
True value range = Measured ± (Measured × X/100)
```

**Eksempel:** SpO2 viser 94 % med +/-2 % nøyaktighet:

```
True SpO₂ = 94% ± 2% = 92–96%
```

### Desibelkonvertering

```
dB = 20 × log₁₀(V₁/V₂)    (for voltage ratios)
dB = 10 × log₁₀(P₁/P₂)    (for power ratios)
```

| Forhold | dB |
|---|---|
| 2:1 | 6 dB (spenning), 3 dB (effekt) |
| 10:1 | 20 dB (spenning), 10 dB (effekt) |
| 100:1 | 40 dB |
| 1000:1 | 60 dB |
| 28 000:1 | ca. 89 dB (CMRR-krav) |
