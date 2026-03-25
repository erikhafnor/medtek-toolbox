---
title: "Pasientmonitorer & EKG"
category: "patient-monitor"
description: "Referanseguide for vedlikehold, testing og feilsøking av pasientmonitorer og EKG-utstyr"
equipment:
  - "Philips IntelliVue MX800"
  - "GE CARESCAPE B650"
  - "Fluke ProSim 8 pasientsimulator"
  - "Fluke ESA615 elektrisk sikkerhetsanalysator"
standards:
  - "IEC 60601-2-27 (EKG-overvåkingsutstyr)"
  - "IEC 60601-2-49 (Multifunksjons pasientovervåking)"
  - "IEC 60601-2-30 (NIBP-overvåking)"
  - "IEC 62353 (Periodisk testing)"
order: 5
---

## Oversikt

Pasientmonitorer måler og viser vitale parametere kontinuerlig — EKG, SpO₂, ikke-invasivt blodtrykk (NIBP), temperatur, respirasjonsfrekvens, og eventuelt invasive trykk, kapnografi (EtCO₂) og hjerteminuttvolum. De er det mest tallrike medisinske utstyret i akuttbehandling, med hundrevis av enheter på et typisk sykehus. Kliniske ingeniører forvalter en stor utstyrspark der alarmhåndtering, signalkvalitet og nettverkstilkobling er like viktig som maskinvarefunksjon. Det primære sikkerhetshensynet er alarmpålitelighet — både ubesvarte ekte alarmer og overdrevent mange falske alarmer (alarmtretthet).

---

## Slik fungerer det

En pasientmonitor henter fysiologiske signaler gjennom flere kanaler samtidig:

- **EKG** — Differensialforsterkere måler spenningen mellom elektrodepar på pasientens hud. Råsignalet filtreres, digitaliseres og bearbeides for å trekke ut hjertefrekvens, rytmeanalyse, ST-segmentmålinger og arytmideteksjon.
- **SpO₂** — En pulsoksymeterprobe sender rødt (660 nm) og infrarødt (940 nm) lys gjennom vev. Forholdet mellom absorbert lys ved de to bølgelengdene angir arteriell oksygenmetning.
- **NIBP** — En oppblåsbar mansjett okkluderer en arterie. Når mansjetten deflater, detekterer monitoren oscillometriske trykkvariationer for å beregne systolisk, diastolisk og middelarterielt trykk.
- **Temperatur** — Termistorprober (hud, rektal, øsofagal) gir kontinuerlig eller punktvis temperaturavlesning.

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| EKG-båndbredde (diagnostisk) | 0,05–150 Hz | Smal båndbredde skjuler ST-endringer og pacemakerspiker |
| EKG CMRR | ≥ 89 dB ved 50/60 Hz | Lav CMRR slipper nettfrekvensinterferens inn i sporet |
| SpO₂-nøyaktighet | ±2 % (70–100 % område) | Unøyaktig SpO₂ kan forsinke oppdagelse av hypoksi |
| NIBP-nøyaktighet | ±3 mmHg (statisk) | Behandlingsbeslutninger avhenger av nøyaktige blodtrykksmålinger |
| Hjertefrekvensnøyaktighet | ±1 % eller ±1 bpm | Brukes til medikamentdosering og arytmideteksjon |
| Alarmresponstid | ≤ 10 s for kritiske alarmer | Forsinkede alarmer kompromitterer pasientsikkerheten |
| Pasientlekkasjestrøm (CF) | ≤ 10 µA normal, ≤ 50 µA SFC | EKG-elektroder har direkte hjerterisikobane |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Støyfullt EKG-spor / falske arytmialarmer | EKG-kabelfeil (brutt ledningskabel), dårlig elektrodekontakt, EMI fra nærliggende utstyr | Systematisk kabel-/ledningstest med ProSim 8; sjekk elektrodeimpedans; identifiser EMI-kilder | Bytt kabel; forbedre hudforberedelse; fjern EMI-kilde |
| Falske asystoli-/VF-alarmer | Ledningsfrakobling ikke oppdaget, EKG-amplitude for lav, feil i lead-off-deteksjon | Test lead-off-deteksjon med ProSim 8; verifiser alarmterskler; sjekk elektrodeimpedans | Bytt kabel; juster følsomhet; opplæring av personell i elektrodeplassering |
| SpO₂-avlesning uregelmessig eller fraværende | Probe plassert feil, omgivelseslysinterferens, lav perfusjon, neglelakk | Sjekk probeplassering og fingerperfusjon; test med ProSim 8 SpO₂-simulering; skjerm mot omgivelseslys | Reposisjonér probe; bruk annen plassering; rengjør sensor |
| NIBP-feil / kan ikke måle | Feil mansjettstr., mansjetlekkasje, luftslange i kink, overdreven pasientbevegelse | Inspiser mansjett og slange for lekkasjer; verifiser mansjettstørrelse; test med NIBP-simulator | Bytt mansjett/slange; velg riktig størrelse; prøv igjen når pasienten er i ro |
| Alarmtretthet (overdrevent mange ikke-handlingsbare alarmer) | Alarmterskler for stramme, standardinnstillinger ikke tilpasset, arytmialgoritme overfølsom | Gjennomgå alarmlogger; vurder terskelinnstillinger mot kliniske behov; sammenlign alarmfrekvens mellom enheter | Tilpass terskler per avdeling/pasientens alvorlighetsgrad; deaktiver ikke-kritiske alarmer etter protokoll |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten (vanligvis årlig, med mellomkontroller for enheter med høy bruksfrekvens).

