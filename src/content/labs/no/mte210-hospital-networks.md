---
title: "Laboratorieoppgave i sykehusnettverk og integrasjon av medisinsk utstyr"
course: "MTE210"
shortTitle: "HL7 & DICOM"
description: "HL7-meldinger, DICOM-bildeoverføring og nettverksintegrasjon av medisinsk utstyr"
equipment:
  - "HAPI Testpanel (testmiljø for HL7 v2.x, på lab-PC-en)"
  - "DCM4CHE RIS/PACS (undervisningsarkivet for bilder)"
  - "OHIF-viewer (DICOM-viewer, på lab-PC-en)"
  - "Nettverksanalyseverktøy (Wireshark)"
  - "Laboratoriearbeidsstasjoner med Ethernet-tilkoblinger"
prerequisites:
  - "Forelesningsnotater om helseinformatikk og interoperabilitetsstandarder"
  - "Grunnleggende nettverkskunnskap (TCP/IP, porter, klient-server-modell)"
  - "Introduksjon til HL7 og DICOM fra forelesninger i emnet"
duration: "2 timer 45 minutter"
---

## Læringsmål

Etter fullført laboratorieoppgave skal du kunne:

- Forklare rollen til HL7 og DICOM i sykehusets informasjonssystemer
- Lese og tolke en HL7 v2.x ADT-melding (Admit-Discharge-Transfer)
- Identifisere nøkkelsegmentene i en HL7 ORU-melding (Observation Result) fra en pasientmonitor
- Bruke en DICOM-viewer til å undersøke DICOM-metadata (pasient-ID, studieinformasjon, modalitet)
- Fange opp og analysere HL7-nettverkstrafikk ved hjelp av Wireshark
- Beskrive rollen til klinisk ingeniørarbeid i nettverksintegrasjon og cybersikkerhet for medisinsk utstyr

---

## Bakgrunn

### HL7 (Health Level Seven)

HL7 er den mest brukte meldingsstandarden for utveksling av kliniske data mellom sykehusets informasjonssystemer. Versjon 2.x bruker pipetegn-separerte tekstmeldinger sendt over TCP/IP. Vanlige meldingstyper inkluderer:

- **ADT** (Admit-Discharge-Transfer) — Pasientdemografi og lokasjon
- **ORU** (Observation Result Unsolicited) — Laboratorieresultater, vitale tegn fra monitorer
- **ORM** (Order Message) — Bestillinger fra klinikere til laboratorium/radiologi

### DICOM (Digital Imaging and Communications in Medicine)

DICOM er standarden for lagring, overføring og visning av medisinske bilder (røntgen, CT, MR, ultralyd). En DICOM-fil inneholder både bildedata og strukturerte metadata (pasient-ID, studiedato, modalitet, opptaksparametere).

### IHE (Integrating the Healthcare Enterprise)

IHE tilbyr implementeringsprofiler som spesifiserer nøyaktig hvordan HL7 og DICOM skal brukes sammen for å løse spesifikke kliniske arbeidsflyter (f.eks. bestilling-til-bilde-arbeidsflyt, pasientidentifikasjon).

---

## Prosedyre

### Del 1 — Lesing av HL7-meldinger (45 min)

**1.1** Undersøk følgende HL7 v2.x ADT-melding (utdelt i labhefte eller vist på skjerm):

```
MSH|^~\&|ADT_SYSTEM|HOSP|MONITOR_SYS|ICU|20260325120000||ADT^A01|MSG00001|P|2.5
EVN|A01|20260325120000
PID|1||PAT12345^^^HOSP^MR||HANSEN^ANNA^M||19520415|F|||BREIGATA 12^^STAVANGER^^4006^NO
PV1|1|I|ICU^BED-03^^HOSP||||DR001^NILSEN^OLE|||MED|||||||||V12345|||||||||||||||||||||||||20260325120000
```

Dekod hvert segment og felt i labboken din:
- **MSH:** Identifiser sendende/mottakende systemer, meldingstype, versjon
- **PID:** Identifiser pasientnavn, ID, fødselsdato, kjønn, adresse
- **PV1:** Identifiser pasientklasse, lokasjon (avdeling/seng), behandlende lege, besøksnummer

**1.2** Undersøk følgende ORU-melding (vitale tegn fra en pasientmonitor):

```
MSH|^~\&|MONITOR|ICU|HIS|HOSP|20260325121500||ORU^R01|MSG00042|P|2.5
PID|1||PAT12345^^^HOSP^MR||HANSEN^ANNA^M
OBR|1||ORD001|VITALS|||20260325121500
OBX|1|NM|8867-4^Heart rate^LN||78|bpm|60-100||||F
OBX|2|NM|59408-5^Oxygen saturation in Arterial blood by Pulse oximetry^LN||96|%|90-100||||F
OBX|3|NM|8480-6^Systolic blood pressure^LN||134|mmHg|90-140||||F
OBX|4|NM|8462-4^Diastolic blood pressure^LN||82|mmHg|60-90||||F
OBX|5|NM|8310-5^Body temperature^LN||37.2|Cel|36.0-38.0||||F
```

Dekod:
- Hvilke vitale tegn er rapportert, og hva er verdiene?
- Hva er referanseområdene?
- Hvilken pasient tilhører disse målingene?
- Hva betyr "F"-flagget i OBX-segmentene?

**1.3** Svar: Hvis SpO₂-avlesningen var 88 % i stedet for 96 %, hvilket felt ville endret seg? Ville HL7-meldingsstrukturen endret seg, eller bare verdien?

---

