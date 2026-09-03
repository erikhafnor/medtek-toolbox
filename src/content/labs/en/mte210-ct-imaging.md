---
title: "CT Imaging and Radiation Lab"
course: "MTE210"
shortTitle: "CT imaging"
description: "CT image acquisition on a benchtop X-ray CT, radiation protection, and volume reconstruction of a specimen with a hidden dense object"
equipment:
  - "PHYWE XR 4.0 benchtop X-ray / CT unit (XRstage rotation stage + XRIS detector)"
  - "measureCT acquisition & reconstruction software"
  - "Walnut specimen (with a hidden dense object)"
prerequisites:
  - "PHYWE XR 4.0 / measureCT documentation"
  - "Lecture notes on X-ray/CT physics and radiation protection (ALARA)"
duration: "2 hours 45 minutes"
---

## Learning Objectives

By the end of this lab you will be able to:

- Acquire a complete CT dataset on the PHYWE XR 4.0 benchtop CT, setting tube voltage (kV), tube current (mA), exposure time, and the number of projections
- Explain how a rotating series of X-ray projections is reconstructed into cross-sectional slices, and adjust the centre of rotation to obtain a sharp reconstruction
- Apply radiation protection principles (ALARA, time–distance–shielding, the inverse-square law) and relate the benchtop scan parameters to clinical CT dose and image quality

---

## Safety Notes

> **CLOSED-CABINET X-RAYS.** The PHYWE XR 4.0 is a fully shielded, type-approved X-ray cabinet. X-rays are only generated when the chamber door is closed and the safety interlock is engaged. The X-ray warning lamp lights whenever the tube is energised. **Never attempt to defeat, tape over, or bypass the door interlock.**


- Do not open the chamber door while the X-ray warning lamp is on. Opening the door cuts the high voltage automatically — do not rely on this as a routine "off" switch.
- Confirm the warning lamp is **off** before placing or removing the specimen.
- Keep the dose As Low As Reasonably Achievable (ALARA): do not run the tube longer than needed, and switch X-rays off between steps.
- Report any damaged cabling, doors, or interlocks to the lab supervisor immediately. Do not use a unit whose interlock does not work.

---

## Equipment Setup

This lab uses the PHYWE XR 4.0 X-ray expert unit with the **XRstage** rotation stage, the **XRIS** digital flat-panel detector, and the **measureCT** software. Segmentation in 3D Slicer and 3D printing of the hidden object come afterwards, in the separate 3D Reconstruction and Printing Lab.

1. Connect the XRstage rotation stage and the XRIS detector to the X-ray unit, and connect both to the PC via USB. Start the **measureCT** program and activate the software (Options → Activation Assistant) if prompted.
2. In the live view, confirm that the green indication LED is lit for the X-ray unit, the stage, and the detector — this means each component has been detected.
3. Mount the specimen — a **walnut** — on the rotation stage so it sits centred in the X-ray beam and close to the detector: the stage position has to give the SOD = 250 mm / SDD = 300 mm geometry of step 4, so the walnut ends up about 50 mm in front of the detector. Mounting it halfway between tube and detector instead would give a magnification of 2.0× rather than 1.2×, which changes the reconstructed voxel size and can push the projected nut off the edge of the detector. Close the chamber door.

   ![Walnut mounted on the XRstage rotation stage, with the XRIS detector behind it](/labs/ct-imaging/01-setup-walnut-stage.jpg)

4. Note the source-to-object distance (**SOD**) and source-to-detector distance (**SDD**). For this lab use **SOD = 250 mm** and **SDD = 300 mm**, giving a geometric magnification of SDD/SOD = 1.2×.

   ![Beam geometry inside the chamber: X-ray source, rotation stage with specimen, and detector](/labs/ct-imaging/02-chamber-geometry.jpg)

5. **Calibrate the detector** before acquiring any data, with the beam path empty. Do this *before* you mount the walnut in step 3 — or, if it is already on the stage, switch the X-rays off, wait for the warning lamp to go out, and take it off again. Set the kV and mA you will use for the scan (Part 2.2), leave the stage empty, close the chamber door, and click **Calibrate**. The calibration records both a dark frame with the tube off, which gives the detector's offset, and a flat field with the tube on and nothing in the beam, which gives the per-pixel gain; every image you record afterwards is corrected with them automatically. The red LED on the Calibrate button turns green when calibration succeeds. Remount the walnut only once the calibration has finished and the warning lamp is out.

> Recalibrate whenever you change kV, mA, binning, or detector position — the previous calibration is no longer valid.

---

## Procedure

### Part 1 — Radiation Safety and CT Physics Briefing (30 min)

Before acquiring data, work through the following with your group and record short answers in your lab notebook.

A CT image is built from many X-ray **projections** taken as the specimen rotates. Each projection records how much the X-ray beam is attenuated along every ray path; the reconstruction algorithm (filtered back-projection) combines all projections into a stack of cross-sectional **slices**, which together form a 3D **volume**.

