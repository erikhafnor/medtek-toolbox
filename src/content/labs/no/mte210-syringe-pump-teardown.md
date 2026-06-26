---
title: "Demontering og samsvarsvurdering av sprøytepumpe"
course: "MTE210"
description: "Fullstendig demontering av en Alaris CC sprøytepumpe: inventar over hvert delsystem, kobling av hvert designtrekk til kravet i IEC 60601-1, DMM- og oscilloskopmålinger, og deretter remontering med funksjonsverifisering og en IEC 62353-sikkerhetstest etter reparasjon"
equipment:
  - "CareFusion Alaris CC sprøytepumpe (én per gruppe)"
  - "ESD-sikker arbeidsmatte og håndleddsstropp"
  - "Torx-bitssett (T6, T8, T10, T20) og momentskrutrekker"
  - "Digitalt multimeter (DMM)"
  - "Tokanals oscilloskop med ×10 prober"
  - "Fluke ESA615 elektrisk sikkerhetsanalysator"
  - "Kamera eller mobil for dokumentasjon"
prerequisites:
  - "Teknisk servicemanual for Alaris CC sprøytepumpe (1000SM00001) og bruksanvisning (DFU)"
  - "Forelesningsnotater om IEC 60601-1 (beskyttelsesmidler, anvendte deler, enkeltfeilsikkerhet)"
  - "Fullført Lab i elektrisk sikkerhetstesting (IEC 62353)"
  - "Referanse: IEC 60601-1 Essentials (på dette nettstedet)"
  - "Referanse: Leakage Current Measurement Guide (på dette nettstedet)"
duration: "6 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Klassifisere sprøytepumpen etter beskyttelsesklasse og type anvendt del ut fra både utvendig merking **og** innvendig konstruksjon, og knytte hver merking til IEC 60601-1 kapittel 7.
- Trygt isolere, spenningsløsgjøre og fullstendig demontere et nett- og batteridrevet medisinsk apparat, med forholdsregler mot lagret energi, ESD og klemfare.
- Lage inventar over hvert delsystem og koble hvert observert designtrekk til det spesifikke kravet i IEC 60601-1 (og relevant tilleggs-/særstandard) som det oppfyller, og faren det kontrollerer.
- Identifisere beskyttelsesmidler (MOOP/MOPP), isolasjonsbarrierer og krype-/luftavstander, og forklare rollen til den uavhengige sikkerhetsprosessoren i enkeltfeilsikkerhet.
- Utføre og tolke DMM-målinger (beskyttelsesjording, sikring, krype-/luftavstand) og oscilloskopopptak (trinnmotordrift, kraft-/trykksensor, rippel på forsyningsskinne, alarm) mot konkrete akseptkriterier.
- Remontere pumpen til produsentens tiltrekkingsmoment og verifisere funksjon med selvtest ved oppstart.
- Utføre en IEC 62353 elektrisk sikkerhetstest etter reparasjon og forklare hvorfor den er obligatorisk etter at kapslingen har vært åpnet.

---

## Sikkerhetsmerknader

> **NETT- OG LAGRET ENERGI-FARE.** Denne pumpen drives fra nettet og fra et internt batteri. Den koblede strømforsyningen (switch-mode) har en nett-**primærside** med kondensatorer som kan holde på ladning **etter** at nettkabelen er trukket ut. Servicemanualen oppgir **ingen** utladningstid — behandle primærsiden og alle store kondensatorer som spenningsførende til det motsatte er bevist. Det er fare for elektrisk støt når kapslingen er åpen (servicemanual s.6).

