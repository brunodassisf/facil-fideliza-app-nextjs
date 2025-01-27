import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Provider } from "@/presentation/components";
import PolityCookies from "./ui/PolityCookies";
import { GoogleAnalytics } from "@next/third-parties/google";

const NunitoFont = Nunito({
  variable: "--font-Nunito-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fácil Fidelizar",
  description:
    "Plataforma inovadora para lojistas fidelizarem participantes com facilidade. Ofereça vantagens exclusivas, acompanhe o engajamento e fortaleça o relacionamento com participantes. Simplifique a gestão de fidelidade e aumente a retenção com ferramentas intuitivas e eficazes.",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_URL_BASE_AWS}facilfidelizar.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#ededed",
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

      <body className={`${NunitoFont.variable} bg-tag`}>
        <Provider>{children}</Provider>
        <PolityCookies />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE!} />
      </body>
    </html>
  );
}
