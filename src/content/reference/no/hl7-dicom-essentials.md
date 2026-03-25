---
title: "HL7 og DICOM -- det viktigste"
description: "Hurtigreferanse for interoperabilitetsstandarder i helsevesenet, brukt ved integrasjon av medisinsk utstyr"
tags: ["HL7", "DICOM", "interoperabilitet", "IHE", "nettverk"]
order: 4
---

## HL7 v2.x -- Meldingsbasert integrasjon

HL7 (Health Level Seven) versjon 2.x er den mest utbredte standarden for meldingsutveksling i helsevesenet globalt. Den bruker pipe-separerte tekstmeldinger sendt over TCP/IP til a utveksle kliniske, administrative og finansielle data mellom sykehussystemer.

### Meldingsstruktur

En HL7 v2.x-melding bestar av **segmenter**, der hvert segment begynner med en 3-tegns identifikator. Felt innenfor segmenter er separert med `|` (pipe). Komponenter innenfor felt bruker `^` (caret).

```
MSH|^~\&|SENDING_APP|SENDING_FAC|RECEIVING_APP|RECEIVING_FAC|TIMESTAMP||MSG_TYPE|MSG_ID|P|VERSION
```

### Vanlige meldingstyper

| Type | Utloser | Bruksomrade |
|---|---|---|
| **ADT^A01** | Pasientinnleggelse | Registrere pasient i systemet, tildele seng |
| **ADT^A02** | Pasientoverflytting | Oppdatere pasientlokasjon (avdelings-/sengebytte) |
| **ADT^A03** | Pasientutskrivning | Avslutte oppholdet |
| **ORU^R01** | Observasjonsresultat | Vitale parametre fra monitorer, laboratorieresultater |
| **ORM^O01** | Bestillingsmelding | Legeordineringer (lab, radiologi, apotek) |
| **SIU^S12** | Timebookinformasjon | Timeplanlegging |
| **MDM^T02** | Dokumenthandtering | Kliniske dokumenter |

### Viktige segmenter

| Segment | Navn | Innhold |
|---|---|---|
| **MSH** | Message Header | Sende-/mottakssystemer, meldingstype, versjon, tidsstempel |
| **PID** | Patient Identification | Navn, pasient-ID, fodselsdato, kjonn, adresse |
| **PV1** | Patient Visit | Avdeling, seng, behandlende lege, besoksnummer |
| **OBR** | Observation Request | Bestillingsinformasjon, testtype, tidsstempler |
| **OBX** | Observation Result | Enkeltmaling (HF, BT, SpO2, labverdi) |
| **EVN** | Event | Detaljer om utlosende hendelse |
| **NK1** | Next of Kin | Kontaktinformasjon for parorende |

### OBX-segmentet -- Baerer av vitale parametre

OBX-segmentet overforer enkeltobservasjoner. For pasientmonitorer er hver vital parameter et eget OBX-segment:

```
OBX|1|NM|HR^Heart Rate^LN||78|bpm|60-100||||F
```

| Posisjon | Innhold | Eksempel |
|---|---|---|
| OBX-1 | Sett-ID | 1 |
| OBX-2 | Verditype | NM (numerisk) |
| OBX-3 | Observasjonsidentifikator | HR^Heart Rate^LN |
| OBX-5 | Verdi | 78 |
| OBX-6 | Enhet | bpm |
| OBX-7 | Referanseomrade | 60-100 |
| OBX-11 | Status | F (endelig) |

---

## DICOM -- Standard for medisinsk bildebehandling

DICOM (Digital Imaging and Communications in Medicine) er den universelle standarden for medisinske bilder. Den definerer bade filformatet og nettverksprotokollen for overfoering av bilder mellom modaliteter, PACS og visningsarbeidsstasjoner.

### DICOM-filstruktur

En DICOM-fil inneholder:
- **Header** -- Strukturerte metadata i tag-verdi-par (pasientinformasjon, studieinformasjon, opptaksparametre)
- **Pikseldata** -- Selve bildedataene

### Viktige DICOM-tagger

| Tag | Navn | Eksempel |
|---|---|---|
| (0010,0010) | Patient Name | HANSEN^ANNA^M |
| (0010,0020) | Patient ID | PAT12345 |
| (0010,0030) | Patient Birth Date | 19520415 |
| (0008,0020) | Study Date | 20260325 |
| (0008,0060) | Modality | CT, MR, US, CR, DX |
| (0008,0070) | Manufacturer | GE MEDICAL SYSTEMS |
| (0008,0080) | Institution Name | Stavanger universitetssjukehus |
| (0020,000D) | Study Instance UID | 1.2.840.113619... (unik studie-ID) |
| (0020,000E) | Series Instance UID | 1.2.840.113619... (unik serie-ID) |
| (0028,0010) | Rows | 512 |
| (0028,0011) | Columns | 512 |
| (0028,0030) | Pixel Spacing | 0.5\0.5 (mm) |
| (0028,1050) | Window Center | 40 |
| (0028,1051) | Window Width | 400 |

### DICOM-nettverkstjenester (DIMSE)

