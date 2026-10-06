---
title: "3D Reconstruction and Printing Lab"
course: "MTE210"
shortTitle: "3D reconstruction"
description: "Segmenting a CT volume in 3D Slicer, exporting a watertight STL, and 3D printing the hidden object found in the CT imaging lab"
equipment:
  - "Lab PC running 3D Slicer"
  - "Desktop FDM 3D printer"
  - "The reconstructed CT volume from the CT Imaging and Radiation Lab"
  - "Access to the course PACS (the reference study is retrieved from it)"
prerequisites:
  - "Completed the CT Imaging and Radiation Lab, with your exported slice stack"
  - "3D Slicer installed on the lab PC"
  - "PACS login, handed out by the lab supervisor"
duration: "2 hours 45 minutes"
---

> **This lab continues the CT Imaging and Radiation Lab.** Bring the reconstructed volume you acquired there — the part numbering carries on from it, so the steps below start at Part 4.

## Learning Objectives

By the end of this lab you will be able to:

- Export a reconstructed volume and import it as an image stack into 3D Slicer with the correct voxel spacing
- Retrieve a CT volume from a PACS using DICOM query/retrieve, and explain why a DICOM object carries its own geometry when a plain image stack does not
- Segment a structure of interest by grey-value thresholding, generate a 3D surface model, and export a watertight STL file
- Distinguish post-processing that changes your measurement from post-processing that only changes the display, and quantify what each step costs
- Prepare and 3D print the segmented object and assess how acquisition and segmentation choices affect the final print

---

## Safety Notes

- **3D printer:** the nozzle and bed are hot during and after printing. Use the printer only as instructed, keep hands clear of moving parts, and let prints cool before removing them.
- Do not leave a print running unattended unless the lab supervisor has approved it.

---

## Equipment Setup

This lab runs on a lab PC with **3D Slicer** and a desktop FDM **3D printer**. No X-rays are involved: you work from the volume your group reconstructed in the CT imaging lab.

1. Copy your exported slice stack onto the lab PC, keeping the whole stack in one empty folder.
2. Confirm **3D Slicer** starts and that the 3D printer is powered, levelled, and loaded with filament.
3. Have the **voxel spacing** you recorded in the imaging lab (Part 3.3) ready — you will need it in Part 4.2, and the print comes out the wrong size without it.
4. Open the **DICOM** module in 3D Slicer once and confirm it starts without errors. If you see `Driver not loaded` or `database not open` in the Python console, Slicer cannot open its local DICOM database and Part 4.3 will fail *after* the query appears to succeed. Tell the lab supervisor before going further.

---

## Procedure

### Part 4 — Segmentation in 3D Slicer (80 min)

You work with **two** volumes in this part: your own from the CT imaging lab, and a shared reference study held in the course PACS. Same method, two different walnuts. That the two do not give the same number is not a fault — it is the point of Part 4.5.

**4.1 Check your own slice stack.** You exported the reconstructed volume at the end of the CT imaging lab (Part 3.3), so start by confirming the whole stack is on the lab PC in one empty folder and that the slices open. If you never exported it, or the stack is incomplete, go back to the measureCT PC and export it now using the **Volview** export / save-image option, which produces the bmp slice series.

> **Use the bmp export, not the tiff files measureCT writes into `raw/reconstruction`.** Those tiffs carry invalid resolution tags — `XResolution` and `YResolution` are stored as the rational 1000000/0 — and 3D Slicer rejects the whole series with "load failed" on the very first file. The pixel data is fine; the tags are broken. This is a bug in measureCT, and a useful illustration that a file can be perfectly readable to one program and useless to another.

**4.2 Import your own volume into 3D Slicer.** Open **3D Slicer** on the lab PC. Drag the folder of slice images into the Slicer window (or use *Add Data*), and load the series **as a volume / image stack**. Because the exported images carry no scale information, set the **voxel spacing manually** to the value measureCT reported and you wrote down in the imaging lab (Part 3.3): with the geometry and binning used there that is the binned detector pitch over the magnification, 0.096 mm ÷ 1.2 = **0.080 mm per voxel** in all three directions. Use the figure measureCT reported rather than this one if the two disagree. Correct spacing is what makes your final 3D print the right physical size.

**4.3 Retrieve the reference study from the PACS.** 3D Slicer has a built-in DICOM client. Open the **DICOM** module, expand **DICOM networking**, and enter the server:

