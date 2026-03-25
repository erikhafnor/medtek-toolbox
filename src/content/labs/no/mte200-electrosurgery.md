---
title: "Elektrokirurgilab"
course: "MTE200"
description: "Betjening, periodisk vedlikehold og ytelsestesting av elektrokirurgisk apparat (diatermi)"
equipment:
  - "Olympus UES-40 elektrokirurgisk apparat"
  - "Fluke QA-ES III Electrosurgery Analyzer"
  - "Keysight InfiniiVision oscilloskop"
  - "RapidVac røykavsug"
prerequisites:
  - "Dokumentasjon for Fluke QA-ES III Electrosurgery Analyzer"
  - "Dokumentasjon for Olympus UES-40"
  - "Dokumentasjon for Keysight InfiniiVision oscilloskop"
  - "Forelesningsnotater om elektrokirurgi"
duration: "3 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Identifisere de viktigste kontrollene, tilkoblingene og funksjonene på Olympus UES-40 elektrokirurgisk apparat
- Betjene Fluke QA-ES III Electrosurgery Analyzer for å utføre effektmålinger og registrere crestfaktor
- Fange opp og tolke bølgeformer for ulike kutte- og koagulasjonsmodi ved hjelp av et oscilloskop
- Teste returelektrodeovervåkningen (REM/CQM) og forklare dens sikkerhetsfunksjon
- Beskrive sammenhengen mellom bølgeformkarakteristikker, crestfaktor og vevseffekter
- Anvende sikker arbeidspraksis ved bruk av elektrokirurgisk utstyr

---

## Sikkerhetsmerknader

> **FORBRENNINGSFARE.** Det elektrokirurgiske apparatet er konstruert for å skjære i vev. Uforsiktig bruk kan forårsake forbrenninger. Påse at du ikke kommer i direkte eller indirekte kontakt med den aktive elektroden mens apparatet er aktivert.

- For å unngå overbelastning, aktiver apparatet i mindre enn 10 sekunder om gangen.
- Innstillinger på Electrosurgery Analyzer må ikke endres mens apparatet er aktivert.
- Oppbevar den aktive elektroden i holderen når den ikke er i bruk.
- Påse at returelektroden er sikkert tilkoblet før aktivering.
- Røykavsug må være i gang under vevstester (del 4) — kirurgisk røyk inneholder helseskadelige partikler og kjemikalier.
- Hvis du observerer uventet lysbue, gnistdannelse eller uvanlig lukt, deaktiver apparatet umiddelbart og varsle veiledende tekniker.

---

## Oppsett av utstyr

1. Plasser Olympus UES-40 på arbeidsbenken. Inspiser kapsling, kabler og koblinger for fysisk skade.
2. Koble Fluke QA-ES III Electrosurgery Analyzer til den monopolære utgangen på Olympus UES-40 i henhold til analysatormanualen.
3. Sett isolasjonsimpedansen på Fluke QA-ES III til **400 ohm**.
4. Koble Keysight InfiniiVision oscilloskopet til bølgeformutgangen på Fluke QA-ES III. Sett oscilloskopet til en passende tidsskala og vertikal skala som utgangspunkt (juster under målingene).
5. Slå på alt utstyr og verifiser at hvert apparat fullfører selvtesten uten feil.
6. Plasser RapidVac røykavsug nær testområdet, men slå det ikke på før del 4.

---

## Prosedyre

### Del 1 — Gjennomgang av kontroller og funksjoner (30 min)

**1.1** Med utgangspunkt i dokumentasjonen for Olympus UES-40, finn og noter funksjonen til hvert av følgende elementer i labboken din:

- Strømbryter og indikator
- Monopolære utgangskoblinger (CUT og COAG)
- Returelektrodetilkobling og REM/CQM-indikator
- Bipolare utgangskoblinger
- Modusvelger (CUT: PURE, URO, BLEND; COAG: COAG. 1, COAG. 2, SPRAY)
- Effektinnstillingskontroller for CUT og COAG
- Fotpedaltilkoblinger (CUT-pedal og COAG-pedal)
- Alarmindikatorer og lydinnstillinger

**1.2** Merk: kun monopolære funksjoner brukes i denne labøvelsen. Registrer hvilke koblinger og kontroller som er relevante for monopolær drift.

---

### Del 2 — Effektmålinger (60 min)

Bruk Fluke QA-ES III Electrosurgery Analyzer med isolasjonsimpedans satt til **400 ohm**. Mål effektutgangen og crestfaktoren for hver av følgende modi og innstillinger. Registrer alle resultater i en tabell.

#### 2.1 CUT-modi

