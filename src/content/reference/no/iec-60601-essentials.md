---
title: "IEC 60601-1 Grunnleggende"
description: "Hurtigreferanse for den grunnleggende sikkerhetsstandarden for medisinsk elektrisk utstyr"
tags: ["elektrisk sikkerhet", "standarder", "IEC 60601"]
order: 1
---

## Omfang og formål

IEC 60601-1 *Medisinsk elektrisk utstyr — Del 1: Generelle krav til grunnleggende sikkerhet og essensiell ytelse* er paraplystandarden som regulerer sikkerheten til praktisk talt alt elektrisk drevet medisinsk utstyr som brukes i kliniske miljøer. Den spesifiserer krav til design, konstruksjon og testing som produsenter må oppfylle før et produkt kan plasseres på markedet (CE-merking i Europa, FDA-godkjenning i USA osv.).

**Viktigste mål med standarden:**

- Forhindre elektrisk støt til pasienter, operatører og tredjeparter
- Forhindre brann og mekaniske farer
- Sikre *essensiell ytelse* — enheten skal fortsette å fungere sikkert under rimelig forutsigbare feilbetingelser

Gjeldende utgave: **IEC 60601-1:2005 + AMD1:2012 + AMD2:2020** (3. utgave med endringer). Nasjonale adopsjoner inkluderer EN 60601-1 (Europa) og ANSI/AAMI ES60601-1 (USA).

---

## Utstyrsklassifisering

### Klasse I mot Klasse II

| Klasse | Beskrivelse | Beskyttelsesmekanisme mot støt |
|---|---|---|
| **Klasse I** | Baserer seg på både grunnleggende isolasjon og en verneleder (jord)-tilkobling | Feilstrøm avledes til jord via PE-leder; utløser overstrømsvern |
| **Klasse II** | Dobbel isolasjon eller forsterket isolasjon — ingen verneleder | To uavhengige isolasjonslag forhindrer at berøringsspenning når tilgjengelige deler |

De fleste nettdrevne medisinske enheter er Klasse I. Batteridrevne eller dobbeltisolerte enheter er Klasse II. Kliniske ingeniører må verifisere at Klasse I-utstyr har en intakt og lavresistiv PE-tilkobling under periodisk test.

---

## Klassifisering av applikasjonsdeler

En *applikasjonsdel* er enhver del av et medisinsk apparat som kommer i tilsiktet fysisk kontakt med pasienten under normal bruk (f.eks. EKG-elektroder, defibrillatorpads, endoskopskaft, infusjonskateterspiss).

| Type | Symbol | Isolasjon fra jord | Typiske bruksområder | Grense for pasient-lekkasjestrøm (normal / enkeltfeil) |
|---|---|---|---|---|
| **Type B** | B | Ikke isolert (koblet til jord via definert impedans) | Ytre ikke-kardiale deler: ultralydtransdusere (kroppsoverflate), blodtrykksmanchetter | 100 µA / 500 µA |
| **Type BF** | BF (flytende) | Flytende — isolert fra jord | Elektroder eller prober uten direkte tilkobling til hjertet | 100 µA / 500 µA |
| **Type CF** | CF (kardial flytende) | Høy grad av flytende isolasjon — kardialt beskyttelsesnivå | Enheter med direkte hjertekontakt eller tilkobling: defibrillatorer, intrakardialt kateter, hjerteovervåkere | 10 µA / 50 µA |

> **CF er den strengeste klassifiseringen.** Den ti ganger strengere grensen for lekkasjestrøm (10 µA vs 100 µA) gjenspeiler den dramatisk lavere terskelen for ventrikkelflimmer når strøm påføres direkte på hjertemuskelen (~50 µA) sammenlignet med overflateberøring.

---

## Grenser for lekkasjestrøm

Lekkasjestrømmer måles i spesifikke konfigurasjoner definert i standarden. Tabellen nedenfor oppsummerer de primære grensene. Verdiene er oppgitt i mikroampere (µA) der ikke annen enhet er angitt, og representerer **r.m.s.-verdier for AC, eller stasjonær tilstand for DC**.

### Jordlekkasjestrøm (vernelederstrøm)

Strøm som strømmer fra nettsiden til PE-terminalen. Gjelder kun Klasse I-utstyr.

| Betingelse | Grense |
|---|---|
| Normal betingelse (NC) | 5 mA |
| Enkeltfeilbetingelse (SFC) — brudd i én nettleder om gangen | 10 mA |

