//https://newsdata.io/api/1/latest?apikey=pub_daf645bc66ee472dbcaf0bb848599273&q=sports


//https://newsdata.io/api/1/latest?apikey=pub_daf645bc66ee472dbcaf0bb848599273


import {  useContext , createContext , useState , useEffect } from "react";


const NewsContext = createContext();
const base_Url = "https://newsdata.io/api/1/latest";
const key = "pub_daf645bc66ee472dbcaf0bb848599273";

function NewsProvider({children}){
    const[currentNews , setcurrentNews] = useState([]);
    const[isLoading , setisLoading] = useState(false);
    const[error , setError]  = useState(null);

    
    useEffect(function(){
        
        async function fetchNews(){
            
            try{
                setisLoading(true);
                setError(null);
                console.log("in fetching the info");
                const url = new URL(base_Url);
                url.searchParams.append('apikey',key);
                const res = await fetch(url.toString());
                if(!res.ok){
                    throw new Error(`HTTP error! status : ${res.status}`);
                }

                const data = await res.json();

                setcurrentNews(data.results);
            }catch(error){
                 setError("there is error in the fetching the news") ;
                console.error(error);
            }finally{
                setisLoading(false);
            }
        }
        fetchNews();
    } , []);
  useEffect(()=>{
    if(Object.keys(currentNews).length >0){
       console.log("currentNews is updated")
    }
  },[currentNews])
  
    return(
    <NewsContext.Provider
        value ={{
            currentNews,
            isLoading,
            error,    
        }}
        >
        {children}
    </NewsContext.Provider>
    );
}

function useNews(){
    const context = useContext(NewsContext);
    if(context === undefined){

        console.error("News context is used outside the News provider")
        throw new Error("News context is used outside the News provider");
    }
    
    return context;
}
export {NewsProvider ,  useNews };