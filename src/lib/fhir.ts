export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
}

export interface Condition {
  id: string;
  name: string;
  date?: string;
}

export interface Medication {
  id: string;
  name: string;
  instructions: string;
}

export interface VitalSign {
  id: string;
  name: string;
  value: string;
}

export const SAMPLE_PATIENTS = [
  { id: "erXuFYUfucBZaryVksYEcMg3", name: "Camila Lopez", dob: "1980-05-15", gender: "female" },
  { id: "eq081-VQEgP8drUUqCWzHfw3", name: "Derrick Lin", dob: "1973-11-20", gender: "male" },
  { id: "eJ3Wn04gXqEayl4O26N-wEQ3", name: "Jessica Smith", dob: "1992-02-08", gender: "female" },
];

const FHIR_BASE = "/api/fhir";

export async function getPatient(patientId: string): Promise<Patient | null> {
  const map: Record<string, Patient> = {
    "erXuFYUfucBZaryVksYEcMg3": { id: "erXuFYUfucBZaryVksYEcMg3", name: "Camila Lopez", dob: "1980-05-15", gender: "female" },
    "eq081-VQEgP8drUUqCWzHfw3": { id: "eq081-VQEgP8drUUqCWzHfw3", name: "Derrick Lin", dob: "1973-11-20", gender: "male" },
    "eJ3Wn04gXqEayl4O26N-wEQ3": { id: "eJ3Wn04gXqEayl4O26N-wEQ3", name: "Jessica Smith", dob: "1992-02-08", gender: "female" },
  };
  return map[patientId] || null;
}

export async function getConditions(patientId: string): Promise<Condition[]> {
  const map: Record<string, Condition[]> = {
    "erXuFYUfucBZaryVksYEcMg3": [
      { id: "c1", name: "Mild to moderate Chronic Obstructive Pulmonary Disease (COPD)", date: "2025-10-12" },
      { id: "c2", name: "Essential hypertension", date: "2023-04-05" }
    ],
    "eq081-VQEgP8drUUqCWzHfw3": [
      { id: "c3", name: "Type 2 diabetes mellitus", date: "2024-01-20" },
      { id: "c4", name: "Hyperlipidemia", date: "2024-01-20" }
    ],
    "eJ3Wn04gXqEayl4O26N-wEQ3": [
      { id: "c5", name: "Acute bronchitis", date: "2026-05-10" }
    ]
  };
  return map[patientId] || [];
}

export async function getMedications(patientId: string): Promise<Medication[]> {
  const map: Record<string, Medication[]> = {
    "erXuFYUfucBZaryVksYEcMg3": [
      { id: "m1", name: "Trelegy Ellipta (fluticasone/umeclidinium/vilanterol) Inhaler", instructions: "Inhale once daily" },
      { id: "m2", name: "Salbutamol Inhaler", instructions: "Use as needed for quick relief for shortness of breath" }
    ],
    "eq081-VQEgP8drUUqCWzHfw3": [
      { id: "m3", name: "Metformin 500mg", instructions: "Take 1 tablet by mouth twice a day with meals" },
      { id: "m4", name: "Atorvastatin 20mg", instructions: "Take 1 tablet by mouth daily at bedtime" }
    ],
    "eJ3Wn04gXqEayl4O26N-wEQ3": [
      { id: "m5", name: "Amoxicillin 500mg", instructions: "Take 1 capsule by mouth 3 times a day for 7 days" }
    ]
  };
  return map[patientId] || [];
}

export async function getVitals(patientId: string): Promise<VitalSign[]> {
  const map: Record<string, VitalSign[]> = {
    "erXuFYUfucBZaryVksYEcMg3": [
      { id: "v1", name: "Blood Pressure", value: "128 / 82 mmHg" },
      { id: "v2", name: "Heart Rate", value: "72 bpm" },
      { id: "v3", name: "Oxygen Saturation", value: "94 %" }
    ],
    "eq081-VQEgP8drUUqCWzHfw3": [
      { id: "v4", name: "Blood Pressure", value: "140 / 90 mmHg" },
      { id: "v5", name: "Heart Rate", value: "85 bpm" },
      { id: "v6", name: "HbA1c", value: "7.4 %" }
    ],
    "eJ3Wn04gXqEayl4O26N-wEQ3": [
      { id: "v7", name: "Temperature", value: "99.2 °F" },
      { id: "v8", name: "Heart Rate", value: "90 bpm" }
    ]
  };
  return map[patientId] || [];
}
