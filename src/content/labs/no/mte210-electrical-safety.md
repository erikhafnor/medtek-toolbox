---
title: "Lab i elektrisk sikkerhetstesting"
course: "MTE210"
shortTitle: "Elektrisk sikkerhet"
description: "Periodisk elektrisk sikkerhetstest av en LIFEPAK 20e med Fluke ESA615, etter IEC 62353 og produsentens egen kontrollprosedyre"
equipment:
  - "LIFEPAK 20e defibrillator/monitor"
  - "Fluke ESA615 elektrisk sikkerhetsanalysator"
  - "EKG-pasientkabel (3- eller 5-avledning) til LIFEPAK 20e"
  - "Testledninger og krokodilleklemme til jordpunkt"
prerequisites:
  - "Servicemanual for LIFEPAK 20/20e, kapittel «Performance Inspection Procedure»"
  - "Brukermanual for Fluke ESA615"
  - "Referanse: IEC 60601-1 Essentials (på dette nettstedet)"
  - "Referanse: Veileder for lekkasjestrømsmåling (på dette nettstedet)"
duration: "2 timer 45 minutter"
---

## Formål

Utføre en komplett periodisk elektrisk sikkerhetstest av ett apparat — en **LIFEPAK 20e defibrillator/monitor** — med **Fluke ESA615**, og forstå hvorfor det samme apparatet får forskjellige tall avhengig av hvilken standard, hvilken metode og hvilket strømnett du måler under.

---

## Læringsmål

Etter denne laboratorieøvelsen skal du kunne:

- Klassifisere et apparat (beskyttelsesklasse og type anvendt del) ut fra servicemanualen
- Velge riktig målemetode for lekkasjestrøm etter flytskjemaet i IEC 62353, og begrunne valget
- Måle beskyttelsesjordresistans med riktig teststrøm, og vurdere resultatet mot flere grenseverdier
- Måle apparatlekkasjestrøm og avledningslekkasjestrøm etter IEC 62353
- Gjennomføre produsentens egen kontrollprosedyre (PIP) for LIFEPAK 20e og sammenligne med IEC 62353
- Forklare hvorfor målingene endrer seg mellom IT-nett og TN-nett, og hva det betyr for godkjenning
- Dokumentere en test slik at den kan etterprøves

---

## Sikkerhetsmerknader

> **STØTFARE.** Under testene settes apparatet under nettspenning med beskyttelsesjord brutt, og under isolasjonstesten (ISO TEST / MAP) legges nettspenning ut på EKG-tilkoblingene. **Ikke ta på EKG-knappene på ESA615, pasientkabelen eller apparatets tilkoblinger mens en test pågår.**

- Les servicemanualens advarsel før du starter: feil utført test kan la for høy lekkasjestrøm passere ubemerket. Gjør deg kjent med ESA615 før du kobler til pasientkabelen.
- LIFEPAK 20e er en defibrillator. Ikke lad eller utlad apparatet i denne øvelsen — her testes bare elektrisk sikkerhet. La energiknappene være i fred.
- Når du bytter mellom normal og reversert polaritet på analysatoren, stopp i midtstilling (av) underveis.
- Apparatet skal stå på et tørt, isolert underlag under testen, uten annen jordforbindelse enn strømkabelen. En ekstra jordforbindelse gjør den direkte metoden ugyldig (se Del 1).
- Meld fra til veiledende tekniker om skade på utstyret eller uventet oppførsel.

---

## Bakgrunn — to standarder, ett apparat

**Forskrift om håndtering av medisinsk utstyr § 11** krever at vedlikehold er planlagt, systematisert og basert på utstyrets egne anvisninger og en risikovurdering, og at utført vedlikehold dokumenteres. Det er denne plikten testen din oppfyller.

To standarder møtes i denne labben:

- **IEC 60601-1** er produktstandarden. Den brukes når utstyret konstrueres og typegodkjennes, og den har mange forskjellige lekkasjestrømsmålinger. Produsentens egen kontrollprosedyre for LIFEPAK 20e bygger på denne.
- **IEC 62353** er standarden for *periodisk test og test etter reparasjon*. Den ble laget fordi 60601-1 er lite egnet for gjentatte tester ute i avdelingene, og den forenkler til **to** lekkasjemålinger. Den er ikke obligatorisk i Norge, men er godkjent av Norsk Elektroteknisk Komité som **NEK IEC 62353:2014**.

IEC 62353 erstatter ikke IEC 60601-1 — den kontrollerer utstyr som allerede er bygget etter den.

