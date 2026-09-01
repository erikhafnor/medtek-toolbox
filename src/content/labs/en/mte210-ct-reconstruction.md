---
title: "3D Reconstruction and Printing Lab"
course: "MTE210"
shortTitle: "3D reconstruction"
description: "Segmenting a CT volume in 3D Slicer, exporting a watertight STL, and 3D printing the hidden object found in the CT imaging lab"
equipment:
  - "Lab PC running 3D Slicer"
  - "Desktop FDM 3D printer"
  - "The reconstructed CT volume from the CT Imaging and Radiation Lab"
prerequisites:
  - "Completed the CT Imaging and Radiation Lab, with your exported slice stack"
  - "3D Slicer installed on the lab PC"
duration: "2 hours 45 minutes"
---

> **This lab continues the CT Imaging and Radiation Lab.** Bring the reconstructed volume you acquired there — the part numbering carries on from it, so the steps below start at Part 4.

## Learning Objectives

By the end of this lab you will be able to:

- Export a reconstructed volume and import it as an image stack into 3D Slicer with the correct voxel spacing
- Segment a structure of interest by grey-value thresholding, generate a 3D surface model, and export a watertight STL file
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
3. Note the **voxel spacing** recorded in the imaging lab — you will need it in Part 4.2, and the print comes out the wrong size without it.

---

## Procedure

### Part 4 — Export and Segmentation in 3D Slicer (45 min)

**4.1 Export the volume.** In measureCT, export the reconstructed volume as a stack of slice images (use the **Volview** export / save-image option to generate the bmp slice series, or save the reconstructed slices to a folder). Save the whole stack into one empty folder.

**4.2 Import into 3D Slicer.** Open **3D Slicer** on the lab PC. Drag the folder of slice images into the Slicer window (or use *Add Data*), and load the series **as a volume / image stack**. Because the exported images carry no scale information, set the **voxel spacing manually**: this scan reconstructs at **0.096 mm per voxel** in all three directions. Correct spacing is what makes your final 3D print the right physical size.

**4.3 Segment the tooth.** Open the **Segment Editor** module.

1. Create a new segmentation and add a segment named `tooth`.
2. Select the **Threshold** effect. Drag the lower threshold up until only the bright, dense tooth is highlighted and the surrounding nut is excluded. Apply.
3. Use the **Islands** effect → *Keep largest island* to remove stray speckles, then the **Smoothing** effect (median or a small Gaussian) to clean the surface.
4. Switch on the 3D view (the *Show 3D* button) to inspect the segmented tooth from all angles. Refine the threshold if parts are missing or merged.

**4.4 Export an STL.** Export the segment as a surface model: in the **Segmentations** module (or right-click the segmentation in *Data*), choose *Export to files* and save as **STL**. Confirm the model is **watertight** (a closed surface) so it can be printed.

> If the tooth comes out hollow or full of holes, your threshold was too high or smoothing too aggressive — go back to step 4.3 and adjust.

---

### Part 5 — 3D Printing (30 min + print time)

**5.1** Open the STL in the printer's slicing software (e.g. Cura or PrusaSlicer). Check that the dimensions match your measurement from the CT imaging lab (Part 3.4) — if not, the voxel spacing in Part 4.2 was wrong.

**5.2** Orient the model for printing, add supports if needed, and slice with the settings recommended for your lab printer. A small layer height (e.g. 0.1–0.15 mm) captures fine detail on a small object like a tooth.

**5.3** Print the tooth. You keep your print. While it prints, complete the review questions.

---

### Part 6 — Review Questions (15 min)

Answer in your lab notebook; you will discuss these with the group.

1. Explain the difference between **tube voltage (kV)** and **tube current (mA)** and how each affects image contrast, image noise, and dose.
2. Why does the **number of projections** matter? What would you expect to see in the reconstruction if you used far fewer projections?
3. What is the **centre of rotation**, and what artefact appears in the slices when it is set incorrectly?
4. You exported plain image files with no scale information and had to set the **voxel spacing** manually in 3D Slicer. What goes wrong with the 3D print if this value is incorrect, and how would you catch the error before printing?
5. State the three pillars of **ALARA** and give one concrete example of each — first for this benchtop cabinet, then for a clinical CT examination.
6. The hidden object reconstructs much **brighter** than the nut around it. Explain, in terms of X-ray attenuation, why a dense object appears this way.

---

---

## Lab Report Requirements

Submit a typed lab report by the date specified in the course schedule. The report must include:

- A title page with your name, student number, course code (MTE210), and date
- A description of your **3D Slicer segmentation** workflow, including your threshold choice and a screenshot of the 3D model
- The **voxel spacing** you set and the final printed dimensions, with a comment on whether they matched
- A photo of your finished 3D print
- Written answers to the review questions (Part 6)
- A brief conclusion (150–200 words) on post-processing: how acquisition and segmentation choices propagate into the printed object
