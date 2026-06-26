---
title: "Demontering og samsvarsvurdering av sprøytepumpe"
course: "MTE210"
description: "Demonter en Alaris CC sprøytepumpe og spor hvordan konstruksjonen, servicen og testingen etter reparasjon viser samsvar med EU MDR 2017/745 og ISO 13485 — med de harmoniserte standardene (IEC 60601-1, IEC 62353, IEC 60601-2-24) som bevis"
equipment:
  - "CareFusion Alaris CC sprøytepumpe (én per gruppe)"
  - "ESD-sikker arbeidsmatte og håndleddsstropp"
  - "Torx-bitssett (T6, T8, T10, T20) og momentskrutrekker"
  - "Digitalt multimeter (DMM)"
  - "Tokanals oscilloskop med ×10 prober"
  - "Fluke ESA615 elektrisk sikkerhetsanalysator (med gyldig kalibreringsbevis)"
  - "Kamera eller mobil for dokumentasjon"
prerequisites:
  - "Teknisk servicemanual for Alaris CC sprøytepumpe (1000SM00001) og bruksanvisning (DFU)"
  - "Forelesningsnotater om EU MDR 2017/745 (klassifisering, GSPR, UDI) og ISO 13485"
  - "Forelesningsnotater om IEC 60601-1 og risikostyring (ISO 14971)"
  - "Fullført Lab i elektrisk sikkerhetstesting (IEC 62353)"
  - "Referanse: IEC 60601-1 Essentials (på dette nettstedet)"
checklist:
  - title: "Før du starter"
    items:
      - "Les gjennom hele øvelsen én gang. Hovedpoenget: en ekte infusjonspumpe er en haug med EU MDR-krav gjort fysiske — du tar den fra hverandre, viser at hver del finnes for å oppfylle en regel, setter den sammen igjen og viser at den fortsatt er trygg."
      - "To strømkilder kan bite her — nett *og* batteri. Slå av, ta ut batteriet først, og koble så fra nettkabelen."
  - title: "4.1 — Bli kjent med apparatet"
    items:
      - "Les merkeskiltet som en detektiv: modell, serienummer og alle de små symbolene."
      - "Finn ut MDR-risikoklassen. Hint: å pumpe sterke legemidler inn i en stor vene løfter den et klassetrinn."
      - "Finn UDI-en og CE- + teknisk kontrollorgan-nummeret — apparatets pass og «noen uavhengige har sjekket dette»-stempel."
  - title: "4.2 — Ta den fra hverandre (forsiktig)"
    items:
      - "Fotografer hvert steg før du kobler fra noe — særlig kablene."
      - "Legg hver del på rutenettet og skriv ned jobben dens. Du bygger delelisten fra bunnen."
  - title: "4.3 — Hvorfor er hver del formet som en regel?"
    items:
      - "For hvert delsystem, still to spørsmål: hvilket MDR-krav tvang fram dette? og hvilken standard beviser at de oppfylte det?"
      - "Dette er kjernen i øvelsen — å se regelverk bli til skruer, barrierer, sensorer og alarmer."
  - title: "4.4 — Mål den død"
    items:
      - "Kun måleinstrumenter, ingen spenning. Sjekk jordforbindelsen, sikringen og avstanden mellom den farlige (nett) og den trygge siden."
  - title: "4.5 — Sett den sammen igjen"
    items:
      - "Bygg opp igjen til de eksakte momentverdiene — en løs jordskrue er en reell feil i praksis."
      - "Slå på og la den bestå sin egen selvtest. Hvis den furter, har du glemt en kabel."
  - title: "4.6 — Se den tenke (på batteri)"
    items:
      - "Mål motoren, trykksensoren og alarmen med oscilloskop mens den går på batteri — trygt, fordi det ikke skjuler seg noe nett inni."
  - title: "4.7 — Fortjen retten til å bruke den igjen"
    items:
      - "Kjør IEC 62353-testen med en *kalibrert* analysator, og skriv så serviceprotokollen — det er ISO 13485 i praksis."
      - "Å åpne kabinettet forstyrret sikkerhetsbarrierene; denne testen er måten du beviser at de er intakte igjen."
  - title: "Avslutning"
    items:
      - "Svar på repetisjonsspørsmålene — de knytter det hendene dine gjorde til reglene bak."
      - "Lever tabellene, bildene, serviceprotokollen og en kort refleksjon."
