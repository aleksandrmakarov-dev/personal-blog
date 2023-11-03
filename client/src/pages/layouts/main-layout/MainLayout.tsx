import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-screen-xl py-5">
        <Outlet />
      </main>
    </>
  );
}
