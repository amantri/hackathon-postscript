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

export interface Recommendation {
  id: string;
  title: string;
  checked: boolean;
}

export interface Appointment {
  id: string;
  date: { month: string; day: string; year: string; };
  title: string;
  doctor: string;
}
