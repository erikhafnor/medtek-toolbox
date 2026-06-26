---
title: "CT-avbildning, stråling og 3D-rekonstruksjon"
course: "MTE210"
description: "CT-bildeopptak på en benkebasert røntgen-CT, strålevern, volumrekonstruksjon, segmentering i 3D Slicer og 3D-printing av et skjult objekt oppdaget inni prøveobjektet"
equipment:
  - "PHYWE XR 4.0 benkebasert røntgen-/CT-enhet (XRstage rotasjonsbord + XRIS-detektor)"
  - "measureCT opptaks- og rekonstruksjonsprogramvare"
  - "Lab-PC med 3D Slicer"
  - "FDM-basert 3D-printer (skrivebordsmodell)"
  - "Valnøtt som prøveobjekt (med et skjult tett objekt)"
prerequisites:
  - "Dokumentasjon for PHYWE XR 4.0 / measureCT"
  - "3D Slicer installert på lab-PC-en"
  - "Forelesningsnotater om røntgen-/CT-fysikk og strålevern (ALARA)"
duration: "4 timer"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du være i stand til å:

- Ta opp et fullstendig CT-datasett på den benkebaserte PHYWE XR 4.0-CT-en, og stille inn rørspenning (kV), rørstrøm (mA), eksponeringstid og antall projeksjoner
- Forklare hvordan en roterende serie av røntgenprojeksjoner rekonstrueres til tverrsnittsbilder, og justere rotasjonssenteret for å oppnå en skarp rekonstruksjon
- Anvende prinsipper for strålevern (ALARA, tid–avstand–skjerming, og avstandskvadratloven) og knytte parameterne for benkeskanningen til klinisk CT med tanke på dose og bildekvalitet
- Eksportere et rekonstruert volum og importere det som en bildestabel i 3D Slicer med riktig voxelavstand
- Segmentere en struktur av interesse ved gråverdi-terskling, generere en 3D-overflatemodell og eksportere en tett (vanntett) STL-fil
- Klargjøre og 3D-printe det segmenterte objektet, og vurdere hvordan valg ved opptak og segmentering påvirker den ferdige utskriften

---

## Sikkerhetsmerknader

> **LUKKET KABINETT.** PHYWE XR 4.0 er et fullstendig skjermet, typegodkjent røntgenkabinett. Røntgenstråling genereres kun når kammerdøren er lukket og sikkerhetsbryteren (interlock) er aktivert. Røntgenvarsellampen lyser når røret er i drift. **Forsøk aldri å forbikoble, tape over eller omgå dørbryteren.**

- Ikke åpne kammerdøren mens røntgenvarsellampen lyser. Å åpne døren kutter høyspenningen automatisk — ikke bruk dette som en rutinemessig «av»-bryter.
- Bekreft at varsellampen er **av** før du plasserer eller fjerner prøveobjektet.
- Hold dosen så lav som praktisk mulig (ALARA): kjør ikke røret lenger enn nødvendig, og slå av røntgenstrålingen mellom stegene.
- Meld umiddelbart fra til labansvarlig om skadede kabler, dører eller sikkerhetsbrytere. Ikke bruk en enhet der dørbryteren ikke fungerer.
- **3D-printer:** dyse og byggeplate er varme under og etter printing. Bruk printeren kun som anvist, hold hendene unna bevegelige deler, og la utskriften kjøle seg ned før du fjerner den.

---

## Oppsett av utstyr

Denne øvelsen bruker PHYWE XR 4.0 røntgenenhet med rotasjonsbordet **XRstage**, den digitale flatpanel-detektoren **XRIS** og programvaren **measureCT**, samt en lab-PC med **3D Slicer** og en FDM-basert **3D-printer**.