duration: "6 timer"
---

Denne øvelsen bruker et ekte infusjonsapparat som et vindu inn i **regelverket** som lar det nå en pasient. I EU kan en produsent CE-merke og selge denne pumpen kun ved å (a) oppfylle de **generelle kravene til sikkerhet og ytelse (GSPR)** i **EU MDR 2017/745**, Vedlegg I, (b) gjøre det innenfor et sertifisert **ISO 13485**-kvalitetssystem, og (c) vanligvis vise det med **harmoniserte standarder** (IEC 60601-1, IEC 60601-2-24, IEC 60601-1-8, …) som gir en *samsvarsformodning*. Etter at apparatet er tatt i bruk, holder **ISO 13485**-service og **IEC 62353**-testing (periodisk / etter reparasjon) det trygt. Alt dette skal du se i maskinvaren.

---

## 1. Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- **1.1** Fastslå apparatets **EU MDR-risikoklasse** fra Vedlegg VIII og lese **UDI**, CE-merke og teknisk kontrollorgan-nummer, og forklare hva hver av dem forteller (MDR Art. 27, Vedlegg I GSPR 23).
- **1.2** Trygt isolere, spenningsløsgjøre og fullstendig demontere et nett- og batteridrevet medisinsk apparat, med forholdsregler mot lagret energi, ESD og klemfare.
- **1.3** Koble hvert delsystem til **MDR-GSPR (Vedlegg I)** det oppfyller og den **harmoniserte standarden** som beviser det, og forklare *samsvarsformodning*.
- **1.4** Knytte designet til **risikostyring (ISO 14971)** og enkeltfeilsikkerhet, og identifisere beskyttelsesmidlene (MOOP/MOPP) og isolasjons-/krypebarrierene i IEC 60601-1.
- **1.5** Utføre og tolke DMM- og oscilloskopmålinger (beskyttelsesjording, sikring, krypeavstand, trinnmotordrift, sensor, alarm) mot konkrete akseptkriterier.
- **1.6** Remontere til produsentens tiltrekkingsmoment, verifisere funksjon, utføre en **IEC 62353-test etter reparasjon** med **kalibrert** utstyr, og fylle ut en **ISO 13485-serviceprotokoll**.

---

## 2. Sikkerhet først

> **NETT- OG LAGRET ENERGI-FARE.** Denne pumpen drives fra nettet og fra et internt batteri. Den koblede strømforsyningen (switch-mode) har en nett-**primærside** med kondensatorer som kan holde på ladning **etter** at nettkabelen er trukket ut. Servicemanualen oppgir **ingen** utladningstid — behandle primærsiden og alle store kondensatorer som spenningsførende til det motsatte er bevist. Det er fare for elektrisk støt når kapslingen er åpen (servicemanual s.6).

- **2.1 Isoler først, batteri først.** Slå pumpen AV, fjern **batteriet før alt annet** (batterideksel = to skruer), og koble *deretter* fra nettkabelen. Å fjerne den interne kilden først gjør pumpen spenningsløs før du åpner den.
- **2.2 Behandle PSU-ens primærside og kondensatorer som ladet.** Ikke prob nettinntak, sikringsholder eller PSU-ens primærside på en remontert, nylig spenningssatt pumpe. Alle elektriske sikkerhetsmålinger i §4.4 gjøres med pumpen **spenningsløs og åpen**.
- **2.3 Ingen målinger under spenning eller lekkasjemålinger under demontering.** Det eneste arbeidet under spenning er oscilloskopopptakene etter remontering (§4.6, kun på **batteri**) og IEC 62353-testen (§4.7) — begge på en remontert pumpe og begge kun med veileders godkjenning.
- **2.4 ESD-forholdsregler.** Bruk håndleddsstropp og arbeid på ESD-matten hele tiden — kretskortene er statisk-følsomme (servicemanual s.6, s.47). Kretskortene er **ikke reparerbare på komponentnivå**: forsøk aldri kortreparasjon eller berør komponentben. Ikke berør eller kortslutt det loddede backup-cellebatteriet på kontrollkortet.
- **2.5 Klemfare.** Hold fingrene unna stempel-/ledeskruedrevet — sleden og halvmutteren kan bevege seg, og griperen kan kobles ut. Belast aldri kraftsensoren over 10 kgf.
- **2.6 Batterihåndtering.** NiMH-pakken har en termisk sikring og termisk utkobling. Ikke kortslutt polene, knus eller punkter den. Hold den på ESD-matten med polene opp.
- **2.7 Godkjenning.** Bare veileder godkjenner ethvert trinn under spenning — de batteridrevne oscilloskopopptakene, selvtesten og IEC 62353-testen.

