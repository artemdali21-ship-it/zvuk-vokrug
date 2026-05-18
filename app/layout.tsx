import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЗВУК ВОКРУГ — аренда звука, света, сцены и LED · Волгоград, ЮФО",
  description:
    "30 лет на рынке. Аренда профессионального звукового, светового, сценического и LED-оборудования с монтажом и звукоинженером. Волгоград, Элиста, Астрахань, Саратов.",
  keywords:
    "аренда звука Волгоград, прокат звукового оборудования, аренда сцены, аренда LED экранов, техническое обеспечение мероприятий ЮФО, аренда света Волгоград",
  openGraph: {
    title: "ЗВУК ВОКРУГ — звук, свет, сцена с 1994 года",
    description:
      "9000+ мероприятий. Опыт работы на площадках Лепса, Машины Времени, Любэ, Парада Победы. Волгоград и Юг России.",
    images: ["/og.jpg"],
  },
  metadataBase: new URL("https://zvuk-vokrug.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${interTight.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
