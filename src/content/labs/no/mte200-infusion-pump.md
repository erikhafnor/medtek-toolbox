---
title: "Infusjonspumpe-lab"
course: "MTE200"
shortTitle: "Infusjonspumper"
description: "Testing av strømningsnøyaktighet, okklusjonsdeteksjon og forebyggende vedlikehold av infusjonspumper"
equipment:
  - "B. Braun Infusomat Space (volumetrisk pumpe)"
  - "B. Braun Perfusor Space (sprøytepumpe)"
  - "IDA-5 Infusion Device Analyzer (Fluke Biomedical)"
prerequisites:
  - "Bruker- og servicemanualdokumentasjon for B. Braun Infusomat Space"
  - "Bruker- og servicemanualdokumentasjon for B. Braun Perfusor Space"
  - "Dokumentasjon for IDA-5 Infusion Device Analyzer"
  - "Forelesningsnotater om infusjonsteknologi"
duration: "2,5 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Identifisere hovedkontrollene, indikatorene og sikkerhetsfunksjonene på B. Braun Infusomat Space (volumetrisk pumpe) og B. Braun Perfusor Space (sprøytepumpe)
- Opprette testmaler på IDA-5 og betjene den for å måle strømningshastighet og okklusjonstrykk
- Tolke resultater for strømningsnøyaktighet opp mot leveringsnøyaktigheten produsenten oppgir, målt etter metoden i IEC 60601-2-24
- Teste okklusjonstrykk-deteksjon og undersøke hvordan trykknivåer påvirker alarmoppførsel
- Teste luft-i-slange-deteksjon og upstream-sensor-sikkerhetssystemene
- Forstå anti-fritt-flyt-mekanismen og dens rolle for pasientsikkerheten

---

## Sikkerhetsmerknader

> **VÆSKEFARE.** Denne øvelsen bruker deionisert vann som testvæske. Hold all væske borte fra elektrisk utstyr. Tørk opp søl umiddelbart. Ikke la vann trenge inn i pumpehuset.

- IDA-5 bruker presisjonssensorer — håndter forsiktig og følg oppsettsinstruksjonene nøyaktig.
- Ikke demonter pumpemekanismen.
- **Avlast okklusjonstrykket før du åpner slangen.** Etter en okklusjonstest kan slangen mellom pumpen og IDA-5 fortsatt stå på flere hundre mmHg — 487 mmHg er rundt 0,65 bar. Stopp pumpen, la IDA-5 fullføre okklusjonssteget, og kontroller at trykkavlesningen har falt tilbake til null før du bryter en luer-kobling. Står avlesningen fortsatt høyt, avlast trykket ned i et avfallsbeger med koblingen holdt lavt og vendt bort fra pumpene: bryt aldri en trykksatt kobling over nettdrevet utstyr. Klinisk går det samme innestengte volumet inn i pasienten som en ukontrollert bolus når okklusjonen løsner, og derfor krever IEC 60601-2-24 at bolusen som frigjøres ved okklusjonsutløsning måles og oppgis.
- Rapporter eventuell skade på utstyr til labingeniøren.

---

## Oppsett av utstyr

### Oppsett av IDA-5-testmaler

Før du kobler til pumpene, opprett testmalene på IDA-5.

**Opprette en mal:** Trykk ESC → Utilities → Edit Templates → Add.

**Volumetrisk pumpe (Infusomat Space) mal:**

| Steg | Type | Rate | Vol/Press | Tid | Tol % |
|---|---|---|---|---|---|
| 1 | Flow | 100 ml/h | 25 ml | 15:00 | 5 |
| 2 | Occlusion | 200 ml/h | 487 mmHg | 01:00 | 5 |

**Sprøytepumpe (Perfusor Space) mal:**

| Steg | Type | Rate | Vol/Press | Tid | Tol % |
|---|---|---|---|---|---|
| 1 | Flow | 100 ml/h | 25 ml | 15:00 | 5 |
| 2 | Occlusion | 200 ml/h | 487 mmHg | 01:00 | 5 |

### Pumpe- og slangeoppsett