1. Koble rotasjonsbordet XRstage og detektoren XRIS til røntgenenheten, og koble begge til PC-en via USB. Start **measureCT**-programmet og aktiver programvaren (Options → Activation Assistant) hvis du blir bedt om det.
2. I live-visningen, bekreft at den grønne indikator-LED-en lyser for røntgenenheten, bordet og detektoren — dette betyr at hver komponent er registrert.
3. Monter prøveobjektet — en **valnøtt** — på rotasjonsbordet slik at det står sentrert i røntgenstrålen, omtrent midtveis mellom røret og detektoren. Lukk kammerdøren.

   ![Valnøtt montert på rotasjonsbordet XRstage, med XRIS-detektoren bak](/labs/ct-imaging/01-setup-walnut-stage.jpg)

4. Noter avstand kilde-til-objekt (**SOD**) og avstand kilde-til-detektor (**SDD**). I denne øvelsen bruker du **SOD = 250 mm** og **SDD = 300 mm**, som gir en geometrisk forstørrelse på SDD/SOD = 1,2×.

   ![Strålegeometri inni kammeret: røntgenkilde, rotasjonsbord med prøveobjekt og detektor](/labs/ct-imaging/02-chamber-geometry.jpg)

5. **Kalibrer detektoren** før du tar opp data: fjern alle objekter fra strålen (eller lukk døren med tomt bord), forsikre deg om at røntgenstrålingen er **slått av**, og klikk **Calibrate**. Kalibreringen måler detektorens offset og pikselvise forsterkning slik at de opptatte bildene korrigeres automatisk. Den røde LED-en på Calibrate-knappen blir grønn når kalibreringen lykkes.

> Kalibrer på nytt hver gang du endrer kV, mA, binning eller detektorposisjon — den forrige kalibreringen er da ikke lenger gyldig.

---

## Prosedyre

### Del 1 — Gjennomgang av strålevern og CT-fysikk (30 min)

Før du tar opp data, arbeid gjennom det følgende med gruppen din og noter korte svar i labboken.

Et CT-bilde bygges opp fra mange røntgen-**projeksjoner** tatt mens prøveobjektet roterer. Hver projeksjon registrerer hvor mye røntgenstrålen svekkes langs hver strålebane; rekonstruksjonsalgoritmen (filtrert tilbakeprojeksjon) kombinerer alle projeksjonene til en stabel av tverrsnitts-**snitt**, som til sammen utgjør et 3D-**volum**.

**1.1** To rørinnstillinger dominerer resultatet:

- **Rørspenning (kV)** styrer *energien* (gjennomtrengningsevnen) til røntgenstrålene og dermed bildekontrasten. Høyere kV trenger lettere gjennom tett materiale, men reduserer kontrasten mellom materialer.
- **Rørstrøm (mA)** styrer *antallet* røntgenfotoner (fluksen) og dermed bildestøyen. Høyere mA gir et renere, mindre støyete bilde, men øker dosen.

**1.2** Diskuter og noter: for en gitt bildekvalitet, hvilke tre handlinger fra operatøren reduserer stråleeksponeringen til mennesker? (Hint: **tid, avstand, skjerming**, og **avstandskvadratloven**.) Hvorfor er avstandskvadratloven så effektiv for avstand?

**1.3** XR 4.0 er et fullstendig innelukket kabinett, så operatørdosen er ubetydelig. En **klinisk** CT-skanner eksponerer pasienten direkte. Til sammenligning, noter typiske effektive doser: en CT av hodet gir omtrent 2 mSv og en CT av thorax omtrent 5–7 mSv, mot en naturlig bakgrunnsstråling på cirka 3 mSv per år. Hvorfor gjelder det samme ALARA-prinsippet fortsatt i klinikken, og hvem beskyttes der?

---

### Del 2 — CT-opptak (45 min)

**2.1** Slå på røntgenstrålingen og åpne **Live view**. Plasser prøveobjektet og juster kontrasten slik at valnøtten er tydelig synlig. Følg med på **detektorens eksponerings-/belastningsindikator**: den må holde seg **under** maksimalt fyllingsnivå. Hvis den blir rød, mettes detektoren — reduser mA eller eksponeringstid.

