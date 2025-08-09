import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createClient();

  const { data: user, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "ایمیل یافت نشد" }, { status: 401 });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  const response = NextResponse.json({ success: true });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
  });

  return response;
}
