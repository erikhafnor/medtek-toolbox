---
title: "CT-avbildning og stråling"
course: "MTE210"
shortTitle: "CT-avbildning"
description: "CT-bildeopptak på en benkebasert røntgen-CT, strålevern og volumrekonstruksjon av et prøveobjekt med et skjult tett objekt"
equipment:
  - "PHYWE XR 4.0 benkebasert røntgen-/CT-enhet (XRstage rotasjonsbord + XRIS-detektor)"
  - "measureCT opptaks- og rekonstruksjonsprogramvare"
  - "Valnøtt som prøveobjekt (med et skjult tett objekt)"
prerequisites:
  - "Dokumentasjon for PHYWE XR 4.0 / measureCT"
  - "Forelesningsnotater om røntgen-/CT-fysikk og strålevern (ALARA)"
duration: "2 timer 45 minutter"
---

## Læringsmål

Etter denne laboratorieøvelsen skal du kunne:

- Ta opp et fullstendig CT-datasett på den benkebaserte PHYWE XR 4.0-CT-en, og stille inn rørspenning (kV), rørstrøm (mA), eksponeringstid og antall projeksjoner
- Forklare hvordan en roterende serie av røntgenprojeksjoner rekonstrueres til tverrsnittsbilder, og justere rotasjonssenteret for å oppnå en skarp rekonstruksjon
- Anvende prinsipper for strålevern (ALARA, tid–avstand–skjerming, og avstandskvadratloven) og knytte parameterne for benkeskanningen til klinisk CT med tanke på dose og bildekvalitet

---

## Sikkerhetsmerknader

> **LUKKET KABINETT.** PHYWE XR 4.0 er et fullstendig skjermet, typegodkjent røntgenkabinett. Røntgenstråling genereres kun når kammerdøren er lukket og sikkerhetsbryteren (interlock) er aktivert. Røntgenvarsellampen lyser når røret er i drift. **Forsøk aldri å forbikoble, tape over eller omgå dørbryteren.**


- Ikke åpne kammerdøren mens røntgenvarsellampen lyser. Å åpne døren kutter høyspenningen automatisk — ikke bruk dette som en rutinemessig «av»-bryter.
- Bekreft at varsellampen er **av** før du plasserer eller fjerner prøveobjektet.
- Hold dosen så lav som praktisk mulig (ALARA): kjør ikke røret lenger enn nødvendig, og slå av røntgenstrålingen mellom stegene.
- Meld umiddelbart fra til labansvarlig om skadede kabler, dører eller sikkerhetsbrytere. Ikke bruk en enhet der dørbryteren ikke fungerer.

---

## Oppsett av utstyr

Denne øvelsen bruker PHYWE XR 4.0 røntgenenhet med rotasjonsbordet **XRstage**, den digitale flatpanel-detektoren **XRIS** og programvaren **measureCT**. Segmentering i 3D Slicer og 3D-printing av det skjulte objektet gjøres etterpå, i den egne labben 3D-rekonstruksjon og printing.

1. Koble rotasjonsbordet XRstage og detektoren XRIS til røntgenenheten, og koble begge til PC-en via USB. Start **measureCT**-programmet og aktiver programvaren (Options → Activation Assistant) hvis du blir bedt om det.
2. I live-visningen, bekreft at den grønne indikator-LED-en lyser for røntgenenheten, bordet og detektoren — dette betyr at hver komponent er registrert.
3. Monter prøveobjektet — en **valnøtt** — på rotasjonsbordet slik at det står sentrert i røntgenstrålen og nær detektoren: bordposisjonen skal gi geometrien SOD = 250 mm / SDD = 300 mm i steg 4, altså omtrent 50 mm foran detektoren. Står valnøtten midt mellom røret og detektoren i stedet, blir forstørrelsen 2,0× i stedet for 1,2×, voxelstørrelsen i rekonstruksjonen en annen, og projeksjonen av nøtten kan falle utenfor kanten av detektoren. Lukk kammerdøren.

   ![Valnøtt montert på rotasjonsbordet XRstage, med XRIS-detektoren bak](/labs/ct-imaging/01-setup-walnut-stage.jpg)

