---
title: "Veiledning for måling av lekkasjestrøm"
description: "Praktisk veiledning for måling av lekkasjestrømmer på medisinsk utstyr i henhold til IEC 62353"
tags: ["electrical safety", "leakage current", "IEC 62353", "measurement"]
order: 3
---

## Hvorfor lekkasjestrøm er viktig

Lekkasjestrøm er den lille strømmen som flyter gjennom eller over isolasjonen i medisinsk utstyr under normale betingelser eller feilbetingelser. Hos friske personer er overflateberøring med lekkasjestrømmer under noen få milliampere generelt ufarlig. Men hos pasienter med direkte hjertekoblinger (sentralvenøse katetre, pacemakerledninger, intrakardiale katetre) kan strømmer så lave som **50 µA** forårsake ventrikkelflimmer.

Dette er grunnen til at grensene for lekkasjestrøm for CF-applikasjonsdeler (kardial flytende) er ti ganger strengere enn for Type B eller BF.

---

## Utstyr du trenger

| Utstyr | Formål |
|---|---|
| **Elektrisk sikkerhetsanalysator** (f.eks. Fluke ESA615, Rigel 288) | Måler alle lekkasjetyper i henhold til IEC 62353 |
| **IEC 62353-testledninger** | Kobler analysatoren til utstyret som testes |
| **Nettforsyning (kjent god)** | Ren, stabil nettforsyning — unngå skjøteledninger med dårlig jording |
| **Utstyr under test (DUT)** med alle applikasjonsdeler tilkoblet | Test det komplette utstyret slik det brukes klinisk |
| **Dokumentasjonsskjema eller programvare** | Registrer alle resultater |

---

## De tre typene lekkasjestrøm

### 1. Jordlekkasjestrøm (vernelederstrøm)

**Hva det er:** Strøm som flyter fra nettsiden til vernelederen (PE) under normal drift.

**Hvorfor det er viktig:** Hvis PE-tilkoblingen brytes (enkeltfeil), vil denne strømmen flyte gjennom enhver person som berører enhetens chassis.

**Hvordan måle:**
1. Koble DUT til sikkerhetsanalysatoren
2. Mål strømmen i PE-lederen
3. Test under normal betingelse (NC) og med PE åpen (SFC)

| Betingelse | Grense |
|---|---|
| Normal | ≤ 500 µA |
| Enkeltfeil (PE åpen) | ≤ 1000 µA |

**Gjelder for:** Kun Klasse I-utstyr (utstyr med PE-tilkobling).

---

### 2. Kapslingslekkasjestrøm (berøringsstrøm)

**Hva det er:** Strøm som ville flyte fra enhver tilgjengelig ledende del av kapslingen til jord dersom en person berørte den.

**Hvorfor det er viktig:** Dette er strømmen en person (personale eller pasient) ville oppleve ved å berøre enhetskabinettet.

**Hvordan måle:**
1. Koble analysatorens måleprobe til hver tilgjengelig ledende del av kapslingen (metallpaneler, skruer, porter)
2. Mål strøm til jord
3. Test under normal betingelse og enkeltfeil (PE åpen)

| Betingelse | Grense |
|---|---|
| Normal | ≤ 100 µA |
| Enkeltfeil (PE åpen) | ≤ 500 µA |

**Gjelder for:** Alle utstyrsklasser.

---

### 3. Pasient-lekkasjestrøm

**Hva det er:** Strøm som flyter fra applikasjonsdelene (deler som er i kontakt med pasienten) gjennom pasienten til jord.

**Hvorfor det er viktig:** Dette er den mest kritiske målingen for pasientsikkerhet. Applikasjonsdeler er i direkte kontakt med pasienten, og for CF-deler kan de gi en direkte strømvei til hjertet.

**Hvordan måle:**
1. Koble hver applikasjonsdel til analysatorens pasientmåleterminal
2. Mål strøm fra applikasjonsdel til jord
3. Test under normal betingelse og enkeltfeilbetingelser

| Applikasjonsdeltype | Normal betingelse | Enkeltfeilbetingelse |
|---|---|---|
| Type B | ≤ 100 µA | ≤ 500 µA |
| Type BF | ≤ 100 µA | ≤ 500 µA |
| Type CF | ≤ **10 µA** | ≤ **50 µA** |

**Gjelder for:** Alt utstyr med applikasjonsdeler.

---

## Klassifisering av applikasjonsdeler — hurtigreferanse

| Type | Symbolhint | Isolasjon | Eksempler på utstyr |
|---|---|---|---|
| **B** (Body) | Ingen F-suffiks | Koblet til jord | Ultralydtransdusere (kroppsoverflate), fysioterapiutstyr |
| **BF** (Body Floating) | F = flytende | Isolert fra jord | EKG-monitorer (overflateelektroder), pulsoksymetre, NIBP-manchetter |
| **CF** (Cardiac Floating) | C = kardial | Høyeste isolasjon | Defibrillatorer, intrakardialt EKG, pacemakerprogrammerere, hjertekateterutstyr |