---

## 3. Klargjøring av benken

1. **3.1** Sett opp en **ESD-sikker benk**: jordet matte og håndleddsstropp. Legg ut et rent brett eller et ark med et merket rutenett for delinventaret.
2. **3.2** Skaff verktøy: **Torx T6/T8/T10/T20**, en **momentskrutrekker** (cNm/Nm), DMM, oscilloskop med ×10 prober og Fluke **ESA615** — og noter ESA615-ens **kalibreringsfrist** (du trenger den til serviceprotokollen i §4.7).
3. **3.3** Ha **servicemanualen (1000SM00001)** og **bruksanvisningen (DFU)** åpne. Du vil bruke sprengskissene (Corrective Maintenance, s.47–78) og momenttabellen (s.91–92) gjennom hele øvelsen.
4. **3.4 Funksjonstest før demontering (referanse).** Med veileders godkjenning, slå på pumpen og bekreft at den fullfører **selvtest ved oppstart** uten feil, går på batteri og gir alarm. Noter resultatet — du skal sammenligne med det etter remontering. *En pumpe må vises å virke før du demonterer den, ellers beviser ikke etterkontrollen noe.*
5. **3.5** Slå AV, **fjern batteriet**, og koble deretter fra nettkabelen før du starter §4.2.

---

## 4. Prosedyre

### 4.1 Identifiser og klassifiser apparatet — EU MDR (35 min)

Med utgangspunkt i merkeskiltet, serie-/statusetiketten og bruksanvisningen, fyll ut tabellen. Denne delen er forankret i **EU MDR 2017/745** (klassifisering — Vedlegg VIII; UDI — Art. 27, Vedlegg VI; merking — Vedlegg I **GSPR 23**) og i **IEC 60601-1 kapittel 7**.

| Egenskap | Registrert verdi | Hvor / hvordan du fastslo det |
|---|---|---|
| Produsent (juridisk produsent) | | |
| Modell / type og katalognummer (REF) | | |
| Serienummer | | |
| **Grunnleggende UDI-DI** (hvis vist / i samsvarserklæringen) | | |
| **UDI-DI** (apparatidentifikator) | | |
| **UDI-PI** (produksjonsidentifikator: parti/serie/dato) | | |
| **MDR-risikoklasse + regel i Vedlegg VIII** | | |
| CE-merke + **teknisk kontrollorgan-nummer** | | |
| Sertifiseringsvei (eldre MDD eller MDR?) | | |
| Beskyttelsesklasse (I / II / internt drevet) | | |
| Hvordan fastslo du klassen? | | |
| Type anvendt del (B, BF eller CF) | | |
| Defibrilleringssikker? (symbol til stede?) | | |
| Hvilke deler er anvendt(e) del(er)? | | |
| Nettforsyning (V / Hz / VA) og sikringsverdi | | |
| IP-klasse (kapslingsgrad) | | |
| Andre symboler observert (list opp) | | |

