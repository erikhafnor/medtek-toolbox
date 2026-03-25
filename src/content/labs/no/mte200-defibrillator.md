---
title: "Defibrillatorslab"
course: "MTE200"
description: "Betjening, testing og forebyggende vedlikehold av defibrillator"
equipment:
  - "LIFEPAK 15 (Stryker/Physio-Control)"
  - "Fluke Impulse 7000DP"
  - "Keysight InfiniiVision oscilloskop"
prerequisites:
  - "LIFEPAK 15 bruker- og servicemanualdokumentasjon"
  - "Fluke Impulse 7000DP dokumentasjon"
  - "Forelesningsnotater om defibrillasjon"
duration: "3 timer"
---

## Læringsmål

Etter denne labøvelsen skal du kunne:

- Identifisere de viktigste kontrollene, tilkoblingene og tilbehøret på LIFEPAK 15-defibrillatoren
- Betjene Fluke Impulse 7000DP defibrillatoranalysator for å gjennomføre en QUICK-COMBO-testsekvens
- Tolke resultater for energilevering opp mot akseptkriteriene i IEC 60601-2-4
- Utføre en bifasisk bølgeformtest med oscilloskop og beskrive sammenhengen mellom bølgeformen og standarden
- Anvende sikker arbeidspraksis ved håndtering av høyspennings testutstyr

---

## Sikkerhetsmerknader

> **HØYSPENNINGSFARE.** LIFEPAK 15 lader kondensatoren til flere hundre volt. Koble alltid enheten til den godkjente defibrillatortesteren før lading. Lad aldri enheten med pads eller padler frakoblet fra en last. Hold andre personer unna testbenken under utladning.

- Ikke berør QUICK-COMBO-konnektor-pinnene mens enheten er ladet.
- Kontroller at defibrillatortesteren er jordet og at ledningene er rangert for utladningsenergien som brukes.
- Bruk isolerende hansker når du kobler oscilloskopproben over testerens utgangsterminaler.
- Hvis du observerer røyk, uvanlig lukt eller gnister: trykk umiddelbart på sjokkknappen for å lade ut kondensatoren trygt i testeren, slå deretter av og varsle den veiledende teknikeren.
- Alle tester i dette laboratoriet gjennomføres ved **5 J** med mindre prosedyren eksplisitt angir noe annet.

---

## Oppsett av utstyr

1. Plasser LIFEPAK 15 på benken med frontpanelet vendt mot deg. Inspiser kabinettet for fysisk skade og kontroller at alle koblinger er til stede og uskadet.
2. Koble QUICK-COMBO-terapikabelen fra LIFEPAK 15 til Fluke Impulse 7000DP (bruk 50 Ω-inngangen — **DEFIB**-porten).
3. Slå på Fluke Impulse 7000DP og velg **DEFIB**-modus. Verifiser at testeren viser klar tilstand.
4. Slå på LIFEPAK 15. La den fullføre oppstartsselvtestsekvensen. Noter eventuelle feilmeldinger i labnotatboken.
5. Koble til Keysight oscilloskopet: fest 10× spenningproben over **DEFIB OUT** BNC-terminalene på Fluke Impulse 7000DP. Sett tidsskalaen til 2 ms/div og vertikal skala til 200 V/div som startpunkt.

---

## Prosedyre

### Del 1 — Gjennomgang av kontroller og tilbehør (30 min)

**1.1** Med utgangspunkt i LIFEPAK 15 Quick Reference Card og frontpanelet, finn og noter funksjonen til hvert av følgende i labnotatboken din:

- Energivalgbryter
- Ladeknapp og indikatorlys
- Sjokkknapp
- SYNC-modus-knapp
- Pacemaker-rate og utgangskontrroller
- SpO₂ / NIBP / CO₂ konnektorporter
- QUICK-COMBO-terapikobling
- Dataport (USB / Ethernet)

**1.2** Identifiser den applikasjonsdeltypes klassifisering for QUICK-COMBO-padsene. Registrer om de er klassifisert som Type B, BF eller CF og forklar hvorfor denne klassifiseringen er viktig for hjertepasienter.

**1.3** Noter produksjonsår og programvare-/fastvareversjon vist på enhetens statusskjerm. Dette trengs når du søker etter servicebulletiner.

---

### Del 2 — Fluke Impulse 7000DP QUICK-COMBO-testsekvens (60 min)

Utfør følgende tester i rekkefølge. For hver test, registrer valgt innstilling, testerens avlesning og om resultatet oppfyller akseptkriteriet. Bruk **5 J** for alle utladningstester.

#### 2.1 Levert energitest

1. Velg **5 J** på LIFEPAK 15.
2. Trykk **Lad**. Vent på klar-tonen.
3. Trykk **Sjokk** (inn i testeren — ikke rør padler).
4. Les av levert energi fra Fluke Impulse 7000DP-displayet.
5. **Akseptkriterium:** Levert energi innenfor ±15% av valgt energi (IEC 60601-2-4 §201.7.9.3). For 5 J er det akseptable området **4,25 J – 5,75 J**.
6. Gjenta tre ganger og registrer alle resultater. Beregn gjennomsnitt og standardavvik.

#### 2.2 Ladetidstest

1. Velg **5 J** på LIFEPAK 15.
2. Trykk **Lad** og start et stoppeklokke samtidig (eller bruk testerens innebygde timer hvis tilgjengelig).
3. Stopp timeren når enheten signaliserer klar.
4. **Akseptkriterium:** Ladetid ≤ produsentens spesifikasjon. For LIFEPAK 15 ved 5 J skal enheten lade på under 3 s fra fullt batteri.
5. Gjenta tre ganger og registrer hver ladetid.