### Del 2 — Analyse av HL7-nettverkstrafikk (45 min)

**2.1** Åpne Wireshark på laboratoriearbeidsstasjonen din og start opptak på Ethernet-grensesnittet.

**2.2** Labveilederen utløser en serie HL7-meldinger mellom test-HL7-serveren og en klientapplikasjon. Klienten kjører på **din egen arbeidsstasjon**, slik at meldingene passerer grensesnittet du gjør opptak på. (På et svitsjet nettverk ser en arbeidsstasjon bare trafikk som er adressert til den selv — skal du fange trafikk mellom to andre maskiner, må labveilederen først slå på portspeiling på lab-svitsjen, ellers blir opptaket tomt.)

**2.3** I Wireshark, filtrer for HL7-trafikk:
- Filtrer på HL7-porten (typisk TCP-port 2575): `tcp.port == 2575`
- Finn HL7-meldingene i pakkelisten
- Velg en pakke og undersøk HL7-nyttelasten i pakkedetaljvinduet

**2.4** Svar i labboken:
- Hvilken transportprotokoll bruker HL7 v2.x? (TCP eller UDP?)
- Er HL7-meldingen kryptert under overføring? Hva er sikkerhetsimplikasjonene?
- Hvordan kan en klinisk ingeniør verifisere at en pasientmonitor sender korrekte HL7-data til sentralovervåkningen?

---

### Del 3 — Utforskning av DICOM-bilder (45 min)

**3.1** Åpne OHIF-vieweren — labens DICOM-viewer, den samme som brukes i ultralydoppgaven — på laboratoriearbeidsstasjonen.

**3.2** Last inn det medfølgende DICOM-eksempeldatasettet (et sett med anonymiserte medisinske bilder fra undervisningsarkivet).

**3.3** For hver bildeserie, undersøk DICOM-headeren og registrer:

| Felt | Verdi |
|---|---|
| Patient Name (0010,0010) | |
| Patient ID (0010,0020) | |
| Study Date (0008,0020) | |
| Modality (0008,0060) | |
| Manufacturer (0008,0070) | |
| Institution Name (0008,0080) | |
| Pixel Spacing (0028,0030) | |
| Window Center/Width (0028,1050/1051) | |

**3.4** Endre vindus-/nivåinnstillingene i vieweren. Observer hvordan det viste bildet endrer seg. Forklar i labboken hva Window Center og Window Width styrer, og hvorfor de er klinisk viktige.

**3.5** Svar: Hvis du mottok en DICOM-studie der pasient-ID i DICOM-headeren ikke samsvarte med pasient-ID i sykehusets system (RIS/PACS), hva ville den kliniske risikoen være, og hvilke tiltak ville du iverksatt?

---

### Del 4 — Integrasjonsutfordringer og cybersikkerhet (30 min)

Dette er en diskusjonsbasert del. Arbeid i laboratoriegruppen, diskuter og noter svarene deres:

**4.1** En ny pasientmonitor skal installeres på intensivavdelingen. List opp stegene en klinisk ingeniør ville gjennomført for å integrere den med sykehusets sentrale overvåkingssystem og den elektroniske pasientjournalen (EPJ), inkludert:
- Nettverkskonfigurasjon (IP, VLAN, brannmurregler)
- HL7-grensesnittkonfigurasjon (meldingstyper, mottakende system)
- Testing og validering før idriftsettelse
- Løpende overvåking

**4.2** Sykehusets IT-sikkerhetsteam rapporterer at en pasientmonitor på nettverket er oppdaget i kommunikasjon med en uventet ekstern IP-adresse. Som klinisk ingeniør, hva er din respons? Vurder:
- Umiddelbare tiltak (pasientsikkerhet vs. undersøkelse)
- Hvem du varsler
- Hvordan du undersøker
- Hva **IEC 80001-1:2021** (*Anvendelse av risikostyring for IT-nettverk som inkorporerer medisinsk utstyr — Del 1: Pasientsikkerhet, effektivitet og informasjonssikkerhet ved innføring og bruk av tilkoblet medisinsk utstyr eller tilkoblet helseprogramvare*) sier om risikostyring for nettverkstilkoblet medisinsk utstyr — kontroller at du leser 2021-utgaven, som erstattet og omstrukturerte 2010-utgaven (med tittelen *Roles, responsibilities and activities*), for eldre forelesningsmateriell viser fortsatt til den tilbaketrukne utgaven

**4.3** Diskuter spenningen mellom tilgjengelighet for medisinsk utstyr (utstyret må fungere 24/7) og cybersikkerhet (utstyret bør oppdateres og patches). Hvordan ville du håndtert en situasjon der en kritisk respirator kjører et operativsystem som ikke lenger støttes med sikkerhetsoppdateringer?

---

## Godkjenning

Du blir godkjent i laben når du kan vise og forklare følgende for labingeniøren:

- De dekodede HL7-meldingene fra del 1 — segmentene og feltene i ADT-meldingen (1.1), de vitale tegnene, referanseområdene og resultatstatusen i ORU-meldingen (1.2), og svaret ditt på 1.3
- Wireshark-opptaket ditt av HL7-trafikken (2.1–2.2), visningsfilteret du brukte for å finne den (2.3), og svarene dine på 2.4
- DICOM-headertabellen du fylte ut for hver bildeserie (3.3), hva som skjedde med bildet da du endret Window Center og Window Width (3.4), og svaret ditt på 3.5 om pasient-ID som ikke stemmer overens
- Svarene gruppen kom fram til på diskusjonsspørsmålene i del 4 (4.1–4.3)

Ingen skriftlig innlevering.