| Modus | Innstilt effekt | Målt effekt (W) | Crestfaktor |
|---|---|---|---|
| CUT — PURE | 150 W | | |
| CUT — URO | 150 W | | |
| CUT — BLEND | 125 W | | |

1. Velg hver modus på Olympus UES-40 og still inn angitt effekt.
2. Aktiver apparatet (i mindre enn 10 sekunder) og les av målt effekt og crestfaktor fra Fluke QA-ES III-displayet.
3. Registrer resultatene.

#### 2.2 COAG-modi

| Modus | Innstilt effekt | Målt effekt (W) | Crestfaktor |
|---|---|---|---|
| COAG. 1 | 60 W | | |
| COAG. 2 | 60 W | | |
| SPRAY | 60 W | | |

1. Velg hver koagulasjonsmodus og still inn angitt effekt.
2. Aktiver apparatet (i mindre enn 10 sekunder) og les av målt effekt og crestfaktor.
3. Registrer resultatene.

---

### Del 3 — Bølgeformdokumentasjon og returelektrodeovervåking (45 min)

#### 3.1 Bølgeformopptak

For hver CUT- og COAG-modus testet i del 2, fang opp utgangsbølgeformen på oscilloskopet via bølgeformutgangen på Fluke QA-ES III.

1. Juster oscilloskopets tidsskala og vertikal skala slik at bølgeformen er tydelig synlig.
2. Ta opp eller skisser bølgeformen for hver modus.
3. Beskriv kort i labboken formål og kjennetegn for hver bølgeform:
   - Hvordan skiller CUT PURE-bølgeformen seg fra CUT BLEND?
   - Hvordan skiller COAG-bølgeformen seg fra CUT-bølgeformene?
   - Hvordan skiller SPRAY seg fra COAG. 1 og COAG. 2?

#### 3.2 Returelektrodeovervåking (REM/CQM)

1. Med apparatet i standby, koble til returelektroden normalt. Verifiser at REM/CQM-indikatoren viser normal tilstand.
2. Simuler en delvis løsning av returelektroden (følg analysatormanualen for korrekt fremgangsmåte).
3. Registrer impedansen eller tilstanden der alarmen utløses.
4. Diskuter i labboken: hva skjer hvis returelektroden delvis løsner under kirurgi? Hvilken skade kan oppstå, og hvordan forhindrer REM/CQM-systemet dette?

---

### Del 4 — Demonstrasjon av vevseffekt (30 min)

> **Slå på RapidVac røykavsug før du begynner denne delen.**

**4.1** Bruk de monopolære funksjonene på Olympus UES-40 til å teste de ulike CUT- og COAG-modiene på et svinepreparat. Observer og registrer vevseffektene på ulike vevstyper:

- Fettvev
- Vaskulært vev
- Vev nær bein

**4.2** For hver modus, noter:
- De visuelle og hørbare kjennetegnene under aktivering
- Vevseffekten (rent snitt, forkulling, uttorking, fulgurering)
- Hvordan vevsresponsen endres når du justerer effektinnstillingen

---

### Del 5 — Repetisjonsspørsmål (15 min)

Besvar følgende spørsmål i labboken din. Du vil diskutere svarene med gruppen på slutten av økten.

1. Forklar forskjellen mellom CUT- og COAG-bølgeformer. Hvordan forholder crestfaktoren seg til vevseffekten (kutting versus koagulasjon)?

2. Hvorfor settes isolasjonsimpedansen til 400 ohm for testing? Hva representerer denne verdien i en klinisk sammenheng?

3. Hva er formålet med røykavsug, og hva er helsefaren ved kirurgisk røyk? Referer til minst to spesifikke helseskadelige komponenter.

4. En klinisk ingeniør som utfører årlig vedlikehold på et elektrokirurgisk apparat måler 180 W utgangseffekt når apparatet er stilt inn på 150 W CUT PURE ved 400 ohm. Er dette akseptabelt? Hvilke tiltak bør iverksettes?

5. Forklar hvorfor monopolær elektrokirurgi krever en returelektrode, mens bipolar elektrokirurgi ikke gjør det. Hva er risikoen dersom returelektrodens kontaktareal er for lite?

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode og dato
- En fullstendig effektmåletabell for alle modi testet i del 2, inkludert crestfaktorer
- Bølgeformskisser eller skjermbilder for hver modus (del 3) med merknader som beskriver bølgeformens kjennetegn
- REM/CQM-testresultater og diskusjon (del 3.2)
- Observasjoner av vevseffekt fra del 4
- Skriftlige svar på repetisjonsspørsmålene (del 5)
- En kort konklusjon (200–300 ord) som drøfter om det elektrokirurgiske apparatet oppfyller spesifikasjonene og de klinisk ingeniørfaglige implikasjonene av funnene dine