1. Plasser B. Braun Infusomat Space (volumetrisk pumpe) og B. Braun Perfusor Space (sprøytepumpe) på arbeidsbenken eller IV-stativfestet. Inspiser husene for fysisk skade.
2. Fyll slanger med deionisert vann. Prim IDA-5 og slangene i henhold til IDA-5-manualen (side 7).
3. **Volumetrisk pumpe:** Sett inn et standard B. Braun IV-administrasjonssett i Infusomat Space i henhold til veiledningen på pumpedøren. Koble administrasjonssettet til en pose med deionisert vann. Heng posen minst 50 cm over pumpen. Koble utløpet til IDA-5 **kanal 1**.
4. **Sprøytepumpe:** Forhåndsfyll («prim») en **50 ml sprøyte med 50 ml** deionisert vann — bare strømningstesten bruker 5 ml til priming pluss de 25 ml den leverer, og okklusjonstesten i del 3.3 trenger væske i tillegg. Sett sprøyta inn i Perfusor Space og bekreft at pumpen har kjent igjen riktig sprøytetype og -størrelse. Koble sprøyteutløpet til IDA-5 **kanal 2**.
5. Velg riktig mal på IDA-5: Template → Select template → Start → Skriv inn kontrollnummer.
6. Etter start, prim med 5 ml til IDA-5 viser **Auto Start**. Klikk Auto Start, deretter start pumpen.
7. **Volumetrisk pumpe-innstillinger:** totalt volum 250 ml, rate 100 ml/t.
8. **Sprøytepumpe-innstillinger:** totalt volum 50 ml, rate 100 ml/t.
9. Slå på begge pumpene og kontroller at selvtestene fullføres uten feil.

---

## Prosedyre

### Del 1 — Bli kjent med kontroller og sikkerhetsfunksjoner (15 min)

**1.1** Bruk hurtigreferansene for begge pumpene til å finne og notere funksjonen til hvert av følgende elementer i labboken din:

**Infusomat Space (volumetrisk pumpe):**
- Innstilling av strømningshastighet (ml/t)
- Innstilling av volum som skal infunderes (VTBI)
- Start/stopp-knapp
- Bolusknapp og bolusrateindikator
- Trykkalarmsindikator og terskelinnstilling
- Luft-i-slange-detektor
- Upstream-sensor
- Dør åpne/lukke-mekanisme
- Anti-fritt-flyt-klemme (innebygd i dørmekanismen)
- Batteristatusindikator

**Perfusor Space (sprøytepumpe):**
- Innstilling av strømningshastighet (ml/t)
- Innstilling av volum som skal infunderes (VTBI)
- Start/stopp-knapp
- Bolusknapp
- Trykkalarmsindikator
- Sprøyteklemmemekanisme
- Batteristatusindikator

**1.2** Åpne Infusomat Space-pumpedøren og observer anti-fritt-flyt-klemmen. Beskriv i labboken din hvordan klemmen aktiveres når døren åpnes og deaktiveres når pumpen starter. Forklar hvorfor denne mekanismen er kritisk for pasientsikkerheten.

**1.3** Identifiser klassifiseringen av infusjonspumpenes anvendte del (applied part). Er den Type B, BF eller CF? Noter svaret ditt og forklar hvorfor.

---

### Del 2 — Test av strømningsnøyaktighet (50 min)

Test strømningsnøyaktigheten ved hjelp av IDA-5-malene som ble opprettet under oppsettet. Malen kjører strømningstesten ved 100 ml/t for 25 ml, noe som tar 15 minutter (25 ml ÷ 100 ml/t = 0,25 t), med toleransefeltet i malen satt til 5 %.

#### 2.1 Volumetrisk pumpe (Infusomat Space) — 100 ml/t

