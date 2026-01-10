import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollTopButton from "../components/ScrollTopButton";




const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="container py-4">
        <Outlet />
      </main>
      <ScrollTopButton />

      <Footer />
    </>
  );
};

export default MainLayout;