- **Isoler først, batteri først.** Slå pumpen AV, fjern deretter **batteriet før alt annet** (batterideksel = to skruer), og koble *deretter* fra nettkabelen. Å fjerne den interne kilden først gjør pumpen spenningsløs før du åpner den.
- **Behandle PSU-ens primærside og kondensatorer som ladet.** Ikke prob nettinntak, sikringsholder eller PSU-ens primærside på en remontert, nylig spenningssatt pumpe. Alle elektriske sikkerhetsmålinger i Del 4 gjøres med pumpen **spenningsløs og åpen**.
- **Ingen målinger under spenning eller lekkasjemålinger under demontering.** Det eneste arbeidet under spenning i denne øvelsen er oscilloskopopptakene etter remontering (Del 6, kun på **batteri**) og IEC 62353-testen (Del 7) — begge på en remontert pumpe og begge kun med veileders godkjenning.
- **ESD-forholdsregler.** Bruk håndleddsstropp og arbeid på ESD-matten hele tiden — kretskortene er statisk-følsomme (servicemanual s.6, s.47). Kretskortene er **ikke reparerbare på komponentnivå**: forsøk aldri kortreparasjon eller berør komponentben. Ikke berør eller kortslutt det loddede backup-cellebatteriet på kontrollkortet.
- **Klemfare.** Hold fingrene unna stempel-/ledeskruedrevet — sleden og halvmutteren kan bevege seg, og griperen kan kobles ut. Belast aldri kraftsensoren over 10 kgf.
- **Batterihåndtering.** NiMH-pakken har en termisk sikring og termisk utkobling. Ikke kortslutt polene, knus eller punkter den. Hold den på ESD-matten med polene opp.
- **Bare veileder godkjenner ethvert trinn under spenning** — de batteridrevne oscilloskopopptakene, selvtesten og IEC 62353-testen.

---

## Oppsett av utstyr

1. Sett opp en **ESD-sikker arbeidsbenk**: jordet matte og håndleddsstropp. Legg ut et rent brett eller et ark med et merket rutenett for delinventaret.
2. Skaff verktøy: **Torx T6/T8/T10/T20**, en **momentskrutrekker** (cNm/Nm), DMM, oscilloskop med ×10 prober og Fluke **ESA615**.
3. Ha **servicemanualen (1000SM00001)** og **bruksanvisningen (DFU)** åpne. Du vil bruke sprengskissene (Corrective Maintenance, s.47–78) og momenttabellen (s.91–92) gjennom hele øvelsen.
4. **Funksjonstest før demontering (referanse).** Med veileders godkjenning, slå på pumpen og bekreft at den fullfører **selvtest ved oppstart** uten feil, går på batteri og gir alarm. Noter resultatet — du skal sammenligne med det etter remontering. *En pumpe må vises å virke før du demonterer den, ellers beviser ikke etterkontrollen noe.*
5. Slå AV, **fjern batteriet**, og koble deretter fra nettkabelen før du starter Del 2.

---

## Prosedyre

### Del 1 — Apparatidentifikasjon og klassifisering (35 min)

Med utgangspunkt i merkeskiltet, serie-/statusetiketten og bruksanvisningen, registrer følgende. Denne delen er forankret i **IEC 60601-1 kapittel 7 (merking og etiketter)**.

| Egenskap | Registrert verdi | Hvor / hvordan du fastslo det |
|---|---|---|
| Produsent og modell | | |
| Katalog-/bestillingsnummer | | |
| Serienummer | | |
| Programvareversjon (Plus / Guardrails?) | | |
| Maskinvaregenerasjon (Mk1–3 eller Mk4) | | |
| Beskyttelsesklasse (I, II eller internt drevet) | | |
| Hvordan fastslo du klassen? | | |
| Type anvendt del (B, BF eller CF) | | |
| Defibrilleringssikker? (symbol til stede?) | | |
| Hvilke deler er anvendt(e) del(er)? | | |
| Nettforsyning (V / Hz / VA) | | |
| Sikringsverdi (fra merkeskilt) | | |
| IP-klasse (kapslingsgrad) | | |
| CE-merke + teknisk kontrollorgan | | |
| UDI / GTIN til stede? | | |
| Andre symboler observert (list opp) | | |

**Hint:**
- Merkeskiltet sitter på bakdekselet. Forvent en nettforsyning rundt **115–230 V ~ 50–60 Hz, 20 VA**, en sikringsmerking som **2 × T 1,25 A, 250 V**, **IPX1**, og CE med teknisk kontrollorgan **0086**.
- Type anvendt del vises med hjerte-/bokssymbolet; en **defibrilleringssikker** del har i tillegg et defibrillator-padlesymbol. Servicemanualen oppgir **Klasse I, Type CF** (s.33), men **bekrefter ikke** defibrilleringsbeskyttelse — noter nøyaktig hva *ditt* merkeskilt viser.
- **Se nøye på beskyttelsesklassesymbolet.** Du kan oppdage at merkeskiltets klassesymbol står i strid med manualens egen tekst (s.33 oppgir **Klasse I**) og med PE-stussen/jordingen du finner senere. Noter symbolet nå; du skal forene dette i Del 3 og 4.

