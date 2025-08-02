import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Applayout() {
  return (
    <>
      <div className="h-full bg-neutral-400">
        <Header />
        <main className="main"> 
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Applayout;
