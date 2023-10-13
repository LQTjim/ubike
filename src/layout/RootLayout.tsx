import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