**Spørsmål å tenke over:** Hvilke av disse merkingene *kreves* av IEC 60601-1 kapittel 7, og hvilke kreves av EU MDR (f.eks. UDI)? Hvorfor må typen anvendt del kunne merkes uten å fjerne dekselet?

---

### Del 2 — Trygg demontering og delinventar (70 min)

> Bekreft at batteriet er **ute** og nettkabelen er **frakoblet** før du begynner. Fotografer hvert trinn.

**Demonteringssekvens** (servicemanual Corrective Maintenance-kapittel, s.47; demonteringstrinn fra s.48 — følg sprengskissene):

1. Bekreft AV, batteri fjernet (2 batteridekselskruer), nett frakoblet. Sett pumpen i støttebrakett hvis tilgjengelig.
2. Fjern de **seks hovedkapslingsskruene** (T20).
3. **Kun CC:** lirk ut **blindpluggen / skivedekselet** for trykkgiveren og fjern festeskruen (s.48).
4. Skill forsiktig fram- og bakdekselet; **fotografer kabelføringen før** du kobler fra noen kontakt.
5. Demonter og legg ut hvert delsystem etter manualen: strømforsyning + høyttaler (s.50), nettinntak + sikring + PE-stuss + magnet (s.52), kontrollkort og backup-celle (s.57–59), display-kort og tastatur (s.60), chassis-kort + stempel-/ledeskrue-enhet (s.62), sprøytestørrelse-enhet (s.66), og **CC linjetrykk-giveren** (s.64, s.73).

**Delinventartabell** — legg hver del på rutenettet, merk den og fyll ut en rad. Hoveddelsystemene er forhåndslistet; legg til de enkeltdelene du finner.

| # | Del / komponent | Delsystem | Antall | Merking / observasjoner |
|---|---|---|---|---|
| 1 | Fram- og bakdeksel, batterideksel | Kapsling / hus | | |
| 2 | Trinnmotor, drivreim, ledeskrue, slede, halvmutter, stempelgriper | Stempeldrift (transmisjon) | | |
| 3 | Lineær-bevegelse-potensiometer (og motorenkoder, Mk4) | Stempelposisjonsføling | | |
| 4 | Vishay dreiepotensiometer + sprøyteklemme | Sprøytestørrelse-føling | | |
| 5 | Kraftsensor på chassis-kort | Kraft-/okklusjonsføling | | |
| 6 | Trykkgiver + trykkskiveholder | Linjetrykkføling (kun CC) | | |
| 7 | Nettinntak, sikring(er), holder | Nettinngang / overstrømsvern | | |
| 8 | Strømforsyning (PSU) + Power-kort | Strømomforming (nett → 15 VDC) | | |
| 9 | PE-stuss + jordledere | Beskyttelsesjording | | |
| 10 | NiMH-batteripakke (+ gas-gauge-kort) | Oppladbar strøm / backup | | |
| 11 | Kontrollkort (hoved- + sikkerhetsprosessor) + loddet backup-celle | Styre- og sikkerhetselektronikk | | |
| 12 | LCD + CCFL-baklys, display-isolator/pakning | Display | | |
| 13 | Hylle-/På-Av-/Valg-tastaturer | Brukerinngang | | |
| 14 | Hovedhøyttaler + backup-høyttaler + piezo-summer | Hørbar alarm | | |

**Spørsmål å tenke over:** Hvilket enkelt kretskort bærer **både** hovedprosessoren og den uavhengige sikkerhetsprosessoren, og hvorfor tillater plassering på ett kort likevel uavhengig avstenging av motoren? Hvilke deler har produsenten gjort **ikke-reparerbare**, og hva forteller det deg om hvordan risiko styres allerede i designet?

---

### Del 3 — Samsvarsvurdering av design (60 min)

Dette er den sentrale intellektuelle oppgaven. For hvert delsystem, forklar **hvordan produsentens designvalg kobles til et spesifikt standardkrav og faren det kontrollerer.** Fyll ut koblingstabellen; første rad er løst som eksempel.