| Tjeneste | Funksjon |
|---|---|
| **C-STORE** | Sende et bilde fra ett system til et annet |
| **C-FIND** | Sporring mot PACS etter studier som matcher soekekriterier |
| **C-MOVE** | Be PACS om a sende bilder til en destinasjon |
| **C-ECHO** | Verifisere DICOM-tilkobling (tilsvarende nettverks-ping) |
| **N-EVENT-REPORT** | Varsle om statusendringer (utskriftsjobber, storage commit) |

### Eksempel pa DICOM-arbeidsflyt

```
1. CT-skanner tar bilder → C-STORE → PACS
2. Radiolog apner visningsprogram → C-FIND (soek pa pasient-ID) → PACS returnerer studieliste
3. Radiolog velger studie → C-MOVE → PACS sender bilder til visningsarbeidsstasjon
4. Radiolog vurderer bilder og oppretter rapport
```

---

## IHE -- Fa standarder til a fungere sammen

IHE (Integrating the Healthcare Enterprise) er ikke en standard i seg selv -- det er et rammeverk som definerer **integrasjonsprofiler** som spesifiserer hvordan HL7, DICOM og andre standarder skal brukes sammen for a lose spesifikke kliniske arbeidsflyter.

### Viktige IHE-profiler for klinisk ingeniorfag

| Profil | Domene | Hva den loser |
|---|---|---|
| **SWF** (Scheduled Workflow) | Radiologi | Bestilling-til-bilde-arbeidsflyt: bestilling i RIS &rarr; arbeidsliste pa modalitet &rarr; bilder til PACS &rarr; rapport i RIS |
| **PIR** (Patient Information Reconciliation) | IT-infrastruktur | Korrigering av uoverensstemmelser i pasient-ID pa tvers av systemer |
| **DEC** (Device Enterprise Communication) | Pasientnaert utstyr | Hvordan utstyr ved sengen (monitorer, respiratorer) kommuniserer vitale parametre til EPJ |
| **ACM** (Alarm Communication Management) | Pasientnaert utstyr | Hvordan alarmer fra utstyr videresendes til sykepleierkallsystemer og mobile enheter |
| **ATNA** (Audit Trail and Node Authentication) | IT-infrastruktur | Sikkerhetsrevisjon og logging for tilgang til medisinsk utstyr pa nettverket |

---

## Nettverksarkitektur for medisinsk utstyr

### Typiske nettverkssoner pa sykehus

| Sone | Innhold | Sikkerhetsniva |
|---|---|---|
| **Klinisk VLAN** | EPJ-arbeidsstasjoner, kliniske applikasjoner | Hoyt -- autentisert tilgang |
| **Medisinsk utstyr-VLAN** | Pasientmonitorer, respiratorer, infusjonspumper | Middels-hoyt -- isolert fra internett, utstyrsspesifikke brannmurregler |
| **Bilde-VLAN** | PACS, modaliteter (CT, MRI, ultralyd) | Hoyt -- store datamengder, DICOM-trafikk |
| **Gjest/offentlig** | Pasient-WiFi, besokstilgang | Lavt -- fullstendig isolert fra kliniske systemer |

### Klinisk ingeniorfagets rolle i nettverksintegrasjon

- **Klargjoring av utstyr:** Konfigurere IP-adresser, VLAN-tilordninger, HL7/DICOM-parametre
- **Grensesnitttesting:** Verifisere at meldinger flyter korrekt mellom utstyr og mottakssystemer
- **Cybersikkerhet:** Delta i sarbarhetsvurdering av utstyr, oppdateringshandtering og hendelsesrespons
- **Endringsstyring:** Koordinere programvareoppdateringer for utstyr med IT for a hindre tjenesteavbrudd
- **IEC 80001-1-etterlevelse:** Delta i risikostyring for IT-nettverk som inkorporerer medisinsk utstyr

---

## Vanlige integrasjonsproblemer

| Problem | Arsak | Tiltak fra klinisk ingeniorfag |
|---|---|---|
| Vitale parametre vises ikke i EPJ | HL7-grensesnitt nede, uoverensstemmelse i meldingsformat, nettverkstilkobling | Sjekk HL7-porttilkobling, undersok meldingslogger, verifiser OBX-mapping |
| Feil pasientdata pa monitor | ADT-feed oppdaterer ikke, uoverensstemmelse i pasient-ID | Verifiser ADT-meldingsflyt, sjekk PID-segmentmapping, involver IT |
| DICOM-bilder nar ikke PACS | C-STORE-tilkobling avvist, uoverensstemmelse i AE-tittel, brannmur blokkerer | Verifiser at AE-titler stemmer i begge ender, sjekk DICOM-port (104), test med C-ECHO |
| Alarmvarsler videresendes ikke | ACM-profil feilkonfigurert, nettverksforsinkelse | Sjekk regler for alarmvideresending, verifiser mellomvaretilkobling |
| Utstyr frakoblet etter nettverksendring | IP-konflikt, VLAN-endring, oppdatering av brannmurregler | Verifiser utstyrets nettverkskonfigurasjon, koordiner med IT for nettverksendringer |
