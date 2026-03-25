---
title: "Respiratorer"
category: "ventilator"
description: "Referanseguide for vedlikehold, testing og feilsøking av respiratorer for intensivbehandling"
equipment:
  - "Dräger Evita V500"
  - "Hamilton C6"
  - "Fluke VT900A Gas Flow Analyzer"
  - "Dräger testlunge"
standards:
  - "IEC 60601-2-12 (Respiratorer for intensivbehandling)"
  - "ISO 80601-2-12 (Respiratorer for hjemmebehandling)"
  - "IEC 62353 (Periodisk testing)"
order: 3
---

## Oversikt

Respiratorer for intensivbehandling leverer en presist kontrollert blanding av luft og oksygen til pasienter som ikke kan puste tilstrekkelig på egen hånd. De spenner fra intensivrespiratorer som støtter full mekanisk ventilasjon med avanserte moduser (trykkstyrt, volumstyrt, trykkstøtte, APRV) til transportrespiratorer med forenklede kontroller. Kliniske ingeniører er ansvarlige for å sikre nøyaktighet i gassleveranse (tidalvolum, flow, trykk, FiO₂), alarmfunksjon og integritet i pasientkretsen — feil kan være umiddelbart livstruende.

---

## Slik fungerer det

En intensivrespirator bruker enten en turbindrevet vifte (stadig vanligere) eller trykkgass fra vegguttak (luft + O₂) for å generere inspiratorisk flow. En elektronisk blandingsventil eller blender setter oksygenfraksjonen (FiO₂). Inspiratoriske og ekspiratoriske flowsensorer måler levert og returnert gassvolum. Forskjellen mellom inspirert og ekspirert volum indikerer lekkasjer eller gassutveksling hos pasienten. Trykksensorer ved pasient-Y-stykket overvåker luftveistrykket i sanntid.

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| Tidalvolumnøyaktighet | ±10 % eller ±10 mL (det som er størst) | Unøyaktig Vt forårsaker hypo-/hyperventilasjon og lungeskade |
| FiO₂-nøyaktighet | ±3–5 % av innstilt verdi | Hypoksi (for lav) eller oksygentoksisitet (for høy) |
| PEEP-nøyaktighet | ±2 cmH₂O | PEEP opprettholder alveolær rekruttering; unøyaktighet forårsaker atelektase eller barotraume |
| Topptrykksalarm | Settes av kliniker (typisk 35–40 cmH₂O) | Høyt trykk indikerer obstruksjon, bronkospasme eller pneumothorax |
| Frakoblingsalarm / lavtrykksalarm | ≤ 15 s deteksjonstid | Forsinket deteksjon av frakobling kan forårsake hypoksi og død |
| Inspiratorisk flow-nøyaktighet | ±10 % av innstilt flow | Påvirker levert volum og pasient-respirator-synkroni |
| Batteribackup | ≥ 30 min (IEC 60601-2-12) | Overlevelse ved transport og strømbrudd |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Kretslekkasje-alarm (høy lekkasjeprosent) | Løs kobling i pasientkretsen, sprukket befukterkammer, skadet slange, cuff-lekkasje | Systematisk lekkasjesjekk: stram koblinger, inspiser kretsen, utfør okklusjonstest med VT900A | Bytt defekt komponent; stram koblinger |
| Tidalvolum-unøyaktighet (underlevering) | Ekspiratorisk flowsensor kontaminert/defekt, kretskomplians ikke kompensert, lekkasje | Mål levert Vt med VT900A ved pasient-Y-stykket; sammenlign med respiratorens display | Rengjør eller bytt flowsensor; rekalibrer kretskomplians |
| FiO₂-alarm (lav eller høy) | O₂-celle utarmet, O₂-blender feilfunksjon, lavt trykk i vegg-O₂-forsyning | Verifiser vegg-O₂-trykk (4–5 bar); kalibrer O₂-celle; test FiO₂ med ekstern analysator | Bytt O₂-celle; reparer blender; sjekk veggforsyning |
| Apné-alarm i spontanmodus | Sensitivitet for lav, svak pasientinnsats, feil triggertype | Juster triggersensitivitet; bytt mellom trykk- og flowtrigger; sjekk for auto-PEEP | Optimaliser triggerinnstillinger; adresser auto-PEEP |
| Høyt luftveistrykk-alarm | Pasient hoster/biter, bronkospasme, knekt slange, slimpropp, tensjonspneumothorax | Sjekk kretsen for knekk, sug pasienten, klinisk vurdering, mål kretsresistans med VT900A | Klinisk intervensjon først; bytt knekt slange; utelukk pneumothorax |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten (vanligvis årlig for intensivrespiratorer, med mellomkontroller hver 6. måned).

