// //https://newsdata.io/api/1/latest?apikey=pub_daf645bc66ee472dbcaf0bb848599273&q=sports


// //https://newsdata.io/api/1/latest?apikey=pub_daf645bc66ee472dbcaf0bb848599273


// // weather api 
// //https://api.openweathermap.org/data/2.5/weather?lat=72.83542632999998&lon=19.201484679999993&appid=6cc7a9e6b7b9c68402d1d5d8b9fb3e42

// import {  useContext , createContext , useState , useEffect } from "react";

// const WeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
// const weaKey = "6cc7a9e6b7b9c68402d1d5d8b9fb3e42";
// const lon = "72.83542632999998";
// const lat = "19.201484679999993";


// const NewsContext = createContext();
// const base_Url = "https://newsdata.io/api/1/latest";
// const key = "pub_daf645bc66ee472dbcaf0bb848599273";

// function NewsProvider({children}){
//     const[currentNews , setcurrentNews] = useState([]);
//     const[isLoading , setisLoading] = useState(false);
//     const[weatherLoading , setWeatherLoading ] = useState(false);
//     const[error , setError]  = useState(null);
//     const[weatherData , setweatherData] = useState({});
    
//     useEffect(function(){
        
//         async function fetchNews(){
            
//             try{
//                 setisLoading(true);
//                 setError(null);
                
//                 const url = new URL(base_Url);
//                 url.searchParams.append('apikey',key);
//                 const res = await fetch(url.toString());
//                 if(!res.ok){
//                     throw new Error(`HTTP error! status : ${res.status}`);
//                 }

//                 const data = await res.json();

//                 setcurrentNews(data.results);
//             }catch(error){
//                  setError("there is error in the fetching the news") ;
//                 console.error(error);
//             }finally{
//                 setisLoading(false);
//             }
//         }
//         fetchNews();
//     } , []);
    
//     useEffect(function (){
//        async function getWeather() {
//         try{
//             setWeatherLoading(true);
//             setError(null);
//             const res = await fetch(`${WeatherUrl}lat=${lat}&lon=${lon}&appid=${weaKey}`);
//             const data = await res.json();
//             setweatherData(data.main);
//         }catch(err){
//             alert("Their is something error in the weather");
//             console.error(err);
//         }finally{
//             setWeatherLoading(false);
//         }
//        }
//        getWeather();
//    }, [])
    
  
//     return(
//     <NewsContext.Provider
//         value ={{
//             weatherData,   
//             currentNews,
//             isLoading,
//             error, 
//             weatherLoading,
//         }}
//         >
//         {children}
//     </NewsContext.Provider>
//     );
// }

// function useNews(){
//     const context = useContext(NewsContext);
//     if(context === undefined){

//         console.error("News context is used outside the News provider")
//         throw new Error("News context is used outside the News provider");
//     }
    
//     return context;
// }
// export {NewsProvider ,  useNews };


import { useContext, createContext, useState, useEffect } from "react";

const WeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const weaKey = "6cc7a9e6b7b9c68402d1d5d8b9fb3e42";
const lon = "72.83542632999998";
const lat = "19.201484679999993";

const NewsContext = createContext();
const base_Url = "https://newsdata.io/api/1/latest";
const key = "pub_daf645bc66ee472dbcaf0bb848599273";

function NewsProvider({ children }) {
    const [currentNews, setCurrentNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    
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
    
    useEffect(function() {
        async function getWeather() {
            try {
                setWeatherLoading(true);
                setError(null);
                const res = await fetch(`${WeatherUrl}lat=${lat}&lon=${lon}&appid=${weaKey}`);
                const data = await res.json();
                setWeatherData(data);
            } catch (err) {
                setError("There is something error in the weather");
                console.error(err);
            } finally {
                setWeatherLoading(false);
            }
        }
        getWeather();
    }, []);

    // ADD THIS: Function to search weather by city
    const searchWeatherByCity = async (cityName) => {
        try {
            setWeatherLoading(true);
            setError(null);
            console.log("Searching for city:", cityName); // Debug log
            
            const res = await fetch(`${WeatherUrl}q=${cityName}&appid=${weaKey}`);
            console.log("API response status:", res.status); // Debug log
            
            if (!res.ok) {
                throw new Error(`City not found: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Weather data received:", data); // Debug log
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
                currentNews,
                isLoading,
                error, 
                weatherLoading,
                searchWeatherByCity, // ADD THIS
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