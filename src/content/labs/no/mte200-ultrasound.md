---
title: "Ultralydlab"
course: "MTE200"
description: "Ultralydundersøkelse, IHE Scheduled Workflow i et simulert klinisk IT-system og ytelsestesting med ultralyd-fantom"
equipment:
  - "GE Logic S8"
  - "Kyoto Kagaku N-365 ultralyd-fantom"
prerequisites:
  - "Service- og brukermanual for GE Logic S8"
  - "Brukermanual for Kyoto Kagaku N-365 fantom"
  - "Springer Handbook of Medical Technology kapittel 17 (Ultralyddiagnostikk)"
  - "Forelesningsnotater om ultralyd"
duration: "3 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Utføre en ultralydundersøkelse med optimaliserte bildeinnstillinger, målinger og analyse
- Dokumentere undersøkelser fra bildemodaliteter (ultralyd, røntgen, MR, CT osv.) i et simulert klinisk IT-system ved hjelp av IHE Scheduled Workflow (SWF)-standarden
- Registrere en pasient i et sykehusinformasjonssystem, sende HL7-meldinger, spørre arbeidsliste, ta bilder, lagre til PACS og verifisere i en DICOM-viewer
- Utføre en ytelsestest av et ultralydapparat ved hjelp av et ultralyd-fantom og tolke resultatene
- Forklare vanlige innstillinger for optimalisering av ultralydbilder og probebetegnelser

---

## Sikkerhetsmerknader

> **HÅNDTER MED FORSIKTIGHET.** Ultralydprober er presisjonsinstrumenter med sårbare linser. Linsene skades lett ved støt eller feil kontakt. Sikre alltid probekablene i dedikerte holdere når de ikke er i bruk.

- Fantomet skal kun komme i kontakt med linseoverflaten på ultralydprobene.
- Ultralydgel må alltid påføres mellom proben og fantomoverflaten før skanning.
- Ikke slipp, slå eller påfør overdrevent trykk på probene.
- Rengjør probene etter bruk i henhold til produsentens instruksjoner.

---

## Oppsett av utstyr

1. Slå på lab-PC-en og kontroller at HAPI Testpanel (HIS), DCM4CHE (RIS/PACS) og OHIF-viewer (DICOM-viewer) er tilgjengelige.
2. Slå på GE Logic S8 og la den fullføre oppstartssekvensen.
3. Plasser Kyoto Kagaku N-365 ultralyd-fantomet på arbeidsbenken. Påse at det er i romtemperatur og ikke har vært utsatt for direkte sollys eller ekstrem varme.
4. Påfør et raust lag med ultralydgel på skanneoverflaten på fantomet før du plasserer noen probe på det.
5. Velg en probe på GE Logic S8 og bekreft at apparatet er i bildemodus.

---

## Prosedyre

### Del 1 — IHE Scheduled Workflow (SWF) (45 min)

UiS medtek-labben har følgende komponenter som sammen utgjør et simulert helse-IT-system:

- **HAPI Testpanel** — Sykehusinformasjonssystem (HIS)
- **DCM4CHE** — Radiologisk informasjonssystem (RIS) / Picture Archiving and Communication System (PACS)
- **GE Logic S8** — Modalitet
- **OHIF-viewer** — Arbeidsstasjon (DICOM-viewer)

IHE Scheduled Workflow (SWF)-integrasjonsprofilen definerer hvordan disse systemene kommuniserer for å håndtere pasientundersøkelser fra rekvisisjon til bildegransking. Du skal følge denne arbeidsflyten steg for steg.

**1.1** Åpne HIS (HAPI Testpanel) på lab-PC-en. Registrer pasientopplysningene fra HL7-filen som er tilgjengelig på Canvas. Send HL7-meldingen til RIS (DCM4CHE).

**1.2** På GE Logic S8, spør RIS etter dagens arbeidsliste. Finn pasienten du registrerte i HIS. Start undersøkelsen fra arbeidslisten.

**1.3** Dokumenter SWF-arbeidsflyten du følgte i labboken. Tegn et diagram som viser dataflyten mellom HIS, RIS, Modalitet, PACS og Arbeidsstasjon. For hvert steg, noter kommunikasjonsstandarden som brukes (HL7, DICOM Worklist, DICOM Store, DICOM Query/Retrieve).

---

### Del 2 — Ytelsestest med fantom (75 min)

Utfør en ytelsestest av ultralydapparatets prober ved å følge alle testene beskrevet i brukermanualen for Kyoto Kagaku N-365-fantomet. Bruk kapittel 2 i brukermanualen for GE Logic S8 for å se hvordan du optimaliserer bildeinnstillingene. Ta bilder under hver test for å dokumentere resultatene og for å spore endringer over tid.