#### 2.3 Synkronisert kardioversjon (Sync) test

1. Koble EKG-simulator-utgangen (bruk Fluke Impulse 7000DP sin innebygde EKG-kilde, eller labens pasient-simulator) til EKG-ledningsinngangene på LIFEPAK 15.
2. Velg 60 bpm normal sinusrytme på simulatoren.
3. Trykk **SYNC** på LIFEPAK 15. Bekreft at enheten markerer R-bølger med et synkroniseringsmerke på displayet.
4. Velg **5 J**. Lad enheten. Trykk **Sjokk**.
5. Testeren vil registrere synkroniseringsforsinkelsen (tid fra R-bølgetopp til sjokklevering).
6. **Akseptkriterium:** Sync-forsinkelse ≤ 60 ms (IEC 60601-2-4 §201.12.4.3).

#### 2.4 Pacemakerkarakteristikk-test

1. Aktiver pacemakeren på LIFEPAK 15. Sett rate til **70 ppm** og utgang til **20 mA**.
2. Velg **PACER**-modus på Fluke Impulse 7000DP.
3. Registrer følgende fra testerens display:
   - Målt rate (ppm)
   - Pulsbredde (ms)
   - Amplitude (mA)
4. **Akseptkriterier:** Rate innenfor ±5% av innstilt verdi; pulsbredde 20–40 ms; amplitude innenfor ±10% av innstilt verdi (verifiser mot LIFEPAK 15 service manual-spesifikasjoner).

---

### Del 3 — Defibrillatorbølgeform-utgangstest (45 min)

Denne prosedyren følger bølgeformverifiseringen beskrevet i LIFEPAK 15 service manual.

**3.1 Oscilloskop-oppsett**

Bekreft at Keysight InfiniiVision er konfigurert:
- Kobling: DC
- Vertikal skala: 200 V/div (juster etter første utladning)
- Tidsskala: 2 ms/div
- Trigger: flanketrigger på stigende flanke av bølgeformen; nivå ved ca. +50 V

**3.2 Bølgeformopptak**

1. Med terapikabelen koblet til Fluke Impulse 7000DP (50 Ω last), velg **5 J** på LIFEPAK 15.
2. Lad og lad ut enheten.
3. Ta opp bølgeformen på oscilloskopet. Bruk **Enkelt**-akkvisisjons-modus for å fange en enkelthendelses-event.
4. Juster vertikal skala slik at bølgeformen fyller ca. 60–80% av displayet.

**3.3 Bølgeformanalyse**

Registrer følgende målinger fra oscilloskopets display eller automatiske målefunksjoner:

| Måling | Din verdi | Forventet (bifasisk avkuttet eksponentiell) |
|---|---|---|
| Fase 1 topppenning (V) | | Positiv, høyere amplitude |
| Fase 1 varighet (ms) | | Typisk 6–12 ms |
| Fase 2 topppenning (V) | | Negativ, lavere amplitude enn fase 1 |
| Fase 2 varighet (ms) | | Typisk 4–8 ms |
| Total bølgeformvarighet (ms) | | Typisk < 20 ms |

**3.4** Skisser den registrerte bølgeformen i labnotatboken, og merk Fase 1, Fase 2, polaritetsreverseringspunktet og avskjæringspunktet.

---

### Del 4 — Diskusjonsspørsmål (15 min)

Svar på følgende spørsmål i labnotatboken. Du vil diskutere svarene dine med gruppen på slutten av øvelsen.

1. IEC 60601-2-4 krever at levert energi skal være innenfor ±15% av valgt energi. Hvorfor er energinøyaktighet klinisk viktig — hva kan skje hvis en defibrillator konsekvent leverer vesentlig mindre energi enn valgt?

2. Forklar hvorfor bifasiske bølgeformer foretrekkes fremfor monofasiske bølgeformer for defibrillasjon. Referer til minst én fysiologisk mekanisme i svaret ditt.

3. Du observerer at Sync-forsinkelsen målt i Del 2.3 er 85 ms. Oppfyller dette eller ikke IEC 60601-2-4-kravet? Hva er de potensielle kliniske konsekvensene av en forlenget sync-forsinkelse?

4. LIFEPAK 15-padsene er klassifisert som Type CF applikasjonsdel. Hva betyr CF-betegnelsen, og hvordan skiller den seg fra Type BF? Hvordan skiller grensene for pasient-lekkasjestrøm mellom CF og BF?

5. En klinisk ingeniør utfører årlig PM på en defibrillator og finner at ladetiden ved maksimal energi har økt fra 8 s (registrert i fjor) til 13 s. Produsentens spesifikasjon er ≤ 10 s. Hva er de to mest sannsynlige årsakene, og hvilke oppfølgingssteg vil du anbefale?

---

## Krav til labrapporten

Send inn en maskinskrevet labrapport innen datoen angitt i timeplanen. Rapporten skal inneholde:

- En tittelside med navn, studentnummer, emnenummer og dato
- En utfylt resultattabell for alle målinger i Del 2 og Del 3
- Oscilloskopbølgeformspor (eksportert bilde eller tydelig foto) med alle målinger annotert
- Skriftlige svar på de fire diskusjonsspørsmålene (Del 4)
- En kort konklusjon (200–300 ord) der du diskuterer om enheten som ble testet oppfyller spesifikasjonene og de klinisk ingeniørfaglige implikasjonene av funnene dine
- En referanseliste med henvisninger til IEC 60601-2-4-standarden, LIFEPAK 15 service manual og alle andre kilder som er brukt
