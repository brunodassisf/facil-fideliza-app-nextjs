import History from "../../ui/History";
import { historyLoyaltyCards } from "@/core/actions/loyalty";

export default async function Page() {
  const history = await historyLoyaltyCards();
  if (!history?.ok) return null;

  return <History data={history.data} />;
}
