import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export function MainLayout() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center flex-1">
        <div className="max-w-screen-xl w-full py-8 px-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
}