**Hint:**
- **Klassifisering.** Etter **Vedlegg VIII, Regel 12** er aktivt utstyr som *administrerer* legemidler **klasse IIa** — *med mindre* tilførselen er «potensielt farlig» gitt stoffet, kroppsdelen og bruksmåten, og da er det **klasse IIb**. En sprøytepumpe brukt til vasoaktive legemidler inn i den sentrale sirkulasjonen havner i **klasse IIb**. Noter regelen *og* hvorfor den eskalerer.
- **UDI (Art. 27).** **UDI-DI** identifiserer produsent + modell; **UDI-PI** identifiserer den enkelte produksjonsenheten (parti/serie). UDI-bæreren står på etiketten og emballasjen og er nøkkelen som brukes ved **sikkerhetsovervåking og sikkerhetskorrigerende tiltak i felt (Art. 87)**.
- **Merking.** Forvent en nettforsyning rundt **115–230 V ~ 50–60 Hz, 20 VA**, en sikringsmerking som **2 × T 1,25 A, 250 V**, **IPX1**, og CE med teknisk kontrollorgan **0086**. Servicemanualen oppgir **Klasse I, Type CF** (s.33) men **bekrefter ikke** defibrilleringsbeskyttelse — noter nøyaktig hva *ditt* merkeskilt viser.

**Spørsmål å tenke over:** Hvilke merkinger kreves av **MDR Vedlegg I GSPR 23** (etikett og bruksanvisning), og hvilke av **IEC 60601-1 §7**? Hvorfor er UDI ryggraden i sporbarhet, tilbakekallinger og sikkerhetsovervåking?

---

### 4.2 Trygg demontering og delinventar (70 min)

> Bekreft at batteriet er **ute** og nettkabelen er **frakoblet** før du begynner. Fotografer hvert trinn.

**Demonteringssekvens** (servicemanual Corrective Maintenance-kapittel, s.47; demonteringstrinn fra s.48 — følg sprengskissene):

1. **4.2.1** Bekreft AV, batteri fjernet (2 batteridekselskruer), nett frakoblet. Sett pumpen i støttebrakett hvis tilgjengelig.
2. **4.2.2** Fjern de **seks hovedkapslingsskruene** (T20).
3. **4.2.3 Kun CC:** lirk ut **blindpluggen / skivedekselet** for trykkgiveren og fjern festeskruen (s.48).
4. **4.2.4** Skill forsiktig fram- og bakdekselet; **fotografer kabelføringen før** du kobler fra noen kontakt.
5. **4.2.5** Demonter og legg ut hvert delsystem: strømforsyning + høyttaler (s.50), nettinntak + sikring + PE-stuss + magnet (s.52), kontrollkort og backup-celle (s.57–59), display-kort og tastatur (s.60), chassis-kort + stempel-/ledeskrue-enhet (s.62), sprøytestørrelse-enhet (s.66), og **CC linjetrykk-giveren** (s.64, s.73).

**Delinventartabell** — legg hver del på rutenettet, merk den og fyll ut en rad.

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

**Spørsmål å tenke over:** Hvilket enkelt kretskort bærer **både** hovedprosessoren og den uavhengige sikkerhetsprosessoren, og hvorfor tillater plassering på ett kort likevel uavhengig avstenging av motoren? Hvilke deler har produsenten gjort **ikke-reparerbare**, og hva forteller det om hvordan risiko styres allerede i designet (ISO 14971)?

---

### 4.3 Design for samsvar: MDR-GSPR → harmoniserte standarder (60 min)

Dette er den sentrale oppgaven. MDR-ens **GSPR (Vedlegg I)** sier *hva* som må oppnås; **harmoniserte standarder** sier *hvordan*, og å oppfylle dem gir en **samsvarsformodning**; **ISO 14971**-risikostyring binder dem sammen (GSPR 3). Fyll ut koblingen for hvert delsystem — første rad er løst som eksempel.

