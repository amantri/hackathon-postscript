import { Patient, Condition, Medication, VitalSign, Recommendation, Appointment } from "./fhir-types";

export const SAMPLE_PATIENTS = [
  { id: "erXuFYUfucBZaryVksYEcMg3", name: "Camila Lopez", dob: "1980-05-15", gender: "female" },
  { id: "eq081-VQEgP8drUUqCWzHfw3", name: "Derrick Lin", dob: "1973-11-20", gender: "male" },
  { id: "eJ3Wn04gXqEayl4O26N-wEQ3", name: "Jessica Smith", dob: "1992-02-08", gender: "female" },
];

export const PATIENT_MAP: Record<string, Patient> = {
  "erXuFYUfucBZaryVksYEcMg3": { id: "erXuFYUfucBZaryVksYEcMg3", name: "Camila Lopez", dob: "1980-05-15", gender: "female" },
  "eq081-VQEgP8drUUqCWzHfw3": { id: "eq081-VQEgP8drUUqCWzHfw3", name: "Derrick Lin", dob: "1973-11-20", gender: "male" },
  "eJ3Wn04gXqEayl4O26N-wEQ3": { id: "eJ3Wn04gXqEayl4O26N-wEQ3", name: "Jessica Smith", dob: "1992-02-08", gender: "female" },
};

export const CONDITIONS_MAP: Record<string, Condition[]> = {
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

export const MEDICATIONS_MAP: Record<string, Medication[]> = {
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

export const VITALS_MAP: Record<string, VitalSign[]> = {
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

export const RECOMMENDATIONS_MAP: Record<string, Recommendation[]> = {
  "erXuFYUfucBZaryVksYEcMg3": [
    { id: "r1", title: "Schedule follow-up pulmonary function test", checked: false },
    { id: "r2", title: "Continue smoking cessation program", checked: true }
  ],
  "eq081-VQEgP8drUUqCWzHfw3": [
    { id: "r3", title: "Schedule diabetic eye exam", checked: false },
    { id: "r4", title: "Monitor blood sugar daily", checked: true },
    { id: "r5", title: "Maintain healthy diet and regular exercise", checked: true }
  ],
  "eJ3Wn04gXqEayl4O26N-wEQ3": [
    { id: "r6", title: "Rest and drink plenty of fluids", checked: true },
    { id: "r7", title: "Return if symptoms worsen", checked: false }
  ]
};

export const APPOINTMENTS_MAP: Record<string, Appointment[]> = {
  "erXuFYUfucBZaryVksYEcMg3": [
    { id: "a1", date: { month: "Oct", day: "12", year: "2026" }, title: "Follow-up Appointment", doctor: "Gregory House, MD" },
    { id: "a2", date: { month: "Jan", day: "05", year: "2027" }, title: "Pulmonology Consult", doctor: "James Wilson, MD" }
  ],
  "eq081-VQEgP8drUUqCWzHfw3": [
    { id: "a3", date: { month: "Nov", day: "20", year: "2026" }, title: "Endocrinology Follow-up", doctor: "Lisa Cuddy, MD" },
    { id: "a4", date: { month: "Dec", day: "15", year: "2026" }, title: "Annual Physical Exam", doctor: "Gregory House, MD" }
  ],
  "eJ3Wn04gXqEayl4O26N-wEQ3": [
    { id: "a5", date: { month: "Sep", day: "25", year: "2026" }, title: "Telehealth Check-in", doctor: "Allison Cameron, MD" }
  ]
};
