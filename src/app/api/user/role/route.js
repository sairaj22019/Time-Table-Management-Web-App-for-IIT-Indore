// src/app/api/user/role/route.js
import { auth } from "@/lib/authOptions";
export async function GET(req) {
  const session = await auth(); // new v5 method
  if (!session || !session.user) {
    return Response.json({ role: null }, { status: 401 });
  }

  return Response.json({ role: session.user.role });
}
