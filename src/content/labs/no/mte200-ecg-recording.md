---
title: "EKG-registreringslab"
course: "MTE200"
shortTitle: "EKG"
description: "Standard 12-avlednings hvile-EKG-registrering og hjertets elektriske aktivitet ved bruk av pasientsimulator"
equipment:
  - "Fluke ProSim 8 Vital Signs and ECG Patient Simulator"
  - "Philips PageWriter TC30 elektrokardiograf"
prerequisites:
  - "Fluke ProSim 8 brukermanual"
  - "Philips PageWriter TC30 bruker- og servicemanual"
  - "Forelesningsnotater om kardial elektrofysiologi og EKG"
duration: "2,5 timer"
---

## Læringsmål

Etter denne labøvelsen skal du kunne:

- Identifisere sikkerhetssymboler (Type B, BF, CF, defibrillasjonssikker) og forklare deres betydning for pasientsikkerhet
- Koble et 12-avlednings-EKG til en pasientsimulator og ta opp diagnostiske registreringer
- Utføre ytelsestest av avledningsledninger og følsomhetstest av kardiografen iht. servicemanualen
- Gjenkjenne vanlige EKG-artefakter (nettfrekvensinterferens, muskelbevegelse, basislinjevandring, respiratorisk) og forklare årsakene
- Måle standard EKG-intervaller (R-R, P-R, ST-segment) og beregne hjertefrekvens
- Bestemme den elektriske aksen til QRS-komplekset, P-bølgen og T-bølgen ved hjelp av Einthovens trekant

---

## Sikkerhetsmerknader

> **ELEKTRISK SIKKERHET.** EKG-registrering innebærer tilkobling av alle elektriske forbindelser til kroppen, noe som medfører risiko for uønskede lekkasjestrømmer. Inspiser utstyret før bruk. Sørg for at det er koblet til en jordet stikkontakt og at pasienten ikke er i elektrisk kontakt med andre enheter. Gjør deg kjent med advarsler i enhetens brukermanual.

---

## Oppsett av utstyr

Gjør deg kjent med EKG-apparatet og pasientsimulatoren iht. brukermanualene. Vær spesielt oppmerksom på seksjonene som forklarer EKG-avledningstilkoblinger til pasienten og beskrivelsen av knapper og tilkoblinger som er tilgjengelige.

Pasientsimulatoren genererer EKG-signaler for en rekke mulige simulerte hjertearytmier (arytmier, artefakter), og alle innstillinger styres via brukergrensesnittet.

1. Koble alle de 10 avledningsledningene på PageWriter TC30-pasientkabelen (RA, LA, RL, LL og V1–V6) til de tilsvarende merkede EKG-pluggene på ProSim 8.
2. Slå på EKG-apparatet.
3. EKG-kurver vises når du trykker på en knapp på pasientsimulatoren.
4. EKG-registreringer skal eksporteres som PDF til en USB-enhet koblet til EKG-apparatet (prosedyre beskrevet i brukermanualen).

Studentene må skrive en løpende protokoll under labarbeidet slik at de kan reprodusere resultatene etter oppgaven og få den godkjent i laben.

---

## Prosedyre

### Del 1 — Forberedende spørsmål

Følgende spørsmål kan besvares før du ankommer laben. Bruk Philips PageWriter TC30 servicemanualen som primærkilde.

**1.1** Finn informasjon om følgende symboler i servicemanualen og forklar dem:

- Type B applikasjonsdel-symbol
- Type BF applikasjonsdel-symbol
- Type CF applikasjonsdel-symbol
- Defibrillasjonssikkert symbol

**1.2** Hvilke kriterier må være oppfylt for å koble det medisinske utstyret til en annen enhet som er koblet til strømnettet?

**1.3** Finn informasjon om nøyaktigheten til elektrokardiogrammet enheten produserer. Hva er nøyaktighetskravet for diagnostisk EKG-visning, og i hvilken særstandard i IEC 60601-2-serien finnes disse kravene? Merk at serien har egne særstandarder for diagnostiske elektrokardiografer og for EKG-overvåkingsutstyr — pass på at du oppgir den som gjelder for TC30.

**1.4** Finn filterinnstillingene til apparatet og noter hvor i manualen de er beskrevet. Skill mellom nettfilteret (AC-/notchfilter), som settes til 50 Hz i Norge og 60 Hz i Nord-Amerika, og grensefrekvensene for båndbredden, altså høypassfilteret (basislinje) og lavpassfilteret (muskelstøy). Hvilken kombinasjon bruker TC30 for en diagnostisk registrering, og hvordan forholder den seg til den diagnostiske båndbredden som særstandarden du fant i 1.3 krever?

