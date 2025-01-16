import { checkStoreTag } from "@/core/actions/store";
import { NotFoundStore, WrapperTag } from "@/presentation/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fácil Fidelizar - Login",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const store = await checkStoreTag(tag);

  if (!store || !store.ready) return <NotFoundStore />;
  return <WrapperTag data={store}>{children}</WrapperTag>;
}
