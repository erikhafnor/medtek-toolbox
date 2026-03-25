---
title: "Blodtrykk- og pulsoksymetrilab"
course: "MTE200"
description: "Ikke-invasiv blodtrykksmåling, pulsoksymetriovervåking og prinsipper for invasiv blodtrykksmåling"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
prerequisites:
  - "LIFEPAK 15 brukermanualdokumentasjon"
  - "Forelesningsnotater om hemodynamisk overvåking"
duration: "3 timer"
---

## Læringsmål

Etter denne labøvelsen skal du kunne:

- Utføre ikke-invasiv blodtrykksmåling (NIBP) og oksygenmetningsmåling (SpO2) med LIFEPAK 15
- Identifisere måleprinsippet LIFEPAK 15 bruker for NIBP og forklare virkemåten
- Gjennomføre en NIBP-kalibreringskontroll iht. prosedyren for periodisk vedlikehold (PIP)
- Kvantifisere det hydrostatiske bidraget til blodtrykksavlesninger forårsaket av armposisjon i forhold til hjertet
- Tolke en pletysmografikurve og forklare effekten av mansjettoppblåsing på kontinuerlig SpO2-overvåking
- Beskrive komponentene og prinsippene for invasiv arteriell blodtrykksovervåking

---

## Sikkerhetsmerknader

> **VIKTIG.** I denne labøvelsen skal du kun koble NIBP- og SpO2-sensorer til LIFEPAK 15. Gjør deg kjent med advarsler og forsiktighetsregler for NIBP-overvåking på side 82 i LIFEPAK 15 brukermanualen.

- Det er frivillig å utføre målinger på deg selv.
- Målinger utenfor normalområdet skal ikke brukes til diagnostikk på noen måte.
- Alle målinger som utføres tolkes som ikke-gyldige helsedata.

---

## Prosedyre

Studentene må skrive en løpende protokoll under labarbeidet slik at de kan reprodusere resultatene etter oppgaven og få den godkjent i laben.

### Del 1 — Ikke-invasivt blodtrykk og pulsoksymetri

For å måle kroppens arterielle blodtrykk og oksygenmetning bruker vi LIFEPAK 15, som er en defibrillator men også har multimonitorfunksjoner.

**1.1** Følg LIFEPAK 15 brukermanualen for å utføre ikke-invasiv blodtrykksmåling på en eller flere personer i gruppen. Finn ut fra mansjetten eller mansjettforpakningen hvilken metode LP15 bruker for måling og hva virkemåten er.

**1.2** Som med alt elektromedisinsk utstyr må LP15 ha periodisk vedlikehold. Det vedlagte dokumentet i utstyrsregisteret heter "Performance Inspection Procedure" — en veiledning for hvordan alle prosedyrer skal utføres under periodisk vedlikehold. Følg prosedyren som heter "PIP — NIBP Calibration Check."

> **Merk:** Bruk en enveis håndpumpe i stedet for en sprøytepumpe på grunn av risiko for utstyrsskade.

**1.3** Ikke-invasive blodtrykksmålinger bør aldri brukes som eneste vitalparameter for diagnostikk/behandling. Hvilke eksterne faktorer kan manipulere en blodtrykksmåling? Når man justerer plasseringen av mansjetten i forhold til sirkulasjonssystemets nullpunkt (høyre atrium), forårsaker dette et hydrostatisk bidrag til målingen. Test hvor stort bidrag (+/- mmHg) du får ved å heve og senke armen med mansjetten.

**1.4** Plasser SpO2-sensoren på noen i gruppen som forklart i LP15 brukermanualen under kapittelet "Monitoring SpO2, SpCO, and SpMet." Studer pletysmografikurven — hva ser du?

**1.5** La noen i gruppen bære SpO2-sensoren på samme arm som blodtrykksmansjetten og utfør en blodtrykksmåling. Hva observerer du på den kontinuerlige pulsoksymetrimålingen?

---

### Del 2 — Invasiv blodtrykksmåling (IBP)

Denne delen dekker prinsippene for invasiv arteriell blodtrykksovervåking. Vi utfører ikke invasive prosedyrer i denne laben, men forståelse av IBP-systemet er essensielt for kliniske ingeniører som vedlikeholder og kalibrerer pasientmonitorer i intensivmiljøer.

#### 2.1 Systemkomponenter

Et invasivt blodtrykksovervåkingssystem består av følgende komponenter:

- **Arteriekateter** — en kort kanyle som føres inn i en arterie (typisk radialis, femoralis eller brachialis)
- **Trykkslange** — stiv, ikke-ettergivende slange som forbinder kateteret med transduceren
- **Transducer** — en engangs trykksensor som konverterer mekanisk trykk til et elektrisk signal
- **Skylleanordning** — en trykksatt saltvannspose (holdt ved 300 mmHg) som gir en kontinuerlig langsom skylling (ca. 3 mL/t) for å forhindre koageldannelse i kateteret
- **Pasientmonitor** — viser den kontinuerlige arterielle bølgeformen og beregnede verdier (systolisk, diastolisk, middelarterietrykk)

#### 2.2 Nullstillingsprosedyre

