import ClientReviews from "@/components/client-reviews";
import Footer from "@/components/footer";
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
      <Footer />
    </>
  );
}
