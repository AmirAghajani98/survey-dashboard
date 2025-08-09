import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import NavigationWrapper from "./navigateWrapper";

export const metadata: Metadata = {
  title: "Survey Dashboard",
  description: "Gas Co. Survey System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <NavigationWrapper>{children}</NavigationWrapper>
      </body>
    </html>
  );
}