| Del / delsystem | Observert designtrekk | Standard og avsnitt | Fare som kontrolleres |
|---|---|---|---|
| Merke- og anvendt del-etiketter | Klasse-/typesymboler, sikrings- og nettmerking, CE 0086, UDI | IEC 60601-1 **kap. 7**; symboler ISO 15223-1 / IEC 60417; UDI iht. EU MDR 2017/745 | Feilidentifikasjon; feil service/reservedeler; sporbarhet |
| Nettinntak + sikring | Treg (antisurge) **T 1,25 A** sikring(er) i forsyningen | IEC 60601-1 **§8.11.5** (nettsikringer / overstrøm), **§11.2** (brann); **§13** (feiltilstander) | Overstrøm / brann |
| PSU nett→15 VDC | Isolert switch-mode-forsyning; isolasjonsbarriere primær↔sekundær | IEC 60601-1 **§8.5** (MOOP/MOPP), **§8.8** (isolasjon), **§8.9** (krype-/luftavstand) | Elektrisk støt over nettbarrieren |
| PE-stuss + jordet inntak | Chassis bundet til nettjord via PE-stussen | IEC 60601-1 **§8.6** (beskyttelsesjording) | Støt fra en jordet metalldel ved enkeltfeil |
| Isolasjon av anvendt del | Pasientsideisolasjon av væskebane/sensorer; Type CF | IEC 60601-1 **§8.5.1** (pasientisolasjon), **§8.7.3** (pasientlekkasje, CF), **§8.5.5** (defib, hvis merket) | Mikrosjokk / hjertestrøm |
| Batteridelsystem | NiMH-pakke med termisk sikring, termisk utkobling, gas-gauge-kort | IEC 60601-1 **§15.4.3** (batterier), **§11.1** (for høy temperatur); IEC 62133-1 (NiMH-celler) | Termisk rømning / overutlading / brann |
| Stempel-/ledeskruedrift | Innkapslet transmisjon, skjermet slede, manuell utkobling | IEC 60601-1 **§9.2** (bevegelige deler / klempunkt) | Klemfare; ukontrollert stempelbevegelse |
| Kraft-/okklusjons- + linjetrykkføling | Kraftsensor + (CC) linjetrykk-giver utløser alarmer | IEC **60601-2-24 §201.12.4** (nøyaktighet, okklusjonsalarm og bolus); IEC 60601-1 **§4.7/§13** | Okklusjon → underinfusjon / trykkstøt |
| Uavhengig sikkerhetsprosessor | Andre prosessor kan stenge av trinnmotoren og alarmere på egen hånd | IEC 60601-1 **§14** (PEMS) + IEC 62304; **§4.7** enkeltfeil | Ukontrollert infusjon hvis hovedprosessoren svikter |
| Hørbare alarmer (×2) + summer | Hovedhøyttaler **pluss** uavhengig backup-høyttaler/piezo | IEC **60601-1-8** (alarmsystemer) | Tap av alarmvarsling |
| Display-/tastaturtetting | Isolator + pakning; IPX1 kapslingsdesign | IEC 60601-1 **§11.6** (inntrenging, IEC 60529); **§8.x** isolasjon | Væskeinntrenging → støt / feilfunksjon |
| EMC-design | Gruppe 1 Klasse A; økt immunitet, feilsikker ved RF | IEC **60601-1-2** (tilleggsstandard EMC) | EMI-indusert feilfunksjon |

**Svar deretter i labboken:**
1. Manualens tekst (s.33) og maskinvaren (en PE-stuss bundet til chassiset, et jordet nettinntak) tilsier begge **Klasse I**, men merkeskiltets klassesymbol kan være tegnet som **Klasse II (dobbelt kvadrat)**, og pumpen har dessuten et internt batteri (internt drevet). Bruk IEC 60601-1-definisjonene av **Klasse I**, **Klasse II** og **internt drevet**, og forskjellen på en **beskyttelsesjord** og en **funksjonsjord**, til å forene det du ser. Hvilken klassifisering gjelder, og hvorfor?
2. Velg ett delsystem og forklar hvordan det gir **to beskyttelsesmidler** (f.eks. 2× MOPP). Hva er de to uavhengige barrierene, og hva skjer hvis den ene svikter (enkeltfeilsikkerhet)?

