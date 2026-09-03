---
title: "Respiratorslab"
course: "MTE200"
shortTitle: "Respirator"
description: "Betjening, periodisk vedlikehold og funksjonstesting av en respirator"
equipment:
  - "Dräger Evita XL"
  - "Testlunge"
  - "Fluke VT900A Gas Flow Analyzer"
  - "Diverse verktøy og reservedeler (SV-membranenhet)"
prerequisites:
  - "Dräger Evita XL service- og brukermanualdokumentasjon"
  - "Forelesningsnotater om mekanisk ventilasjon og respirasjonsfysiologi"
duration: "2,5 timer"
---

## Læringsmål

Etter denne labøvelsen skal du kunne:

- Beskrive funksjonen til inspirasjonsblokken og dens nøkkelkomponenter, inkludert SV-membranenheten (sikkerhetsventilmembranen, «SV diaphragm assembly» i servicemanualen)
- Inspisere og bytte SV-membranenheten i henhold til Dräger Evita XL servicemanualen
- Montere respiratorkretser med testlunge og verifisere korrekt drift
- Skille mellom volumkontrollerte og trykkontrollerte ventilasjonsmodi
- Utføre verifisering av gasslevering og alarmtesting på en respirator

---

## Sikkerhetsmerknader

> **ESD-FARE.** Denne labøvelsen innebærer direkte kontakt med elektronikk. Elektrostatisk utladning kan skade sensitive komponenter. Sett opp passende ESD-forholdsregler før arbeidet begynner.

- Bruk ESD-håndleddsstropp koblet til benkens jordingspunkt når du håndterer interne komponenter.
- Før du tar av et eneste deksel: slå respiratoren AV, koble fra nettkabelen, steng trykkluft- og O₂-forsyningen, koble fra gasslangene og luft ut resttrykket i inspirasjonsblokken slik servicemanualen beskriver. Forsyningen ligger på 3–6 bar, og blokken står under trykk også etter at slangene er tatt av.
- Hold respiratoren avslått og frakoblet nettet så lenge interne enheter er eksponert. Evita XL er vanligvis utstyrt med internt batteri, så apparatet blir ikke spenningsløst av at du slår det av på frontpanelet.
- Hold olje og fett unna alle deler som fører O₂. Hydrokarboner sammen med oksygen under trykk er en antennelsesfare, så O₂-koblinger skal bare håndteres med rene, fettfrie hender og verktøy.
- Koble til gassforsyningen igjen først når respiratoren er ferdig remontert og lukket, ved starten av Del 2.
- Når du tester med testlunge, kontroller at alle kretstilkoblinger er sikre før du starter ventilasjon.
- Rapporter eventuelle utstyrsskader eller uventet oppførsel til veiledende tekniker.

---

## Oppsett av utstyr

1. Plasser Dräger Evita XL på benken. Inspiser kabinettet for fysisk skade og kontroller at strømkabel og gasstilkoblinger er til stede og uskadet.
2. Kontroller at den fysiske kopien av Dräger Evita XL servicemanualen er tilgjengelig på arbeidsstasjonen din.
3. Finn reservedelen til SV-membranenheten og nødvendig verktøy.
4. Ikke koble til gassforsyning eller testlunge før det angis i prosedyren.

---

## Prosedyre

### Del 1 — Inspeksjon av inspirasjonsblokk og bytte av SV-membran (60 min)

**1.1** Les gjennom kapittelet om *inspirasjonsblokken* i servicemanualen (fysisk kopi i laben) under Kapittel 3 *Reparasjonsinstruksjoner*. Gjør deg kjent med oppbyggingen og funksjonen til inspirasjonsblokken før du begynner praktisk arbeid.

**1.2** Inspiser SV-membranenheten som er montert i inspirasjonsblokken på respiratoren, i henhold til servicemanualen. Kontroller at membranen ikke er sprukket, herdet eller skadet på annen måte, og at den ligger riktig i setet. Registrer funnene dine i labnotatboken — det er denne tilstanden du skal sammenligne den nye enheten med.

**1.3** Bytt *SV-membranenheten* i henhold til trinn-for-trinn-instruksjonene i servicemanualen. Dokumenter hvert trinn i labnotatboken etter hvert som du utfører det.

**1.4** Svar på følgende i labnotatboken: Hvorfor er SV-membranenheten viktig med hensyn til forsyningstrykk-feil eller strømbrudd på respiratoren? (Hint: se avsnitt 3.3 i servicemanualen om utstyrsregisteret.)

---

### Del 2 — Verifisering av gasslevering (45 min)

**2.1** Monter en respiratorkrets med testlunge. Ikke bruk fukter for denne testen.

**2.2** Slå på Evita XL og konfigurer følgende basisinnstillinger:

| Parameter | Innstilling |
|---|---|
| Modus | VC-CMV |
| Tidalvolum (Vt) | 500 mL |
| Respirasjonsfrekvens (RR) | 12 pust/min |
| PEEP | 5 cmH₂O |
| FiO₂ | 0,21 |

**2.3** La respiratoren sykle i minst 2 minutter for å stabilisere seg. Observer bølgeformene på respiratorens display og bekreft normal drift.

**2.4** Test gasslevering ved tre innstillinger av tidalvolum. Koble en kalibrert gassflowanalysator (Fluke VT900A) inn ved pasient-Y-stykket, mellom kretsen og testlungen — respiratorens eget display kommer fra dens egne flowsensorer og kan ikke verifisere dens egen levering. For hver innstilling lar du respiratoren sykle stabilt i minst 1 minutt før du registrerer både displayverdien og analysatorverdien:

| Innstilt tidalvolum | Vt på respiratordisplayet (mL) | Vt på analysatoren (mL) | Avvik fra innstilt verdi (%) |
|---|---|---|---|
| 300 mL | | | |
| 500 mL | | | |
| 800 mL | | | |

**Akseptkriterium:** |avvik| ≤ 10 % eller ≤ 10 mL, det som er størst (se referansesiden med kliniske ingeniørformler).

**2.5** Kommenter eventuelle avvik mellom innstilt verdi, displayverdien på respiratoren og det målte volumet. Hvis displayet stemmer med innstillingen, men analysatoren ikke gjør det — hva sier det deg om respiratorens egne flowsensorer?

---

### Del 3 — Ventilasjonsmodi og alarmtesting (45 min)

#### 3.1 Sammenligning av ventilasjonsmodi

Gå gjennom betjening og kontroller på Evita XL i henhold til brukermanualen. Test de ulike ventilasjonsmodi tilgjengelig på enheten. For hver testede modus, registrer:

- Modusnavn og forkortelse
- Om modusen er volumkontrollert eller trykkontrollert
- Nøkkelparametere som kreves for den modusen

Fyll ut følgende tabell i labnotatboken:

| Modus | Kontrolltype (Volum/Trykk) | Nøkkelparametere |
|---|---|---|
| VC-CMV | | |
| PC-CMV | | |
| SIMV | | |
| CPAP/ASB | | |
| Andre tilgjengelige modi | | |

#### 3.2 Alarmtesting

Test følgende alarmer og registrer observasjonene dine:

**Frakoblingsalarm:**
1. Med respiratoren i drift i VC-CMV-modus, koble fra pasientkretsen fra testlungen.
2. Mål tiden fra frakobling til alarmaktivering.
3. **Akseptkriterium:** Frakoblingsalarmen skal varsle innen 15 s etter frakobling. De 15 sekundene er vårt lokale akseptkriterium, hentet fra referansesiden om respiratorer. Den gjeldende særstandarden for intensivrespiratorer, ISO 80601-2-12:2020 — som erstattet den tilbaketrukne IEC 60601-2-12:2001 — krever at respiratoren har en alarmtilstand for frakobling, men fastsetter ingen enkelt deteksjonstid; alarmforsinkelsen oppgis av produsenten. Kontroller derfor også hvilken verdi Evita XL-manualen oppgir, og noter den ved siden av din egen måling.

**Høytrykksalarm:**
1. Sett høytrykksalarm-grensen til 30 cmH₂O.
2. Delvis okkluder testlungekretsen for å generere forhøyet luftveistrykk.
3. Registrer trykket der alarmen utløses.

**Apnéalarm:**
1. Bytt til en spontanpustemodus (f.eks. CPAP).
2. Ikke simuler spontane pust på testlungen.
3. Mål tiden til apnéalarmen aktiveres.

Registrer alle alarmtestresultater i en oppsummeringstabell i labnotatboken.

---

### Del 4 — Diskusjonsspørsmål (30 min)

Svar på følgende spørsmål i labnotatboken. Du skal gå gjennom svarene dine muntlig med labingeniøren når du presenterer for godkjenning.

1. Forklar formålet med SV-membranen og hva som skjer hvis den svikter. I svaret ditt, ta for deg konsekvensene for både forsyningstrykk-feil og strømbrudd-scenarier.

2. Sammenlign volumkontrollerte og trykkontrollerte ventilasjonsmodi — hva er de viktigste forskjellene i hvordan respiratoren leverer pust? Diskuter hvilken parameter som er garantert (volum eller trykk) i hver modus og hva som varierer.

3. Evita XL er pneumatisk drevet: den har ingen intern turbin eller blåser, og henter drivgassen fra trykkluft- og O₂-forsyningen på 3–6 bar (der medisinsk trykkluft ikke er rørlagt, leveres den fra en ekstern kompressorenhet). Hva skjer med ventilasjonen hvis lufttilførselen faller bort mens O₂ fortsatt er tilkoblet, og hva gjør SV-membranen (sikkerhetsventilmembranen) hvis begge gassforsyningene eller nettspenningen faller bort? Sammenlign med en turbindrevet respirator som Dräger Savina, og forklar hvorfor turbinmaskiner foretrekkes til transport og til steder uten rørlagt medisinsk trykkluft.

4. Vårt akseptkriterium er at frakoblingsalarmen varsler innen 15 s. Hvorfor er rask deteksjon av frakobling klinisk kritisk, og hva kan skje med en pasient hvis alarmen kommer langt senere enn dette? Hvor i produsentdokumentasjonen finner du alarmforsinkelsen som er oppgitt for Evita XL, og hvorfor overlater ISO 80601-2-12 dette tallet til produsenten i stedet for å fastsette det i standarden?

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Inspeksjonsfunnene dine for SV-membranenheten (1.2) og byttet du utførte (1.3), gjennomgått trinn for trinn etter servicemanualen, sammen med svaret ditt på 1.4
- Den utfylte tabellen for gasslevering fra 2.4 — innstilt, avlest og målt tidalvolum med avviket for hver innstilling — og om hvert resultat er innenfor akseptkriteriet ±10 % / ±10 mL, i tillegg til avvikene du peker på i 2.5
- Modustabellen fra 3.1 og alarmtestresultatene fra 3.2, inkludert målte tider for frakobling og apné holdt opp mot akseptkriteriene
- Svarene dine på de fire diskusjonsspørsmålene i Del 4

Ingen skriftlig innlevering.
