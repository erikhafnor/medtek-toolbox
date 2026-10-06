---
title: "3D-rekonstruksjon og printing"
course: "MTE210"
shortTitle: "3D-rekonstruksjon"
description: "Segmentering av et CT-volum i 3D Slicer, eksport av en vanntett STL og 3D-printing av det skjulte objektet fra CT-avbildningslabben"
equipment:
  - "Lab-PC med 3D Slicer"
  - "FDM-basert 3D-printer (skrivebordsmodell)"
  - "Det rekonstruerte CT-volumet fra CT-avbildning og stråling"
  - "Tilgang til kurs-PACS-en (referansestudien hentes derfra)"
prerequisites:
  - "Fullført CT-avbildning og stråling, med din eksporterte snittstabel"
  - "3D Slicer installert på lab-PC-en"
  - "Innlogging til kurs-PACS-en, utdelt av labansvarlig"
duration: "2 timer 45 minutter"
---

> **Denne labben er en fortsettelse av CT-avbildning og stråling.** Ta med det rekonstruerte volumet du tok opp der — delnummereringen fortsetter derfra, så stegene under starter på del 4.

## Læringsmål

Etter denne laboratorieøvelsen skal du kunne:

- Eksportere et rekonstruert volum og importere det som en bildestabel i 3D Slicer med riktig voxelavstand
- Hente et CT-volum fra en PACS med DICOM query/retrieve, og gjøre rede for hvorfor et DICOM-objekt bærer sin egen geometri når en vanlig bildestabel ikke gjør det
- Segmentere en struktur av interesse ved gråverdi-terskling, generere en 3D-overflatemodell og eksportere en tett (vanntett) STL-fil
- Skille mellom etterbehandling som endrer måleresultatet og etterbehandling som bare endrer visningen, og tallfeste hva hvert steg koster
- Klargjøre og 3D-printe det segmenterte objektet, og vurdere hvordan valg ved opptak og segmentering påvirker den ferdige utskriften

---

## Sikkerhetsmerknader

- **3D-printer:** dysen og byggeplaten er varme under og etter printing. Bruk printeren kun som anvist, hold hendene unna bevegelige deler, og la utskrifter kjøle seg ned før du tar dem av.
- Ikke la en utskrift gå uten tilsyn med mindre labveilederen har godkjent det.

---

## Oppsett av utstyr

Denne labben kjøres på en lab-PC med **3D Slicer** og en FDM-basert **3D-printer**. Ingen røntgen er involvert: du arbeider ut fra volumet gruppa di rekonstruerte i CT-avbildningslabben.

1. Kopier den eksporterte snittstabelen over på lab-PC-en, og hold hele stabelen i én tom mappe.
2. Bekreft at **3D Slicer** starter, og at 3D-printeren har strøm, er nivellert og har filament.
3. Ha **voxelavstanden** du noterte i avbildningslabben (del 3.3) for hånden — du trenger den i del 4.2, og utskriften får feil størrelse uten den.
4. Åpne modulen **DICOM** i 3D Slicer én gang og bekreft at den starter uten feilmeldinger. Ser du `Driver not loaded` eller `database not open` i Python-konsollen, får Slicer ikke åpnet sin lokale DICOM-database, og del 4.3 vil feile etter at søket har gått igjennom. Si fra til labansvarlig før du går videre.

---

## Prosedyre

### Del 4 — Segmentering i 3D Slicer (80 min)

Du arbeider med **to** volumer i denne delen: ditt eget fra CT-avbildningslabben, og en felles referansestudie som ligger i kurs-PACS-en. Samme metode, to ulike valnøtter. At de to ikke gir samme tall er ikke en feil — det er målet med del 4.5.

**4.1 Kontroller din egen snittstabel.** Du eksporterte det rekonstruerte volumet på slutten av CT-avbildningslabben (del 3.3), så begynn med å bekrefte at hele stabelen ligger i én tom mappe på lab-PC-en, og at snittene lar seg åpne. Har du aldri eksportert den, eller er stabelen ufullstendig, gå tilbake til measureCT-PC-en og eksporter den nå med **Volview**-eksporten / lagre-bilde-funksjonen, som gir en bmp-snittserie.