> De langt strengere verdiene 500 µA (NC) og 1000 µA (SFC), som fortsatt oppgis mange steder for jordlekkasjestrøm, stammer fra den **tilbaketrukne 2. utgaven** av IEC 60601-1. Merk også at jordlekkasjestrømmen måles *i* vernelederen; brudd i vernelederen kan derfor ikke være enkeltfeilbetingelsen — feilen som legges inn, er brudd i én nettleder (nøytralleder). Forveksle heller ikke den gamle verdien på 500 µA med grensen på 500 µA for *utstyrslekkasjestrøm* i IEC 62353: det er en annen måling.

### Kapslingslekkasjestrøm (berøringsstrøm)

Strøm som ville flyte fra enhver tilgjengelig del av kapslingen til jord dersom en person berørte den.

| Betingelse | Grense |
|---|---|
| Normal betingelse | 100 µA |
| Enkeltfeilbetingelse | 500 µA |

### Pasient-lekkasjestrøm (applikasjonsdel til jord)

Strøm som strømmer fra applikasjonsdelen gjennom pasienten til jord (eller via en målingsmotstand som simulerer pasienten). Dette er den mest sikkerhetskritiske målingen for klinisk utstyr.

| Type applikasjonsdel | Normal betingelse | Enkeltfeilbetingelse |
|---|---|---|
| Type B | 100 µA | 500 µA |
| Type BF | 100 µA | 500 µA |
| Type CF | **10 µA** | **50 µA** |

### Pasient-hjelpestrøm (mellom applikasjonsdeler)

Strøm som flyter mellom applikasjonsdeler gjennom pasienten (uten et eksternt påført signal). Relevant for enheter med flere ledninger som EKG-skjermer.

| Type applikasjonsdel | Normal betingelse | Enkeltfeilbetingelse |
|---|---|---|
| Type B / BF | 100 µA | 500 µA |
| Type CF | **10 µA** | **50 µA** |

> **Enkeltfeilbetingelser** omfatter: brudd i vernelederen, brudd i én nettleder (nøytralleder) og svikt i én enkelt komponent. Utstyret skal forbli sikkert under disse betingelsene. Omvendt nettpolaritet er *ikke* en enkeltfeilbetingelse — det er en målebetingelse: lekkasjestrømmene måles med både normal og omvendt polaritet, både under normal betingelse og under enkeltfeil.

---

## Grunnleggende isolasjonskrav

IEC 60601-1 Klausul 8 definerer krav til **krypeavstander**, **luftklareringer** og **dielektrisk spenningsfasthet** (hipot) mellom kretser og tilgjengelige deler.

- **Luftklarering** — korteste avstand gjennom luft mellom to ledende deler. Forhindrer lysbue ved overspenningshendelser.
- **Krypeavstand** — korteste vei langs en fast isolerende overflate mellom to ledende deler. Forhindrer sporing (overflatelysbue) under forurensning.
- Minimumsavstander avhenger av: nominell spenning, forurensningsgrad (typisk PD2 for medisinske miljøer), materialgruppe for isolasjon (I, II eller IIIa/IIIb).
- **Dielektrisk spenningsfasthetstest (hipot):** Påført spenning (f.eks. 1500 V AC i 1 min for grunnleggende isolasjon ved 250 V nett) må ikke forårsake sammenbrudd eller overdreven lekkasje.

Den dielektriske spenningsfasthetsprøven er en typetest som produsenten utfører. IEC 62353 gjentar den ikke i felt: der isolasjonen må kontrolleres på ferdig montert utstyr, beskriver standarden en valgfri måling av **isolasjonsresistans** med 500 V DC, der resultatet er en resistans i MΩ — ikke en lekkasjestrøm, og ikke en høyspenningsprøve.

---

## Viktige særstandarder (IEC 60601-2-x)

IEC 60601-2-serien er *særstandarder* som utvider de generelle kravene i 60601-1 for spesifikke utstyrstyper. De har forrang fremfor den generelle standarden der de er i konflikt.