> Bakgrunnsstoffet og oppbyggingen av denne øvelsen bygger på kursmateriell om IEC 62353 og Fluke ESA615 av **Frode Knudsen, Nordic Service Group Norway AS**, brukt i undervisningen etter avtale.

---

## Oppsett av utstyr

1. Sett LIFEPAK 20e på benken, på et tørt og isolert underlag. Kontroller at apparatet ikke har andre jordforbindelser enn sin egen strømkabel.
2. Koble ESA615 til et jordet nettuttak. Apparatet kjører en selvtest ved oppstart — les meldingen den gir før du går videre (du kommer tilbake til den i Del 6).
3. Koble strømkabelen fra LIFEPAK 20e til **DUT-uttaket** på ESA615.
4. Ha servicemanualen for LIFEPAK 20/20e tilgjengelig. Du skal lese grenseverdier ut av den selv.
5. Ikke koble til EKG-pasientkabelen ennå — den kobles til i Del 4.

---

## Prosedyre

### Del 1 — Klassifisering og valg av testmetode (20 min)

Alt annet i denne labben følger av dette steget. IEC 62353 sier at du skal begynne med servicemanualen.

**1.1** Slå opp i servicemanualen for LIFEPAK 20/20e og noter i labnotatboken:

| Spørsmål | Svar | Hvor fant du det |
|---|---|---|
| Beskyttelsesklasse (I eller II)? | | |
| Type anvendt del for EKG (B, BF eller CF)? | | |
| Type anvendt del for SpO₂ (hvis montert)? | | |
| Er strømledningen fast eller avtakbar? | | |
| Hvilke grenseverdier oppgir manualen selv? | | |

> **Hint:** hvis du ikke finner klassen direkte, se hvilke tester manualen ber om. En jordresistanstest utføres bare på Klasse I-utstyr. Og grenseverdiene for EKG-avledningene forteller deg hvilken type anvendt del det er — sammenlign med tabellen på referansesiden om lekkasjestrøm.

**1.2** Bruk flytskjemaet i IEC 62353 (Tabell A.2 / Flytskjema B.2) til å velge målemetode. Svar på begge spørsmålene og begrunn:

1. **Kan apparatet isoleres fra jord?**
   - Ja → direkte metode
   - Nei → differensiell eller alternativ metode
2. **Har apparatet aktive komponenter i strømforsyningen** (switch-mode strømforsyning, reléer, isolasjonstransformator)?
   - Ja → direkte eller differensiell metode
   - Nei → alternativ metode

**1.3** Konkluder: hvilken metode skal du bruke på LIFEPAK 20e, og hvilken metode er **utelukket**? Skriv ned begrunnelsen — du skal forklare den ved godkjenning.

**1.4** Hvorfor blir resultatet kunstig lavt hvis apparatet har en ekstra jordforbindelse og du likevel bruker direkte metode? Tegn strømveien i labnotatboken.

---

### Del 2 — Visuell inspeksjon (15 min)

IEC 62353 punkt 5.2. Dette er den testen som oftest avdekker den virkelige feilen, og den tar to minutter.

**2.1** Gå gjennom apparatet og noter avvik:

- Kabinett og skjerm: sprekker, slag, manglende deler
- Strømkabel og støpsel: kutt, deformasjon, løs strekkavlastning, varmeskader
- EKG-pasientkabel og avledninger: sprekker i isolasjon, korroderte kontakter, brudd ved strekkavlastningen
- Pads-/paddle-tilkobling og tilbehør
- Merking: er typeskilt, klasse- og typesymboler fortsatt leselige?
- Batteri: tilstand, sitter det som det skal?
- Er det spor av væskesøl eller overoppheting?

**2.2** Slå på apparatet og bekreft at det fullfører oppstartssekvensen og at **Service-indikatoren er av**. Et apparat som selv melder servicebehov skal ikke godkjennes videre uten at årsaken er avklart.

---

### Del 3 — Beskyttelsesjordresistans (25 min)

IEC 62353 punkt 5.3.2. Apparatet er **avslått** under denne testen.

**3.1** Nullstill testledningene på ESA615 (NULL-funksjonen) før du måler. Uten nulling måler du ledningen din i tillegg til apparatet, og på disse verdiene betyr det mye.

**3.2** Kontroller innstillingene mot kravet i IEC 62353: teststrømmen skal være **minst 200 mA**, og testspenningen skal **ikke overstige 24 V**.

