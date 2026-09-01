---
title: "3D-rekonstruksjon og printing"
course: "MTE210"
shortTitle: "3D-rekonstruksjon"
description: "Segmentering av et CT-volum i 3D Slicer, eksport av en vanntett STL og 3D-printing av det skjulte objektet fra CT-avbildningslabben"
equipment:
  - "Lab-PC med 3D Slicer"
  - "FDM-basert 3D-printer (skrivebordsmodell)"
  - "Det rekonstruerte CT-volumet fra CT-avbildning og stråling"
prerequisites:
  - "Fullført CT-avbildning og stråling, med din eksporterte snittstabel"
  - "3D Slicer installert på lab-PC-en"
duration: "2 timer 45 minutter"
---

> **Denne labben er en fortsettelse av CT-avbildning og stråling.** Ta med det rekonstruerte volumet du tok opp der — delnummereringen fortsetter derfra, så stegene under starter på del 4.

## Læringsmål

Etter denne laboratorieøvelsen skal du kunne:

- Eksportere et rekonstruert volum og importere det som en bildestabel i 3D Slicer med riktig voxelavstand
- Segmentere en struktur av interesse ved gråverdi-terskling, generere en 3D-overflatemodell og eksportere en tett (vanntett) STL-fil
- Klargjøre og 3D-printe det segmenterte objektet, og vurdere hvordan valg ved opptak og segmentering påvirker den ferdige utskriften

---

## Sikkerhetsmerknader

- **3D-printer:** dysen og byggeplaten er varme under og etter printing. Bruk printeren kun som anvist, hold hendene unna bevegelige deler, og la utskrifter kjøle seg ned før du tar dem av.
- Ikke la en utskrift gå uten tilsyn med mindre labbveilederen har godkjent det.

---

## Oppsett av utstyr

Denne labben kjøres på en lab-PC med **3D Slicer** og en FDM-basert **3D-printer**. Ingen røntgen er involvert: du arbeider ut fra volumet gruppa di rekonstruerte i CT-avbildningslabben.

1. Kopier den eksporterte snittstabelen over på lab-PC-en, og hold hele stabelen i én tom mappe.
2. Bekreft at **3D Slicer** starter, og at 3D-printeren har strøm, er nivellert og har filament.
3. Noter **voxelavstanden** fra avbildningslabben — du trenger den i del 4.2, og utskriften får feil størrelse uten den.

---

## Prosedyre

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

**5.1** Åpne STL-filen i printerens slicer-programvare (f.eks. Cura eller PrusaSlicer). Kontroller at dimensjonene stemmer med målingen din fra CT-avbildningslabben (del 3.4) — hvis ikke, var voxelavstanden i del 4.2 feil.

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

---

## Krav til labrapport

Lever en maskinskrevet labrapport innen fristen angitt i emneplanen. Rapporten må inneholde:

- En forside med navn, studentnummer, emnekode (MTE210) og dato
- En beskrivelse av **3D Slicer-segmenteringen** din, inkludert terskelvalget ditt og et skjermbilde av 3D-modellen
- **Voxelavstanden** du satte og de endelige printede dimensjonene, med en kommentar om de stemte overens
- Et bilde av den ferdige 3D-utskriften din
- Skriftlige svar på repetisjonsspørsmålene (del 6)
- En kort konklusjon (150–200 ord) om etterbehandling: hvordan valg i opptak og segmentering forplanter seg til det printede objektet