| Standard | Omfang | Viktige tilleggskrav |
|---|---|---|
| **IEC 60601-2-4** | Hjertedefibrillatorer | Nøyaktighet i levert energi (±15 % eller ±4 J, det som er størst), ladetid (≤ 10 s), synkroniseringsforsinkelse (≤ 60 ms), bifasiske bølgeformparametere |
| **ISO 80601-2-12:2020** (avløste IEC 60601-2-12, som er trukket tilbake) | Respiratorer for intensivbehandling | Essensiell ytelse under ventilasjon, alarmer, frakoblingsdeteksjon, nøyaktighet i gasslevering |
| **IEC 60601-2-24** | Infusjonspumper og -kontrollere | Nøyaktighet i strømningshastighet, okklusjonsdeteksjon, forebygging av fri flyt, deteksjon av luft i slangen |
| **IEC 60601-2-25** | EKG-utstyr | Båndbredde (0,05–150 Hz diagnostisk), CMRR (≥ 89 dB ved 50/60 Hz), toleranse for elektrode-polarisasjon |
| **IEC 60601-2-27** | EKG-overvåkingsutstyr | Signalakvisisjon under defibrillasjon, pacemaker-pulsdeteksjon/-forkasting |
| **IEC 60601-2-34** | Invasiv blodtrykksovervåking | Trykknøyaktighet, nulldrift, transduserisolasjon |
| **IEC 60601-2-49** | Multifunksjonell pasientovervåking | Kombinasjoner av overvåkingsfunksjoner i én enhet |

> Når det finnes en særstandard for en utstyrstype, brukes den som primærreferanse. Den generelle standarden (60601-1) fyller inn eventuelle hull. Noen særstandarder er flyttet til den felles ISO/IEC-serien **80601-2-x** — respiratorer for intensivbehandling er én av dem — og de har akkurat samme rolle.

---

## IEC 62353 — Oversikt over periodisk testing

**IEC 62353:2014** *Periodisk test og test etter reparasjon av medisinsk elektrisk utstyr* definerer praktiske testmetoder for bruk av klinisk ingeniøravdelinger og serviceteknikere. Den er utformet for bruk med ferdig montert utstyr i felten — ikke fabrikktestene definert i 60601-1.

### Hvorfor en separat standard?

IEC 60601-1-tester (f.eks. full dielektrisk spenningsfasthet ved 1500 V AC) er destruktive dersom de påføres utstyr som allerede har sensitiv elektronikk installert. IEC 62353 gir tilsvarende sikkerhetskontroll på testnivåer som er trygge for ferdig montert utstyr.

### Viktige tester definert i IEC 62353

| Test | Metode | Typisk grense |
|---|---|---|
| **Verneleder-resistans** | Direktemåling med teststrøm på **minst 200 mA** (kilde på høyst 24 V) | ≤ 0,3 Ω for hele banen inkludert nettkabelen (Klasse I-utstyr) |
| **Utstyrslekkasjestrøm (direkte- eller differansemetode)** | Samlet lekkasje fra nettdelen til jord *og* til tilgjengelige deler, målt som én verdi | ≤ 500 µA (Klasse I); ≤ 100 µA (Klasse II) |
| **Utstyrslekkasjestrøm (alternativ metode)** | Forsyningsspenningen påtrykkes den kortsluttede nettdelen, og strømmen til jord og tilgjengelige deler måles | ≤ 1000 µA (Klasse I); ≤ 500 µA (Klasse II) — den alternative metoden har høyere tillatte verdier |
| **Lekkasjestrøm fra applikasjonsdel** | Testspenning påtrykkes applikasjonsdelen; gjelder bare type F-applikasjonsdeler | ≤ 50 µA (type CF); ≤ 5000 µA (type BF) |
| **Isolasjonsresistans (valgfri)** | 500 V DC mellom de sammenkoblede nettlederne og verneleder / kapsling / applikasjonsdeler, med utstyret frakoblet nettet | En resistans, ikke en lekkasjestrøm — f.eks. ≥ 2 MΩ mellom nettdelen og vernelederen for Klasse I; IEC 62353 angir det fullstendige verdisettet |

### Testintervaller

IEC 62353 pålegger ikke spesifikke intervaller — det bestemmes av nasjonale forskrifter, institusjonell policy og risikovurdering. Typisk praksis:

- **Årlig** PM for høyrisikolivsstøtteutstyr (respiratorer, defibrillatorer, infusjonspumper)
- **Hvert 2. år** for lavrisiko overvåkingsutstyr
- **Etter reparasjon** før tilbakelevering til klinisk bruk
- **Etter hendelser** der elektrisk sikkerhet kan ha blitt kompromittert

### Test etter reparasjon

Etter enhver reparasjon som kan påvirke elektrisk sikkerhet (f.eks. utskifting av strømforsyning, nettkabel, applikasjonsdel-kabel), må en komplett 62353-testsekvens gjennomføres før enheten returneres til klinisk bruk.
