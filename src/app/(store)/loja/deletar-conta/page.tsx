import DeleteAccount from "@/app/ui/DeleteAccount";
import { getSession } from "@/core/actions/session";

export default async function Page() {
  const session = await getSession();
  return (
    <DeleteAccount
      id={session.id as string}
      text="Essa ação deletará todas as informações da sua loja, todos os dados cadastrados, assim como seus clientes cadastrados na sua loja."
    />
  );
}
