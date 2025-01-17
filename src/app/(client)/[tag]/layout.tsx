import { checkStoreTag, getStore } from "@/core/actions/store";
import { NotFoundStore, WrapperTag } from "@/presentation/components";
import type { Metadata, Viewport } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore();
  const img = store.img
    ? process.env.NEXT_PUBLIC_URL_BASE_IMAGE! + store.img
    : "";

  return {
    title: `${store.name}, login`,

    openGraph: {
      url: `${process.env.NEXT_PUBLIC_URL_APP}/loja`,
      images: [img],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const store = await getStore();
  return {
    themeColor: store.bgColor || "#83cbff",
  };
}

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
