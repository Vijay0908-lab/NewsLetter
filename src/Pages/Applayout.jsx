import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Applayout() {
  return (
    <>
      <div className="flex flex-col min-h-dvh bg-neutral-400">
        <Header />
        <main className="flex-1 overflow-auto"> 
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Applayout;
