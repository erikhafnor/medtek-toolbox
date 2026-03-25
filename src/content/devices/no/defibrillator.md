---
title: "Defibrillatorer & Monitorer"
category: "defibrillator"
description: "Referanseguide for vedlikehold, testing og feilsøking av defibrillatorer og pasientmonitorer"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP defibrillator-tester"
  - "Keysight InfiniiVision oscilloskop"
standards:
  - "IEC 60601-2-4 (Defibrillatorer)"
  - "IEC 60601-2-27 (EKG-overvåking)"
  - "IEC 62353 (Periodisk testing)"
order: 1
---

## Oversikt

Defibrillatorer leverer et kontrollert elektrisk sjokk til myokardiet for å avslutte livstruende arytmier som ventrikkelfibrilasjon (VF) og pulsløs ventrikkeltakykardi (pVT). Moderne enheter kombinerer defibrillering med 12-avlednings EKG-overvåking, ikke-invasiv pacing og SpO₂/CO₂-måling. Kliniske ingeniører er ansvarlige for å sikre at disse enhetene presterer innenfor spesifikasjonen, særlig for nøyaktighet i energilevering, ladetid og timing for synkronisert kardioversjon.

---

## Slik fungerer det

En defibrillator lagrer energi i en høyspent kondensator og lader den ut gjennom pasienten via selvklebende pads eller padler. Moderne bifasiske bølgeformer (oftest Biphasic Truncated Exponential, BTE, eller Rectilinear Biphasic, RLB) leverer energi i to faser — positiv deretter negativ — noe som reduserer toppstrømmen som kreves og minimerer myokardskade sammenlignet med monofasiske design.

### Nøkkelparametere

| Parameter | Typisk spesifikasjon | Klinisk betydning |
|---|---|---|
| Levert energi (voksen) | 120–200 J (bifasisk) | Må samsvare med valgt innstilling ±15 % per IEC 60601-2-4 |
| Ladetid (full lading) | ≤ 10 s fra nytt batteri | Forsinkelser > 15 s indikerer kondensator- eller batteriforringelse |
| Synkroniseringsforsinkelse (SYNC-modus) | ≤ 60 ms etter R-bølgetopp | Lengre forsinkelser risikerer R-på-T-fenomenet |
| Pasientlekkasjestrøm (CF) | ≤ 10 µA (normal), ≤ 50 µA (enkeltfeil) | Høy lekkasje indikerer feil i padskabel eller chassisisolasjon |
| EKG-båndbredde (overvåkingsmodus) | 0,05–150 Hz (diagnostisk) | Smal båndbredde skjuler ST-endringer og HF-støy |

---

## Vanlige feilmoder

| Feil | Sannsynlig årsak | Diagnostiske trinn | Løsning |
|---|---|---|---|
| Enheten vil ikke lade til valgt energi | Forringet hovedkondensator; defekt ladekrets | Mål ladetid mot spesifikasjon; sammenlign levert vs. valgt energi på testeren | Bytt kondensator eller ladekort; eskalér til produsent |
| Batteriet tømmes raskere enn oppgitt | Aldrende litium-ion-celler; overdreven standby-tid | Utfør full lade-/utladingssyklus; sammenlign driftstid med BMS-data | Bytt batteripakke; oppdater fastvare hvis BMS-problem |
| EKG-spor viser 50/60 Hz støy | Brukket elektrodekabel; dårlig hudforberedelse; differansemodusinterferens | Bytt ledningskabel; test med simulator; kontroller jordkontinuitet | Bytt kabel; forbedre hudforberedelse; verifiser nettspenningsisolasjon |
| SYNC-modus markerer ikke R-bølgen | Lavamplitude EKG-signal; feil avledning valgt; filterinnstillinger | Øk forsterkning; velg avledning med høyest R-bølge; kontroller notchfilter | Juster signalbehandlingsinnstillinger; ved vedvarende feil, mistenk EKG-forsterkersvikt |
| «Kontroller pads»-varsel med pads tilkoblet | Korrosjon på padskontakt; kabelkontinuitetssvikt; utløpte pads | Mål padimpedans med tester (bør være 25–180 Ω); inspiser kontaktpinner | Rengjør eller bytt kontakt; bytt padskabelsele |

---

## Forebyggende vedlikehold

Utfør ved intervallet spesifisert av produsenten og fasilitetsens PM-program (vanligvis årlig, eller etter et definert antall sjokk).

1. **Visuell og mekanisk inspeksjon** — Kontroller huset for sprekker, kontaktpinner for korrosjon, kabelkapper for kutt, og pads/padler for slitasje. Verifiser at alle etiketter er lesbare.

2. **Batterikapasitetstest** — Bruk enhetens innebygde selvtest eller en lasttester for å bekrefte at batteriet leverer minst 80 % av merkekapasiteten. Registrer tilstandssunnhet (SoH) fra BMS hvis tilgjengelig.

3. **Test av nøyaktighet i energilevering** — Bruk en kalibrert defibrillatortester (f.eks. Fluke Impulse 7000DP) ved 50 Ω-belastning, og verifiser levert energi ved 50 J, 100 J, 150 J og maksimale joule. Hvert resultat må være innenfor ±15 % av valgt energi per IEC 60601-2-4 §201.7.9.3.

4. **Ladetidstest** — Fra fullt batteri, ta tid på lading til maksimal energi. Nye enheter skal lade på ≤ 8 s (LIFEPAK 15-spec); merk hvis > 10 s.

5. **Test av elektrisk sikkerhet** — Per IEC 62353, mål jord-/jordforbindelseresistans (< 0,3 Ω på CF-klassifisert utstyr), berøringsstrøm og pasientlekkasjestrøm. Defibrillatorer er Type CF (hjerteflytende) — bruk CF-grensene.

---

## Relaterte standarder

- **IEC 60601-2-4:2010+AMD1:2020** — Særskilte krav til defibrillatorer. Spesifiserer nøyaktighet i energilevering, ladetid, synkronisering og bølgeformkrav.
- **IEC 60601-2-27:2011+AMD1:2018** — Særskilte krav til EKG-overvåkingsutstyr. Regulerer båndbredde, CMRR, elektrodepolarisering og pacemaker-pulsavvisning.
- **IEC 62353:2014** — Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr. Definerer forenklede sikkerhetstestmetoder for testing i drift.
- **IEC 60601-1:2005+AMD2:2020** — Generelle krav til grunnleggende sikkerhet og essensiell ytelse (moderstandarden).
- **EN 1789:2020** — Medisinske kjøretøy og utstyr — Ambulanser for veitransport (relevant for transportdefibrillatorer).

---

## Relaterte scenarioer

Øv på å diagnostisere defibrillatorfeil med veiledede simuleringsscenarioer:

- [Defibrillatoren som ikke vil lade — LIFEPAK 15](/no/scenarios/defib-wont-charge/) *(Nivå 1)*
- [Batterisvikt midt i gjenopplivning](/no/scenarios/defib-battery-failure/) *(Nivå 2)*
- [EKG-støy under overvåking](/no/scenarios/ecg-noise-defib/) *(Nivå 1)*
- [Synkronisert kardioversjon vil ikke utløse](/no/scenarios/defib-sync-failure/) *(Nivå 2)*
- [«Kontroller pads»-varsel med pads tilkoblet](/no/scenarios/defib-pad-alert/) *(Nivå 1)*