> **Bruk bmp-eksporten, ikke tiff-filene measureCT legger i `raw/reconstruction`.** De tiff-filene har ugyldige oppløsningstagger — `XResolution` og `YResolution` lagres som brøken 1000000/0 — og 3D Slicer avviser hele serien med «load failed» allerede på første fil. Pikseldataene er i orden; det er taggene som er ødelagte. Dette er en feil i measureCT, og et nyttig eksempel på at en fil kan være lesbar for ett program og ubrukelig for et annet.

**4.2 Importer ditt eget volum i 3D Slicer.** Åpne **3D Slicer** på lab-PC-en. Dra mappen med snittbilder inn i Slicer-vinduet (eller bruk *Add Data*), og last serien **som et volum / en bildestabel**. Siden de eksporterte bildene ikke inneholder skalainformasjon, må du sette **voxelavstanden manuelt** til verdien measureCT oppga og du noterte i avbildningslabben (del 3.3): med geometrien og binningen som ble brukt der er det den binnede detektorpitchen delt på forstørrelsen, 0,096 mm ÷ 1,2 = **0,080 mm per voxel** i alle tre retninger. Bruk tallet measureCT oppga framfor dette hvis de to ikke stemmer. Riktig avstand er det som gjør at den ferdige 3D-utskriften får riktig fysisk størrelse.

**4.3 Hent referansestudien fra PACS.** 3D Slicer har en innebygd DICOM-klient. Åpne modulen **DICOM**, fold ut **DICOM networking**, og legg inn serveren:

| Felt | Verdi |
|---|---|
| Host | `pacs.ux.uis.no` |
| Port | ⟨fylles inn av labansvarlig⟩ |
| Called AE title | `DCM4CHEE` |
| Calling AE title | ⟨fylles inn av labansvarlig⟩ |
| Retrieve-protokoll | C-GET |

Søk opp studien på **Patient ID `XR40-CT1`** eller **Accession `MTE210-CT1`**, merk serien og hent den. Du skal få én studie med én serie på **460 snitt**.

> Legg merke til at du **ikke** trenger å sette voxelavstanden for denne serien. Din egen stabel er vanlige bildefiler uten skalainformasjon, mens DICOM-objektet bærer sin egen geometri i taggene `PixelSpacing` og `SliceThickness`. Dette er hele poenget med en bildestandard i et sykehusnett: mottakeren skal ikke måtte få vite utenom filen hvor stor en piksel er. Sammenlign med hvordan du måtte behandle din egen stabel i del 4.2.

**4.4 Segmenter tannen.** Gjør dette på **begge** volumene. Åpne modulen **Segment Editor**, opprett en segmentering og legg til et segment kalt `tann`.

1. **Terskle.** Velg effekten **Threshold** og dra den nedre grensen oppover til kun den lyse, tette tannen er markert og nøtten rundt er utelatt. Ikke let etter ett riktig tall — let etter **platået**: hev terskelen i steg og se på hvor mye som er markert. Over et visst punkt endrer det seg knapt, og under det punktet flommer nøtteskallet plutselig inn. Et sted midt på platået er et robust valg. For referansestudien ligger platået omtrent mellom **18 000 og 30 000**; der gir hele intervallet samme objekt innenfor 15 %, mens 15 000 tar med skallet og mangedobler volumet. Ditt eget opptak har andre tall — finn ditt eget platå på samme måte. Klikk Apply.

2. **Fjern løse flekker.** Velg effekten **Islands** → ***Remove small islands***, sett *Minimum size* til **100 voksler** og klikk Apply. Dette fjerner frittliggende støyflekker og rører ikke selve tannen.

   > Bruk ikke *Keep largest island* her, selv om den er fristende. I referansestudien finnes det ved siden av tannen tre–fire sammenhengende biter på til sammen omtrent 2 mm³ — rundt 4 % av objektet. *Keep largest island* ville slettet alle sammen uten å si fra, og du ville sittet igjen med et rent resultat og ingen anelse om hva som forsvant.