| Delsystem | Observert designtrekk | MDR-GSPR (Vedlegg I) | Harmonisert standard (beviset) | Fare som kontrolleres |
|---|---|---|---|---|
| Merke-/anvendt del-etiketter + UDI | Klasse- og typesymboler, ratinger, CE 0086, UDI-bærer | **GSPR 23** (etikett og bruksanvisning); **Art. 27** (UDI) | EN ISO 15223-1; EN 60601-1 §7 | Feilidentifikasjon; ingen sporbarhet / tilbakekalling |
| Nettinntak + sikring | Treg (antisurge) **T 1,25 A** sikring(er) i forsyningen | **GSPR 18** (aktivt utstyr); kap. I **GSPR 4/8** | EN 60601-1 §8.11.5, §11.2 | Overstrøm / brann |
| PSU nett→15 VDC | Isolert SMPS; isolasjonsbarriere primær↔sekundær | **GSPR 18**; kap. I (risikoreduksjon) | EN 60601-1 §8.5 (MOOP/MOPP), §8.8, §8.9 | Elektrisk støt over nettbarrieren |
| PE-stuss + jordet inntak | Chassis bundet til nettjord via PE-stussen | **GSPR 18** | EN 60601-1 §8.6 | Støt fra en jordet metalldel ved enkeltfeil |
| Isolasjon av anvendt del | Pasientsideisolasjon av væskebane / sensorer; Type CF | **GSPR 21** (energi/stoff til pasient); **GSPR 18** | EN 60601-1 §8.5.1, §8.7.3, §8.5.5 | Mikrosjokk / hjertestrøm |
| Batteridelsystem | NiMH-pakke med termisk sikring, termisk utkobling, gas-gauge-kort | **GSPR 20** (mekanisk og termisk); **GSPR 18** | EN 60601-1 §15.4.3, §11.1; EN/IEC 62133-1 | Termisk rømning / overutlading / brann |
| Stempel-/ledeskruedrift | Innkapslet transmisjon, skjermet slede, manuell utkobling | **GSPR 20.2** (bevegelige deler) | EN 60601-1 §9.2 | Klemfare; ukontrollert stempelbevegelse |
| Kraft-/okklusjons- + linjetrykkføling | Kraftsensor + (CC) linjetrykk-giver utløser alarmer | **GSPR 21.1** (nøyaktig tilførsel) + alarmer | EN 60601-2-24 §201.12.4; EN 60601-1-8 | Okklusjon → underinfusjon / trykkstøt |
| Uavhengig sikkerhetsprosessor | Andre prosessor kan stenge av trinnmotoren og alarmere selv | **GSPR 17** (elektroniske programmerbare systemer) | EN 60601-1 §14 + IEC 62304; §4.7 enkeltfeil | Ukontrollert infusjon hvis hovedprosessoren svikter |
| Hørbare alarmer (×2) + summer | Hovedhøyttaler **pluss** uavhengig backup-høyttaler/piezo | **GSPR 21** / 18 (alarmer) | EN 60601-1-8 | Tap av alarmvarsling |
| Display-/tastaturtetting | Isolator + pakning; IPX1 kapslingsdesign | **GSPR 14** (samspill med omgivelsene) | EN 60601-1 §11.6 (IEC 60529 IP-kode) | Væskeinntrenging → støt / feilfunksjon |
| EMC-design | Gruppe 1 Klasse A; økt immunitet, feilsikker ved RF | **GSPR 18** (elektromagnetisk kompatibilitet) | EN 60601-1-2 | EMI-indusert feilfunksjon |

**Svar deretter i labboken:**
1. **4.3.1** Bruk **Vedlegg VIII Regel 12** og forklar hvorfor *denne* pumpen er **klasse IIb** og ikke Regel 12-standarden IIa. Hvilke(n) av de tre faktorene (stoff, kroppsdel, bruksmåte) avgjør eskaleringen?
2. **4.3.2** Velg én rad. Angi **GSPR-en** (det juridiske kravet) og den **harmoniserte standarden** (beviset), og forklar hva *samsvarsformodning* betyr — og om en produsent har lov til å oppfylle GSPR-en på en annen måte.

---

### 4.4 Elektriske sikkerhetsmålinger — DMM (spenningsløs) (45 min)

> **Pumpen må være ÅPEN, batteriet UTE, nettet FRAKOBLET.** Dette er målinger på spenningsløs krets. Ikke spenningssett pumpen i denne delen.