> **Tommelfingerregel:** Hvis applikasjonsdelen kan gi en direkte elektrisk strømvei til hjertet (selv teoretisk), er den CF.

---

## IEC 62353 vs IEC 60601-1

| Aspekt | IEC 60601-1 (Typetesting) | IEC 62353 (Periodisk testing) |
|---|---|---|
| **Formål** | Designkvalifisering (fabrikk) | Testing i drift (felt) |
| **Utført av** | Produsent / testlaboratorium | Klinisk ingeniøravdeling |
| **Dielektrisk test** | 1500 V AC i 60 s | 500 V DC i 1 s (valgfritt, kun etter reparasjon) |
| **Teststrøm for jordbinding** | Opp til 25 A | ≤ 200 mA |
| **Risikonivå** | Destruktiv for sensitive kretser | Trygg for montert utstyr |

**Hovedpoeng:** IEC 62353 gir tilsvarende sikkerhetsverifisering som IEC 60601-1, men ved testnivåer som er trygge for utstyr i drift med sensitiv elektronikk installert.

---

## Målemetoder (IEC 62353)

IEC 62353 definerer tre likeverdige metoder for måling av utstyrslekkasjestrøm. Valget avhenger av analysatoren din og DUT:

### Direktemetode
- Måler faktisk strømflyt ved hjelp av et måleinstrument (MD) i kretsen
- Mest intuitiv — du ser den reelle strømmen
- Krever at utstyret er tilkoblet nettforsyning under testen

### Differensialmetode
- Måler forskjellen mellom fase- og nøytralstrøm (enhver forskjell = lekkasje)
- Fordel: trygg for operatøren fordi målekretsen ikke er i strømveien
- Vanlig brukt i moderne sikkerhetsanalysatorer

### Alternativ metode
- Påfører nettspenning til utstyret og måler strømmen som flyter
- Krever ikke at utstyret er koblet til nettforsyning under testen
- Nyttig for utstyr som er vanskelig å teste mens det er påslått

Alle tre metodene er akseptert av IEC 62353. De fleste moderne analysatorer (Fluke ESA615, Rigel 288) støtter flere metoder.

---

## Trinn-for-trinn testprosedyre

### Før testing

1. Visuell inspeksjon av utstyret: tilstand på strømledning, kabinettintegritet, strekkavlastninger, kontakttilstand
2. Verifiser at sikkerhetsanalysatoren er innenfor kalibreringsdato
3. Registrer DUT-informasjon: produsent, modell, serienummer, applikasjonsdeltype(r)
4. Sørg for at DUT er komplett — alle kabler, applikasjonsdeler og tilbehør tilkoblet som ved klinisk bruk

### Testrekkefølge

1. **Jordbinding / PE-resistans** (kun Klasse I)
   - Mål resistans fra PE-pinne på nettstøpsel til hver tilgjengelig metalldel
   - Grense: < 0,3 Ω
   - En høy avlesning indikerer en skadet jordledning eller dårlig tilkobling

2. **Jordlekkasjestrøm** (kun Klasse I)
   - Mål under normal betingelse (NC)
   - Mål under enkeltfeilbetingelse (SFC: PE åpen)
   - Grenser: 500 µA (NC), 1000 µA (SFC)

3. **Kapslingslekkasjestrøm**
   - Mål på hver tilgjengelig metalldel
   - Mål under NC og SFC
   - Grenser: 100 µA (NC), 500 µA (SFC)

4. **Pasient-lekkasjestrøm** (hvis utstyret har applikasjonsdeler)
   - Koble hver applikasjonsdel til analysatoren
   - Mål under NC og SFC
   - Grenser avhenger av applikasjonsdeltype (B, BF eller CF)

### Etter testing

1. Registrer alle resultater med bestått/ikke bestått-status
2. Fest en testetikett på utstyret med: testdato, neste test forfaller, tester-ID
3. Legg inn resultater i utstyrsstyringssystemet
4. Hvis en test ikke bestås: ta ut av drift, undersøk, reparer og test på nytt før tilbakelevering til klinisk bruk

---

## Vanlige fallgruver

| Fallgruve | Konsekvens | Forebygging |
|---|---|---|
| Testing uten alle applikasjonsdeler tilkoblet | Ufullstendig sikkerhetsvurdering | Koble alltid til ALLE kabler og applikasjonsdeler som ved klinisk bruk |
| Bruk av ukalibrert analysator | Ugyldige resultater | Sjekk kalibreringsdato før hver testøkt |
| Testing via skjøteledning | Tilfører resistans, maskerer PE-feil | Koble DUT direkte til analysatorens nettuttak |
| Ikke teste under SFC (enkeltfeil) | Går glipp av feil som bare vises under feilbetingelser | Test alltid både NC og SFC |
| Registrerer kun bestått/ikke bestått | Mister trenddata | Registrer faktiske verdier — en avlesning som nærmer seg grensen indikerer utviklende isolasjonsnedbryting |
| Glemmer å merke utstyret | Intet synlig bevis for testing | Fest en testetikett umiddelbart etter at alle tester er bestått |