#### 2.1 Aksial oppløsning

1. Finn testmålene for aksial oppløsning i fantomet.
2. Optimaliser bildeinnstillingene (frekvens, fokus, forsterkning) for maksimal oppløsning.
3. Bestem den minste separasjonen mellom mål som kan oppløses.
4. Ta og lagre bildet.

#### 2.2 Vinkeloppløsning

1. Finn testmålene for vinkeloppløsning i fantomet.
2. Optimaliser bildeinnstillingene for denne testen.
3. Mål og registrer vinkeloppløsningen.
4. Ta og lagre bildet.

#### 2.3 Oppløsning av objekter på nært hold

1. Finn nærfeltoppløsnings-målene.
2. Optimaliser dybde, fokusposisjon og forsterkning for nærfeltavbildning.
3. Registrer den nærmeste avstanden der målene kan oppløses.
4. Ta og lagre bildet.

#### 2.4 Cystemålinger

1. Finn cystemålene i fantomet.
2. Mål dybden og diameteren til hvert cystemål.
3. Sammenlign målingene dine med fantomspesifikasjonene oppgitt i brukermanualen.
4. Registrer målte verdier og avvik i en tabell.
5. Ta og lagre bilder med målinger synlige.

#### 2.5 Måling av intervaller på strengmål

1. Finn «strengmålene» i fantomet.
2. Mål intervallene mellom målene ved hjelp av målemarkørfunksjonen på GE Logic S8.
3. Sammenlign dine målte verdier med fantomspesifikasjonene.
4. Registrer alle verdier og avvik i en tabell.
5. Ta og lagre bilder med målinger synlige.

---

### Del 3 — Lagre undersøkelse og verifiser i PACS (15 min)

**3.1** På GE Logic S8, avslutt og lagre ultralydundersøkelsen. Send undersøkelsen til PACS (DCM4CHE).

**3.2** Åpne DICOM-vieweren (OHIF-viewer) på lab-PC-en og spør PACS. Verifiser at undersøkelsen er mottatt og at alle bilder er til stede og kan vises.

**3.3** Ta et skjermbilde av undersøkelsen vist i OHIF-vieweren til labrapporten din.

---

### Del 4 — Begrenset funksjonstest (30 min)

**4.1** Start en ny undersøkelse på GE Logic S8. Utfør en begrenset funksjonstest som beskrevet i servicemanualen, seksjon 4.3.6.1 til 4.3.6.7. Registrer resultatene av hver test i labboken din.

**4.2** Valgfritt: bruk en frivillig i gruppen som pasient. Utfør en skanning av arteria carotis eller arteria radialis, og øv på bildeoptimaliseringsteknikkene fra del 2. Lagre undersøkelsen og send til PACS.

---

### Del 5 — Repetisjonsspørsmål (15 min)

Besvar følgende spørsmål i labboken din. Du vil diskutere svarene med gruppen på slutten av økten.

1. Hva betyr bokstavkombinasjonene på de 3 ultralydprobene? Beskriv probetypen og tiltenkt klinisk bruksområde for hver.

2. Forklar hva følgende innstillinger betyr og hvordan hver påvirker ultralydbildet:
   - **Dynamic range**
   - **Cross Beam**
   - **Focus width**
   - **Suppression**
   - **Line density**

3. Hvorfor er det viktig å utføre regelmessige ytelsestester av ultralydapparater ved hjelp av et fantom? Hvordan forholder resultatene seg til kvalitetssikring og pasientsikkerhet?

4. Beskriv rollen til hver komponent i IHE Scheduled Workflow (HIS, RIS, PACS, Modalitet, Arbeidsstasjon). Hvorfor er standardisert kommunikasjon mellom disse systemene viktig på et sykehus?

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode og dato
- Et SWF-arbeidsflytdiagram med dokumentasjon av hvert steg og kommunikasjonsstandarden som ble brukt
- Fullstendige måletabeller for alle ytelsestester med fantom (del 2.1–2.5) med sammenligning mot fantomspesifikasjoner
- DICOM-skjermbilder fra OHIF-vieweren som viser den lagrede undersøkelsen
- Resultater fra den begrensede funksjonstesten (del 4)
- Skriftlige svar på repetisjonsspørsmålene (del 5)
- En kort konklusjon (200–300 ord) som drøfter tilstanden til ultralydapparatet basert på testene dine og verdien av IHE SWF-arbeidsflyten i klinisk praksis
