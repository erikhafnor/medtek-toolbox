---
title: "Elektrokirurgiske enheter"
category: "electrosurgery"
description: "Referanseguide for vedlikehold, testing og feilsøking av elektrokirurgiske enheter"
equipment:
  - "Erbe VIO 300 D"
  - "Valleylab FT10 (Medtronic)"
  - "Fluke QA-ES III ESU-analysator"
standards:
  - "IEC 60601-2-2 (Høyfrekvent kirurgisk utstyr)"
  - "IEC 62353 (Periodisk testing)"
order: 4
---

## Oversikt

Elektrokirurgiske enheter (ESU-er) bruker høyfrekvent vekselstrøm (200 kHz – 3,3 MHz) til å skjære vev og koagulere blødende kar under kirurgi. I motsetning til nettfrekvensstrøm, som forårsaker nevromuskulær stimulering ved svært lave nivåer, passerer høyfrekvent strøm gjennom vev med termisk effekt — og konsentrerer varme ved den aktive elektrodespissen. Kliniske ingeniører er ansvarlige for å verifisere nøyaktighet i utgangseffekt, overvåking av returelektrode (REM/CQM), grenseverdier for lekkasjestrøm, og for å sikre trygg interaksjon med annet utstyr (f.eks. pacemakere, overvåkingsenheter).

---

## Slik fungerer det

En ESU-generator produserer høyfrekvent vekselstrøm som flyter fra den aktive elektroden (kirurgens håndstykke) gjennom pasientens vev til returelektroden (nøytralelektrode/dispersiv pad) og tilbake til generatoren, slik at kretsen sluttes. Vevseffekten avhenger av strømtettheten, bølgeformen og varigheten:

- **Snittemodus** — kontinuerlig sinusformet bølgeform konsentrerer varme raskt ved elektrodespissen og fordamper celler for å lage et snitt
- **Koaguleringsmodus** — modulert (pulset) bølgeform leverer energiutbrudd med pauser, og dehydrerer vev for hemostase uten å skjære
- **Blandingsmodus** — kombinerer kontinuerlige og modulerte bølgeformer for samtidig snitting og koagulering

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| Utgangseffekt (snitt) | 1–300 W (Erbe VIO 300 D) | For høy effekt forårsaker utilsiktet vevsskade |
| Nøyaktighet utgangseffekt | ±20 % av innstilt verdi (IEC 60601-2-2) | Unøyaktig utgang påvirker kirurgisk presisjon |
| Driftsfrekvens | 350 kHz (typisk for Erbe VIO) | Under 200 kHz risikerer nevromuskulær stimulering |
| HF-lekkasjestrøm | ≤ 150 mA (IEC 60601-2-2) | Overflødig lekkasje forårsaker utilsiktede brannskader ved kontaktpunkter |
| Returelektrodeovervåking (REM) | Alarm hvis padimpedans > terskelverdi | Forhindrer brannskader fra dårlig padkontakt |
| Toppfaktor (koag) | 3–10 avhengig av modus | Høyere toppfaktor = dypere koagulering, mer vevsskade |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Ingen utgang / utilstrekkelig snitting | Returelektrode frakoblet, pad tørket ut, kabelfeil, effekt satt for lavt | Sjekk REM-alarmstatus, inspiser padkontakt, test kabelkontinuitet, mål utgangseffekt med QA-ES III | Påfør returelektrode på nytt, bytt kabel, juster effekt |
| REM-alarm (returelektrodeovervåking) | Dårlig padkontakt, pad delvis løsnet, padgel tørket, padkabelfeil | Inspiser padpåføring, sjekk kabelkontakt, mål padimpedans | Påfør eller bytt pad; bytt kabel hvis defekt |
| Pasientbrannskade ved returelektrodested | Utilstrekkelig padkontaktareal, REM deaktivert/forbigått, pad plassert over arr/benfremspring | Etterhendelsesundersøkelse: sjekk padplassering, REM-funksjon, padtilstand, generator REM-krets | Gjennomgå padplasseringsprotokoll, verifiser REM-funksjon, rapporter som sikkerhetshendelse |
| Interferens med pasientovervåking | ESU-aktivering forstyrrer EKG-/SpO₂-visning | Verifiser ESU-driftsfrekvens, sjekk for stray HF-kobling til overvåkingsledninger | Bruk ESU-klassifiserte overvåkingskabler, separer ESU- og overvåkingsledninger |
| Utilsiktet aktivering | Fotbryterfeil (fastklemt), håndstykkeknapp fastklemt, kobling til nærliggende metall | Inspiser fotbrytermekanisme, test aktiveringskretser, sjekk for isolasjonsskade | Bytt fotbryter, bytt håndstykke, sørg for korrekt tildekking av aktiv elektrode |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten og fasilitetsens PM-program (vanligvis årlig).

