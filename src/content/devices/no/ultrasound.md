---
title: "Ultralydapparat"
category: "ultrasound"
description: "Referanseguide for vedlikehold, testing og feilsøking av diagnostiske ultralydapparat"
equipment:
  - "GE LOGIQ E10"
  - "Philips EPIQ 7"
  - "CIRS Multi-Purpose Ultrasound Phantom (Model 040GSE)"
  - "Fluke ESA615 Electrical Safety Analyzer"
standards:
  - "IEC 60601-2-37 (Diagnostisk ultralyd)"
  - "IEC 62359 (Ultralyd — Feltkarakterisering)"
  - "IEC 62353 (Periodisk testing)"
order: 6
---

## Oversikt

Diagnostiske ultralydapparat bruker høyfrekvente lydbølger (1–20 MHz) til å skape sanntidsbilder av indre kroppsstrukturer. De brukes på tvers av praktisk talt alle kliniske spesialiteter — fra obstetrikk og kardiologi til akuttmedisin og intervensjonsprosedyrer. I motsetning til røntgen eller CT bruker ultralyd ingen ioniserende stråling, noe som gjør det trygt for gjentatt bruk, inkludert under graviditet. Kliniske ingeniører er ansvarlige for bildekvalitetssikring, probeintegritet, elektrisk sikkerhet og forvaltning av en utstyrspark som kan omfatte titalls systemer med hundrevis av transdusere.

---

## Slik fungerer det

En piezoelektrisk transduser (probe) omdanner elektriske pulser til ultralydbølger som forplanter seg inn i vev. Når bølgene møter grenseflater mellom vev med ulik akustisk impedans (f.eks. væske-vev, vev-bein), reflekteres de delvis tilbake til proben. De returnerende ekkoene omdannes til elektriske signaler, prosesseres og vises som et 2D-bilde (B-modus), bevegelsesspor (M-modus) eller blodstrøminformasjon (Doppler).

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| Aksial oppløsning | 0,5–2 mm (frekvensavhengig) | Bestemmer evnen til å skille nærliggende strukturer langs stråleaksen |
| Lateral oppløsning | 1–3 mm (frekvens-/fokusavhengig) | Bestemmer evnen til å skille strukturer side om side |
| Inntrengningsdybde | 1 cm (15 MHz) til 30 cm (2 MHz) | Høyere frekvens = bedre oppløsning men mindre dybde |
| Bildefrekvens | 20–100+ fps | Lav bildefrekvens påvirker sanntidsavbildning av bevegelige strukturer (hjerte) |
| Dynamisk område | 60–100+ dB | Bredere område viser mer subtile vevsforskjeller |
| Mechanical index (MI) | ≤ 1,9 (diagnostisk grense) | Sikkerhetsgrense — høyere MI øker risikoen for kavitasjon |
| Thermal index (TI) | Vises til bruker | Indikerer potensial for vevsoppvarming — særlig relevant i obstetrikk |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Mørke linjer/bånd i bildet (elementbortfall) | Skadede piezoelektriske elementer i proben | Skann et fantom eller utfør lufttest; tell bortfallinjer; sammenlign med baseline | Hvis < 5 % elementer: overvåk; hvis > 5 %: reparer eller bytt probe |
| Dårlig bildekvalitet / redusert inntrengning | Skade på akustisk linse, inntørket gel på probeoverflaten, feilkonfigurert forsterkning/forhåndsinnstilling | Fantom-QA-test: sjekk uniformitet, inntrengningsdybde, cystedetekterbarhet | Rengjør probeoverflaten; rekonfigurer forhåndsinnstillinger; ved vedvarende problem, probeservice |
| Intermitterende probekontakt | Bøyde kontaktpinner, slitt låsemekanisme, korrosjon | Inspiser kontaktpinner; bevegelsestest under bildetaking; prøv proben på et annet system | Rengjør/rett ut pinner; ved vedvarende problem, bytt kontaktmontering |
| Feil på elektrisk sikkerhetstest (høy lekkasje) | Skade på probekabelisolasjon, væskeinntrenging i probehus, sprukket akustisk linse | Elektrisk sikkerhetstest per IEC 62353; visuell inspeksjon av kabel og linse | Bytt kabel; ved væskeinntrenging krever proben produsentservice |
| Systemet fryser eller krasjer | Programvarefeil, utilstrekkelig minne, GPU-overoppheting, korrupte forhåndsinnstillinger | Sjekk feillogger, verifiser programvareversjon, test termisk styring, tilbakestill forhåndsinnstillinger | Programvareoppdatering; rengjør kjøleventiler; fabrikktilbakestilling ved vedvarende problem |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten (vanligvis årlig, med kvartalsvise bildekvalitetskontroller).

