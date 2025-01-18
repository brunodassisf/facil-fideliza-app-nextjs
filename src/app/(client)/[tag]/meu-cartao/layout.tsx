import { getSession } from "@/core/actions/session";
import { Sidebar } from "@/presentation/components";
import { Typography } from "@mui/material";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="px-4">
      <div className="flex justify-between items-center pt-7 pb-2">
        <div>
          <Typography variant="h6">
            Bem-vindo,
            <span className="block text-2xl leading-5">{session.name}</span>
          </Typography>
          <Typography
            variant="subtitle1"
            className="font-bold pt-3 rounded break-normal"
          >
            {session.storeName}
          </Typography>
        </div>
        <Sidebar type="client" />
      </div>
      <div className="bg-white h-full rounded-xl pt-4 text-stone-900">
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}