1. **Visuell og mekanisk inspeksjon** — Kontroller generatorhuset, strømkabel, fotbryterkabel og pedalmekanisme, aktiv elektrodekabel og kontakt, returelektrodekabel og kontakt. Inspiser for isolasjonsskade, slitte kabler og løse forbindelser.

2. **Nøyaktighet utgangseffekt** — Bruk en kalibrert ESU-analysator (f.eks. Fluke QA-ES III) med 200 Ω eller 500 Ω last, og mål snitt- og koaguleringsutgang ved lav (30 W), middels (80 W) og høy (200 W) innstilling. Hver måling må være innenfor ±20 % av innstilt verdi per IEC 60601-2-2.

3. **Returelektrodeovervåking (REM)-test** — Bruk QA-ES III sin REM-testfunksjon for å verifisere at generatoren oppdager og alarmerer når returelektrodeimpedansen overskrider produsentens terskelverdi (typisk 135 Ω for Erbe REM-systemer). Test både alarmaktivering og utgangsdeaktivering.

4. **HF-lekkasjestrøm** — Mål høyfrekvent lekkasjestrøm fra aktiv elektrode til returelektrode og fra pasientkretsen til jord. Må være ≤ 150 mA per IEC 60601-2-2.

5. **Elektrisk sikkerhetstest** — Per IEC 62353: beskyttelsesjordmotstand (< 0,3 Ω), kapslingslekkasjestrøm. Merk: ESU-er er vanligvis klasse I-utstyr med Type BF-tilkoblingsdeler.

6. **Fotbryter- og aktiveringstest** — Verifiser at fotbryteren aktiverer korrekt modus (snitt/koag), at utgangen stopper umiddelbart når bryteren slippes, og at håndstykkeknappene fungerer korrekt.

7. **Alarmtest** — Verifiser alle sikkerhetsalarmer: returelektrode frakoblet, returelektrode høy impedans, overtemperatur og utgangsfeil.

---

## Relaterte standarder

- **IEC 60601-2-2:2017** — Særskilte krav til grunnleggende sikkerhet og essensiell ytelse for høyfrekvent kirurgisk utstyr og tilbehør. Spesifiserer utgangsnøyaktighet, grenseverdier for lekkasjestrøm, REM-krav og forebygging av nevromuskulær stimulering.
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse.
- **AAMI HF18:2001** — Elektrokirurgiske enheter — veileder for sikker bruk og vedlikehold (amerikansk praksisretningslinje).

---

## Relaterte scenarioer

Øv på å diagnostisere feil på elektrokirurgiske enheter med veiledede simuleringsscenarioer:

- [ESU-en kutter ikke — Erbe VIO 300 D](/no/scenarios/esu-no-cut/) *(Nivå 1)*
- [Pasientbrannskadeundersøkelse](/no/scenarios/esu-patient-burn/) *(Nivå 3)*
- [ESU-interferens med pasientovervåking](/no/scenarios/esu-interference/) *(Nivå 2)*
