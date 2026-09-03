---
title: "Defibrillatorlab"
course: "MTE200"
shortTitle: "Defibrillator"
description: "Betjening, testing og forebyggende vedlikehold av defibrillator"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP"
  - "Keysight InfiniiVision oscilloskop"
prerequisites:
  - "LIFEPAK 15 bruker- og servicemanualdokumentasjon"
  - "Fluke Impulse 7000DP dokumentasjon"
  - "Forelesningsnotater om defibrillasjon"
duration: "2,5 timer"
---

## Læringsmål

Etter denne labøvelsen skal du kunne:

- Identifisere de viktigste kontrollene, tilkoblingene og tilbehøret på LIFEPAK 15-defibrillatoren
- Betjene Fluke Impulse 7000DP defibrillatoranalysator for å gjennomføre en QUICK-COMBO-testsekvens
- Tolke resultater for energilevering opp mot akseptkriteriene i IEC 60601-2-4
- Utføre en bifasisk bølgeformtest med oscilloskop og beskrive sammenhengen mellom bølgeformen og standarden
- Anvende sikker arbeidspraksis ved håndtering av høyspent testutstyr

---

## Sikkerhetsmerknader

> **HØYSPENNINGSFARE.** LIFEPAK 15 lader kondensatoren til opptil rundt 2 kV — det er nivået den når ved innstillingen på 360 J som brukes én gang i Del 3.2. Koble alltid enheten til den godkjente defibrillatortesteren før lading. Lad aldri enheten med pads eller padler frakoblet fra en last. Hold andre personer unna testbenken under utladning.

- Ikke berør kontaktpinnene i QUICK-COMBO-kontakten mens apparatet er ladet.
- Kontroller at defibrillatortesteren er jordet, og at ledningene er dimensjonert for utladningsenergien som brukes.
- Koble aldri en oscilloskopprobe direkte over høyspenningsutgangen eller over testerens 50 Ω-lastterminaler. Bruk i stedet analysatorens **Scope Output**-kontakt, og koble oscilloskopet til og fra bare når LIFEPAK 15 er avslått og utladet.
- Hvis du observerer røyk, uvanlig lukt eller gnister: trykk **ikke** på sjokkknappen. Utlad i stedet apparatet internt — velg **DISARM** på skjermen, eller slå av apparatet; begge deler lader ut kondensatoren internt. Hold deg unna terapikabelen og kontakten til ladeindikatoren er slukket, og varsle veileder. Lad aldri bevisst ut et apparat som ryker eller slår gnister: feilen kan ligge i terapikabelen eller i utgangsreleet, og sjokket ville sendt hele den lagrede energien inn i den.
- Alle tester i denne labøvelsen gjennomføres ved **5 J** med mindre prosedyren eksplisitt angir noe annet — utladningen ved maksimal energi i Del 3.2 er det ene unntaket.
- Bruk lav energi (5 J) mens du gjør deg kjent med apparatet, for å unngå unødvendig tapping av batteriet. Del 3.2 krever en utladning ved 360 J; ta ikke flere høyenergisjokk enn opptaket krever. Etter at labøvelsen er fullført, sett defibrillatorene til lading slik at batteriet er klart for neste gruppe.
- Lekkasjestrømmålinger ville normalt vært en del av sikkerhetskontrollen, men dekkes i en egen lab om elektrisk sikkerhet.

---

## Oppsett av utstyr

