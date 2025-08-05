// import {  useState } from "react";
// import { useNews } from "../Services/HomeApi";
// import News from "../../Components/News";
// import Spinner from "../../Components/Spinner";


// function Home() {
//   const{currentNews , isLoading}  = useNews();
//   const [SearchValue , setsearchValue] = useState("");
 

// console.log(currentNews);

//   return <div >
//     <div className=" flex items-center justify-center gap-2 mt-2">

//     <form >
//     <input 
//     className="border  w-2xs rounded-2xl bg-stone-50 p font-medium  text-sm px-5 py-2.5  "
//     type="search"
//     placeholder="Search the category"
//     value = {SearchValue} 
//     onChange={(e)=>setsearchValue(e.target.value)}
//     />
//     <button className="button">Search</button>
//     </form>
//     </div>
//     <div  className="h-full bg-amber-200">
//       {isLoading ? <Spinner /> : <News  currentNews={currentNews} /> }
//     </div>
    
  
//   </div>;
// }

// export default Home;


import { useState } from "react";
import { useNews } from "../Services/HomeApi";
import News from "../../Components/News";
import Spinner from "../../Components/Spinner";

function Home() {
  const { currentNews, isLoading } = useNews();
  const [SearchValue, setsearchValue] = useState("");

  console.log(currentNews);

  return (
    <div className="min-h-screen ">
      {/* Header Section with Search - Fixed height */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4">
            <form className="w-full max-w-md">
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-gray-300 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="search"
                  placeholder="Search news categories..."
                  value={SearchValue}
                  onChange={(e) => setsearchValue(e.target.value)}
                />
                <button 
                  type="submit"
                  className="button"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content Area - Takes remaining height */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="min-h-[calc(100vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner />
            </div>
          ) : (
            <div className="w-full">
              <News currentNews={currentNews} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
