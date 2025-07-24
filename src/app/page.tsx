import ClientReviews from "@/components/client-reviews";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <ProductList />
      <ClientReviews />
    </>
  );
}