1. **Visuell inspeksjon** — Kontroller systemhuset, hjul, skjerm, tastatur/styrekule og alle kabelkontakter. Inspiser hver probe: akustisk linse for sprekker/delaminering, kabel for kutt/knekker, kontaktpinner for bøying/korrosjon, trekkavlastning for skade.

2. **Test av elektrisk sikkerhet** — Per IEC 62353: beskyttende jordresistans (klasse I-systemer), kapslingslekkasjestrøm og pasientlekkasjestrøm for hver probe (Type BF tilkoblingsdeler: ≤ 100 µA normal, ≤ 500 µA SFC).

3. **Bildekvalitet — Fantomtest** — Bruk et vevsetterliknende fantom (f.eks. CIRS 040GSE), ta standardiserte bilder og evaluer:
   - **Uniformitet** — jevn lysstyrke over hele bildefeltet
   - **Inntrengningsdybde** — maksimal dybde der måleobjekter er synlige
   - **Aksial og lateral oppløsning** — minste oppløsbare målgruppe
   - **Cystedetekterbarhet** — anekogene cyster synlige ved angitte dybder
   - **Målernøyaktighet** — målte avstander samsvarer med kjente fantommål (±1 mm eller ±1 %)

4. **Probeelementkontroll** — Utfør en lufttest eller fantomskan for å identifisere elementbortfall (mørke vertikale linjer i bildet). Dokumenter antall og plassering av bortfallelementer. Baseline ved igangkjøring, spor over tid.

5. **Monitorkalibrering** — Verifiser at skjermen oppfyller DICOM GSDF (Grayscale Standard Display Function) dersom systemet brukes til primærdiagnostikk. Kontroller lysstyrke, kontrast og gråtoneuniformitet.

6. **Programvare- og forhåndsinnstillingsgjennomgang** — Verifiser at programvareversjonen samsvarer med gjeldende godkjent versjon. Kontroller at kliniske forhåndsinnstillinger (undersøkelsestyper, forsterkningsstandarder, merknadsbibliotek) er korrekte og oppdaterte.

---

## Relaterte standarder

- **IEC 60601-2-37:2024** — Særskilte krav til grunnleggende sikkerhet og essensiell ytelse for diagnostisk og terapeutisk ultralydapparat. Dekker grenser for akustisk utgang (MI, TI), transdusersikkerhet og visningskrav.
- **IEC 62359:2010+AMD1:2017** — Ultralyd — Feltkarakterisering: testmetoder for bestemmelse av termiske og mekaniske indekser. Spesifiserer hvordan MI og TI måles og rapporteres.
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse.
- **AIUM Practice Parameter for the Performance of Ultrasound Equipment QA** — Gir praktisk veiledning for rutineprosedyrer for kvalitetstesting.

---

## Relaterte scenarioer

Øv på å diagnostisere ultralydfeil med veiledede simuleringsscenarioer:

- [Bildeartifakter og elementbortfall](/no/scenarios/us-image-artifacts/) *(Nivå 1)*
- [Feilsøking av probefeil](/no/scenarios/us-probe-failure/) *(Nivå 2)*
- [Elektrisk sikkerhet etter væskesøl](/no/scenarios/us-electrical-safety/) *(Nivå 2)*