1. Bekreft at Infusomat Space er satt til **100 ml/t** med totalt volum **250 ml**.
2. Velg malen for volumetrisk pumpe på IDA-5 kanal 1. Start malen og skriv inn kontrollnummeret.
3. Prim med 5 ml til IDA-5 viser **Auto Start**. Klikk Auto Start, deretter start pumpen.
4. La IDA-5-malen kjøre. Testen måler 25 ml ved 100 ml/t over 15:00.
5. Registrer strømningshastighetsresultatet fra IDA-5.
6. **Akseptkriterium:** gjennomsnittlig strømningshastighet må ligge innenfor leveringsnøyaktigheten B. Braun oppgir for Infusomat Space med et B. Braun-administrasjonssett — **±5 %**, altså **95–105 ml/t** ved innstilt hastighet 100 ml/t. IEC 60601-2-24 §201.12.1 fastsetter ikke selv en tallgrense: standarden beskriver hvordan leveringsnøyaktigheten måles (oppstarts- og trompetkurver) og krever at produsenten oppgir verdien pumpen deretter vurderes mot.

#### 2.2 Sprøytepumpe (Perfusor Space) — 100 ml/t

1. Bekreft at Perfusor Space-sprøyta er forhåndsfylt med **50 ml** deionisert vann og at pumpen er satt til **100 ml/t** med totalt volum **50 ml**.
2. Velg malen for sprøytepumpe på IDA-5 kanal 2. Start malen og skriv inn kontrollnummeret.
3. Prim med 5 ml til IDA-5 viser **Auto Start**. Klikk Auto Start, deretter start pumpen.
4. La IDA-5-malen kjøre.
5. Registrer strømningshastighetsresultatet fra IDA-5.
6. **Akseptkriterium:** leveringsnøyaktigheten B. Braun oppgir for Perfusor Space, som du slår opp i de tekniske dataene — ikke gjenbruk ±5 % fra Infusomat Space, for de to pumpene er ikke oppgitt med samme verdi. Noter den oppgitte verdien ved siden av målingen din. IDA-5-malen flagger 5 % uansett hvilken pumpe det er, så godkjent/ikke godkjent-vurderingen må du gjøre selv.

---

### Del 3 — Okklusjonstrykk-testing (30 min)

IDA-5-malens steg 2 kjører en okklusjonstest ved 200 ml/t med et mål på 487 mmHg. I denne delen skal du også utforske pumpens justerbare trykknivåer.

#### 3.1 IDA-5 okklusjonstest (volumetrisk pumpe)

1. Etter at strømningstesten i del 2.1 er fullført, går IDA-5-malen automatisk videre til okklusjonssteget.
2. Registrer:
   - Tid fra okklusjon til alarm (sekunder)
   - Trykk ved alarm (mmHg) — avlest fra IDA-5
3. **Akseptkriterium:** Pumpen må alarmere ved eller under den innstilte okklusjonstrykkterskelen (487 mmHg med 5 % toleranse).

#### 3.2 Undersøkelse av trykknivåer på Infusomat Space

1. Er okklusjonstrykk-grensene like for alle pasienter? Diskuter med labpartneren din.
2. Naviger i Infusomat Space-displayet for å finne hvordan du justerer trykknivået. Displayet viser trykknivået i mmHg. Pumpen har trykknivåer 0–9.
3. Velg et trykknivå og noter den tilsvarende mmHg-verdien fra displayet.
4. Still pumpen til **200 ml/t** og kjør en okklusjonstest ved det valgte trykknivået.
5. Registrer om det målte trykket på IDA-5 samsvarer med forventet verdi fra pumpedisplayet.

#### 3.3 Sprøytepumpe-okklusjon

1. Gjenta IDA-5-okklusjonstesten for Perfusor Space (kanal 2).
2. Finn i Perfusor Space service manual hvilket verktøy en klinisk ingeniør bruker for å kvalitetssjekke og kalibrere «cut-off»-trykket. Noter dette i labboken din.

---

### Del 4 — Testing av luft-i-slange-deteksjon (20 min)

Infusomat Space (volumetrisk pumpe) har en luft-i-slange-sensor. I denne delen skal du teste hvordan pumpen reagerer på ulike mengder luft i slangen.

**Oppsett:**
1. Kontroller at trykkavlesningen på IDA-5 har falt tilbake til null etter okklusjonstestene (se sikkerhetsmerknadene), og koble deretter infusjonssettet fra IDA-5.
2. Monter et dryppesett under drypptelleren.
3. Plasser den distale enden av slangen i et dryppekammer.