3. **Vurder det som er igjen.** Etter steg 2 har du tannen pluss noen få biter. De er for store til å avfeies som støy og for små til å antas å være tann. Bla til dem i snittvinduene og se: er det avskallede biter av tannen, tette innslag i nøtteskallet, eller noe annet? Noter hva du beholdt, hva du fjernet, og hvorfor. Dette er en faglig vurdering, ikke en knapp.

4. **Vis i 3D.** Slå på ***Show 3D*** og inspiser tannen fra alle vinkler. Klikk i 3D-vinduet og trykk `r` for å tilpasse visningen; `Ctrl` + rullehjul zoomer.

> **Tre verktøy som alle ser ut som «utglatting», og som gjør helt ulike ting:**
>
> | Verktøy | Virker på | Endrer måleresultatet? |
> |---|---|---|
> | **Islands** | frittliggende komponenter | ja, men bare hele biter om gangen |
> | Effekten **Smoothing** | selve segmenteringen (labelmap) | **ja** |
> | **Show 3D** → *Smoothing factor* | kun 3D-visningen | **nei** |
>
> Ujevnheter som **henger fast** i hovedkroppen kan *Islands* per definisjon ikke fjerne. Det er en vanlig misforståelse, og verdt å prøve selv: kjør *Remove small islands* og se at den ru overflaten blir stående.

**4.5 Mål, og tallfest hva etterbehandlingen koster.** Åpne modulen **Segment Statistics** og slå på både tillegget **Labelmap** og tillegget **Closed surface**. Hver av dem oppgir sin egen `Volume mm3`: den ene regnet ut fra antall voksler, den andre fra overflatemodellen. Dokumentasjonen til Slicer sier at de to skal ligge mindre enn én prosent fra hverandre.

Still *Smoothing factor* i **Show 3D** til tre ulike verdier og fyll ut tabellen for begge volumene:

| Smoothing factor | Volum fra labelmap | Volum fra overflate | Avvik |
|---|---|---|---|
| 0,5 (standard) | | | |
| 0,1 | | | |
| 0 | | | |

Kolonnen for labelmap skal ikke røre seg — visningsutglatting rører aldri dataene. Kolonnen for overflaten vil det. Noter ved hvilken verdi avviket passerer én prosent.

Sammenlign så de to tannene: ditt eget volum mot referansestudien. De er ulike tenner, så tallene skal ikke være like — men diskuter i gruppa hvor stor del av forskjellen som er tennene, og hvor stor del som er dere to gruppene som valgte terskel hver for dere.

> Vær oppmerksom på at verdiene i disse volumene **ikke er Hounsfield-enheter**. En klinisk CT kalibreres slik at luft er −1000 HU og vann 0 HU; benkeskanneren er ikke kalibrert, så gråverdiene er vilkårlige tall som bare kan sammenlignes innenfor ett og samme opptak. Terskelen du fant gjelder derfor ikke for noen andres skanning.

**4.6 Eksporter en STL.** I modulen **Segmentations** (eller høyreklikk på segmenteringen i *Data*), velg *Export to files* og lagre som **STL**. Bekreft at modellen er **vanntett** (en lukket overflate) slik at den kan printes.

> **Modellen du måler og modellen du printer er ikke den samme modellen.** Overflaten rett fra tersklingen er ru på voxelnivå, og det gir strenger og stygge detaljer på en FDM-utskrift. Til printing er det derfor rimelig å kjøre effekten **Smoothing** → *Median* med minste kjerne (0,24 mm, altså 3 voksler) — den koster under én prosent av volumet, og dokumentasjonen beskriver den som den som «fjerner små utstikkere og fyller små hull, og lar glatte konturer stå mest mulig urørt». Men gjør det på en **kopi**: volumet du oppgir i del 4.5 skal komme fra den ubehandlede segmenteringen. Si i gjennomgangen hvilken modell som er hvilken. Dette går galt i ekte klinisk 3D-printing hele tiden.

> Hvis tannen blir hul eller full av hull, var terskelen for høy eller utglattingen for aggressiv — gå tilbake til steg 4.4 og juster.

---

### Del 5 — 3D-printing (30 min + printetid)

