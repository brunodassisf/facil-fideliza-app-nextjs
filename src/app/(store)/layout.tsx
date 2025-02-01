import { getStore } from "@/core/actions/store";
import { WrapperStore, Sidebar } from "@/presentation/components";
import StoreLogo from "@/presentation/components/StoreLogo";
import { Typography } from "@mui/material";
import type { Metadata, Viewport } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await getStore();
  const img = store?.img
    ? process.env.NEXT_PUBLIC_URL_BASE_AWS! + store.img
    : process.env.NEXT_PUBLIC_URL_BASE_AWS! + "facilfidelizar.png";

  return {
    title: `${store?.name} - Bem-vindo`,

    openGraph: {
      url: `${process.env.NEXT_PUBLIC_URL_APP}/loja`,
      images: [img],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const store = await getStore();
  return {
    themeColor: store?.bgColor || "#83cbff",
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
        <div className="flex justify-between items-start pt-16 pb-10">
          <div>
            <Typography variant="h6">
              Bem-vindo,
              <span className="block text-2xl leading-5">
                {store?.name || ""}
              </span>
            </Typography>
          </div>
          <div className="pt-4">
            <Sidebar type="store" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <StoreLogo />
          <Typography
            variant="subtitle1"
            className="!font-bold pt-3 rounded break-normal"
          >
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
          </Typography>
        </div>

        <div className="bg-white h-full rounded-t-lg pt-4 px-4 overflow-y-scroll text-stone-900 pb-5">
          {children}
        </div>
      </WrapperStore>
    </section>
  );
}
