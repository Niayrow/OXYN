import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "OXYN - Hub Perte de Poids",
  description: "Calculez vos besoins caloriques avec précision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950">
        <Navbar />
        {children}
      </body>
    </html>
  );
}