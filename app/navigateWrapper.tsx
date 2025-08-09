"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navigation>{children}</Navigation>;
}