| # | Måling | Metode | Akseptkriterium | Avlesning | Godkjent/Ikke godkjent |
|---|---|---|---|---|---|
| 4.4.1 | Beskyttelsesjording: jordpinne på nettinntak → chassis / PE-stuss | DMM kontinuitet (Ω) | IEC 60601-1 **§8.6.4**: ≤ **0,1 Ω** PE-terminal→jordede deler (uten kabel); ≤ **0,2 Ω** med avtakbar kabel. IEC 62353: ≤ **0,3 Ω** (inkl. nettkabel) | | |
| 4.4.2 | Sikringskontinuitet + trykt verdi | DMM kontinuitet; les sikringen | Kontinuitet ≈ 0 Ω; verdi stemmer med merkeskilt (**T 1,25 A**) | | |
| 4.4.3 | Batteripakkens tomgangsspenning | DMM DC-volt på pakkepolene | **7,2 V** nominelt (6 × 1,2 V); typisk ≈ 8,0–8,4 V ladet (manualens kal.-eksempel ≈ 8,21 V, s.21) | | |
| 4.4.4 | Krypeavstand, nett **primær ↔ sekundær** på PSU/Power-kort | Skyvelære / linjal | Veiledende mål ≈ **8 mm** for 2× MOPP ved ~250 V (IEC 60601-1 §8.9, MOPP-tabell 13–16) | | |
| 4.4.5 | Luftavstand, nett **primær ↔ sekundær** | Skyvelære / linjal | Veiledende mål ≈ **5 mm** for 2× MOPP ved ~250 V (§8.9) | | |
| 4.4.6 | Kontinuitet for L og N fra nettinntak til PSU-inngang | DMM kontinuitet | Sammenhengende; ingen brudd | | |

**Spørsmål å tenke over:** Din beskyttelsesjordingsavlesning — består den **IEC 60601-1 typetest**-grensen, **IEC 62353 periodisk test**-grensen, eller begge? Hvorfor er grensene forskjellige? (62353-grensen på 0,3 Ω gjelder banen *inkludert* nettkabelen.) Hvordan gir en større krypeavstand et høyere *beskyttelsesmiddel* (MOOP vs MOPP)?

---

### 4.5 Remontering og funksjonsverifisering (60 min)

Remonter pumpen **til produsentens tiltrekkingsmoment** (servicemanualens momenttabell, s.91–92). Disse pumpene gjenbrukes av senere grupper, så bygg dem riktig sammen — montering etter dokumenterte arbeidsinstrukser og momentverdier er i seg selv en **ISO 13485 §7.5**-kontroll (produksjon og tjenesteyting).

1. **4.5.1** Reverser demonteringen. Koble til hver kabel som fotografert.
2. **4.5.2** Trekk til de viktigste festene til moment — noter dem:

| Feste | Spesifikasjon (fra manual) | Påført? |
|---|---|---|
| Fram ↔ bakdeksel (6 × T20) | **125 cNm** | |
| Batterideksel / håndtak (2 × T20) | **90 cNm** | |
| Chassis-kort → chassis (M3×8) | **75 cNm** | |
| CC trykkgiver → framdeksel | **70 cNm** | |
| Motorplate → chassis | **1,1 Nm** | |
| PE-stussmutter / jordleder | **håndstramt** (iht. manual) | |

3. **4.5.3** Sett inn batteriet, koble deretter til nett.
4. **4.5.4 Funksjonsverifisering:** slå på og bekreft at **selvtest ved oppstart** består (ingen feilkoder), at den går på **batteri** og **nett**, at AC-indikatoren lyser, at display/baklys er riktig, og at en **alarm** varsles.

| Verifiseringstrinn | Forventet | Observert | Godkjent/Ikke godkjent |
|---|---|---|---|
| Selvtest ved oppstart | Fullfører, ingen feilkoder | | |
| Går på batteri | Batteriindikator på, infunderer | | |
| Går på nett | AC-indikator på, lader | | |
| Display + baklys | Riktig, lesbart | | |
| Alarmvarsling | Hørbar + visuell alarm | | |