**1.1** Two tube settings dominate the result:

- **Tube voltage (kV)** controls the *energy* (penetrating power) of the X-rays and therefore image contrast. Higher kV penetrates dense material more easily but reduces contrast between materials.
- **Tube current (mA)** controls the *number* of X-ray photons (flux) and therefore image noise. Higher mA gives a cleaner, less noisy image but increases dose.

**1.2** Discuss and note: for a fixed image quality, which three operator actions reduce radiation exposure to people? (Hint: **time, distance, shielding**, and the **inverse-square law**.) Why is the inverse-square law so powerful for distance?

**1.3** The XR 4.0 is a fully enclosed cabinet, so operator dose is negligible. A **clinical** CT scanner exposes the patient directly. For comparison, note typical effective doses: a head CT delivers roughly 2 mSv and a chest CT roughly 5–7 mSv, against a natural background of about 3 mSv per year. Why does the same ALARA principle still apply in the clinic, and who is being protected there?

---

### Part 2 — CT Acquisition (45 min)

**2.1** With the walnut mounted and the chamber door closed, switch on the X-rays and open the **Live view**. Adjust the contrast so the walnut is clearly visible. Watch the **detector exposure load bar**: it must stay **below** the maximum fill level. If it turns red, the detector is saturating — reduce mA or exposure time. If you need to move the specimen, switch the X-rays off and wait for the warning lamp to go out before opening the door.

**2.2** Set the acquisition parameters. These values give good results for a walnut on this unit:

| Parameter | Value |
|---|---|
| Tube voltage | 35 kV |
| Tube current | 1.0 mA |
| Exposure time | 0.5 s |
| Frames (averaged) | 1 |
| Binning | 500 × 500 |
| Number of projections | 200 |
| Angular range | 360° |
| SOD / SDD | 250 mm / 300 mm |

**2.3** Look carefully at the live projection of the walnut. **You should see a dense object hidden inside the shell** — it absorbs more X-rays than the nut meat and appears darker on the projection. Note in your notebook what you think it is and why it looks the way it does.

![measureCT acquisition page: the rotating walnut projection (left) reveals a dense object inside the shell](/labs/ct-imaging/03-measureCT-acquisition.jpg)

**2.4** Go to the **CT Scan** page and start the scan. The software shows the scan progress, the current projection, and a live preview reconstruction. Let all 200 projections complete.

![Projection of the walnut during the scan — the dense hidden object is clearly visible, with a preview slice below](/labs/ct-imaging/04-projection-hidden-object.jpg)

---

### Part 3 — Reconstruction (30 min)

**3.1** Move to the **Reconstruction** page. The most important parameter is the **Centre of Rotation (COR)**. If it is wrong, the slices blur or show double edges.

**3.2** Click **Test** to reconstruct a single slice. Adjust the COR value (start near 254 for 500 × 500 binning) and re-test until the slice looks sharp — edges crisp, no doubling, the hidden object well defined.

**3.3** When a test slice is sharp, click **Reconstruct** to reconstruct the full volume. When it has finished, export the volume as a stack of slice images into one empty folder, and write down the reconstructed **voxel spacing** in mm per voxel that measureCT reports. In object space that is the binned detector pitch divided by the geometric magnification — 0.096 mm ÷ 1.2 = **0.080 mm per voxel** with the geometry and binning used here. Write down what measureCT actually reports: if it disagrees with 0.080 mm, trust the software and tell the supervisor, because the print size depends on this one number. You need both the exported stack and the voxel spacing in the 3D Reconstruction and Printing Lab — without them the 3D print comes out the wrong size.

**3.4** Open the **3D View**. Inspect the volume in the axial, sagittal, and coronal slice windows and in the 3D rendering. Identify the hidden object in all three slice directions and estimate its size in millimetres.

![3D viewer: axial, sagittal, coronal slices and a 3D rendering of the scanned walnut](/labs/ct-imaging/05-3d-viewer.png)

The dense object inside the walnut is a **human tooth** — your target for segmentation and 3D printing. In a reconstructed transverse slice it stands out brightly against the much less dense nut:

![Transverse reconstruction slice — the bright, dense hidden object inside the walnut shell](/labs/ct-imaging/06-transverse-hidden-object.png)

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- The acquisition parameters you used (Part 2.2) and a live projection of the walnut in which you can point out the hidden dense object and say what it is (Part 2.3)
- How you tuned the **centre of rotation** (Part 3.2) — show a blurred and a sharp test slice — and the reconstructed volume with the hidden object identified in all three slice directions and its size in millimetres (Part 3.4)
- Your answers to the radiation protection and CT physics questions in Part 1 (1.2 and 1.3), in your own words
- The exported slice stack and the voxel spacing you noted in Part 3.3, which you need in the next lab

There is no written hand-in.