**3.3** Mål fra jordpinnen i støpselet til jordpunktet (ground stud) på LIFEPAK 20e. Mål deretter mot minst to andre tilgjengelige ledende deler som er koblet til beskyttelsesjord.

**3.4** **Bøy og strekk strømkabelen forsiktig mens du måler.** En brudden jordleder gir ofte en fin verdi i ro og en dårlig verdi i bevegelse. Noter om verdien er ustabil.

**3.5** Før inn målingene, og vurder dem mot alle tre grenseverdiene:

| Målepunkt | Målt (mΩ) | Stabil under bøying? |
|---|---|---|
| Jordpunkt (ground stud) | | |
| Annen ledende del 1 | | |
| Annen ledende del 2 | | |

| Grenseverdi | Kilde |
|---|---|
| **300 mΩ** (avtakbar ledning: 200 mΩ internt + 100 mΩ kabel) | IEC 62353 |
| **200 mΩ** | IEC 60601-1 |
| **0,5 Ω = 500 mΩ** | Servicemanualen for LIFEPAK 20/20e |

**3.6** De tre grensene er ikke like. Hvilken legger du til grunn for en periodisk test i Norge, og hvorfor? Hva gjør du hvis apparatet består manualens grense, men ikke 62353-grensen? Noter svaret — dette er et av spørsmålene ved godkjenning.

---

### Del 4 — Lekkasjestrøm etter IEC 62353 (35 min)

IEC 62353 punkt 5.3.4. Der IEC 60601-1 har seks–sju forskjellige lekkasjemålinger, har IEC 62353 bare **to**: apparatlekkasjestrøm og avledningslekkasjestrøm. Bruk metoden du valgte i Del 1.

**4.1** Koble EKG-pasientkabelen fra LIFEPAK 20e til EKG-/pasienttilkoblingene på ESA615.

**4.2** Mål **apparatlekkasjestrøm** (Equipment Leakage Current). Med direkte metode settes apparatet under nettspenning og beskyttelsesjord brytes av analysatoren. Mål i **normal og reversert** polaritet, og registrer den **høyeste** verdien.

**4.3** Mål **avledningslekkasjestrøm** (Applied Part Leakage Current) på EKG-avledningene, også her i begge polariteter.

**4.4** Før inn resultatene:

| Måling | Normal (µA) | Reversert (µA) | Høyeste (µA) | Grense | Bestått? |
|---|---|---|---|---|---|
| Apparatlekkasjestrøm | | | | 500 µA (Klasse I, direkte) | |
| Avledningslekkasjestrøm, EKG | | | | se 4.5 | |

**4.5** Grensen for avledningslekkasjestrøm avhenger av typen anvendt del du fant i Del 1: **50 µA for Type CF**, **5000 µA for Type BF**. Hvilken gjelder for EKG-inngangen på LIFEPAK 20e? Hva ville konsekvensen vært om du hadde brukt feil grense?

> **Merk:** hadde du valgt alternativ metode, ville grensen for apparatlekkasjestrøm vært 1000 µA (Klasse I) og ikke 500 µA. Grenseverdien følger metoden. Det er én av grunnene til at du alltid skal dokumentere hvilken metode du brukte.

---

### Del 5 — Produsentens kontrollprosedyre (40 min)

Nå gjør du de samme målingene slik **servicemanualen for LIFEPAK 20/20e** krever dem. Manualen bygger på IEC 60601-1 og AAMI/ANSI DF2/DF39, og den deler opp i flere enkeltmålinger med egne grenser.

I manualens språk betyr:

- **Normal Condition (N.C.)** — nettspenning i normal *eller* reversert polaritet, med beskyttelsesjord **intakt**
- **Single Fault Condition (S.F.C.)** — samme, men med beskyttelsesjord **brutt** (LIFT GND)

Mål i både normal og reversert polaritet i alle stegene under, og registrer den høyeste verdien.

**5.1 Kapslingslekkasjestrøm (Chassis Leakage).** Klemmen fra analysatoren på jordpunktet, apparatet på.

| Tilstand | Målt (µA) | Grense |
|---|---|---|
| N.C. (jord intakt) | | < 90 µA |
| S.F.C. (LIFT GND) | | < 450 µA ved 240 V |

**5.2 Jordlekkasjestrøm (Earth Leakage).**

| Tilstand | Målt (µA) | Grense |
|---|---|---|
| Nøytral lukket | | < 450 µA |
| Nøytral åpen | | < 900 µA |

**5.3 EKG-avledningslekkasjestrøm, avledning mot jord (Lead – Gnd), alle avledninger.**

