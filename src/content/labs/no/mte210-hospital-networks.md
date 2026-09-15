---
title: "Laboratorieoppgave i HL7 og DICOM"
course: "MTE210"
shortTitle: "HL7 & DICOM"
description: "Standardisert arbeidsflyt for pasientundersøkelser gjennom et simulert klinisk IT-system, etter IHE Scheduled Workflow"
equipment:
  - "HAPI TestPanel (HIS) på lab-PC"
  - "DCM4CHE RIS/PACS (pacs.ux.uis.no)"
  - "GE LOGIQ S8 (modalitet)"
  - "Kyoto Kagaku N-365 ultralydfantom"
prerequisites:
  - "Forelesningsnotater om «Healthcare IT»"
duration: "2 timer 45 minutter"
---

## Formål

Kunne utføre standardisert arbeidsflyt for pasientundersøkelser fra billeddannende modaliteter (ultralyd, røntgen, MR, CT osv.) i et simulert klinisk IT-system etter «Integrating the Healthcare Enterprise»-standarden (IHE).

---

## Sikkerhetsmerknader

> **Vis aktsomhet ved håndtering av administratorverktøyet i DCM4CHE PACS.** Du arbeider i et delt undervisningsarkiv — sletting og omkonfigurering rammer alle gruppene.

---

## Oppsett av utstyr

All programvaren står ferdig installert på lab-PC-en. Kontroller at du har tilgang til:

| Programvare | Rolle i arbeidsflyten | Adresse |
|---|---|---|
| HAPI TestPanel | Pasientadministrativt system (HIS) | Lokalt på lab-PC |
| DCM4CHE | Radiologisk informasjonssystem (RIS) og bildearkiv (PACS) | pacs.ux.uis.no |
| GE LOGIQ S8 | Modalitet — det billeddannende utstyret | I laben, ferdig koblet mot PACS |

Ultralydapparatet er allerede satt opp mot RIS og PACS. Dere skal ikke konfigurere det, men dere skal se på hvordan det er satt opp i Del 5.

---

## Arbeidsforskrift

### Del 1 — Det simulerte helse-IT-systemet

I denne labøvingen introduseres dere til standarden som brukes innen pasientdataflyt i helsesektoren, **Scheduled Workflow (SWF)**. På UiS medtek-lab har vi følgende komponenter som til sammen utgjør et simulert helse-IT-system:

- **HAPI TestPanel** — Hospital Information System (**HIS**)
- **DCM4CHE** — radiologisk informasjonssystem (**RIS**) og «Picture Archiving and Communication System» (**PACS**)
- **GE LOGIQ S8** — **modalitet**: det billeddannende utstyret som henter arbeidslisten og produserer bildene