1. Plasser LIFEPAK 15 på benken med frontpanelet vendt mot deg. Inspiser kabinettet for fysisk skade og kontroller at alle koblinger er til stede og uskadet.
2. Koble QUICK-COMBO-terapikabelen fra LIFEPAK 15 til Fluke Impulse 7000DP (bruk 50 Ω-inngangen — **DEFIB**-porten).
3. Slå på Fluke Impulse 7000DP og velg **DEFIB**-modus. Verifiser at testeren viser klar tilstand.
4. Slå på LIFEPAK 15. La den fullføre selvtesten ved oppstart. Noter eventuelle feilmeldinger i labnotatboken.
5. Koble Keysight-oscilloskopet til BNC-kontakten **Scope Output** på baksiden av Fluke Impulse 7000DP med en BNC-kabel (eller en 1×-probe). Denne utgangen gir en isolert, nedskalert kopi av utladningen, og forholdet velges automatisk (2000:1, 400:1 eller 80:1, avhengig av måleområdet som brukes) — så finn forholdet som gjelder for opptaket ditt på analysatoren før du regner om noe, og multipliser hver spenning du leser av på oscilloskopet med dette forholdet. Sett **aldri** en vanlig 10× passiv probe (typisk merket 300 V CAT II) over høyspenningsutgangen: LIFEPAK 15 når rundt 2 kV ved maksimal energi, langt over probens spenningsgrense. Sett tidsskalaen til 2 ms/div; vertikal skala stilles inn etter første utladning (se 3.1).

---

## Prosedyre

### Del 1 — Gjennomgang av kontroller og tilbehør (30 min)

**1.1** Med utgangspunkt i LIFEPAK 15 Quick Reference Card og frontpanelet, finn og noter funksjonen til hvert av følgende i labnotatboken din:

- Energivalgbryter
- Ladeknapp og indikatorlys
- Sjokkknapp
- SYNC-modus-knapp
- Pacerfrekvens og utgangskontroller
- SpO₂ / NIBP / CO₂ konnektorporter
- QUICK-COMBO-terapikobling
- Dataport (USB / Ethernet)

**1.2** Identifiser hvilken type applikasjonsdel QUICK-COMBO-padsene er klassifisert som. Noter om de er Type B, BF eller CF, og forklar hvorfor denne klassifiseringen er viktig for hjertepasienter.

**1.3** Noter produksjonsår og programvare-/fastvareversjon vist på enhetens statusskjerm. Dette trengs når du søker etter servicebulletiner.

---

### Del 2 — Fluke Impulse 7000DP QUICK-COMBO-testsekvens (60 min)

Utfør følgende tester i rekkefølge. For hver test, registrer valgt innstilling, testerens avlesning og om resultatet oppfyller akseptkriteriet. Bruk **5 J** for alle utladningstester i denne delen; den ene høyenergiutladningen kommer senere, i Del 3.2.

#### 2.1 Levert energitest

1. Velg **5 J** på LIFEPAK 15.
2. Trykk **Lad**. Vent på klar-tonen.
3. Trykk **Sjokk** (inn i testeren — ikke rør padler).
4. Les av levert energi fra Fluke Impulse 7000DP-displayet.
5. **Akseptkriterium:** IEC 60601-2-4:2010+AMD1:2018 krever at levert energi i 50 Ω last ligger innenfor **±15 % av valgt energi, eller ±4 J — det som er størst**. Ved 5 J er det ±4 J-leddet som gjelder (1 J – 9 J), så denne innstillingen skiller ikke et friskt apparat fra et defekt. Bruk ±15 %-båndet (**4,25 J – 5,75 J**) her bare som en arbeidsverdi, sammenlign den med spesifikasjonen for energinøyaktighet i LIFEPAK 15-servicemanualen, og bruk kriteriet på nytt på 360 J-utladningen i Del 3.2, der ±15 % (**306 J – 414 J**) er den bindende grensen.
6. Gjenta tre ganger og registrer alle resultater. Beregn gjennomsnitt og standardavvik.

#### 2.2 Ladetidstest

1. Velg **5 J** på LIFEPAK 15.
2. Trykk **Lad** og start en stoppeklokke samtidig (eller bruk testerens innebygde timer hvis den er tilgjengelig).
3. Stopp timeren når enheten signaliserer klar.
4. **Akseptkriterium:** Ladetid ≤ produsentens spesifikasjon. For LIFEPAK 15 ved 5 J skal enheten lade på under 3 s fra fullt batteri.
5. Gjenta tre ganger og registrer hver ladetid.

