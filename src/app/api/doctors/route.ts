import { NextResponse } from "next/server";
import { getAboutDoctors, getDepartmentDoctors, getHomeDoctors } from "@/lib/doctors-content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placement = searchParams.get("placement");
  const department = searchParams.get("department");

  if (department) {
    const doctors = await getDepartmentDoctors(department);
    return NextResponse.json(doctors);
  }

  if (placement === "home") {
    const doctors = await getHomeDoctors();
    return NextResponse.json(doctors);
  }

  if (placement === "about") {
    const doctors = await getAboutDoctors();
    return NextResponse.json(doctors);
  }

  const doctors = await getHomeDoctors();
  return NextResponse.json(doctors);
}
