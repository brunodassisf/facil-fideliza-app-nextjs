import { getStore } from "@/core/actions/store";
import { WrapperStore, Sidebar } from "@/presentation/components";
import type { Metadata, Viewport } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore();
  const img = store.img
    ? process.env.NEXT_PUBLIC_URL_BASE_AWS! + store.img
    : process.env.NEXT_PUBLIC_URL_BASE_AWS! + "facilfidelizar.png";

  return {
    title: `${store.name} - Bem-vindo`,

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStore();

  if (!store) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="h-screen">
      <WrapperStore data={store}>
        <div className="flex justify-between items-start pt-7 pb-3">
          <div className="flex flex-col">
            <h6>
              Bem-vindo,
              <span className="block text-2xl leading-3">
                {store?.name || ""}
              </span>
            </h6>
            <div className="mt-5">
              <div className="flex items-center text-sm">
                <p>Clientes cadastrados:</p>
                <strong className="mx-1">
                  {store?.PlanStore?.amountClientsUse}
                </strong>
                /
                <strong className="mx-1">
                  {store?.PlanStore?.Plan.amountClients}
                </strong>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-around h-full">
            <Sidebar type="store" />
          </div>
        </div>
        <div className="bg-white h-full rounded-t-lg pt-4 px-4 overflow-y-scroll text-stone-900 pb-5">
          {children}
        </div>
      </WrapperStore>
    </section>
  );
}
