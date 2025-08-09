"use client";

import Navigation from "@/app/components/Navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<string>("home");

  return <Navigation>{children}</Navigation>;
}
