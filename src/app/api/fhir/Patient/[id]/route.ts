import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (id === "erXuFYUfucBZaryVksYEcMg3") {
    return NextResponse.json({
      resourceType: "Patient",
      id: "erXuFYUfucBZaryVksYEcMg3",
      name: [{ given: ["Camila"], family: "Lopez" }],
      birthDate: "1980-05-15",
      gender: "female"
    });
  } else if (id === "eq081-VQEgP8drUUqCWzHfw3") {
    return NextResponse.json({
      resourceType: "Patient",
      id: "eq081-VQEgP8drUUqCWzHfw3",
      name: [{ given: ["Derrick"], family: "Lin" }],
      birthDate: "1973-11-20",
      gender: "male"
    });
  } else {
    return NextResponse.json({
      resourceType: "Patient",
      id,
      name: [{ given: ["Jessica"], family: "Smith" }],
      birthDate: "1992-02-08",
      gender: "female"
    });
  }
}
