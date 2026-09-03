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

**Anvendelse:** Beregning av forventet lekkasjestrøm. Hvis et apparat har isolasjonsmotstand på 10 MΩ og er tilkoblet 230 V nettspenning:

```
I = V / R = 230 V / 10 000 000 Ω = 23 µA
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

**Anvendelse:** En defibrillatorkondensator på 200 µF ladet til 1000 V:

```
E = ½ × 0,0002 × 1000² = 100 J
```

**Levert energi** er alltid lavere enn lagret energi på grunn av tap i kretsen og pasientimpedans. IEC 60601-2-4 spesifiserer at levert energi, målt i en testbelastning på 50 Ω, skal ligge innenfor ±15 % av valgt energi, **eller ±4 J — det som er størst**.

---

### Nøyaktighet for defibrillatorenergi

```
Avvik (%) = ((Levert - Valgt) / Valgt) × 100
```

**Akseptkriterium:** levert energi innenfor ±15 % av valgt energi, **eller ±4 J — det som er størst**, målt i en testbelastning på 50 Ω (IEC 60601-2-4). Det er ±4 J-leddet som er styrende ved lave innstillinger: ved valgt 5 J er det akseptable området 1–9 J, ikke 4,25–5,75 J.

**Eksempel:** Valgt 200 J, levert 185 J:

```
Avvik = ((185 - 200) / 200) × 100 = -7,5 % → GODKJENT
```

---

### Impedans

For pasienttilkoblet utstyr bestemmer impedans strømflyten:

```
Z = V / I   (for vekselstrømkretser)
```

**Defibrillatorbelastning:** Standard testbelastning er 50 Ω (simulerer voksen thorakal impedans). Faktisk pasientimpedans varierer fra 25–180 Ω avhengig av elektrodestørrelse, plassering, hudtilstand og thorakal geometri.

**ESU-returelektrode:** Normal elektrodemotstand er 5–50 Ω. Alarmgrense er typisk 135 Ω (Erbe VIO).

---

## Infusjonspumpeberegninger

### Nøyaktighet for volumstrøm

```
Avvik (%) = ((Målt - Innstilt) / Innstilt) × 100
```

**Akseptkriterium:** |Avvik| ≤ 5 % ved stabil tilstand. Merk hva ±5 % er: leveringsnøyaktigheten en produsent oppgir for en volumetrisk pumpe — det er verdien B. Braun oppgir for Infusomat Space, som brukes i MTE200-labben om infusjonspumper — ikke en grense fastsatt i IEC 60601-2-24. Standarden beskriver hvordan leveringsnøyaktighet måles (oppstarts- og trompetkurver) og krever at pumpen oppfyller verdien produsenten oppgir, så les av den verdien i den medfølgende dokumentasjonen før du avgjør godkjent/ikke godkjent.

**Eksempel:** Innstilt hastighet 100 mL/t, målt 97 mL/t:

```
Avvik = ((97 - 100) / 100) × 100 = -3 % → GODKJENT
```

---

### Doseberegning

For vektbaserte legemiddelinfusjoner:

```
Dosehastighet (mcg/kg/min) = (Konsentrasjon (mg/mL) × Hastighet (mL/t) × 1000) / (Vekt (kg) × 60)
```

**Eksempel:** Noradrenalin 4 mg i 250 mL (= 16 mcg/mL), infusjonshastighet 5 mL/t for en pasient på 70 kg:

```
Dose = (0,016 × 5 × 1000) / (70 × 60) = 0,019 mcg/kg/min
```

---

### Drypphastighet (gravitasjonsinfusjon)

```
Dråper/min = (Volum (mL) × Dråpefaktor (dråper/mL)) / Tid (min)
```

Standard dråpefaktorer: 20 dråper/mL (standardsett), 60 dråper/mL (mikrodråpesett)

**Eksempel:** 1000 mL over 8 timer med et 20 dråper/mL-sett:

```
Dråper/min = (1000 × 20) / (8 × 60) = 41,7 ≈ 42 dråper/min
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
V̇E = 0,5 × 14 = 7,0 L/min
```

---

### Nøyaktighet for tidalvolum

```
Avvik (%) = ((Målt - Innstilt) / Innstilt) × 100
```

**Akseptkriterium:** |Avvik| ≤ 10 % eller ≤ 10 mL (det som er størst). Dette er en praktisk intern grense, ikke en verdi hentet fra en standard: IEC 60601-2-12 er trukket tilbake og erstattet av **ISO 80601-2-12:2020** (respiratorer for intensivbehandling), som tillater at levert volum avviker fra innstilt volum med ±(4 mL + 15 % av innstilt volum), og som overlater nøyaktigheten for målt (vist) volum til produsentens erklæring. Sjekk brukerhåndboken for respiratoren som testes før du avgjør godkjent/ikke godkjent.

**Eksempel:** Innstilt 500 mL, målt 465 mL:

```
Avvik = ((465 - 500) / 500) × 100 = -7 % → GODKJENT (innenfor ±10 %)
```

Innstilt 200 mL, målt 185 mL:

```
Avvik = ((185 - 200) / 200) × 100 = -7,5 %
Absolutt avvik = 15 mL > 10 mL → kontroller mot ±10 % = ±20 mL → 15 mL < 20 mL → GODKJENT
```

---

### Statisk compliance

```
Cst = Vt / (Pplateau - PEEP)
```

Der: Cst = statisk compliance (mL/cmH₂O)

**Normalområde:** 50–100 mL/cmH₂O (intubert voksen)

**Anvendelse:** Trendfølging av compliance for å oppdage endringer i lungetilstand (atelektase, pneumothorax, væskeoverlast).

---

### Luftveismotstand

```
Raw = (PIP - Pplateau) / Flow
```

Der: Raw = luftveismotstand (cmH₂O/L/s), PIP = toppinspiratorisk trykk, Flow = inspiratorisk flow (L/s)

**Normalområde:** 5–10 cmH₂O/L/s (intubert voksen)

---

## EKG og overvåking

### Hjertefrekvens fra R-R-intervall

```
HF (slag/min) = 60 / R-R-intervall (sekunder)
```

**Eksempel:** R-R-intervall = 0,75 s:

```
HF = 60 / 0,75 = 80 slag/min
```

---

### Common Mode Rejection Ratio (CMRR)

```
CMRR (dB) = 20 × log₁₀(Vcommon / Vdifferential)
```

**IEC 60601-2-27-krav:** ≥ 89 dB ved 50/60 Hz

En CMRR på 89 dB betyr at forsterkeren demper fellessignalet (f.eks. nettfrekvensinterferens) med en faktor på omtrent 28 000:1 i forhold til det ønskede differensielle signalet (EKG).

---

### SpO₂ — Beer-Lamberts prinsipp

Pulsoksymetri er basert på forholdet mellom absorbansen av rødt (660 nm) og infrarødt (940 nm) lys:

```
R = (AC_red / DC_red) / (AC_IR / DC_IR)
```

R-verdien kartlegges til SpO₂ ved hjelp av en empirisk kalibreringskurve (lagret i oksymeterfirmwaren). Dette er grunnen til at SpO₂-nøyaktighet oppgis statistisk, som en A_rms-verdi på omtrent 2 prosentpoeng mot CO-oksymetri (ISO 80601-2-61) — den bygger på en kalibreringskurve, ikke en direkte fysisk måling.

---

## Generell test og måling

### Prosentvis avvik

```
Avvik (%) = ((Målt - Sann verdi) / Sann verdi) × 100
```

### Måleusikkerhet

Når en måling har en oppgitt nøyaktighet på ±X %:

```
Sant verdiområde = Målt ± (Målt × X/100)
```

**Eksempel:** SpO₂ viser 94 % på en monitor med oppgitt nøyaktighet 2 % — et tilfelle der formelen over **ikke** gjelder:

```
SpO₂-nøyaktighet er A_rms = 2 prosentpoeng (ISO 80601-2-61), IKKE 2 % av avlesningen
→ båndet er 94 % ± 2 = 92–96 %, ikke 94 ± (94 × 0,02) = 92,1–95,9 %
→ A_rms er en statistisk spredning, ikke et garantert bånd: omtrent 1 av 3
  avlesninger faller utenfor, og verdien er bare validert i området 70–100 % SpO₂
```

### Desibelkonvertering

```
dB = 20 × log₁₀(V₁/V₂)    (for spenningsforhold)
dB = 10 × log₁₀(P₁/P₂)    (for effektforhold)
```

| Forhold | dB |
|---|---|
| 2:1 | 6 dB (spenning), 3 dB (effekt) |
| 10:1 | 20 dB (spenning), 10 dB (effekt) |
| 100:1 | 40 dB |
| 1000:1 | 60 dB |
| 28 000:1 | ca. 89 dB (CMRR-krav) |
