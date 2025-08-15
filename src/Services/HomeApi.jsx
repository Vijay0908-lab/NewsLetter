


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
    const [weatherLoadingByMap, setWeatherLoadingByMap] = useState(false);
    const [errorForMap, setErrorForMap] = useState(null);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [weatherDataByMap, setWeatherDataByMap] = useState({});
    
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
            setWeatherData(data);
        }catch(err){
            console.log("error while data fetching using the map");
            console.error("search error " , err);
        }finally {
            setWeatherLoadingByMap(false);
        }
    };

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
                weatherDataByMap,   
                currentNews,
                isLoading,
                error, 
                weatherLoading,
                weatherLoadingByMap,
                errorForMap,
                searchWeatherByMap,
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


//http://localhost:5173/weather/form?lat=39.41922073655956&lng=-3.4277343750000004