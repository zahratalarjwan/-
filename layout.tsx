import type { Metadata } from "next";
import "./globals.css";
import StudioShell from "@/components/StudioShell";

export const metadata: Metadata = {
  title: "CineFlow AI Studio — من الفكرة إلى فيلم سينمائي متكامل بالذكاء الاصطناعي",
  description: "المنصة السينمائية المتكاملة لإنتاج وتوجيه أفلام الذكاء الاصطناعي، تثبيت الشخصيات، وهندسة الكاميرا والمونتاج.",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="bg-cine-950 text-zinc-100 antialiased selection:bg-purple-600 selection:text-white">
        <StudioShell>{children}</StudioShell>
      </body>
    </html>
  );
}