| Field | Value |
|---|---|
| Host | `pacs.ux.uis.no` |
| Port | ⟨to be filled in by the lab supervisor⟩ |
| Called AE title | `DCM4CHEE` |
| Calling AE title | ⟨to be filled in by the lab supervisor⟩ |
| Retrieve protocol | C-GET |

Query on **Patient ID `XR40-CT1`** or **Accession `MTE210-CT1`**, select the series, and retrieve it. You should get one study with one series of **460 slices**.

> Notice that you do **not** have to set the voxel spacing for this series. Your own stack is plain image files with no scale information, whereas the DICOM object carries its own geometry in the `PixelSpacing` and `SliceThickness` tags. This is the entire point of an imaging standard in a hospital network: the receiver should not have to be told out-of-band how big a pixel is. Compare with how you had to handle your own stack in Part 4.2.

**4.4 Segment the tooth.** Do this on **both** volumes. Open the **Segment Editor** module, create a segmentation, and add a segment named `tooth`.

1. **Threshold.** Select the **Threshold** effect and drag the lower bound up until only the bright, dense tooth is highlighted and the surrounding nut is excluded. Do not hunt for one correct number — hunt for the **plateau**: raise the threshold in steps and watch how much stays highlighted. Above a certain point it barely changes; below it, the shell suddenly floods in. Somewhere in the middle of that plateau is a robust choice. For the reference study the plateau runs roughly from **18 000 to 30 000**, where the whole range gives the same object to within 15%, while 15 000 pulls in the shell and multiplies the volume many times over. Your own acquisition will have different numbers — find your own plateau the same way. Apply.

2. **Remove stray speckles.** Select the **Islands** effect → ***Remove small islands***, set *Minimum size* to **100 voxels**, and Apply. This clears free-floating noise and leaves the tooth itself untouched.

   > Do not use *Keep largest island* here, tempting as it is. In the reference study there are, alongside the tooth, three or four connected pieces totalling about 2 mm³ — some 4% of the object. *Keep largest island* would delete every one of them without saying so, leaving you with a clean result and no idea what went missing.

3. **Judge what is left.** After step 2 you have the tooth plus a few pieces. They are too large to dismiss as noise and too small to assume are tooth. Scroll to them in the slice views and look: are they chips off the tooth, dense inclusions in the shell, or something else? Record what you kept, what you removed, and why. This is a judgement call, not a button.

4. **Show in 3D.** Switch on ***Show 3D*** and inspect the tooth from all angles. Click in the 3D view and press `r` to fit the view; `Ctrl` + scroll wheel zooms.

> **Three tools that all look like "smoothing" and do entirely different things:**
>
> | Tool | Acts on | Changes your measurement? |
> |---|---|---|
> | **Islands** | disconnected components | yes, but only whole pieces at a time |
> | **Smoothing** effect | the segmentation itself (labelmap) | **yes** |
> | **Show 3D** → *Smoothing factor* | the 3D display only | **no** |
>
> Roughness that is **attached** to the main body cannot be removed by *Islands*, by definition. That is a common misconception and worth proving to yourself: run *Remove small islands* and watch the rough surface stay exactly where it was.

**4.5 Measure, and quantify what the post-processing costs.** Open the **Segment Statistics** module and enable both the **Labelmap** and the **Closed surface** plugins. Each reports its own `Volume mm3`: one computed from voxel count, the other from the surface mesh. Slicer's documentation states the two should agree to within one percent.

Set the *Smoothing factor* in **Show 3D** to three different values and fill in the table for both volumes:

| Smoothing factor | Labelmap volume | Closed-surface volume | Difference |
|---|---|---|---|
| 0.5 (default) | | | |
| 0.1 | | | |
| 0 | | | |

The labelmap column should not move — display smoothing never touches the data. The surface column will. Note the value at which the difference crosses one percent.

Then compare the two teeth: your own volume against the reference study. They are different teeth, so the numbers should not match — but discuss in your group how much of the difference is the teeth, and how much is two groups choosing thresholds independently.

> Be aware that the values in these volumes are **not Hounsfield units**. A clinical CT is calibrated so that air is −1000 HU and water 0 HU; the benchtop scanner is not calibrated, so the grey values are arbitrary numbers comparable only within a single acquisition. The threshold you found therefore does not transfer to anyone else's scan.

