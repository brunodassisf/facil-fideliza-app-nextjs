import { getProducts } from "@/core/actions/product";
import List from "../../ui/Product/List";

export default async function ListProductPage() {
  const products = await getProducts();
  return <List data={products} />;
}
