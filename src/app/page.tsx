import ClientReviews from "@/components/client-reviews";
import Header from "@/components/header";
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <ClientReviews />
    </>
  );
}