**5.1** Åpne STL-filen — print-kopien fra del 4.6 — i printerens slicer-programvare (f.eks. Cura eller PrusaSlicer). Kontroller at dimensjonene stemmer med målingen din fra CT-avbildningslabben (del 3.4) — hvis ikke, var voxelavstanden i del 4.2 feil. Printer du referansestudien framfor ditt eget opptak, husk at den er en annen tann enn den du målte.

**5.2** Orienter modellen for printing, legg til støtter om nødvendig, og slice med innstillingene som anbefales for lab-printeren din. En liten laghøyde (f.eks. 0,1–0,15 mm) fanger fine detaljer på et lite objekt som en tann.

**5.3** Start utskriften. En tann med 0,1–0,15 mm laghøyde tar typisk én til tre timer — altså mye lenger enn resten av økten — så avtal med labveilederen før du starter: hvem som holder øye med printeren, og når du kan hente utskriften. La den aldri gå uten at noen er til stede. Mens de første lagene printes, fullfør repetisjonsspørsmålene. Du får beholde utskriften din.

---

### Del 6 — Repetisjonsspørsmål (15 min)

Besvar i labboken; du skal diskutere dem med gruppen og med labingeniøren.

1. Forklar forskjellen mellom **rørspenning (kV)** og **rørstrøm (mA)** og hvordan hver påvirker bildekontrast, bildestøy og dose.
2. Hvorfor er **antall projeksjoner** viktig? Hva ville du forvente å se i rekonstruksjonen hvis du brukte langt færre projeksjoner?
3. Hva er **rotasjonssenteret**, og hvilket artefakt oppstår i snittene når det er satt feil?
4. Du eksporterte vanlige bildefiler uten skalainformasjon og måtte sette **voxelavstanden** manuelt i 3D Slicer, mens serien du hentet fra PACS satte seg selv riktig. Hva er det DICOM-filen bærer med seg som bmp-filene ikke gjør, og hva går galt med 3D-utskriften hvis du setter verdien feil?
5. Angi de tre søylene i **ALARA** og gi ett konkret eksempel på hver — først for dette benkekabinettet, deretter for en klinisk CT-undersøkelse.
6. Det skjulte objektet rekonstrueres mye **lysere** enn nøtten rundt. Forklar, ut fra røntgenattenuasjon, hvorfor et tett objekt fremstår slik.
7. Gråverdiene i dette volumet er **ikke Hounsfield-enheter**. Hva måtte vært gjort med skanneren for at de skulle vært det, og hvorfor kan du da ikke oppgi terskelen din som en verdi andre grupper kan bruke direkte?
8. Zoom inn på innsiden av tannen. Store områder er **helt jevnt hvite**, uten struktur. Dette er ikke fordi tannen er homogen — verdiene har truffet taket på 65 535 og blir klippet. Hva betyr det for muligheten til å si noe om tetthetsforskjeller *inni* tannen, og hvilken opptaksparameter ville du endret for å unngå det?
9. I del 4.4 fjernet du rundt 125 småflekker på til sammen ca. 0,1 mm³, men beholdt noen få biter på til sammen ca. 2 mm³. Hvordan avgjorde du hvor grensen gikk? Hva ville *Keep largest island* gjort med de bitene, og hvorfor ville du ikke oppdaget det?

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Voxelavstanden du satte og hvor verdien kom fra (del 4.2), og referansestudien hentet fra PACS — med en forklaring på hvorfor den ikke trengte samme behandling (del 4.3)
- Den segmenterte tannen i begge volumene, terskelen du endte på og hvordan du fant platået, og hvilke biter du beholdt eller forkastet i øy-steget og hvorfor (del 4.4)
- Den utfylte tabellen fra del 4.5, der du kan peke på hvilken kolonne som ikke rører seg og si hvorfor
- Den eksporterte STL-filen, der du viser at den er vanntett, og modellen slik du klargjorde den i slicer-programvaren, med dimensjonene kontrollert mot størrelsesanslaget ditt fra CT-avbildningslabben (del 4.6 og 5.1)
- Utskriften din — ferdig eller fortsatt i gang — og hvordan du valgte orientering, støtter og laghøyde (del 5.2 og 5.3)
- Svarene dine på repetisjonsspørsmålene i del 6, med egne ord

Ingen skriftlig innlevering.
