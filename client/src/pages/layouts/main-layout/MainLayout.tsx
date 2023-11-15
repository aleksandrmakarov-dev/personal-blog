import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-screen-lg py-8 px-5 lg:px-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
