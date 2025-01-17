import { getProducts } from "@/core/actions/product";
import List from "../../ui/Product/List";
import { getSession } from "@/core/actions/session";

export default async function ListProductPage() {
  const session = await getSession();
  const products = await getProducts(session.id as string);
  return <List data={products} />;
}