---

### Del 4 — Elektriske sikkerhetsmålinger: DMM (spenningsløs) (45 min)

> **Pumpen må være ÅPEN, batteriet UTE, nettet FRAKOBLET.** Dette er målinger på spenningsløs krets. Ikke spenningssett pumpen i denne delen.

Fyll ut måletabellen og sammenlign hvert resultat med akseptkriteriet.

| # | Måling | Metode | Akseptkriterium | Avlesning | Godkjent/Ikke godkjent |
|---|---|---|---|---|---|
| 1 | Beskyttelsesjording: jordpinne på nettinntak → chassis / PE-stuss | DMM kontinuitet (Ω) | IEC 60601-1 **§8.6.4**: ≤ **0,1 Ω** mellom PE-terminalen og jordede deler (uten kabel); ≤ **0,2 Ω** hvis banen inkluderer en avtakbar kabel. IEC 62353: ≤ **0,3 Ω** (inkl. nettkabel) | | |
| 2 | Sikringskontinuitet + trykt verdi | DMM kontinuitet; les sikringen | Kontinuitet ≈ 0 Ω; verdi stemmer med merkeskilt (**T 1,25 A**) | | |
| 3 | Batteripakkens tomgangsspenning | DMM DC-volt på pakkepolene | **7,2 V** nominelt (6 × 1,2 V); typisk ≈ 8,0–8,4 V ladet (manualens kal.-eksempel ≈ 8,21 V, s.21) | | |
| 4 | Krypeavstand, nett **primær ↔ sekundær** på PSU/Power-kort | Skyvelære / linjal | Veiledende mål ≈ **8 mm** for 2× MOPP ved ~250 V (IEC 60601-1 §8.9, MOPP-tabell 13–16) | | |
| 5 | Luftavstand, nett **primær ↔ sekundær** | Skyvelære / linjal | Veiledende mål ≈ **5 mm** for 2× MOPP ved ~250 V (§8.9) | | |
| 6 | Kontinuitet for L og N fra nettinntak til PSU-inngang | DMM kontinuitet | Sammenhengende; ingen brudd | | |

**Spørsmål å tenke over:** Din beskyttelsesjordingsavlesning — består den **60601-1 typetest**-grensen, **62353 periodisk test**-grensen, eller begge? Hvorfor er de to grensene forskjellige? (Merk at 62353-grensen på 0,3 Ω gjelder banen *inkludert* nettkabelen.) Sammenlign din målte krypeavstand med den veiledende verdien: hvordan gir en større krypeavstand et høyere *beskyttelsesmiddel* (MOOP vs MOPP)?

---

### Del 5 — Remontering og funksjonsverifisering (60 min)

Remonter pumpen **til produsentens tiltrekkingsmoment** (servicemanualens momenttabell, s.91–92). Disse pumpene gjenbrukes av senere grupper, så bygg dem riktig sammen.

1. Reverser demonteringen. Koble til hver kabel som fotografert.
2. Trekk til de viktigste festene til moment — noter dem:

| Feste | Spesifikasjon (fra manual) | Påført? |
|---|---|---|
| Fram ↔ bakdeksel (6 × T20) | **125 cNm** | |
| Batterideksel / håndtak (2 × T20) | **90 cNm** | |
| Chassis-kort → chassis (M3×8) | **75 cNm** | |
| CC trykkgiver → framdeksel | **70 cNm** | |
| Motorplate → chassis | **1,1 Nm** | |
| PE-stussmutter / jordleder | **håndstramt** (iht. manual) | |

3. Sett inn batteriet, koble deretter til nett.
4. **Funksjonsverifisering:** slå på og bekreft at **selvtest ved oppstart** består (ingen feilkoder). Bekreft at den går på **batteri** og på **nett**, at AC-indikatoren lyser, at LCD/baklys er riktig, og at minst én **alarm** varsles (f.eks. drift utkoblet eller sjekk sprøyte).