Videre i labøvingen skal dere følge arbeidsflyten mellom disse tre. Diagrammet over Scheduled Workflow finner dere på [IHE-wikien](https://wiki.ihe.net/index.php/Scheduled_Workflow) — se på det før dere går videre, og finn igjen de fire komponentene våre i det.

---

### Del 2 — Koble HIS til PACS

**2.1** Åpne **HIS** (HAPI TestPanel) på lab-PC-en.

**2.2** Konfigurer opp en HL7-forbindelse mellom HAPI TestPanel og DCM4CHE PACS ved å trykke på **«+»**-symbolet ved «sending connections».

**2.3** Finn hvilken port som skal brukes. Den finner dere i PACS-webgrensesnittet under *Configurations → HL7 Applications*.

**2.4** Legg inn **152.94.160.77** som host — dette er IP-adressen til PACS.

**2.5** Test forbindelsen ved å klikke **start**, og se om dere mottar en **«AA»**-melding tilbake fra PACS. AA står for *Application Accept*: PACS-et bekrefter at det tok imot og godtok meldingen.

---

### Del 3 — Bestill en undersøkelse med HL7

Dere skal nå skrive inn en testpasient i systemet ved hjelp av HL7-standarden.

Kort om segmentene i meldingen dere skal bruke:

| Segment | Innhold |
|---|---|
| **MSH** | Meldingshodeinformasjon, som sender og mottaker |
| **PID** | Pasientidentifikasjonsinformasjon |
| **ORC** | Felles ordreinformasjon — blant annet rekvisisjonsnummeret |
| **OBR** | Informasjon om den bestilte undersøkelsen |
| **ZDS** | Study Instance UID, som knytter bestillingen til bildene som kommer senere |
| **ZIP** | Helse Vest sitt eget segment for bestillingsidentifikatorer |

**3.1** HL7-meldingen vi bruker som basis er hentet fra Helse Vest sitt HIS. Kopier meldingen under og lim den inn i tekstfeltet i HAPI TestPanel.

```text
MSH|^~\&|ADHOCBOOKING_VIA_XTRAY|SENDING_FACILITY|XTRAY|RECEIVING_FACILITY|20240808130111||ORM^O01|K3LGVMMKRKCZHJ20|P|2.3
PID|||14019800513||Danser^Folke (Testpasienten)||19980114|M
ORC|NW||HV-R0MD1CKX6||SC
OBR||||SFY0HK^Ekkokardiografi^^SFY0HK^Ekkokardiografi^XTRAY^^1.0~SFY0HK Ekkokardiografi|||20240808130111||||||||^^^HJERTE|114273^Kardiologisk Avdeling (Stavanger/Egersund)^^^^^^^RESHID^DEPARTMENT||ULINT1USUS^US^Ultralydapparat intensivavdelingen 2M^RESURSID&DIPS||30^IKKE SENSITIV^HV^NORMAL^^CONFIDENTIALITY CODE||||US||||||||||||||^^^^30^KLINISK^HV TILGANGSKATEGORI
ZDS|1.2.752.48.4.1.2.665.20240808.378290079.17207388184^XTRAY^Application^DICOM
NTE||XTRAY ADHOC|Custom segment ZIP based on the Imaging Procedure Control Segment (IPC) from v2.5
ZIP|HV-R0MD1CKX6|HV-R0MD1CKX6|1.2.752.48.4.1.2.665.20240808.378290079.17207388184|HV-R0MD1CKX6
```

**3.2** For å gjøre meldingen unik må noen felter endres av dere. Hver gruppe skal ha sin egen pasient og sin egen undersøkelse, ellers kolliderer dere i PACS-et. Gjør følgende endringer:

| Felt | Står nå | Endre til |
|---|---|---|
| MSH-7 | `20240808130111` | Dagens dato |
| PID-3 | `14019800513` | En pseudo-pasient-ID |
| PID-5 | `Danser^Folke (Testpasienten)` | Et pseudo-navn |
| PID-7 | `19980114` | Fødselsdato som matcher pasient-ID-en |
| PID-8 | `M` | Ett av alternativene for patient sex: F, M, O, U, A, N |
| ORC-3 | `HV-R0MD1CKX6` | Erstatt de siste 3 bokstavene med 3 andre bokstaver |
| OBR-7 | `20240808130111` | Dagens dato |
| ZDS-1 | `1.2.752…17207388184` | Erstatt de 2 siste sifrene med 2 andre siffer |
| ZIP-3 | `1.2.752…17207388184` | Samme 2 siffer som dere valgte i ZDS-1 |
| ZIP-1, 2 og 4 | `HV-R0MD1CKX6` | Samme 3 bokstaver som dere la inn i ORC-3 |

> **Merk:** ORC-3 og ZIP-1/2/4 er rekvisisjonsnummeret og må være identiske. ZDS-1 og ZIP-3 er Study Instance UID og må også være identiske — det er denne UID-en modaliteten senere bruker for å koble bildene til riktig bestilling. Får dere dem ikke til å stemme overens, havner bildene i PACS uten å bli knyttet til bestillingen.

**3.3** Når endringene er gjort, send meldingen til PACS ved å trykke **«Send»** øverst i menylinjen.

---

### Del 4 — Finn bestillingen i arbeidslisten

**4.1** Gå inn i nettleseren på PACS-et og se om dere finner den bestilte pasienten under *Navigation → MWL*. Husk å velge **WORKLIST** i nedtrekksmenyen, og klikk på **SUBMIT** for å spørre om pasientlisten.

**4.2** Finner dere ikke pasienten, gå tilbake til Del 3 og kontroller at meldingen faktisk ble akseptert (AA-svaret) og at feltene dere endret fortsatt er gyldige.

**4.3** Gå deretter til **GE LOGIQ S8**-apparatet i laben.

---

### Del 5 — Utfør undersøkelsen på GE LOGIQ S8

Ethvert billeddannende medisinsk utstyr må settes opp og konfigureres mot RIS og PACS. Dette er en av de mange oppgavene til en medisinsk teknisk ingeniør på sykehus. Apparatet i laben er allerede konfigurert, men dere skal se hvordan det er gjort før dere bruker det.

**5.1** Finn fram til DICOM-oppsettet på LOGIQ S8 og noter hvordan apparatet er konfigurert mot arkivet: **AE-tittel**, **IP-adresse** og **port** for PACS, og apparatets egen AE-tittel. Sammenlign med det dere fant i PACS-webgrensesnittet i Del 2. Bruk brukermanualen for LOGIQ S8 hvis dere ikke finner menyvalgene.

**5.2** Hent opp **arbeidslisten (Modality Worklist)** på apparatet og søk opp pasienten dere selv la inn. Finner dere den ikke, sjekk at bestillingen faktisk ligger i MWL-en (Del 4) og at apparatet spør mot riktig AE-tittel.

**5.3** **Velg pasienten fra arbeidslisten** — ikke tast inn pasientdata manuelt. Dette er hele poenget med Scheduled Workflow: pasient-ID, navn og Study Instance UID følger med fra bestillingen, slik at bildene havner på riktig pasient og riktig undersøkelse uten at noen skriver dem inn på nytt. Manuell inntasting på modaliteten er en av de vanligste kildene til feilkoblede bilder i klinisk drift.

**5.4** Påfør ultralydgel på **Kyoto Kagaku N-365-fantomet**, velg en probe og utfør en kort undersøkelse. Lagre minst tre bilder. Det er ikke bildekvaliteten som er poenget her, men at bildene blir knyttet til riktig bestilling.

> Skanner dere hverandre i stedet for fantomet, gjelder de samme reglene som i ultralydlabben i MTE200: det er frivillig, samtykket kan trekkes tilbake når som helst, og målingene er ikke gyldige helsedata.

**5.5** Avslutt undersøkelsen på apparatet (**End Exam**) slik at bildene sendes til PACS.

---

### Del 6 — Verifiser i PACS

For å verifisere at arbeidsflyten er komplett skal dere finne igjen deres egen undersøkelse i **DCM4CHE PACS** på **pacs.ux.uis.no**.

**6.1** Logg inn i PACS-webgrensesnittet og søk opp undersøkelsen, for eksempel på pasient-ID-en eller navnet dere la inn i Del 3.

**6.2** Kontroller at bildene ligger på **riktig pasient** — samme pasient-ID, navn og fødselsdato som i HL7-meldingen deres, og ikke på noen annen gruppes pasient.

**6.3** Kontroller at **Study Instance UID** på undersøkelsen er den samme som dere satte i ZDS-1 og ZIP-3 i Del 3. Stemmer den, har bestillingen fra HIS og bildene fra modaliteten funnet hverandre, og dataene har gått hele veien HIS → RIS/PACS → modalitet → PACS.

**6.4** Finner dere bildene under en annen pasient, eller som en egen undersøkelse uten tilknytning til bestillingen, gå tilbake og finn ut hvor koblingen røk. Det er som regel enten manuell inntasting på apparatet i stedet for valg fra arbeidslisten (Del 5.3), eller at UID-ene ikke var konsistente i HL7-meldingen (Del 3.2).

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- HL7-forbindelsen fra Del 2, og AA-svaret fra PACS som viser at meldingen ble godtatt
- Din egen redigerte HL7-melding fra Del 3, og hvilke felter du endret — særlig hvorfor rekvisisjonsnummeret og Study Instance UID må være konsistente på tvers av ORC, ZDS og ZIP
- Bestillingen din i arbeidslisten både i PACS (Del 4) og på LOGIQ S8 (Del 5.2), og hvordan apparatet er konfigurert mot arkivet (Del 5.1)
- Undersøkelsen du utførte på apparatet (Del 5.4), og hvorfor pasienten skal velges fra arbeidslisten framfor å tastes inn manuelt
- Din egen pasient og undersøkelse funnet igjen i PACS (Del 6), med Study Instance UID som stemmer med det du satte i Del 3 — og hvilken vei dataene har gått gjennom de tre komponentene

Ingen skriftlig innlevering.
