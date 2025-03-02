import DeleteAccount from "@/app/ui/DeleteAccount";
import { getSession } from "@/core/actions/session";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const session = await getSession();
  return (
    <DeleteAccount
      tag={await params.then((res) => res.tag)}
      id={session.id as string}
      text="Essa ação irá deletar suas informações cadastradas na loja, você perderá todos as informações feitas na loja. Mas poderá retornar e criar uma conjta nova."
    />
  );
}
