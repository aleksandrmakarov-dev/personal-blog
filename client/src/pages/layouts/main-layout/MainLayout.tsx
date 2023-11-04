import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-screen-lg py-5">
        <Outlet />
      </main>
    </div>
  );
}
