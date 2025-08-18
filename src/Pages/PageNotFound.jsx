import { usemoveBack } from "../ui/usemoveBack";
import Footer from "./Footer";
import Header from "./Header";


function PageNotFound() {

  const moveBack = usemoveBack();
  return <>
      <div className="flex flex-col min-h-dvh bg-neutral-400">
        <Header />
        <div className="flex h-165 overflow-auto items-center justify-center"> 
          <h1 className="font-bold h-14 text-5xl">
            Page is not found 😢
          </h1>
          <button onClick={moveBack}
          className="absolute bottom-25 left-1/2 transform -translate-x-1/2 z-10 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-md">
             &larr; Go back
          </button>
        </div>
        <Footer />
      </div>
    </>;
}

export default PageNotFound;
