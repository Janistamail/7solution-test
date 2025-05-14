import { NextResponse } from "next/server";

import type { UserResponse } from "@/lib/types";
import { transformUserData } from "@/lib/data";

async function fetchUsers() {
  const response = await fetch("https://dummyjson.com/users?limit=100");

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  const data: UserResponse = await response.json();
  return data.users;
}

export async function GET() {
  try {
    const users = await fetchUsers();
    const departmentData = transformUserData(users);
    return NextResponse.json(departmentData);
  } catch (error) {
    console.error("Error fetching department data:", error);
    return NextResponse.json(
      { error: "Failed to fetch department data" },
      { status: 500 }
    );
  }
}
