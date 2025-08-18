
import { useContext, createContext, useState, useEffect } from "react";

const WeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const weaKey = "6cc7a9e6b7b9c68402d1d5d8b9fb3e42";


// https://newsdata.io/api/1/latest?apikey=pub_daf645bc66ee472dbcaf0bb848599273&q=sports

const NewsContext = createContext();
const base_Url = "https://newsdata.io/api/1/latest";
const key = "pub_daf645bc66ee472dbcaf0bb848599273";

function NewsProvider({ children }) {
    const [currentNews, setCurrentNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [weatherLoadingByMap, setWeatherLoadingByMap] = useState(false);
    const [errorForMap, setErrorForMap] = useState(null);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [weatherDataByMap, setWeatherDataByMap] = useState({});
    const[sportsLoading , setSportsLoading] = useState(false);
    const[sportsData , setSportsData] = useState([]);
    const[topLoading , setTopLoading] = useState(false);
    const[TopData , setTopData] = useState([]);
     const[socialLoading , setSocialLoading] = useState(false);
    const[SocialData , setSocialData] = useState([]);
    
    useEffect(function() {
        async function fetchNews() {
            try {
                setIsLoading(true);
                setError(null);
                
                const url = new URL(base_Url);
                url.searchParams.append('apikey', key);
                const res = await fetch(url.toString());
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setCurrentNews(data.results);
            } catch (error) {
                setError("There is error in fetching the news");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchNews();
    }, []);
    

   useEffect(function(){
    async function TopNews(){
         try{
           setTopLoading(true);
           const url = new URL(base_Url);
           url.searchParams.append('apikey' , key);
           const res = await fetch(`${url.toString()}&q=top`);
           if(!res.ok){
              throw new Error(`http error! status: ${res.status}`);
           }
           const data = await res.json();
           console.log(data.results);
           setTopData(data.results);
      } catch(error){
            alert("error occured in Top API");
            console.error("the error in Top is ", error);
        }finally{
            setTopLoading(false);
        }
    }
    TopNews();
   } , [])


   useEffect(function(){
    async function SocialNews(){
         try{
           setSocialLoading(true);
           const url = new URL(base_Url);
           url.searchParams.append('apikey' , key);
           const res = await fetch(`${url.toString()}&q=social`);
           if(!res.ok){
              throw new Error(`http error! status: ${res.status}`);
           }
           const data = await res.json();
           console.log(data.results);
           setSocialData(data.results);
      } catch(error){
            alert("error occured in social API");
            console.error("the error in social is ", error);
        }finally{
            setSocialLoading(false);
        }
    }
    SocialNews();
   } , [])


   useEffect(function(){
    async function sportsNews(){
         try{
           setSportsLoading(true);
           const url = new URL(base_Url);
           url.searchParams.append('apikey' , key);
           const res = await fetch(`${url.toString()}&q=sports`);
           if(!res.ok){
              throw new Error(`http error! status: ${res.status}`);
           }
           const data = await res.json();
           console.log(data.results);
           setSportsData(data.results);
      } catch(error){
            alert("error occured in sports API");
            console.error("the error in sports is ", error);
        }finally{
            setSportsLoading(false);
        }
    }
    sportsNews();
   } , [])


    // const res = await fetch(`${WeatherUrl}lat=${lat}&lon=${lon}&appid=${weaKey}`);

    const searchWeatherByMap = async (lat , lon) =>{
        try{
            setWeatherLoadingByMap(true);
            setErrorForMap(null);
            console.log("searching for weather using the map");
              
            const res = await fetch(`${WeatherUrl}lat=${lat}&lon=${lon}&appid=${weaKey}`);

            console.log("api responded" , res.status);

            if(!res.ok){
                throw new Error(`City not found: ${res.status}`);
            }
            const data = await res.json();
            console.log("Weather data received ", data);
            setWeatherDataByMap(data);
        }catch(err){
            console.log("error while data fetching using the map");
            console.error("search error " , err);
        }finally {
            setWeatherLoadingByMap(false);
        }
    };

   

    const searchWeatherByCity = async (cityName) => {
        try {
            setWeatherLoading(true);
            setError(null);
            
            const res = await fetch(`${WeatherUrl}q=${cityName}&appid=${weaKey}`);
            console.log("API response status:", res.status); 
            
            if (!res.ok) {
                throw new Error(`City not found: ${res.status}`);
            }
            
            const data = await res.json();
            
            setWeatherData(data);
        } catch (err) {
            setError(`Error fetching weather for ${cityName}: ${err.message}`);
            console.error("Search error:", err);
        } finally {
            setWeatherLoading(false);
        }
    };
  
    return (
        <NewsContext.Provider
            value={{
                weatherData,
                weatherDataByMap,   
                currentNews,
                isLoading,
                error, 
                sportsLoading,
                sportsData,
                weatherLoading,
                weatherLoadingByMap,
                errorForMap,
                TopData,
                topLoading,
                SocialData,
                socialLoading,
                searchWeatherByMap,
                searchWeatherByCity, 
               
            }}
        >
            {children}
        </NewsContext.Provider>
    );
}

function useNews() {
    const context = useContext(NewsContext);
    if (context === undefined) {
        console.error("News context is used outside the News provider");
        throw new Error("News context is used outside the News provider");
    }
    
    return context;
}

export { NewsProvider, useNews };


//http://localhost:5173/weather/form?lat=39.41922073655956&lng=-3.4277343750000004