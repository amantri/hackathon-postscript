import { falkor } from "./falkordb";
import { Patient, Condition, Medication, VitalSign, Recommendation, Appointment } from "./fhir-types";
import { SAMPLE_PATIENTS } from "./fhir-mock-data";

export { SAMPLE_PATIENTS };
export type { Patient, Condition, Medication, VitalSign, Recommendation, Appointment };

// Helper to get graph
async function getGraph() {
  const db = await falkor;
  return db.selectGraph('avs_graph');
}

export async function getPatient(patientId: string): Promise<Patient | null> {
  const graph = await getGraph();
  const res = await graph.query(`MATCH (p:Patient {id: $id}) RETURN p`, { params: { id: patientId } });
  if (!res.data || res.data.length === 0) return null;
  const props = (res.data[0] as any).p.properties;
  return { id: props.id, name: props.name, dob: props.dob, gender: props.gender };
}

export async function getConditions(patientId: string): Promise<Condition[]> {
  const graph = await getGraph();
  const res = await graph.query(
    `MATCH (p:Patient {id: $id})-[:HAS_CONDITION]->(c:Condition) RETURN c`,
    { params: { id: patientId } }
  );
  if (!res.data) return [];
  return res.data.map((row: any) => ({
    id: row.c.properties.id,
    name: row.c.properties.name,
    date: row.c.properties.date
  }));
}

export async function getMedications(patientId: string): Promise<Medication[]> {
  const graph = await getGraph();
  const res = await graph.query(
    `MATCH (p:Patient {id: $id})-[:IS_PRESCRIBED]->(m:Medication) RETURN m`,
    { params: { id: patientId } }
  );
  if (!res.data) return [];
  return res.data.map((row: any) => ({
    id: row.m.properties.id,
    name: row.m.properties.name,
    instructions: row.m.properties.instructions
  }));
}

export async function getVitals(patientId: string): Promise<VitalSign[]> {
  const graph = await getGraph();
  const res = await graph.query(
    `MATCH (p:Patient {id: $id})-[:HAS_VITAL_RECORD]->(v:VitalSign) RETURN v`,
    { params: { id: patientId } }
  );
  if (!res.data) return [];
  return res.data.map((row: any) => ({
    id: row.v.properties.id,
    name: row.v.properties.name,
    value: row.v.properties.value
  }));
}

export async function getRecommendations(patientId: string): Promise<Recommendation[]> {
  const graph = await getGraph();
  const res = await graph.query(
    `MATCH (p:Patient {id: $id})-[:HAS_RECOMMENDATION]->(r:Recommendation) RETURN r`,
    { params: { id: patientId } }
  );
  if (!res.data) return [];
  return res.data.map((row: any) => ({
    id: row.r.properties.id,
    title: row.r.properties.title,
    checked: row.r.properties.checked
  }));
}

export async function getAppointments(patientId: string): Promise<Appointment[]> {
  const graph = await getGraph();
  const res = await graph.query(
    `MATCH (p:Patient {id: $id})-[:HAS_APPOINTMENT]->(a:Appointment) RETURN a`,
    { params: { id: patientId } }
  );
  if (!res.data) return [];
  return res.data.map((row: any) => ({
    id: row.a.properties.id,
    title: row.a.properties.title,
    doctor: row.a.properties.doctor,
    date: {
      month: row.a.properties.date_month,
      day: row.a.properties.date_day,
      year: row.a.properties.date_year
    }
  }));
}
