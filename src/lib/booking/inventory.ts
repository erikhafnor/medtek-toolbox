// Device inventory for the lab room.
//
// `quantity` is how many physical units the department owns. Overlapping
// bookings can never claim more units of a device than listed here — this is
// the file to edit when the real inventory changes.
//
// Fluke analyzers: one of each model (confirmed by course staff).
// Other quantities are best-effort estimates — ADJUST TO THE REAL INVENTORY.

export interface Device {
  key: string;
  /** English display name. */
  label: string;
  /** Norwegian display name. */
  labelNo: string;
  quantity: number;
}

export const DEVICES: Device[] = [
  // Fluke Biomedical analyzers — one of each model
  { key: 'fluke-esa615', label: 'Fluke ESA615 Electrical Safety Analyzer', labelNo: 'Fluke ESA615 elektrisk sikkerhetsanalysator', quantity: 1 },
  { key: 'fluke-prosim8', label: 'Fluke ProSim 8 Patient Simulator', labelNo: 'Fluke ProSim 8 pasientsimulator', quantity: 1 },
  { key: 'fluke-qaes3', label: 'Fluke QA-ES III Electrosurgery Analyzer', labelNo: 'Fluke QA-ES III elektrokirurgianalysator', quantity: 1 },
  { key: 'fluke-impulse7000', label: 'Fluke Impulse 7000DP Defibrillator Analyzer', labelNo: 'Fluke Impulse 7000DP defibrillatoranalysator', quantity: 1 },
  { key: 'fluke-ida5', label: 'Fluke IDA-5 Infusion Device Analyzer', labelNo: 'Fluke IDA-5 infusjonspumpeanalysator', quantity: 1 },
  { key: 'fluke-vt900a', label: 'Fluke VT900A Gas Flow Analyzer', labelNo: 'Fluke VT900A gasstrømanalysator', quantity: 1 },

  // Medical devices and other test equipment — estimated counts
  { key: 'lifepak15', label: 'LIFEPAK 15 Defibrillator/Monitor', labelNo: 'LIFEPAK 15 defibrillator/monitor', quantity: 2 },
  { key: 'keysight-scope', label: 'Keysight InfiniiVision Oscilloscope', labelNo: 'Keysight InfiniiVision oscilloskop', quantity: 2 },
  { key: 'olympus-ues40', label: 'Olympus UES-40 Electrosurgical Unit', labelNo: 'Olympus UES-40 diatermiapparat', quantity: 1 },
  { key: 'rapidvac', label: 'RapidVac Smoke Evacuator', labelNo: 'RapidVac røykavsug', quantity: 1 },
  { key: 'pagewriter-tc30', label: 'Philips PageWriter TC30 Electrocardiograph', labelNo: 'Philips PageWriter TC30 EKG-apparat', quantity: 1 },
  { key: 'braun-infusomat', label: 'B. Braun Infusomat Space Volumetric Pump', labelNo: 'B. Braun Infusomat Space volumetrisk pumpe', quantity: 2 },
  { key: 'braun-perfusor', label: 'B. Braun Perfusor Space Syringe Pump', labelNo: 'B. Braun Perfusor Space sprøytepumpe', quantity: 2 },
  { key: 'ge-logic-s8', label: 'GE Logic S8 Ultrasound', labelNo: 'GE Logic S8 ultralydapparat', quantity: 1 },
  { key: 'kyoto-n365', label: 'Kyoto Kagaku N-365 Ultrasound Phantom', labelNo: 'Kyoto Kagaku N-365 ultralydfantom', quantity: 1 },
  { key: 'draeger-evita-xl', label: 'Dräger Evita XL Ventilator', labelNo: 'Dräger Evita XL respirator', quantity: 1 },
  { key: 'phywe-xr4', label: 'PHYWE XR 4.0 Benchtop X-ray/CT Unit', labelNo: 'PHYWE XR 4.0 røntgen/CT-benkenhet', quantity: 1 },
  { key: 'alaris-cc', label: 'CareFusion Alaris CC Syringe Pump', labelNo: 'CareFusion Alaris CC sprøytepumpe', quantity: 8 },
  { key: 'philips-intellivue', label: 'Philips IntelliVue Patient Monitor', labelNo: 'Philips IntelliVue pasientmonitor', quantity: 1 },
];

export const DEVICE_MAP: Record<string, Device> = Object.fromEntries(
  DEVICES.map((d) => [d.key, d])
);

// Maps strings from a lab's `equipment` frontmatter to inventory devices.
// Model numbers are language-neutral, so the same patterns work for EN and NO.
// Equipment with no match (hand tools, ESD mats, software, phantoms of which
// we have plenty…) is not capacity-constrained.
const EQUIPMENT_MATCHERS: Array<{ pattern: RegExp; device: string }> = [
  { pattern: /ESA615/i, device: 'fluke-esa615' },
  { pattern: /ProSim/i, device: 'fluke-prosim8' },
  { pattern: /QA-ES/i, device: 'fluke-qaes3' },
  { pattern: /Impulse\s*7000/i, device: 'fluke-impulse7000' },
  { pattern: /IDA-5/i, device: 'fluke-ida5' },
  { pattern: /VT900A/i, device: 'fluke-vt900a' },
  { pattern: /LIFEPAK\s*15/i, device: 'lifepak15' },
  { pattern: /oscilloscope|oscilloskop/i, device: 'keysight-scope' },
  { pattern: /UES-40/i, device: 'olympus-ues40' },
  { pattern: /RapidVac/i, device: 'rapidvac' },
  { pattern: /PageWriter/i, device: 'pagewriter-tc30' },
  { pattern: /Infusomat/i, device: 'braun-infusomat' },
  { pattern: /Perfusor/i, device: 'braun-perfusor' },
  { pattern: /Logic\s*S8/i, device: 'ge-logic-s8' },
  { pattern: /N-365/i, device: 'kyoto-n365' },
  { pattern: /Evita/i, device: 'draeger-evita-xl' },
  { pattern: /PHYWE|XR\s*4\.0/i, device: 'phywe-xr4' },
  { pattern: /Alaris/i, device: 'alaris-cc' },
  { pattern: /IntelliVue/i, device: 'philips-intellivue' },
];

/** Resolve a lab's equipment strings to the tracked devices it requires. */
export function devicesForEquipment(equipment: string[]): string[] {
  const found = new Set<string>();
  for (const item of equipment) {
    for (const { pattern, device } of EQUIPMENT_MATCHERS) {
      if (pattern.test(item)) {
        found.add(device);
        break;
      }
    }
  }
  return [...found];
}
