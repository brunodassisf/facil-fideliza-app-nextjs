import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fácil Fidelizar - Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
