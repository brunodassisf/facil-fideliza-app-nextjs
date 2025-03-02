import { getStore } from "@/core/actions/store";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore();

  return {
    title: `${store?.name}, Cadastrar produto/serviço`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