1. **Visuell og mekanisk inspeksjon** — Kontroller huset, hjul/bremser, monteringsarm, strømkabel og alle gasstilkoblinger (NIST/DISS-koblinger). Verifiser at pustekretstilkoblingene er sikre. Inspiser befukteren for sprekker eller kalkoppbygging.

2. **Elektrisk sikkerhetstest** — Per IEC 62353: beskyttelsesjordmotstand (< 0,3 Ω), kapslingslekkasjestrøm og pasientlekkasjestrøm (CF-grenser for anvendt del: ≤ 10 µA normalt, ≤ 50 µA enkeltfeil).

3. **Gassleveransenøyaktighet** — Med en kalibrert gassflowanalysator (f.eks. Fluke VT900A), verifiser tidalvolumleveranse ved 200 mL, 500 mL og 800 mL i volumstyrt modus ved en komplians på 50 mL/cmH₂O. Hvert resultat må være innenfor ±10 % eller ±10 mL.

4. **FiO₂-nøyaktighet** — Med VT900A sin oksygenanalysator, verifiser FiO₂ ved 21 %, 50 % og 100 %. Hvert resultat må være innenfor ±3–5 % av innstilt verdi.

5. **Trykknøyaktighet** — Verifiser PEEP ved 5, 10 og 15 cmH₂O mot VT900A sin trykkmåling. Verifiser begrensning av toppinspiratorisk trykk. Hvert resultat må være innenfor ±2 cmH₂O.

6. **Alarmtesting** — Test frakoblingsalarm (responstid ≤ 15 s), høytrykksalarm, lavtrykksalarm, apné-alarm og strømbruddsalarm. Hver alarm må aktiveres innenfor spesifiserte grenser.

7. **Lekkasjetest** — Okkluder pasient-Y-stykket og kjør en kretslekkasjetest per produsentens prosedyre. Maksimalt tillatt lekkasje varierer etter produsent (typisk < 200 mL/min ved 60 cmH₂O).

8. **Batteritest** — Kjør respiratoren på batteri med testlunge ved typiske innstillinger til lavbatterialarm. Må gi ≥ 30 minutter per IEC 60601-2-12.

9. **Oksygencellesjekk** — Registrer O₂-cellens avlesning ved romluft (20,9 %) og 100 % O₂. Hvis cellen ikke kan kalibreres, bytt den.

---

## Relaterte standarder

- **IEC 60601-2-12:2014** — Særskilte krav til respiratorer for intensivbehandling. Spesifiserer krav til ytelse, alarmer og sikkerhet.
- **ISO 80601-2-12:2020** — Særskilte krav til respiratorer for hjemmebehandling. Dekker respiratoravhengige pasienter utenfor intensivavdelingen.
- **ISO 80601-2-80:2018** — Særskilte krav til utstyr for ventilasjonsstøtte (CPAP/BiPAP for obstruktiv søvnapné).
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse.

---

## Relaterte scenarioer

Øv på å diagnostisere respiratorfeil med veiledede simuleringsscenarioer:

- [Kretslekkasje-alarm — Dräger Evita V500](/no/scenarios/vent-leak-alarm/) *(Nivå 1)*
- [Tidalvolum-unøyaktighet](/no/scenarios/vent-volume-inaccuracy/) *(Nivå 2)*
- [FiO₂-leveringssvikt](/no/scenarios/vent-oxygen-failure/) *(Nivå 2)*
