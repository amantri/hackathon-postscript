import { NextResponse } from 'next/server';
import { falkor } from '@/lib/falkordb';
import {
  SAMPLE_PATIENTS,
  PATIENT_MAP,
  CONDITIONS_MAP,
  MEDICATIONS_MAP,
  VITALS_MAP,
  RECOMMENDATIONS_MAP,
  APPOINTMENTS_MAP
} from '@/lib/fhir-mock-data';

export async function POST() {
  try {
    const db = await falkor;
    const graph = db.selectGraph('avs_graph');

    for (const patient of SAMPLE_PATIENTS) {
      // 1. Patient
      await graph.query(
        `MERGE (p:Patient {id: $id}) SET p.name = $name, p.dob = $dob, p.gender = $gender`,
        { params: patient }
      );

      const pid = patient.id;

      // 2. Conditions
      if (CONDITIONS_MAP[pid]) {
        for (const c of CONDITIONS_MAP[pid]) {
          await graph.query(
            `MATCH (p:Patient {id: $pid})
             MERGE (c:Condition {id: $id}) SET c.name = $name, c.date = $date
             MERGE (p)-[:HAS_CONDITION]->(c)`,
            { params: { pid, id: c.id, name: c.name, date: c.date || "" } }
          );
        }
      }

      // 3. Medications
      if (MEDICATIONS_MAP[pid]) {
        for (const m of MEDICATIONS_MAP[pid]) {
          await graph.query(
            `MATCH (p:Patient {id: $pid})
             MERGE (m:Medication {id: $id}) SET m.name = $name, m.instructions = $instructions
             MERGE (p)-[:IS_PRESCRIBED]->(m)`,
            { params: { pid, id: m.id, name: m.name, instructions: m.instructions } }
          );
        }
      }

      // 4. Vitals
      if (VITALS_MAP[pid]) {
        for (const v of VITALS_MAP[pid]) {
          await graph.query(
            `MATCH (p:Patient {id: $pid})
             MERGE (v:VitalSign {id: $id}) SET v.name = $name, v.value = $value
             MERGE (p)-[:HAS_VITAL_RECORD]->(v)`,
            { params: { pid, id: v.id, name: v.name, value: v.value } }
          );
        }
      }

      // 5. Recommendations
      if (RECOMMENDATIONS_MAP[pid]) {
        for (const r of RECOMMENDATIONS_MAP[pid]) {
          await graph.query(
            `MATCH (p:Patient {id: $pid})
             MERGE (r:Recommendation {id: $id}) SET r.title = $title, r.checked = $checked
             MERGE (p)-[:HAS_RECOMMENDATION]->(r)`,
            { params: { pid, id: r.id, title: r.title, checked: r.checked } }
          );
        }
      }

      // 6. Appointments
      if (APPOINTMENTS_MAP[pid]) {
        for (const a of APPOINTMENTS_MAP[pid]) {
          await graph.query(
            `MATCH (p:Patient {id: $pid})
             MERGE (a:Appointment {id: $id}) 
             SET a.title = $title, a.doctor = $doctor, a.date_month = $month, a.date_day = $day, a.date_year = $year
             MERGE (p)-[:HAS_APPOINTMENT]->(a)`,
            { 
              params: { 
                pid, 
                id: a.id, 
                title: a.title, 
                doctor: a.doctor,
                month: a.date.month,
                day: a.date.day,
                year: a.date.year
              } 
            }
          );
        }
      }
    }

    return NextResponse.json({ success: true, message: "FalkorDB seeded successfully with FHIR mock data" });
  } catch (err: any) {
    console.error("Seeding error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// Allow GET request for easy triggering from the browser
export async function GET() {
  return POST();
}