Før målinger kan tas, må systemet nullstilles:

1. Plasser transduceren i høyde med den flebostatiske aksen (4. interkostalrom, midtaksillarlinjen).
2. Åpne transducerens stoppekran mot atmosfæren (drei stoppekranen av mot pasienten).
3. Trykk på nullstillingsfunksjonen på pasientmonitoren.
4. Bekreft at monitoren viser 0 mmHg.
5. Lukk stoppekranen mot atmosfæren og gjenåpne mot pasienten.

#### 2.3 Dynamisk responstesting

Firkantbølgetesten (hurtigskylletesten) brukes for å vurdere naturlig frekvens og dempningskoeffisient for kateter-transducersystemet:

1. Aktiver hurtigskylleventilen kort (trekk i utløseren eller klem på skylleenheten) for å generere en firkantbølgeinngang.
2. Slipp skyllingen og observer den resulterende bølgeformen på monitoren.
3. Tolk responsen:
   - **Optimalt dempet:** 1–2 oscillasjoner etter firkantbølgen før retur til basislinjen. Dette indikerer nøyaktig trykkgjengivelse.
   - **Overdempet:** Ingen oscillasjoner, langsom retur til basislinjen. Vanlige årsaker inkluderer luftbobler i slangen, koagel ved kateterspissen eller ettergivende slange. Resulterer i underestimering av systolisk og overestimering av diastolisk trykk.
   - **Underdempet:** Flere oscillasjoner (ringing) etter firkantbølgen. Vanlige årsaker inkluderer for lang slange, katetersvipp eller resonans. Resulterer i overestimering av systolisk og underestimering av diastolisk trykk.

#### 2.4 Feilkilder

| Feilkilde | Effekt på bølgeform | Korrigerende tiltak |
|---|---|---|
| Luftbobler i slange | Overdempet | Skyll all luft ut av systemet |
| Koagel ved kateterspiss | Overdempet | Aspirer og skyll; bytt kateter ved vedvarende problem |
| Katetersvipp / resonans | Underdempet | Forkort slange; legg til dempingsanordning |
| Feil transducernivå | Systematisk avvik | Juster nivå til flebostatisk akse |
| Løse koblinger | Signaltap eller demping | Stram alle Luer-lock-koblinger |

#### 2.5 Når IBP foretrekkes fremfor NIBP

Invasiv blodtrykksovervåking er indisert når:

- Pasienten er hemodynamisk ustabil (f.eks. septisk sjokk, kardiogent sjokk)
- Kontinuerlig slag-til-slag-overvåking er nødvendig under kirurgi eller intensivbehandling
- Vasoaktiv medikamenttitrering krever sanntids trykkfeedback
- Hyppig arteriell blodprøvetaking er nødvendig (blodgasser, laktat)
- NIBP-avlesninger er upålitelige (f.eks. sykelig overvekt, arytmier, alvorlig perifer vasokonstriksjon)

#### 2.6 Klinisk ingeniørens rolle

Kliniske ingeniører er ansvarlige for:

- Kalibrering av transducere ved bruk av en sertifisert trykkkilde (f.eks. kvikksølv- eller digitalt manometer)
- Verifisering av trykkmodulnøyaktighet over det kliniske området (0–300 mmHg)
- Inkludering av IBP-verifisering i prosedyrer for forebyggende vedlikehold (PM) av pasientmonitorer
- Dokumentering av kalibreringsresultater i utstyrsforvaltningssystemet
- Opplæring av klinisk personale i korrekt nullstilling og nivelleringsteknikker

---

### Del 3 — Diskusjonsspørsmål

Svar på følgende spørsmål i labnotatboken.

1. Hvilket måleprinsipp bruker LIFEPAK 15 for NIBP? Hvordan fungerer oscillometrisk måling?

2. Hvorfor påvirker armposisjon i forhold til hjertet blodtrykksavlesningen? Beregn den hydrostatiske trykkforskjellen for en høydeendring på 30 cm.

3. Hvorfor blir SpO2-avlesningen upålitelig under en blodtrykksmåling på samme arm?

4. Sammenlign fordeler og begrensninger ved NIBP kontra IBP-overvåking. I hvilke kliniske situasjoner foretrekkes hver metode?

5. Hva er formålet med hurtigskylletesten (firkantbølgetesten) ved invasiv trykkovervåking?

---

## Krav til labrapporten

Send inn en maskinskrevet labrapport innen datoen angitt i timeplanen. Rapporten skal inneholde:

- En tittelside med navn, studentnummer, emnekode og dato
- NIBP-måledata fra Del 1.1
- Resultater fra kalibreringskontroll fra Del 1.2
- Målinger av hydrostatisk effekt fra Del 1.3 med registrerte verdier i mmHg
- Dokumentasjon av SpO2-observasjoner fra Del 1.4 og 1.5
- Skriftlige svar på diskusjonsspørsmålene (Del 3)
- En kort konklusjon (200–300 ord) der du diskuterer funnene dine og deres relevans for klinisk ingeniørfaget
- En referanseliste med henvisninger til LIFEPAK 15 brukermanualen og alle andre kilder som er brukt