**2.2** Still inn opptaksparameterne. Disse verdiene gir gode resultater for en valnøtt på denne enheten:

| Parameter | Verdi |
|---|---|
| Rørspenning | 35 kV |
| Rørstrøm | 1,0 mA |
| Eksponeringstid | 0,5 s |
| Bilder (midlet) | 1 |
| Binning | 500 × 500 |
| Antall projeksjoner | 200 |
| Vinkelområde | 360° |
| SOD / SDD | 250 mm / 300 mm |

**2.3** Se nøye på live-projeksjonen av valnøtten. **Du skal se et tett objekt skjult inni skallet** — det absorberer mer røntgenstråling enn nøttekjøttet og fremstår mørkere på projeksjonen. Noter i labboken hva du tror det er og hvorfor det ser ut som det gjør.

![measureCT-opptakssiden: den roterende projeksjonen av valnøtten (venstre) avslører et tett objekt inni skallet](/labs/ct-imaging/03-measureCT-acquisition.jpg)

**2.4** Gå til **CT Scan**-siden og start skanningen. Programvaren viser skannefremdriften, den gjeldende projeksjonen og en live forhåndsvisning av rekonstruksjonen. La alle 200 projeksjonene fullføres.

![Projeksjon av valnøtten under skanningen — det tette, skjulte objektet er tydelig synlig, med et forhåndsvisningssnitt under](/labs/ct-imaging/04-projection-hidden-object.jpg)

---

### Del 3 — Rekonstruksjon (30 min)

**3.1** Gå til **Reconstruction**-siden. Den viktigste parameteren er **rotasjonssenteret (Centre of Rotation, COR)**. Hvis det er feil, blir snittene uskarpe eller viser doble kanter.

**3.2** Klikk **Test** for å rekonstruere ett enkelt snitt. Juster COR-verdien (start nær 254 for 500 × 500 binning) og test på nytt til snittet ser skarpt ut — skarpe kanter, ingen dobling, det skjulte objektet godt definert.

**3.3** Når et testsnitt er skarpt, klikk **Reconstruct** for å rekonstruere hele volumet.

**3.4** Åpne **3D View**. Inspiser volumet i snittvinduene for aksial, sagittal og koronal retning samt i 3D-gjengivelsen. Identifiser det skjulte objektet i alle tre snittretninger og anslå størrelsen i millimeter.

![3D-viewer: aksiale, sagittale, koronale snitt og en 3D-gjengivelse av den skannede valnøtten](/labs/ct-imaging/05-3d-viewer.png)

Det tette objektet inni valnøtten er en **menneskelig tann** — målet ditt for segmentering og 3D-printing. I et rekonstruert tverrsnitt skiller den seg tydelig ut, lys mot den mye mindre tette nøtten:

![Tverrsnitt fra rekonstruksjonen — det lyse, tette skjulte objektet inni valnøttskallet](/labs/ct-imaging/06-transverse-hidden-object.png)

---

### Del 4 — Eksport og segmentering i 3D Slicer (45 min)

**4.1 Eksporter volumet.** I measureCT, eksporter det rekonstruerte volumet som en stabel av snittbilder (bruk **Volview**-eksporten / lagre-bilde-funksjonen for å generere bmp-snittserien, eller lagre de rekonstruerte snittene til en mappe). Lagre hele stabelen i én tom mappe.

**4.2 Importer i 3D Slicer.** Åpne **3D Slicer** på lab-PC-en. Dra mappen med snittbilder inn i Slicer-vinduet (eller bruk *Add Data*), og last serien **som et volum / en bildestabel**. Siden de eksporterte bildene ikke inneholder skalainformasjon, må du sette **voxelavstanden manuelt**: denne skanningen rekonstruerer med **0,096 mm per voxel** i alle tre retninger. Riktig avstand er det som gjør at den ferdige 3D-utskriften får riktig fysisk størrelse.

**4.3 Segmenter tannen.** Åpne modulen **Segment Editor**.