1. **Visuell og mekanisk inspeksjon** — Kontroller huset, skjermen, monteringsarmen, strømkabelen, batterirommet og alle kabelkontakter. Verifiser at berøringsskjermen eller kontrollene responderer korrekt. Inspiser EKG-kabler, SpO₂-sensorer, NIBP-mansjetter og temperaturprober for skade.

2. **Elektrisk sikkerhetstest** — Per IEC 62353: beskyttelsesjordresistans (< 0,3 Ω for klasse I), kapslingslekkasjestrøm og pasientlekkasjestrøm. EKG-innganger er Type CF-tilkoblingsdeler — bruk CF-grenseverdier (≤ 10 µA normal, ≤ 50 µA SFC).

3. **EKG-nøyaktighet** — Med en pasientsimulator (f.eks. Fluke ProSim 8), verifiser: hjertefrekvensnøyaktighet ved 30, 60, 120 og 240 bpm; EKG-bølgeformmorfologi; ST-segmentdeteksjon; pacemakerspikedeteksjon og -avvisning; respirasjonsfrekvens via impedanspneumografi.

4. **SpO₂-nøyaktighet** — Med ProSim 8 SpO₂-simulering, verifiser avlesninger ved 98 %, 90 %, 85 % og 80 %. Hver må være innenfor ±2 % av simulert verdi.

5. **NIBP-nøyaktighet** — Med en NIBP-simulator eller kalibrert manometer, verifiser statisk trykknøyaktighet (±3 mmHg) og at monitoren korrekt bestemmer simulerte systoliske/diastoliske verdier.

6. **Alarmtest** — Verifiser alle kritiske alarmer: asystoli, VF/VT, bradykardi, takykardi, SpO₂ lav, apné. Hver må aktiveres innenfor spesifiserte responstider med passende lyd-/visuell varsling.

7. **Batteritest** — Kjør monitoren på batteri til lavt-batteri-alarm. Verifiser at batteriet gir minst den produsentspesifiserte driftstiden (vanligvis ≥ 2 timer for sengemonitorer, ≥ 4 timer for transport).

8. **Nettverkstilkobling** — Verifiser at monitoren kobler til sentralstasjonen og at bølgeformer, alarmer og data overføres korrekt. Test alarmvarslingsvidresending hvis aktuelt.

---

## Relaterte standarder

- **IEC 60601-2-27:2011+AMD1:2018** — Særskilte krav til EKG-overvåkingsutstyr. Regulerer båndbredde, CMRR, elektrodepolarisering, pacemakerpulsavvisning og defibrillasjonsbeskyttelse.
- **IEC 60601-2-49:2018** — Særskilte krav til multifunksjons pasientovervåking. Dekker integrasjon av flere måleparametere.
- **IEC 60601-2-30:2018** — Særskilte krav til ikke-invasiv blodtrykksovervåking.
- **IEC 60601-2-61:2017** — Særskilte krav til pulsoksymetre.
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse.

---

## Relaterte scenarioer

Øv på å diagnostisere pasientmonitorfeil med veiledede simuleringsscenarioer:

- [Falsk asystolialarm — Philips IntelliVue](/no/scenarios/ecg-false-asystole/) *(Nivå 1)*
- [NIBP-målefeil](/no/scenarios/monitor-nbp-failure/) *(Nivå 1)*
- [Alarmtretthet-undersøkelse](/no/scenarios/monitor-alarm-fatigue/) *(Nivå 2)*
