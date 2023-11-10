import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-screen-lg py-8 px-5 lg:px-0">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