#### 4.1 Lite luftvolum (0,02–0,3 ml)

1. Still Infusomat Space til **300 ml/t**.
2. Introduser en liten luftboble (0,02–0,3 ml) i slangen.
3. Observer og registrer: Hvordan reagerer pumpen? Alarmerer den? Hvilken type alarm?

#### 4.2 Stort luftvolum (1,5 ml)

1. Tilbakestill pumpen og still den til **300 ml/t**.
2. Introduser et større luftvolum (ca. 1,5 ml) i slangen.
3. Observer og registrer: Hvordan reagerer pumpen? Stopper den? Hvilken alarmmelding vises?

**4.3** Sammenlign pumpens respons i 4.1 og 4.2. Hvorfor oppfører pumpen seg forskjellig for små og store luftvolum? Hva er de kliniske implikasjonene?

---

### Del 5 — Testing av upstream-sensor (10 min)

Infusomat Space har også en **upstream-sensor** som detekterer trykkendringer på inngangssiden av pumpen.

1. Med pumpen i gang ved **100 ml/t**, forsøk å utløse pumpens trykkreduksjonsalarm. Alarmterskelen starter ved **-120 mbar**.
2. Registrer hvilken handling du utførte for å utløse alarmen og pumpens respons.
3. Forklar i labboken din når denne alarmen ville oppstått i en klinisk situasjon og hvorfor den er viktig for pasientsikkerheten.

---

### Del 6 — Repetisjonsspørsmål (10 min)

Besvar følgende spørsmål i labboken din — du går gjennom dem muntlig med labingeniøren når du skal godkjennes:

1. IEC 60601-2-24 fastsetter ikke selv en tallgrense for strømningsnøyaktighet: standarden beskriver målemetoden og krever at produsenten oppgir pumpens leveringsnøyaktighet. Hvorfor er strømningsnøyaktighet klinisk kritisk — gi et konkret eksempel på et legemiddel der 5 % avvik fra innstilt hastighet har betydning.

2. Forklar «trompetkurve»-fenomenet i infusjonspumper. Hvorfor varierer strømningshastigheten mer ved lave innstilte hastigheter enn ved høye?

3. Du testet okklusjonstrykk ved et bestemt trykknivå på Infusomat Space. Forklar den kliniske avveiningen mellom å sette en høy versus lav okklusjonsalarmterskel. Hvordan ville du bestemt hvilket trykknivå som skal brukes for en neonatal pasient versus en voksen pasient?

4. Anti-fritt-flyt-mekanismen i Infusomat Space er en teknisk sikkerhetskontroll i risikokontrollhierarkiet. Rulleklemmen på administrasjonssettet er en administrativ kontroll (krever brukerhandling). Hvorfor trengs begge? Hva kan skje om bare ett lag med beskyttelse fantes?

5. Basert på luft-i-slange-eksperimentene dine (del 4), forklar forskjellen mellom pumpens respons på små og store luftvolum. Hva er de kliniske konsekvensene av at luft kommer inn i blodstrømmen?

6. Fra Perfusor Space service manual, hvilket verktøy bruker en klinisk ingeniør for å kvalitetssjekke og kalibrere cut-off-trykket? Hvorfor er periodisk kalibrering viktig?

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Strømnings- og okklusjonsmålingene fra del 2.1, 2.2 og 3.1–3.3, lest opp fra labboken din, sammen med akseptkriteriet du vurderte hver pumpe mot og hvor den verdien kommer fra
- Sikkerhetsfunksjonene i praksis: anti-fritt-flyt-klemmen (del 1.2), pumpens respons på små og store luftvolum (del 4.1–4.3) og trykkreduksjonsalarmen fra upstream-sensoren (del 5) — vist på utstyret eller forklart ved benken
- Svarene dine på de seks repetisjonsspørsmålene i del 6, og klassifiseringen av anvendt del som du kom fram til i del 1.3

Ingen skriftlig innlevering.
