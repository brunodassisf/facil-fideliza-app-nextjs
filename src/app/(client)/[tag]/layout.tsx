import { getStoreByTag } from "@/core/actions/store";
import { NotFoundStore, WrapperTag } from "@/presentation/components";
import type { Metadata, Viewport } from "next";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const { tag } = await params;
  const store = await getStoreByTag(tag);

  const img = store?.img
    ? process.env.NEXT_PUBLIC_URL_BASE_AWS! + store.img
    : process.env.NEXT_PUBLIC_URL_BASE_AWS! + "facilfidelizar.png";

  return {
    title: `${store?.name}`,
    description: `Participe e ganhe vantagens exclusivas com a ${store?.name}!`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_URL_APP}${store?.tag}`,
      description: `Participe e ganhe vantagens exclusivas com a ${store?.name}!`,
      images: [img],
    },
  };
}

export async function generateViewport({
  params,
}: {
  params: { tag: string };
}): Promise<Viewport> {
  const { tag } = await params;
  const store = await getStoreByTag(tag);
  return {
    themeColor: store?.bgColor || "#83cbff",
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
  const store = await getStoreByTag(tag);

  if (!store || !store.ready) return <NotFoundStore />;
  return <WrapperTag data={store}>{children}</WrapperTag>;
}