| Verifiseringstrinn | Forventet | Observert | Godkjent/Ikke godkjent |
|---|---|---|---|
| Selvtest ved oppstart | Fullfører, ingen feilkoder | | |
| Går på batteri | Batteriindikator på, infunderer | | |
| Går på nett | AC-indikator på, lader | | |
| Display + baklys | Riktig, lesbart | | |
| Alarmvarsling | Hørbar + visuell alarm | | |

**Spørsmål å tenke over:** Hvilke kalibrerings-/verifiseringstrinn krever produsenten etter bytte av kontrollkortet eller trykkgiveren (manual s.47)? Demonteringen din byttet ingenting — så hvilke av disse gjelder fortsatt, og hvilke ikke?

---

### Del 6 — Signalmålinger: oscilloskop (batteridrevet) (40 min)

> **Godkjent, kun batteri.** Med veileders godkjenning, kjør den remonterte pumpen på det interne **batteriet (nettkabel frakoblet)**. Siden nett-primærsiden nå er borte, er alle interne noder SELV/lavenergi. Prob bare punktene veileder anviser.

Ta opp hvert signal, skisser/skriv ut sporet, og beskriv om det er «sunt».

| # | Signal | Slik tar du opp | Slik ser et sunt spor ut | Observasjon |
|---|---|---|---|---|
| 1 | Trinnmotordrift (én spole) | Prob en motorspoleleder; kjør lav rate (f.eks. 100 mL/h) | Regelmessige choppede/PWM-strømpulser, én pakke per trinn, ingen tapte trinn | |
| 2 | Kraft-/linjetrykksensorutgang | Prob sensorens analoge linje mens du forsiktig belaster stempelet / okkluderer | Jevn, monoton DC analog rampe som stiger med kraft/trykk (jf. kal.: 0 kgf ≈ 1,68 V, 10 kgf ≈ 3,15 V) | |
| 3 | Rippel på intern forsyningsskinne | Prob en regulert DC-skinne (batteri-/logikkskinne) | Stabil DC, lav rippel (titalls mV pp); ingen store svitsjespiker | |
| 4 | Alarm-/summerdrift | Utløs en alarm; prob piezo-/høyttalerdriften | Periodisk tonepuls (firkant/AC-drift ved summerfrekvensen) | |

Noter oscilloskopinnstillingene dine (V/div, tid/div) for hvert opptak.

**Spørsmål å tenke over:** Ut fra trinnmotorsporet — hvordan oppnår pumpen en jevn, nøyaktig lav strømningsrate fra diskrete motortrinn? Hvorfor er det trygt å ta disse opptakene på batteri, men **ikke** å probe det samme kortet med nettkabelen tilkoblet og kapslingen åpen?

---

### Del 7 — Elektrisk sikkerhetstest etter reparasjon (IEC 62353) (35 min)

Å åpne kapslingen forstyrrer pumpens beskyttelsesmidler (PE-forbindelsen, isolasjonsbarrierene og isolasjonen av anvendt del). **IEC 62353 krever en elektrisk sikkerhetstest etter reparasjon før apparatet kan tas i bruk igjen.** Utfør testen på den **remonterte** pumpen med Fluke **ESA615**, som i *Lab i elektrisk sikkerhetstesting*. Pumpen er **Klasse I, Type CF** — bruk **CF-grensene**.

| IEC 62353-test | Grense (Klasse I / Type CF) | Avlesning | Godkjent/Ikke godkjent |
|---|---|---|---|
| Beskyttelsesjordresistans | ≤ **0,3 Ω** (inkl. nettkabel) | | |
| Utstyrslekkasjestrøm (alternativ / direkte metode) | ≤ **500 µA** (Klasse I) | | |
| Lekkasjestrøm i anvendt del (Type CF) | ≤ **50 µA** | | |
| Isolasjonsresistans — nett ↔ PE *(valgfri)* | ≥ **2 MΩ** | | |
| Isolasjonsresistans — nett ↔ anvendt del *(valgfri)* | iht. ESA615-forhåndsinnstilling | | |
| **Totalvurdering: GODKJENT / IKKE GODKJENT** | | | |

