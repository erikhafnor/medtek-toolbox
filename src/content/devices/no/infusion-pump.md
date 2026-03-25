---
title: "Infusjonspumper"
category: "infusion-pump"
description: "Referanseguide for vedlikehold, testing og feilsøking av infusjonspumper"
equipment:
  - "B. Braun Infusomat Space"
  - "Alaris GP Volumetric Pump (BD)"
  - "IDA-5 Infusion Device Analyzer (Fluke Biomedical)"
standards:
  - "IEC 60601-2-24 (Infusjonspumper og kontrollere)"
  - "IEC 62353 (Periodisk testing)"
order: 2
---

## Oversikt

Infusjonspumper leverer væsker, legemidler og ernæring til pasienter med kontrollert hastighet — fra så lavt som 0,1 mL/t for neonatale legemiddelinfusjoner til over 999 mL/t for rask væskeresuscitering. De er blant de mest utbredte enhetene på ethvert sykehus, og feilmodene kan variere fra plagalarmer til livstruende over- eller underinfusjon. Kliniske ingeniører er ansvarlige for å sikre nøyaktighet i strømningshastighet, alarmfunksjon og sikkerhetsmekanismer (særlig friflytsforebygging og luft-i-slangen-deteksjon).

---

## Slik fungerer det

En volumetrisk infusjonspumpe bruker en peristaltisk mekanisme (lineær eller roterende) for å drive væske gjennom et engangs administrasjonssett. Pumpesegmentet av slangen komprimeres sekvensielt av fingre eller ruller, som skyver væsken fremover med en kalibrert hastighet. En optisk eller ultralyd-dråpesensor, eller en direkte volumetrisk måling, gir lukket sløyfe strømningskontroll.

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| Nøyaktighet i strømningshastighet | ±5 % av innstilt hastighet (stabil tilstand) | Overinfusjon av vasoaktive legemidler kan forårsake hemodynamisk ustabilitet |
| Okklusjonsalarmtrykk | 100–900 mmHg (justerbar) | Høy terskel forsinker deteksjon av infiltrasjon eller frakobling |
| Bolus ved okklusjonsutløsning | ≤ 0,5 mL (IEC 60601-2-24) | Ukontrollert bolus etter okklusjonsutløsning kan gi en toksisk dose |
| Luft-i-slangen-deteksjon | ≤ 50 µL enkeltboble (typisk) | Store luftembolier risikerer cerebrale eller kardiale komplikasjoner |
| Friflytsforebygging | Antisifonventil i settet | Gravitasjonsdrevet friflyt kan levere hele posen på minutter |
| Oppstartstid (trompettkurve) | Stabiliserer innenfor ±5 % på < 5 min | Forsinket oppstart påvirker tidskritiske legemidler |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Hyppige falske okklusjonsalarmer | Slitt pumpemekanisme (finger-/rullerslitasje), feil innlasting av sett, knekket slange | Test med IDA-5 ved innstilte trykkgrenser; inspiser pumpefingre for slitasjespor | Bytt slitt pumpemekanisme; opplæring av personale i innlasting av sett |
| Unøyaktig strømningshastighet (over- eller underinfusjon) | Slitasje i pumpemekanisme, feil settype, kalibreringsdrift | Mål strømningshastighet med IDA-5 ved lav (5 mL/t), middels (100 mL/t) og høy (500 mL/t) hastighet | Rekalibrer eller bytt pumpemekanisme; verifiser at riktig settype brukes |
| Luft-i-slangen-alarm uten synlig luft | Forurenset ultralydsensor, sensorfeiljustering, mikrobobler i væsken | Rengjør sensor med lofri klut; test med IDA-5 luftdeteksjonsmodul; kontroller IV-væske for løst gass | Rengjør eller bytt sensor; avgass væsken; sjekk for lekkasjer oppstrøms |
| Friflytshendelse | Svikt i antisifonventil i administrasjonssettet, dørinterlock forbigått | Test antisifonventilfunksjon; verifiser dørinterlockbryter | Bytt administrasjonssett; reparer dørinterlock; rapporter som sikkerhetshendelse |
| Medikamentbibliotekfeil / feil konsentrasjon | Utdatert medikamentbibliotek, manuell overstyring av sikkerhetsgrenser | Verifiser bibliotekversjon mot apotekets gjeldende godkjente versjon | Oppdater medikamentbibliotek; gjennomgå overstyringslogger med apoteket |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten og fasilitetsens PM-program (vanligvis årlig for høyrisiko infusjonspumper).

1. **Visuell og mekanisk inspeksjon** — Kontroller huset for sprekker eller væskeinntrengning, inspiser pumpedørmekanismen og låsen, verifiser at slangeklemmen og antifriflytmekanismen fungerer smidig. Kontroller strømkabel og strekkavlastning.

2. **Test av nøyaktighet i strømningshastighet** — Bruk en kalibrert infusjonsanalysator (f.eks. IDA-5), og mål strømningshastighet ved minimum tre innstillingspunkter: lav (5–10 mL/t), middels (100 mL/t) og høy (500+ mL/t). Hvert resultat må være innenfor ±5 % av innstilt hastighet etter stabilisering (IEC 60601-2-24 §201.12.1).

3. **Okklusjonsalarmtest** — Bruk IDA-5 i trykkmodus og verifiser at pumpen detekterer okklusjon ved innstilt alarmtrykterskel. Test både oppstrøms (innløp) og nedstrøms (utløp) okklusjon. Registrer alarmtrykk og responstid.

4. **Bolus etter okklusjonstest** — Okkluder slangen, la trykket bygge seg opp, og slipp deretter. Mål bolusvolumet som leveres ved utløsning. Må være ≤ 0,5 mL per IEC 60601-2-24.

5. **Luft-i-slangen-deteksjonstest** — Bruk IDA-5 luftdeteksjonsmodul, injiser kalibrerte luftbobler og verifiser at pumpen alarmerer ved eller under produsentens spesifiserte deteksjonsterskel.

6. **Elektrisk sikkerhetstest** — Per IEC 62353, mål jordforbindelsesresistans (< 0,3 Ω for klasse I-utstyr), kapslingslekkasjestrøm og pasientlekkasjestrøm der det er aktuelt.

7. **Batteritest** — Kjør pumpen på batteri til lavt-batteri-alarmen aktiveres. Verifiser at batteriet gir minst produsentens spesifiserte driftstid (vanligvis ≥ 4 timer ved 125 mL/t).

---

## Relaterte standarder

- **IEC 60601-2-24:2012** — Særskilte krav til infusjonspumper og kontrollere. Spesifiserer nøyaktighet i strømningshastighet, okklusjonsdeteksjon, bolusgrenser, luftdeteksjon og krav til friflytsforebygging.
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse.
- **IEC 80001-1:2021** — Anvendelse av risikostyring for IT-nettverk som inkorporerer medisinsk utstyr (relevant for nettverkstilkoblede pumpesystemer og medikamentbibliotekadministrasjon).
- **EN 1789:2020** — Medisinske kjøretøy og utstyr — Ambulanser for veitransport (relevant for transportinfusjonspumper).

---

## Relaterte scenarioer

Øv på å diagnostisere infusjonspumpefeil med veiledede simuleringsscenarioer:

- [Falske okklusjonsalarmer — B. Braun Infusomat Space](/no/scenarios/pump-occlusion-alarm/) *(Nivå 1)*
- [Friflytshendelse — etterforskning](/no/scenarios/pump-free-flow/) *(Nivå 3)*
- [Feil i medikamentbibliotek — dosefeil](/no/scenarios/pump-dose-error/) *(Nivå 2)*
