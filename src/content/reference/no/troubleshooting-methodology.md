---
title: "Systematisk feilsøkingsmetodikk"
description: "En strukturert tilnærming til diagnostisering av feil på medisinsk utstyr — fra henvendelse til avslutning"
tags: ["troubleshooting", "methodology", "clinical engineering"]
order: 2
---

## Prinsippet

Systematisk feilsøking er kjernekompetansen innen klinisk ingeniørarbeid. Det er dette som skiller fagpersoner som diagnostiserer utstyr fra de som bare bytter deler. Målet er ikke bare å gjenopprette funksjon — det er å identifisere rotårsaken, forebygge gjentakelse og lære av hver eneste feil.

---

## Femfasemodellen

### Fase 1 — Mottak og triagering

Når du mottar en servicehenvendelse, samle kritisk informasjon før du forlater verkstedet:

- **Hva?** — Utstyrstype, modell, serienummer, feilmelding eller symptom
- **Hvor?** — Avdeling, rom, pasientseng
- **Når?** — Når oppstod feilen? Er den intermitterende eller konstant?
- **Hvem?** — Hvem rapporterte den? Kan de beskrive hva som skjedde?
- **Konsekvens?** — Er en pasient tilkoblet? Trengs utstyret umiddelbart? Er det en erstatningsenhet tilgjengelig?

**Triageringsprioritet:**
1. **Livsstøtteutstyr i bruk** (respirator, infusjonspumpe med kritisk legemiddel) — øyeblikkelig
2. **Kritisk utstyr, pasient venter** (defibrillator på akuttmottak, monitor på operasjonsstue) — haster
3. **Ikke-kritisk eller erstatning tilgjengelig** — planlagt respons

---

### Fase 2 — Observer og reproduser

Før du tar på utstyret:

1. **Observer** — Se på utstyret, displayet, kablene, pasienttilkoblingen. Hva ser du? Feilmeldinger, indikatorlys, fysisk skade?
2. **Lytt** — til brukeren. Hva skjedde egentlig? Hva prøvde de? Hva har endret seg i det siste (nye forbruksartikler, utstyret er flyttet, programvareoppdatering)?
3. **Reproduser** — Kan du få feilen til å oppstå? En feil du ikke kan reprodusere er mye vanskeligere å diagnostisere. Hvis den er intermitterende, forstå betingelsene den oppstår under.

**Viktige spørsmål å stille brukeren:**
- «Kan du vise meg nøyaktig hva som skjer?»
- «Når fungerte det riktig sist?»
- «Har noe endret seg — nye forbruksartikler, ny plassering, nytt personale?»
- «Skjer det med alle pasienter eller bare denne?»

---

### Fase 3 — Isoler og test

Dette er den diagnostiske kjernen. Du prøver å avgrense feilen til en spesifikk komponent eller et delsystem. Strategien avhenger av utstyret, men prinsippet er universelt: **endre én variabel om gangen**.

**Isoleringsteknikker:**

| Teknikk | Når den brukes | Eksempel |
|---|---|---|
| **Substitusjon** | Bytt en mistenkt komponent med en kjent fungerende | Bytt EKG-kabel for å se om støyen følger kabelen eller enheten |
| **Segmentering** | Test hver seksjon av en signalvei uavhengig | Mål FiO₂ ved respiratorutløpet, deretter ved fukterutløpet, deretter ved pasient-Y-stykket |
| **Sammenligning** | Sammenlign et feilutstyr med et identisk fungerende utstyr | Kjør begge side om side med samme simulatorinngang |
| **Instrumentering** | Bruk eksternt testutstyr for uavhengig måling | VT900A ved pasient-Y-stykket for å verifisere respiratorens viste tidalvolum |
| **Miljø** | Endre miljøet for å teste eksterne faktorer | Flytt utstyret til et annet rom for å utelukke EMI |

**Kritisk regel:** Endre én variabel om gangen. Hvis du bytter kabel OG sensor samtidig, vet du ikke hvilken som var defekt.

---

### Fase 4 — Diagnostiser og reparer

Når du har isolert feilen til en spesifikk komponent:

1. **Bekreft rotårsaken** — Ikke bare bekreft at utskifting av komponenten fikser symptomet. Forstå *hvorfor* komponenten sviktet. En korrodert kontakt forteller en annen historie enn en produksjonsfeil.

2. **Reparer eller bytt ut** — Fiks den identifiserte komponenten. Bruk OEM-deler når tilgjengelig. Dokumenter hva du byttet og hvorfor.

3. **Verifiser reparasjonen** — Etter reparasjon, test utstyret grundig:
   - Er det opprinnelige symptomet borte?
   - Fungerer alle andre funksjoner fortsatt korrekt?
   - Består utstyret elektrisk sikkerhetstesting (hvis aktuelt)?
   - Er måleverdiene innenfor spesifikasjon?

4. **Ikke skap nye problemer** — Etter enhver reparasjon, kjør gjennom en grunnleggende funksjonskontroll av alle parametere, ikke bare den du reparerte. Gjenmonteringsfeil er en reell risiko.

---

### Fase 5 — Dokumenter og avslutt

Dokumentasjon er ikke papirarbeid — det er grunnlaget for et kvalitetsvedlikeholdsprogram.

**For hver servicehendelse, registrer:**

- Dato, tidspunkt, utstyrsidentifikasjon (type, modell, serienummer)
- Rapportert symptom og hvordan det ble reprodusert
- Diagnostiske trinn gjennomført (hva du testet, hva du fant)
- Identifisert rotårsak
- Korrigerende tiltak (hva du reparerte/byttet, artikkelnumre)
- Verifiseringsresultater (funksjonstester, sikkerhetstester, måleverdier)
- Anbefalinger (endringer i PM-plan, brukeropplæring, flåteinspeksjon)

**Hvorfor dette er viktig:**
- **Mønstergjenkjenning** — Gjentatte feil på samme modell avslører systematiske problemer
- **Flåtestyring** — Hvis ett utstyr har en korrodert kontakt, har sannsynligvis andre med samme alder i samme miljø det også
- **Bevis** — Dine serviceregistreringer er primærbevis ved hendelsesundersøkelser og regulatoriske revisjoner
- **Læring** — Fremtidige ingeniører (inkludert ditt fremtidige jeg) vil ha nytte av tydelige diagnostiske registreringer

---

## Vanlige feilsøkingsfeller

| Felle | Problem | Forebygging |
|---|---|---|
| **Hoppe til konklusjoner** | Antar årsaken før testing | Reproduser alltid feilen og isoler systematisk |
| **Endre for mange variabler** | Bytter flere komponenter samtidig | Én endring om gangen — ellers vet du ikke hva som fikset det |
| **Bekreftelsesbias** | Ser bevis som støtter teorien din, ignorerer bevis som ikke gjør det | Søk aktivt etter bevis som motstrider hypotesen din |
| **Bytte i stedet for å diagnostisere** | Bytter deler til det fungerer uten å forstå hvorfor | Diagnose gir grunnlag for forebygging; bytting fikser bare dagens problem |
| **Ignorere brukeren** | Avviser klinisk personales observasjoner | Brukerne ser utstyret daglig — de legger merke til subtile endringer du ikke ser på ett besøk |
| **Ikke verifisere reparasjonen** | Antar at reparasjonen fungerte uten å teste | Test alt. Mål. Sammenlign med spesifikasjon. |
| **Ufullstendig dokumentasjon** | Registrerer bare «fikset» uten detaljer | Ditt fremtidige jeg vil angre dette når samme feil oppstår igjen neste år |

---

## Klinisk ingeniør-tankesett

God feilsøking er ikke bare teknisk ferdighet — det er et tankesett:

- **Vær systematisk, ikke heroisk.** Metodisk diagnose er raskere enn inspirert gjetting i lengden.
- **Respekter den kliniske konteksten.** Pasienten kommer først. Sørg for erstatningsutstyr før du tar en enhet med til verkstedet.
- **Tenk i systemer.** En utstyrsfeil kan indikere et prosessproblem (feil forbruksartikler, opplæringsbehov, miljøproblem).
- **Lær av hver henvendelse.** Selv en rutinemessig kabelutskifting lærer deg noe om feilmønstre og brukeratferd.
- **Dokumenter som om noen andre skal lese det.** Det vil de.