#### 2.3 Synkronisert kardioversjon (Sync) test

1. Koble EKG-simulator-utgangen (bruk Fluke Impulse 7000DP sin innebygde EKG-kilde, eller labens pasientsimulator) til EKG-ledningsinngangene på LIFEPAK 15.
2. Velg 60 bpm normal sinusrytme på simulatoren.
3. Trykk **SYNC** på LIFEPAK 15. Bekreft at enheten markerer R-bølger med et synkroniseringsmerke på displayet.
4. Velg **5 J**. Lad enheten. Trykk **Sjokk**.
5. Testeren vil registrere synkroniseringsforsinkelsen (tid fra R-bølgetopp til sjokklevering).
6. **Akseptkriterium:** Sync-forsinkelse ≤ 60 ms (IEC 60601-2-4 §201.12.4.3).

#### 2.4 Pacemakerkarakteristikk-test

1. Aktiver pacemakeren på LIFEPAK 15. Sett rate til **70 ppm** og utgang til **20 mA**.
2. Velg **PACER**-modus på Fluke Impulse 7000DP, og still inn pacerlasten som anvist — lasten er valgbar, og avlesningene betyr ingenting uten den.
3. Registrer følgende fra testerens display:
   - Pacerlast som er brukt (Ω)
   - Målt rate (ppm)
   - Pulsbredde (ms)
   - Amplitude (mA)
4. **Akseptkriterier:** Rate innenfor ±5 % av innstilt verdi; pulsbredde **20 ms**, innenfor toleransen som er oppgitt i LIFEPAK 15-servicemanualen — pacepulsen fra LIFEPAK 15 er en rektangulær konstantstrømpuls med fast bredde, så en avlesning i nærheten av 40 ms er en feil, ikke en godkjent verdi; amplitude innenfor ±10 % av innstilt verdi (verifiser mot spesifikasjonene i LIFEPAK 15-servicemanualen). Oppgi pacerlasten sammen med hver avlesning.

---

### Del 3 — Defibrillatorbølgeform-utgangstest (45 min)

Denne prosedyren følger «Test and Calibration Procedures» i LIFEPAK 15-servicemanualen (side 203–205).

**3.1 Oscilloskop-oppsett**

Bekreft at Keysight InfiniiVision er konfigurert:
- Kobling: DC
- Vertikal skala: still inn etter første utladning slik at bølgeformen fyller 60–80 % av skjermen — riktig innstilling avhenger av hvilket forhold analysatorens Scope Output bruker, så dette er ikke volt målt ved terapitilkoblingen
- Tidsskala: 2 ms/div
- Trigger: flanketrigger på stigende flanke av bølgeformen; nivå på ca. 10 % av forventet toppamplitude på BNC-en

**3.2 Bølgeformopptak**

1. Med terapikabelen koblet til Fluke Impulse 7000DP (50 Ω last), velg **360 J** på LIFEPAK 15. Dette er den eneste delen av labøvelsen som bruker høy energi: grenseverdiene fra servicemanualen i 3.3 gjelder ved maksimal energi. Ved 5 J ville toppspenningen vært bare ca. 235 V og toppstrømmen ca. 4,7 A over 50 Ω — langt under 35 A – 42 A i tabellen — så tabellen kan ikke kontrolleres ved 5 J.
2. Sett oscilloskopet i **Single**-modus (enkeltopptak) slik at det fanger den enkeltstående utladningen.
3. Lad apparatet og lad det ut i testeren. Noter levert energi som analysatoren viser: ved 360 J er det ±15 %-leddet som gjelder, så det akseptable området er **306 J – 414 J**.
4. Juster vertikal skala slik at bølgeformen fyller ca. 60–80 % av displayet, og gjenta opptaket hvis den første kurven ble klippet eller for liten. Still energivelgeren tilbake til 5 J når Del 3 er ferdig.

