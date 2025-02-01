import { getSession } from "@/core/actions/session";
import Dashboard from "../ui/dashboard";
import { getLoyaltyCard } from "@/core/actions/loyalty";
import { Spinner } from "@/presentation/components";

export default async function Page() {
  const session = await getSession();
  const card = await getLoyaltyCard(session.id as string);

  if (!card?.ok) {
    return <Spinner />;
  }

  return <Dashboard data={card.data} />;
}
