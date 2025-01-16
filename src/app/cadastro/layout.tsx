import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fácil Fidelizar - Cadastro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