**3.3 Bølgeformanalyse**

Registrer følgende målinger fra oscilloskopets display eller automatiske målefunksjoner. Bruk markører eller innebygde måleverktøy for å bestemme toppstrøm (I = V / 50 Ω) og pulsbredder.

| Parameter | Din verdi | Min (servicemanual) | Maks (servicemanual) |
|---|---|---|---|
| Fase 1 toppstrøm (A) | | 35 A | 42 A |
| Fase 1 pulsbredde (ms) | | 6,9 ms | 7,8 ms |
| Fase 2 pulsbredde (ms) | | 4,5 ms | 5,4 ms |
| Fase 1 toppspenning (V) | | — | — |
| Fase 2 toppspenning (V) | | — | — |
| Total bølgeformvarighet (ms) | | — | — |

> **Merk:** Toppstrømmen beregnes fra toppspenningen ved terapitilkoblingen ved bruk av Ohms lov og 50 Ω testlast: I = V / 50 Ω. Husk å multiplisere spenningen du leser av på oscilloskopet med forholdet analysatorens Scope Output bruker, før du bruker den her. For eksempel tilsvarer en toppspenning på 1900 V en strøm på 38 A.

**3.4** Verifiser at dine målte verdier faller innenfor spesifikasjonene fra servicemanualen i tabellen over. Hvis en parameter er utenfor området, noter det i labnotatboken og vær forberedt på å forklare de mest sannsynlige årsakene når du legger fram resultatene muntlig for labingeniøren.

**3.5** Skisser den registrerte bølgeformen i labnotatboken, og merk Fase 1, Fase 2, polaritetsreverseringspunktet og avskjæringspunktet.

---

### Del 4 — Diskusjonsspørsmål (15 min)

Svar på følgende spørsmål i labnotatboken. Du vil diskutere svarene dine med gruppen på slutten av øvelsen.

1. IEC 60601-2-4 krever at levert energi skal være innenfor ±15 % av valgt energi, eller ±4 J — det som er størst. Hvorfor er energinøyaktighet klinisk viktig — hva kan skje hvis en defibrillator konsekvent leverer vesentlig mindre energi enn valgt?

2. Forklar hvorfor bifasiske bølgeformer foretrekkes fremfor monofasiske bølgeformer for defibrillasjon. Referer til minst én fysiologisk mekanisme i svaret ditt.

3. Du observerer at Sync-forsinkelsen målt i Del 2.3 er 85 ms. Består dette IEC 60601-2-4-kravet eller ikke? Hva er de potensielle kliniske konsekvensene av en forlenget sync-forsinkelse?

4. LIFEPAK 15-padsene er klassifisert som Type CF applikasjonsdel. Hva betyr CF-betegnelsen, og hvordan skiller den seg fra Type BF? Hvordan skiller grensene for pasientlekkasjestrøm seg mellom CF og BF?

5. En klinisk ingeniør utfører årlig PM på en defibrillator og finner at ladetiden ved maksimal energi har økt fra 8 s (registrert i fjor) til 13 s. Produsentens spesifikasjon er ≤ 10 s. Hva er de to mest sannsynlige årsakene, og hvilke oppfølgingssteg vil du anbefale?

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Avlesningene dine for levert energi, ladetid, sync-forsinkelse og pacer fra Del 2, hver vurdert mot sitt akseptkriterium — inkludert hvilken pacerlast du brukte i 2.4
- Bølgeformopptaket ved 360 J fra Del 3.2, den utfylte måletabellen i 3.3 med toppstrømmen regnet ut fra toppspenningen, og den merkede skissen din fra 3.5
- Kontrollene, tilkoblingene og klassifiseringen av applikasjonsdel du identifiserte i Del 1, og hvordan du ville fulgt opp en parameter som falt utenfor grenseverdiene fra servicemanualen (3.4)
- Svarene dine på de fem diskusjonsspørsmålene i Del 4

Ingen skriftlig innlevering.
