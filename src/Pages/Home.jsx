import {  useState } from "react";
import { useNews } from "../Services/HomeApi";
import News from "../../Components/News";
import Spinner from "../../Components/Spinner";


function Home() {
  const{currentNews , isLoading}  = useNews();
  const [SearchValue , setsearchValue] = useState("");
 

console.log(currentNews);

  return <div >
    <div className=" flex items-center justify-center gap-2 mt-2">

    <form >
    <input 
    className="border  w-2xs rounded-2xl bg-stone-50 p font-medium  text-sm px-5 py-2.5  "
    type="search"
    placeholder="Search the category"
    value = {SearchValue} 
    onChange={(e)=>setsearchValue(e.target.value)}
    />
    <button className="button">Search</button>
    </form>
    </div>
    <div  className="h-full bg-amber-200">
      {isLoading ? <Spinner /> : <News  currentNews={currentNews} /> }
    </div>
    
  
  </div>;
}

export default Home;