4. Noter avstand kilde-til-objekt (**SOD**) og avstand kilde-til-detektor (**SDD**). I denne øvelsen bruker du **SOD = 250 mm** og **SDD = 300 mm**, som gir en geometrisk forstørrelse på SDD/SOD = 1,2×.

   ![Strålegeometri inni kammeret: røntgenkilde, rotasjonsbord med prøveobjekt og detektor](/labs/ct-imaging/02-chamber-geometry.jpg)

5. **Kalibrer detektoren** før du tar opp data, med fri strålegang. Gjør dette *før* du monterer valnøtten i steg 3 — eller, hvis den allerede står på bordet, slå av røntgenstrålingen, vent til varsellampen er slukket, og ta den av igjen. Still inn kV og mA du skal bruke i skanningen (del 2.2), la bordet stå tomt, lukk kammerdøren og klikk **Calibrate**. Kalibreringen tar opp både et mørkebilde med røret av, som gir detektorens offset, og et flatfeltbilde med røret på og fri strålegang, som gir den pikselvise forsterkningen; alle bilder du tar opp etterpå korrigeres automatisk med disse. Den røde LED-en på Calibrate-knappen blir grønn når kalibreringen lykkes. Monter valnøtten tilbake først når kalibreringen er ferdig og varsellampen er slukket.

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

**2.1** Med valnøtten montert og kammerdøren lukket, slå på røntgenstrålingen og åpne **Live view**. Juster kontrasten slik at valnøtten er tydelig synlig. Følg med på **detektorens eksponerings-/belastningsindikator**: den må holde seg **under** maksimalt fyllingsnivå. Hvis den blir rød, mettes detektoren — reduser mA eller eksponeringstid. Må du flytte prøveobjektet, slå av røntgenstrålingen og vent til varsellampen er slukket før du åpner døren.

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

**3.3** Når et testsnitt er skarpt, klikk **Reconstruct** for å rekonstruere hele volumet. Når rekonstruksjonen er ferdig, eksporter volumet som en stabel av snittbilder i én tom mappe, og noter **voxelavstanden** i mm per voxel som measureCT oppgir. I objektrommet er den den binnede detektorpitchen delt på den geometriske forstørrelsen — 0,096 mm ÷ 1,2 = **0,080 mm per voxel** med geometrien og binningen som brukes her. Noter det measureCT faktisk oppgir: hvis det avviker fra 0,080 mm, stol på programvaren og si det til veileder, for utskriftsstørrelsen henger på dette ene tallet. Du trenger både den eksporterte snittstabelen og voxelavstanden i labben 3D-rekonstruksjon og printing — uten dem får 3D-utskriften feil størrelse.

**3.4** Åpne **3D View**. Inspiser volumet i snittvinduene for aksial, sagittal og koronal retning samt i 3D-gjengivelsen. Identifiser det skjulte objektet i alle tre snittretninger og anslå størrelsen i millimeter.

![3D-viewer: aksiale, sagittale, koronale snitt og en 3D-gjengivelse av den skannede valnøtten](/labs/ct-imaging/05-3d-viewer.png)

Det tette objektet inni valnøtten er en **menneskelig tann** — målet ditt for segmentering og 3D-printing. I et rekonstruert tverrsnitt skiller den seg tydelig ut, lys mot den mye mindre tette nøtten:

![Tverrsnitt fra rekonstruksjonen — det lyse, tette skjulte objektet inni valnøttskallet](/labs/ct-imaging/06-transverse-hidden-object.png)

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Opptaksparameterne du brukte (del 2.2) og en live-projeksjon av valnøtten der du kan peke ut det skjulte, tette objektet og si hva det er (del 2.3)
- Hvordan du justerte **rotasjonssenteret** (del 3.2) — vis et uskarpt og et skarpt testsnitt — og det rekonstruerte volumet der du identifiserer det skjulte objektet i alle tre snittretninger og anslår størrelsen i millimeter (del 3.4)
- Svarene dine på spørsmålene om strålevern og CT-fysikk i del 1 (1.2 og 1.3), med egne ord
- Den eksporterte snittstabelen og voxelavstanden du noterte i del 3.3, som du trenger i neste lab

Ingen skriftlig innlevering.
