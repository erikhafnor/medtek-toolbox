---
title: "Lab i elektrisk sikkerhetstesting"
course: "MTE210"
description: "Praktisk IEC 62353 elektrisk sikkerhetstesting av medisinsk utstyr"
equipment:
  - "Fluke ESA615 Electrical Safety Analyzer"
  - "Diverse medisinsk utstyr i Klasse I og Klasse II"
  - "Utstyr med Type B, BF og CF anvendte deler"
prerequisites:
  - "Operatørmanual for Fluke ESA615"
  - "Forelesningsnotater om IEC 60601-1 og IEC 62353"
  - "Referanse: IEC 60601-1 Essentials (på dette nettstedet)"
  - "Referanse: Leakage Current Measurement Guide (på dette nettstedet)"
duration: "3 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Klassifisere medisinsk utstyr etter beskyttelsesklasse (Klasse I vs. Klasse II) og type anvendt del (B, BF, CF)
- Betjene Fluke ESA615 for å utføre en komplett IEC 62353-testsekvens
- Måle og tolke beskyttelsesjordresistans, kapslingslekkasjestøm og pasientlekkasjestøm
- Anvende korrekte akseptgrenser basert på utstyrsklasse og type anvendt del
- Avgjøre om et apparat består eller ikke består kravene til elektrisk sikkerhet, og iverksette riktige tiltak

---

## Sikkerhetsmerknader

> **ELEKTRISK FARE.** Du kommer til å arbeide med nettdrevet medisinsk utstyr. ESA615 påfører spenninger under målingene. Følg alle sikkerhetsinstruksjoner.

- Aldri berør apparatet som testes (DUT) under en aktiv lekkasjestømmåling.
- Påse at ESA615 er korrekt jordet før bruk.
- Ikke utfør dielektrisk test (hipot) med mindre du får spesifikk instruks om det — disse påfører høyspenning.
- Er du usikker på noe steg, spør veileder før du fortsetter.

---

## Oppsett av utstyr

1. Plasser Fluke ESA615 på arbeidsbenken. Koble den til en stikkontakt med dens egen strømkabel.
2. Kontroller ESA615-kalibreringsmerket — analysatoren må være innenfor sin kalibreringsperiode.
3. Gjør deg kjent med ESA615-kontrollene: testvalgknapper, måledisplay, godkjent/ikke-godkjent-indikatorer.
4. Hent tre apparater for testing (utdelt av labveileder):
   - **Apparat A:** Klasse I-apparat med Type BF anvendte deler (f.eks. pasientmonitor)
   - **Apparat B:** Klasse I-apparat med Type CF anvendte deler (f.eks. defibrillator eller sprøytepumpe med hjerteratede tilbehør)
   - **Apparat C:** Klasse II-apparat (f.eks. batteridrevet pulsoksymeter)

---

## Prosedyre

### Del 1 — Apparatklassifisering (20 min)

For hvert av de tre apparatene, identifiser og noter følgende i labboken din:

| Egenskap | Apparat A | Apparat B | Apparat C |
|---|---|---|---|
| Produsent og modell | | | |
| Serienummer | | | |
| Beskyttelsesklasse (I eller II) | | | |
| Hvordan fastslo du klassen? | | | |
| Type anvendt del (B, BF eller CF) | | | |
| Hvilke deler er de anvendte delene? | | | |
| Nominell nettspenning | | | |
| Sikringsverdi | | | |

**Hint:**
- Klasse I-apparater har et trepolet støpsel (L, N, PE). Klasse II-apparater har et topolet støpsel eller symbolet ⬜.
- Typen anvendt del er vanligvis merket på apparatetiketten med riktig symbol (B, BF eller CF i en boks/trekant).
- Hvis typen anvendt del ikke er umiddelbart synlig, sjekk apparatets tekniske spesifikasjoner eller servicemanual.

---

### Del 2 — Beskyttelsesjordresistans (30 min)

**Gjelder for:** Apparat A og Apparat B (kun Klasse I). Hopp over denne testen for Apparat C (Klasse II — ingen PE).

For hvert Klasse I-apparat:

1. Koble apparatets støpsel til ESA615 DUT-kontakten.
2. Velg **PE Resistance**-test på ESA615.
3. Hold ESA615 PE-testproben mot hver tilgjengelig metalldel på apparathuset:
   - Metallchassis/ramme
   - Festeskruer
   - Kontakthus
   - Eventuelt eksponerte metallpaneler
4. Registrer resistansavlesningen for hvert målepunkt.
5. **Akseptkriterium:** < 0,3 Ω ved hvert punkt.

