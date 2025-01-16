import { getSession } from "@/core/actions/session";
import Dashboard from "../ui/dashboard";
import { getLoyaltyCard } from "@/core/actions/loyalty";

export default async function Page() {
  const session = await getSession();
  const card = await getLoyaltyCard(session.id as string);

  return <Dashboard data={card} />;
}
