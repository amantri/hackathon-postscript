import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const patient = url.searchParams.get("patient");

  let meds = [];

  if (patient === "erXuFYUfucBZaryVksYEcMg3") {
    // Camila Lopez
    meds = [
      { id: "m1", name: "Trelegy Ellipta (fluticasone/umeclidinium/vilanterol) Inhaler", instructions: "Inhale once daily" },
      { id: "m2", name: "Salbutamol Inhaler", instructions: "Use as needed for quick relief for shortness of breath" }
    ];
  } else if (patient === "eq081-VQEgP8drUUqCWzHfw3") {
    // Derrick Lin
    meds = [
      { id: "m3", name: "Metformin 500mg", instructions: "Take 1 tablet by mouth twice a day with meals" },
      { id: "m4", name: "Atorvastatin 20mg", instructions: "Take 1 tablet by mouth daily at bedtime" }
    ];
  } else {
    // Jessica
    meds = [
      { id: "m5", name: "Amoxicillin 500mg", instructions: "Take 1 capsule by mouth 3 times a day for 7 days" }
    ];
  }

  return NextResponse.json({
    resourceType: "Bundle",
    entry: meds.map(m => ({
      resource: {
        resourceType: "MedicationRequest",
        id: m.id,
        medicationCodeableConcept: { text: m.name },
        dosageInstruction: [{ text: m.instructions }]
      }
    }))
  });
}