**Spørsmål å tenke over:** Hvorfor må PE-resistansen være lav? Hva skjer dersom PE-lederen er brutt og det oppstår en feil inne i apparatet?

---

### Del 3 — Kapslingslekkasjestøm (30 min)

For alle tre apparatene:

1. Koble DUT til ESA615.
2. Velg **Enclosure Leakage**-test.
3. Mål under **normaltilstand (NC):**
   - Hold ESA615-måleproben mot hver tilgjengelig ledende del.
   - Registrer den høyeste avlesningen.
4. Mål under **enkeltfeil-tilstand — åpen PE** (kun Klasse I-apparater):
   - ESA615 simulerer en åpen PE. Registrer avlesningen.
5. **Akseptkriterier:**

| Tilstand | Grenseverdi |
|---|---|
| Normaltilstand | ≤ 100 µA |
| Enkeltfeil — åpen PE (kun Klasse I) | ≤ 500 µA |

---

### Del 4 — Pasientlekkasjestøm (45 min)

**Gjelder for:** Apparater med anvendte deler (A og B). Hvis Apparat C har anvendte deler, test også disse.

For hvert apparat med anvendte deler:

1. Koble de(n) anvendte delen(e) til ESA615 pasientmåleterminalene.
2. Velg **Patient Leakage**-test.
3. Mål under normaltilstand.
4. Mål under enkeltfeil-tilstand (åpen PE for Klasse I).
5. Registrer resultatene og sammenlign med korrekte grenseverdier for typen anvendt del:

| Type anvendt del | Normaltilstand | Enkeltfeil-tilstand |
|---|---|---|
| Type B | ≤ 100 µA | ≤ 500 µA |
| Type BF | ≤ 100 µA | ≤ 500 µA |
| Type CF | ≤ **10 µA** | ≤ **50 µA** |

**Viktig:** Legg merke til den tidoble forskjellen i grenseverdier mellom BF og CF. Dette gjenspeiler den økte hjerterisikoen når anvendte deler kan gi en direkte elektrisk forbindelse til hjertet.

---

### Del 5 — Resultatanalyse og rapportering (30 min)

Fyll ut følgende sammendragstabell for alle tre apparatene:

| Test | Apparat A (Klasse I, BF) | Apparat B (Klasse I, CF) | Apparat C (Klasse II) |
|---|---|---|---|
| PE-resistans (Ω) | | | N/A |
| Kapslingslekkasje NC (µA) | | | |
| Kapslingslekkasje SFC (µA) | | | N/A |
| Pasientlekkasje NC (µA) | | | |
| Pasientlekkasje SFC (µA) | | | N/A |
| **Totalvurdering: GODKJENT / IKKE GODKJENT** | | | |

For enhver måling som nærmer seg eller overskrider en grenseverdi, beskriv hvilke tiltak du ville iverksatt som klinisk ingeniør.

---

### Del 6 — Repetisjonsspørsmål (15 min)

1. Forklar forskjellen mellom typetesting etter IEC 60601-1 og periodisk testing etter IEC 62353. Hvorfor bruker IEC 62353 lavere testspenninger for den dielektriske holdbarhetstesten?

2. En Klasse I-pasientmonitor viser PE-resistans på 0,45 Ω. Er dette godkjent eller ikke godkjent? Hva er de sannsynlige fysiske årsakene til en høy PE-resistans, og hvordan ville du undersøkt dette?

3. Hvorfor er grenseverdiene for Type CF-lekkasjestøm ti ganger strengere enn for Type BF? Forklar det fysiologiske grunnlaget.

4. Du tester en infusjonspumpe og måler pasientlekkasjestøm på 8 µA under normaltilstand. Pumpen har Type BF anvendte deler. Er dette godkjent? Anta nå at den samme pumpen brukes med et sentralt venekateter som gir en direkte forbindelse til hjertet. Endrer dette vurderingen din?

5. En klinisk ingeniør utfører elektrisk sikkerhetstesting på en ventilator etter bytte av strømforsyningen. Hvilke IEC 62353-tester er obligatoriske etter denne spesifikke reparasjonen, og hvorfor?

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode og dato
- Den utfylte klassifiseringstabellen (del 1) og resultatsammendragstabellen (del 5)
- Alle individuelle måleavlesninger med godkjent/ikke godkjent-status
- Skriftlige svar på de fem repetisjonsspørsmålene (del 6)
- En kort konklusjon (200–300 ord) som drøfter betydningen av elektrisk sikkerhetstesting i klinisk ingeniørarbeid og hva du lærte om forholdet mellom apparatklassifisering og sikkerhetsgrenser
