import { useState } from "react";
import { useNews } from "../Services/HomeApi";
import { BsCloudFog2 } from "react-icons/bs";



function Weather() {
  const[city , setcity] = useState("");
  const {weatherData , weatherLoading}= useNews();
  console.log(weatherData);



   const handleSubmit = (e) => {
    console.log("=== BUTTON CLICKED ===");
    e.preventDefault();
    console.log("Event prevented");
    
    if (!city.trim()) {
      console.log("City is empty:", city);
      return;
    }
    
    console.log("Searching for:", city);
  };

   
  return (
 <div className="h-full grid grid-cols-2 ">
   <div className="bg-purple-400 rounded-xl shadow-lg overflow-hidden h-128  m-10  sm:64 w-128 sm:64 hover:shadow-2xl  ">
    <div className="flex items-center justify-center h-20  w-128 gap-2 ">


       <form className="flex gap-3" onSubmit={handleSubmit}>
        <input type="text" placeholder="Seach city.. "  className="flex-1 border border-gray-300 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 "
        value={city}
        onChange={(e)=>setcity(e.target.value)}
        />

        <button className="text-white bg-purple-700 hover:bg-purple-800 focus-visible:ring-4 focus-visible:ring-purple-800 active:bg-purple-900 active:scale-95 active:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 transform active:duration-75"
        type="submit" >
          Search
        </button>
       </form>
    </div>
    <div className=" h-70 flex items-center justify-center flex-col ">
      
      <BsCloudFog2 className="h-35 w-35 text-white"/>
      <h1 className="font-bold text-lg text-white">21 &#8451;</h1>
     <h3 className="font-bold text-white">Mumbai</h3>
    </div>
    
   </div>
   <div>
    2
   </div>
  </div>
  )
}

export default Weather;


