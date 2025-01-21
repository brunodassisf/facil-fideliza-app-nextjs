import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Provider } from "@/presentation/components";
import PolityCookies from "./ui/PolityCookies";

const NunitoFont = Nunito({
  variable: "--font-Nunito-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fácil Fidelizar",
  description:
    "Plataforma inovadora para lojistas fidelizarem clientes com facilidade. Ofereça vantagens exclusivas, acompanhe o engajamento e fortaleça o relacionamento com participantes. Simplifique a gestão de fidelidade e aumente a retenção com ferramentas intuitivas e eficazes.",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_URL_BASE_AWS}facilfidelizar.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>

      <body className={`${NunitoFont.variable}`}>
        <Provider>{children}</Provider>
        <PolityCookies />
      </body>
    </html>
  );
}