**1.5** Forklar hvordan den anatomiske visningen av elektrodeplassering på enheten oppnås. Hvorfor kalles det et 12-avlednings-EKG når bare 10 elektroder er festet til pasienten?

---

### Del 2 — Ytelses- og følsomhetstesting

**2.1 Ytelsestest av avledningsledninger**

Utfør en ytelsestest av avledningsledningene ved å følge servicemanual-prosedyren "Lead Wire Performance Test (2-15)."

> **Merk:** Ledningene må være frakoblet pasientsimulatoren under denne testen.

Registrer resultatene for hver avledning og noter om hver består eller ikke består akseptkriteriene.

**2.2 Samlet følsomhetstest for kardiografen**

Utfør en følsomhetstest ved å følge servicemanual-prosedyren "Cardiograph Overall Sensitivity Test (2-19)."

Registrer de målte følsomhetsverdiene og sammenlign dem mot spesifisert toleranse.

---

### Del 3 — EKG-artefakter

Bruk følgende artefakter tilgjengelige på pasientsimulatoren og observer forskjellene i støy og hvordan EKG-kurven endres:

| Artefakt | Hva du skal observere |
|---|---|
| 50 Hz nettfrekvensinterferens | Regelmessige, fine oscillasjoner overlagret på kurven |
| Muskelbevegelse | Uregelmessig, høyfrekvent støy |
| Basislinjevandring | Langsom, bølgende forskyvning av basislinjen |
| Respiratorisk artefakt | Periodisk basislinjvariasjon synkronisert med pusting |

> **Merk:** EKG-apparatet har aktiv filtrering som i noen tilfeller må deaktiveres for å vise artefakten på EKG-et. Registrer hvilke filterinnstillinger du brukte for hver observasjon.

Eksporter en registrering av hver artefakttype til USB-enheten, slik at du kan vise og forklare de fire kurvene for labingeniøren når du legger fram resultatene.

---

### Del 4 — EKG-intervallmålinger

**4.1** Still inn pasientsimulatoren til å produsere et normalt sinusrytme-EKG.

**4.2** Estimer pasientens hjertefrekvens fra det registrerte EKG-et ved å måle R-R-intervallet.

**4.3** Beregn tiden for P-R-intervallet.

**4.4** Mål varigheten av ST-segmentet.

Registrer alle målinger med enheter i labnotatboken. Sammenlign dine målte verdier mot normale referanseområder.

---

### Del 5 — Bestemmelse av elektrisk akse

**5.1** Simuler et normalt EKG på pasientsimulatoren.

**5.2** Bruk ekstremitetsavledningene *II* og *III* fra EKG-apparatet til å bestemme den elektriske aksen til:

- QRS-komplekset
- P-bølgen
- T-bølgen

Bruk Einthovens trekant for å utføre aksebestemmelsen. Mål nettoamplituden (summen av positive og negative utslag) for hver bølge i avledning II og III, og plott disse på det triaksiale referansesystemet for å finne den resulterende vektoren.

**5.3** Standard ekstremitetsavledningene I, II og III er bipolare fordi de måler mellom to elektroder der signalpotensialet varierer på begge steder. De forsterkede ekstremitetsavledningene (aVF, aVL og aVR) er monopolare/unipolare. Hvordan oppnås dette når de samme 3 elektrodene brukes?

> **Hint:** Vurder hvordan Wilsons sentralterminal dannes og hvordan de forsterkede avledningene modifiserer referanseelektrodekonfigurasjonen. Tegn Einthovens trekant med de tre forsterkede avledningsvektorene inntegnet, og bruk skissen til å svare.

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- Resultatene fra ytelsestesten av avledningsledningene og den samlede følsomhetstesten av kardiografen i Del 2, vurdert mot akseptkriteriene i servicemanualen
- De fire eksporterte artefaktregistreringene fra Del 3 med filterinnstillingene du brukte for hver av dem, og R-R-, P-R- og ST-målingene med beregnet hjertefrekvens fra Del 4
- Aksebestemmelsen fra Del 5 — Einthovens trekant med de inntegnede vektorene for QRS-komplekset, P-bølgen og T-bølgen — og hvordan du koblet de 10 avledningsledningene og fikk en diagnostisk registrering
- Svarene dine på de forberedende spørsmålene i Del 1 og på spørsmålet om bipolare kontra unipolare avledninger i Del 5.3

Ingen skriftlig innlevering.