**4.6 Export an STL.** In the **Segmentations** module (or right-click the segmentation in *Data*), choose *Export to files* and save as **STL**. Confirm the model is **watertight** (a closed surface) so it can be printed.

> **The model you measure and the model you print are not the same model.** The surface straight off the threshold is rough at the voxel scale, which gives stringing and ugly artefacts on an FDM print. For printing it is therefore reasonable to run the **Smoothing** effect → *Median* at the smallest kernel (0.24 mm, i.e. 3 voxels) — it costs under one percent of the volume, and the documentation describes it as the method that "removes small extrusions and fills small gaps while keeps smooth contours mostly unchanged". But do it on a **copy**: the volume you report in Part 4.5 must come from the unprocessed segmentation. State in your walkthrough which model is which. This goes wrong in real clinical 3D printing all the time.

> If the tooth comes out hollow or full of holes, your threshold was too high or smoothing too aggressive — go back to step 4.4 and adjust.

---

### Part 5 — 3D Printing (30 min + print time)

**5.1** Open the STL — the print copy from Part 4.6 — in the printer's slicing software (e.g. Cura or PrusaSlicer). Check that the dimensions match your measurement from the CT imaging lab (Part 3.4) — if not, the voxel spacing in Part 4.2 was wrong. If you print the reference study rather than your own acquisition, remember it is a different tooth from the one you measured.

**5.2** Orient the model for printing, add supports if needed, and slice with the settings recommended for your lab printer. A small layer height (e.g. 0.1–0.15 mm) captures fine detail on a small object like a tooth.

**5.3** Start the print. A tooth at 0.1–0.15 mm layer height typically takes one to three hours — far longer than the rest of the session — so before you start it, agree with the lab supervisor who keeps an eye on the printer and when you can collect your print. Never leave it running with nobody present. While the first layers go down, complete the review questions. You keep your print.

---

### Part 6 — Review Questions (15 min)

Answer in your lab notebook; you will discuss them with the group and with the lab engineer.

1. Explain the difference between **tube voltage (kV)** and **tube current (mA)** and how each affects image contrast, image noise, and dose.
2. Why does the **number of projections** matter? What would you expect to see in the reconstruction if you used far fewer projections?
3. What is the **centre of rotation**, and what artefact appears in the slices when it is set incorrectly?
4. You exported plain image files with no scale information and had to set the **voxel spacing** manually in 3D Slicer, while the series you retrieved from the PACS set itself correctly. What does the DICOM file carry that the bmp files do not, and what goes wrong with the 3D print if you set the value incorrectly?
5. State the three pillars of **ALARA** and give one concrete example of each — first for this benchtop cabinet, then for a clinical CT examination.
6. The hidden object reconstructs much **brighter** than the nut around it. Explain, in terms of X-ray attenuation, why a dense object appears this way.
7. The grey values in this volume are **not Hounsfield units**. What would have to be done to the scanner for them to be, and why can you therefore not quote your threshold as a value another group can use directly?
8. Zoom in on the inside of the tooth. Large areas are **uniformly white**, with no structure. This is not because the tooth is homogeneous — the values have hit the ceiling of 65 535 and are being clipped. What does that mean for your ability to say anything about density differences *inside* the tooth, and which acquisition parameter would you change to avoid it?
9. In Part 4.4 you removed around 125 small islands totalling about 0.1 mm³, but kept a few pieces totalling about 2 mm³. How did you decide where the line fell? What would *Keep largest island* have done with those pieces, and why would you not have noticed?

---

## Approval

You are approved in the lab once you can show and explain the following to the lab engineer:

- The voxel spacing you set and where the value came from (Part 4.2), and the reference study retrieved from the PACS — with an explanation of why it needed no such treatment (Part 4.3)
- Your segmented tooth in both volumes, the threshold you settled on and how you found the plateau, and which pieces you kept or discarded in the islands step and why (Part 4.4)
- The completed table from Part 4.5, where you can point to the column that does not move and say why
- The exported STL, shown to be watertight, and the model prepared in the slicing software with its dimensions checked against your size estimate from the CT imaging lab (Parts 4.6 and 5.1)
- Your print — finished or still running — and how orientation, supports and layer height were chosen (Parts 5.2 and 5.3)
- Your answers to the review questions in Part 6, in your own words

There is no written hand-in.
