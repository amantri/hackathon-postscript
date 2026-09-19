import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const patient = url.searchParams.get("patient");

  let vitals = [];

  if (patient === "erXuFYUfucBZaryVksYEcMg3") {
    // Camila Lopez
    vitals = [
      { id: "v1", name: "Blood Pressure", value: 128, unit: "/ 82 mmHg" },
      { id: "v2", name: "Heart Rate", value: 72, unit: "bpm" },
      { id: "v3", name: "Oxygen Saturation", value: 94, unit: "%" }
    ];
  } else if (patient === "eq081-VQEgP8drUUqCWzHfw3") {
    // Derrick Lin
    vitals = [
      { id: "v4", name: "Blood Pressure", value: 140, unit: "/ 90 mmHg" },
      { id: "v5", name: "Heart Rate", value: 85, unit: "bpm" },
      { id: "v6", name: "HbA1c", value: 7.4, unit: "%" }
    ];
  } else {
    // Jessica
    vitals = [
      { id: "v7", name: "Temperature", value: 99.2, unit: "°F" },
      { id: "v8", name: "Heart Rate", value: 90, unit: "bpm" }
    ];
  }

  return NextResponse.json({
    resourceType: "Bundle",
    entry: vitals.map(v => ({
      resource: {
        resourceType: "Observation",
        id: v.id,
        code: { text: v.name },
        valueQuantity: { value: v.value, unit: v.unit }
      }
    }))
  });
}
