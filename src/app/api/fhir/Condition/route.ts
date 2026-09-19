import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const patient = url.searchParams.get("patient");

  let conditions = [];

  if (patient === "erXuFYUfucBZaryVksYEcMg3") {
    // Camila Lopez
    conditions = [
      { id: "c1", name: "Mild to moderate Chronic Obstructive Pulmonary Disease (COPD)", date: "2025-10-12" },
      { id: "c2", name: "Essential hypertension", date: "2023-04-05" }
    ];
  } else if (patient === "eq081-VQEgP8drUUqCWzHfw3") {
    // Derrick Lin
    conditions = [
      { id: "c3", name: "Type 2 diabetes mellitus", date: "2024-01-20" },
      { id: "c4", name: "Hyperlipidemia", date: "2024-01-20" }
    ];
  } else {
    // Jessica
    conditions = [
      { id: "c5", name: "Acute bronchitis", date: "2026-05-10" }
    ];
  }

  return NextResponse.json({
    resourceType: "Bundle",
    entry: conditions.map(c => ({
      resource: {
        resourceType: "Condition",
        id: c.id,
        code: { text: c.name },
        recordedDate: c.date
      }
    }))
  });
}