**Spørsmål å tenke over:** Hvilke kalibrerings-/verifiseringstrinn krever produsenten etter bytte av kontrollkortet eller trykkgiveren (manual s.47)? Demonteringen din byttet ingenting — så hvilke gjelder fortsatt, og hvilke ikke?

---

### 4.6 Signalmålinger — oscilloskop, på batteri (40 min)

> **Godkjent, kun batteri.** Med veileders godkjenning, kjør den remonterte pumpen på det interne **batteriet (nettkabel frakoblet)**. Siden nett-primærsiden nå er borte, er alle interne noder SELV/lavenergi. Prob bare punktene veileder anviser.

| # | Signal | Slik tar du opp | Slik ser et sunt spor ut | Observasjon |
|---|---|---|---|---|
| 4.6.1 | Trinnmotordrift (én spole) | Prob en motorspoleleder; kjør lav rate (f.eks. 100 mL/h) | Regelmessige choppede/PWM-strømpulser, én pakke per trinn, ingen tapte trinn | |
| 4.6.2 | Kraft-/linjetrykksensorutgang | Prob sensorens analoge linje mens du forsiktig belaster stempelet / okkluderer | Jevn, monoton DC-rampe som stiger med kraft/trykk (jf. kal.: 0 kgf ≈ 1,68 V, 10 kgf ≈ 3,15 V) | |
| 4.6.3 | Rippel på intern forsyningsskinne | Prob en regulert DC-skinne (batteri-/logikkskinne) | Stabil DC, lav rippel (titalls mV pp); ingen store svitsjespiker | |
| 4.6.4 | Alarm-/summerdrift | Utløs en alarm; prob piezo-/høyttalerdriften | Periodisk tonepuls (firkant/AC-drift ved summerfrekvensen) | |

Noter oscilloskopinnstillingene dine (V/div, tid/div) for hvert opptak.

**Spørsmål å tenke over:** Ut fra trinnmotorsporet — hvordan oppnår pumpen en jevn, nøyaktig lav strømningsrate fra diskrete motortrinn (koble dette til **GSPR 21.1** om nøyaktig tilførsel)? Hvorfor er det trygt å ta disse opptakene på batteri, men **ikke** med nettkabelen tilkoblet og kapslingen åpen?

---

### 4.7 IEC 62353-test etter reparasjon og ISO 13485-serviceprotokoll (35 min)

Å åpne kapslingen forstyrrer pumpens beskyttelsesmidler (PE-forbindelse, isolasjonsbarrierer, isolasjon av anvendt del). **IEC 62353 krever en elektrisk sikkerhetstest etter reparasjon før apparatet kan tas i bruk igjen**, og **ISO 13485 §7.5.4 (service)** krever at den **dokumenteres**, mens **§7.6** krever at testinstrumentet er **kalibrert og sporbart**. Pumpen er **Klasse I, Type CF** — bruk **CF-grensene**.

| IEC 62353-test | Grense (Klasse I / Type CF) | Avlesning | Godkjent/Ikke godkjent |
|---|---|---|---|
| Beskyttelsesjordresistans | ≤ **0,3 Ω** (inkl. nettkabel) | | |
| Utstyrslekkasjestrøm (alternativ / direkte metode) | ≤ **500 µA** (Klasse I) | | |
| Lekkasjestrøm i anvendt del (Type CF) | ≤ **50 µA** | | |
| Isolasjonsresistans — nett ↔ PE *(valgfri)* | ≥ **2 MΩ** | | |
| Isolasjonsresistans — nett ↔ anvendt del *(valgfri)* | iht. ESA615-forhåndsinnstilling | | |
| **Totalvurdering: GODKJENT / IKKE GODKJENT** | | | |

> **IEC 62353 vs IEC 60601-1.** I Lab i elektrisk sikkerhetstesting målte du *kapslings*- og *pasient*lekkasje mot 60601-1-grenser (≤ 100/500 µA; CF ≤ 10/50 µA, normal/enkeltfeil). IEC 62353 slår disse sammen til én **utstyrslekkasje**-verdi (≤ 500 µA, Klasse I) og én **anvendt del-lekkasje**-verdi (≤ 50 µA, Type CF). Noter hva ESA615 rapporterer i 62353-modus og koble de to modellene.