> **IEC 62353 vs IEC 60601-1.** I Lab i elektrisk sikkerhetstesting målte du *kapslings*- og *pasient*lekkasje mot 60601-1-grenser (≤ 100/500 µA; CF ≤ 10/50 µA, normal/enkeltfeil). IEC 62353 slår disse sammen til én **utstyrslekkasje**-verdi (≤ 500 µA, Klasse I) og én **anvendt del-lekkasje**-verdi (≤ 50 µA, Type CF), målt med alternativ/direkte/differensiell metode i stedet for normal-vs-åpen-PE-manipulasjonen. Noter hva ESA615 rapporterer i 62353-modus og koble de to modellene.

Sammenlign beskyttelsesjordingsresultatet her med DMM-avlesningen din fra **Del 4** og **referansen** (Oppsett av utstyr). Hvis en verdi nærmer seg eller overskrider en grense, beskriv hvilket tiltak du ville iverksatt som klinisk ingeniør.

**Spørsmål å tenke over:** Hvilke av disse testene kontrollerer spesifikt på nytt de beskyttelsesmidlene du forstyrret under demonteringen? Hvis dette var en reell idriftsetting igjen, ville en bestått selvtest (Del 5) alene vært tilstrekkelig? Hvorfor / hvorfor ikke?

---

### Del 8 — Repetisjonsspørsmål (15 min)

1. En sprøytepumpe brukt til **vasoaktive legemidler** kobles ofte via et sentralt venekateter som gir en direkte elektrisk bane mot hjertet. Forklar hvorfor dette tilsier en **Type CF** anvendt del-klassifisering, og hvorfor CF-grensene for pasientlekkasje er ti ganger strengere enn BF. Separat: er **defibrilleringssikker** beskyttelse (§8.5.5) det samme som Type CF eller et tilleggskrav — og hvordan ser du det på merkingen?
2. Beskriv hvordan **kraft-/okklusjonsfølingen** og den **uavhengige sikkerhetsprosessoren** sammen realiserer **enkeltfeilsikkerhet** (IEC 60601-1 §4.7) og okklusjonskravene i **IEC 60601-2-24**. Hva skjer med motoren hvis hovedprosessoren henger?
3. Du målte en krypeavstand mellom nett-primær og sekundær på PSU-en. Koble verdien din til **§8.9** og begrepet **2× MOPP**. Hvorfor krever pasientisolasjon større avstander enn operatørisolasjon?
4. Foren **beskyttelsesklassebevisene** du samlet: PE-stuss + jordet inntak (Klasse I) vs. et mulig Klasse II-merkesymbol, pluss et internt batteri (internt drevet). Er PE-en en **beskyttelses**jord eller en **funksjons**jord? Vis til de relevante definisjonene.
5. Etter at kapslingen er åpnet, **hvilke IEC 62353-tester er obligatoriske** før idriftsetting igjen, og hvorfor? Hvilke spesifikke beskyttelsesmidler forstyrret demonteringen din? Hvis beskyttelsesjordresistansen viste **0,45 Ω**, består den — og hva ville du undersøkt?
6. Sikringen er en **treg (antisurge) T 1,25 A**-type i forsyningen. Hvorfor treg fremfor hurtig for en switch-mode-forsyning? Hvordan henger **1,25 A / 20 VA**-verdien sammen, og hvordan danner sikringen, beskyttelsesjordingen og isolasjonen sammen den samlede beskyttelsesstrategien (§8.11, §11.2)?

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode og dato.
- Den utfylte **klassifiseringstabellen** (Del 1), **delinventartabellen** (Del 2) og **samsvarskoblingstabellen** (Del 3).
- De utfylte **måletabellene** fra Del 4, 6 og 7, med godkjent/ikke godkjent-status og noterte oscilloskopinnstillinger/spor.
- **Fotografier** som dokumenterer demonteringstrinnene og det utlagte delinventaret.
- **Momentprotokollen for remontering** (Del 5) og resultatene fra funksjonsverifiseringen.
- Skriftlige svar på de seks repetisjonsspørsmålene (Del 8).
- En kort konklusjon (200–300 ord) som drøfter hvordan Alaris CC-ens konstruksjon gjenspeiler designkravene i IEC 60601-1, hva demonteringen avdekket om lagdelt (enkeltfeil-) sikkerhet, og hvorfor en elektrisk sikkerhetstest etter reparasjon er obligatorisk etter at kapslingen har vært åpnet.