1. Opprett en ny segmentering og legg til et segment kalt `tann`.
2. Velg effekten **Threshold**. Dra den nedre terskelen oppover til kun den lyse, tette tannen er markert og den omkringliggende nøtten er utelatt. Klikk Apply.
3. Bruk effekten **Islands** → *Keep largest island* for å fjerne løse flekker, deretter effekten **Smoothing** (median eller en liten Gaussisk) for å glatte ut overflaten.
4. Slå på 3D-visningen (*Show 3D*-knappen) for å inspisere den segmenterte tannen fra alle vinkler. Juster terskelen hvis deler mangler eller er sammensmeltet.

**4.4 Eksporter en STL.** Eksporter segmentet som en overflatemodell: i modulen **Segmentations** (eller høyreklikk på segmenteringen i *Data*), velg *Export to files* og lagre som **STL**. Bekreft at modellen er **vanntett** (en lukket overflate) slik at den kan printes.

> Hvis tannen blir hul eller full av hull, var terskelen for høy eller utglattingen for aggressiv — gå tilbake til steg 4.3 og juster.

---

### Del 5 — 3D-printing (30 min + printetid)

**5.1** Åpne STL-filen i printerens slicer-programvare (f.eks. Cura eller PrusaSlicer). Kontroller at dimensjonene stemmer med målingen din fra del 3.4 — hvis ikke, var voxelavstanden i del 4.2 feil.

**5.2** Orienter modellen for printing, legg til støtter om nødvendig, og slice med innstillingene som anbefales for lab-printeren din. En liten laghøyde (f.eks. 0,1–0,15 mm) fanger fine detaljer på et lite objekt som en tann.

**5.3** Print tannen. Du får beholde utskriften din. Mens den printes, fullfør repetisjonsspørsmålene.

---

### Del 6 — Repetisjonsspørsmål (15 min)

Besvar i labboken; du vil diskutere disse med gruppen.

1. Forklar forskjellen mellom **rørspenning (kV)** og **rørstrøm (mA)** og hvordan hver påvirker bildekontrast, bildestøy og dose.
2. Hvorfor er **antall projeksjoner** viktig? Hva ville du forvente å se i rekonstruksjonen hvis du brukte langt færre projeksjoner?
3. Hva er **rotasjonssenteret**, og hvilket artefakt oppstår i snittene når det er satt feil?
4. Du eksporterte vanlige bildefiler uten skalainformasjon og måtte sette **voxelavstanden** manuelt i 3D Slicer. Hva går galt med 3D-utskriften hvis denne verdien er feil, og hvordan ville du oppdaget feilen før printing?
5. Angi de tre søylene i **ALARA** og gi ett konkret eksempel på hver — først for dette benkekabinettet, deretter for en klinisk CT-undersøkelse.
6. Det skjulte objektet rekonstrueres mye **lysere** enn nøtten rundt. Forklar, ut fra røntgenattenuasjon, hvorfor et tett objekt fremstår slik.

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode (MTE210) og dato
- Opptaksparameterne du brukte (del 2.2) og et merket projeksjonsbilde av prøveobjektet
- En kort beskrivelse av hvordan du justerte **rotasjonssenteret**, med før/etter-snittbilder som viser effekten
- Rekonstruerte snittbilder (aksial, sagittal, koronal) som identifiserer det skjulte objektet, med ditt størrelsesanslag
- En beskrivelse av **3D Slicer-segmenteringen** din, inkludert terskelvalget ditt og et skjermbilde av 3D-modellen
- **Voxelavstanden** du satte og de endelige printede dimensjonene, med en kommentar om de stemte overens
- Et bilde av den ferdige 3D-utskriften din
- Skriftlige svar på repetisjonsspørsmålene (del 6)
- En kort konklusjon (200–300 ord) som knytter benkearbeidsflyten til klinisk CT: opptak, dose/ALARA, rekonstruksjon og etterbehandling