**4.7.1 Serviceprotokoll (ISO 13485 §7.5.4).** Fyll ut en minimal protokoll du kunne arkivert på dette apparatet:

| Felt | Oppføring |
|---|---|
| Apparatmodell + **serie / UDI-PI** | |
| Utført arbeid | Demontering, remontering, sikkerhetstest etter reparasjon |
| Testinstrument + **kalibreringsfrist** (§7.6) | |
| IEC 62353-resultat (GODKJENT/IKKE GODKJENT) | |
| Tekniker + dato | |

**Spørsmål å tenke over:** Hvilke tester kontrollerer spesifikt de beskyttelsesmidlene du forstyrret? Ville en bestått selvtest (§4.5) alene vært nok til å sette apparatet i drift igjen — hvorfor / hvorfor ikke? Når går en «reparasjon» over til **ombygging (remanufacturing)** etter MDR, og hvorfor er det skillet viktig for hvem som har det regulatoriske ansvaret?

---

### 4.8 Repetisjonsspørsmål (15 min)

1. **Klassifisering.** Etter **Vedlegg VIII Regel 12**, hvorfor er en sprøytepumpe for vasoaktive legemidler **klasse IIb** og ikke IIa? Hvilke(n) faktor(er) driver eskaleringen, og hvordan ville klassen endret seg for et apparat som bare tilførte til mage-tarm?
2. **Samsvarsformodning.** Forklar hvordan en **harmonisert standard** (f.eks. EN 60601-1) henger sammen med en **MDR-GSPR**. Kan en produsent oppfylle en GSPR *uten* den harmoniserte standarden? Hva må de da gjøre?
3. **UDI og sikkerhetsovervåking.** Skill mellom **UDI-DI**, **UDI-PI** og **grunnleggende UDI-DI**. Hvordan brukes UDI når en produsent iverksetter et **sikkerhetskorrigerende tiltak i felt** eller melder en **alvorlig hendelse** (Art. 87)?
4. **ISO 13485-service.** Hvorfor må **ESA615 være kalibrert** (§7.6) og testen etter reparasjon **dokumenteres** (§7.5.4)? Hva hører hjemme i serviceprotokollen, og hvem kan komme til å lese den senere?
5. **Testing etter reparasjon.** Hvilke beskyttelsesmidler forstyrret demonteringen din, og hvilke **IEC 62353**-tester er derfor obligatoriske før idriftsetting igjen? Hvis beskyttelsesjordresistansen viste **0,45 Ω**, består den — og hva ville du undersøkt?
6. **Type CF og klasse-gåten.** Forklar hvorfor en legemiddelpumpe på sentralt venekateter er **Type CF**, og hvorfor CF-grensene for pasientlekkasje er ti ganger strengere enn BF. Foren så beskyttelsesklassebevisene du fant (PE-stuss + jordet inntak → Klasse I, vs et mulig Klasse II-merkesymbol, pluss et internt batteri): er PE-en en **beskyttelses**jord eller en **funksjons**jord, og hvilken klassifisering gjelder?

---

## 5. Hva du skal levere

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode og dato.
- Den utfylte **klassifiseringstabellen** (§4.1), **delinventartabellen** (§4.2) og **GSPR→standard-koblingstabellen** (§4.3).
- De utfylte **måletabellene** fra §4.4, §4.6 og §4.7, med godkjent/ikke godkjent-status og noterte oscilloskopinnstillinger/spor.
- Den utfylte **serviceprotokollen** (§4.7.1) og **momentprotokollen for remontering** (§4.5).
- **Fotografier** som dokumenterer demonteringstrinnene og det utlagte delinventaret.
- Skriftlige svar på de seks repetisjonsspørsmålene (§4.8).
- En kort konklusjon (200–300 ord) om hvordan Alaris CC viser samsvar med **EU MDR 2017/745** gjennom **ISO 13485**-prosesser og harmoniserte standarder — og hvorfor en **IEC 62353**-test etter reparasjon er obligatorisk etter at kapslingen har vært åpnet.