| Tilstand | Målt (µA) | Grense |
|---|---|---|
| N.C. | | < 10 µA |
| S.F.C. (LIFT GND) | | < 50 µA |

**5.4 EKG-avledningslekkasjestrøm, avledning mot avledning (Lead – Lead).** Gjenta for RA, LA og LL — og for RL og C hvis apparatet har 5-avledning. Samme grenser som i 5.3.

**5.5 Isolasjonstest av avledninger (Lead Iso / MAP).** **Apparatet slås av først.**

> **STØTFARE.** Under denne testen ligger nettspenning på EKG-knappene på analysatoren. Ikke ta på knappene, pasientkabelen eller apparatets tilkoblinger mens ISO TEST er aktivert.

Trykk ISO TEST kortvarig, les av, og slipp. Grense: **< 45 µA**.

**5.6** Sammenlign Del 4 og Del 5 i labnotatboken:

- Hvor mange målinger krevde IEC 62353? Hvor mange krevde manualen?
- Fant de to fremgangsmåtene det samme om apparatet er trygt?
- Hvis apparatet hadde strøket på én av dem, men ikke den andre — hva ville du gjort, og hva ville du skrevet i rapporten?

---

### Del 6 — IT-nett, TN-nett og dokumentasjon (20 min)

**6.1** Gå tilbake til meldingen ESA615 ga under selvtesten i oppsettet. På et **IT-nett** melder analysatoren typisk:

> Fault detected… No ground or isolated mains detected.

Hvorfor kommer den meldingen på IT-nett, og betyr den at analysatoren er defekt? Forklar med utgangspunkt i forskjellen mellom nettene:

- **IT-nett** (Isolated Terra): transformatorens nullpunkt er ikke jordet. Vanligst i Norge. 230 V mellom fasene, ingen fremført nulleder. Tåler «første jordfeil» uten at systemet bryter sammen.
- **TN-nett** (Terra Neutral): PEN-leder fremføres fra trafo og splittes i PE og N i fordelingen. Enerådende i resten av Europa, og vanlig i nyere norske installasjoner.
- **IT-M** (IT Medical) kreves i alle **Gruppe II** medisinske rom — operasjonsstuer og lignende — med isolasjonstransformator og isolasjonsovervåkning.

**6.2** Samme apparat, samme analysator, samme måling (direkte apparatlekkasjestrøm, grense 500 µA) gir forskjellige tall på de to nettene:

| Nett | Normal polaritet, åpen jord | Reversert, åpen jord |
|---|---|---|
| IT-nett | 78,7 µA | 79,1 µA |
| TN-nett | 122,8 µA | 122,3 µA |

Begge består. Men verdien er nesten **dobbelt så høy** på TN-nett. Hva følger av det for hvilket nett du bør teste portabelt utstyr på, hvis du vil ha «worst case»? Og hva betyr det for sammenligning av målinger over tid, hvis apparatet ble testet på ett nett i fjor og et annet i år?

**6.3** Sett opp testrapporten din (IEC 62353 punkt 6.1 og 6.2). Den skal minst inneholde:

- Apparatets identitet: modell, serienummer, avdeling
- Hvilken standard og hvilken **målemetode** du brukte, og hvorfor
- Testinstrument med **kalibreringsfrist**
- Alle måleverdier med grenseverdiene de er vurdert mot
- Hvilket strømnett testen ble utført på
- Funn fra visuell inspeksjon og funksjonstest
- Konklusjon: kan apparatet tas i bruk igjen? Dato og signatur

**6.4** Til slutt: koble fra, sett apparatet tilbake i normal driftstilstand, og bekreft at det starter opp uten feilmelding (IEC 62353 punkt 5.4 og 5.2).

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Klassifiseringen din fra Del 1 og **valget av målemetode** — hvilken metode du brukte på LIFEPAK 20e, hvilken som var utelukket, og hvorfor
- Jordresistansmålingene fra Del 3, hvordan verdien oppførte seg da du bøyde kabelen, og hvilken av de tre grenseverdiene du la til grunn
- De to IEC 62353-målingene fra Del 4 med riktig grense for typen anvendt del, og hva grensen ville vært med en annen metode
- Utfylt tabell fra produsentens kontrollprosedyre i Del 5, og hva sammenligningen med Del 4 viste
- Hvorfor ESA615 melder fra om isolert nett, og hva forskjellen mellom IT-nett og TN-nett gjør med måleverdiene (Del 6)
- Testrapporten din fra 6.3, som en kollega skal kunne etterprøve

Ingen skriftlig innlevering.
