
import { useEffect, useState } from "react";
import { useNews } from "../Services/HomeApi";
import { WiDayFog, WiDayWindy, WiNightAltSprinkle } from "react-icons/wi";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";

function Weather() {
  const [city, setcity] = useState("");
  const { searchWeatherByCity, weatherLoading, weatherData } = useNews();
  
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
 
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  useEffect(
    function () {
      if (weatherData?.coord) {
        setMapPosition([weatherData.coord.lat, weatherData.coord.lon]);
      }
    },
    [weatherData]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!city.trim()) {
      console.log("City is empty:", city);
      return;
    }
    searchWeatherByCity(city);
    setcity(""); // Clear the input after search
  }

  // Helper function to convert temperature to Celsius
  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  // Helper function to get temperature in Celsius
  const getTemperatureInCelsius = () => {
    if (weatherData?.main?.temp) {
      
      if (weatherData.main.temp > 200) {
        return kelvinToCelsius(weatherData.main.temp);
      }
      
      return Math.round(weatherData.main.temp);
    }
    return 21; // Default value
  };

  console.log(weatherData);
  
  return (
    <div className="h-full grid grid-cols-2">
      {/* Your existing weather card - unchanged */}
      <div className="bg-purple-400 rounded-xl shadow-lg overflow-hidden h-128 m-10 sm:64 w-128 sm:64 hover:shadow-2xl">
        <div className="flex items-center justify-center h-20 w-128 gap-2">
          <form className="flex gap-3" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Search city.." 
              className="flex-1 border w-83 border-gray-300 rounded-lg bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
            <button 
              className="text-white bg-purple-700 hover:bg-purple-800 focus-visible:ring-4 focus-visible:ring-purple-800 active:bg-purple-900 active:scale-95 active:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 transform active:duration-75"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        
        {weatherLoading ? (
          <Spinner className=" h-70  flex items-center justify-center "/>
        ) : (
          <>
            <div className="h-70 flex items-center justify-center flex-col">
              <WiDayFog className="h-40 w-40 text-white" />
              <h1 className="font-bold text-lg text-white">
                {getTemperatureInCelsius()} &#8451;
              </h1>
              <h3 className="font-bold text-white text-lg">
                {weatherData?.name && weatherData?.sys?.country 
                  ? `${weatherData.name}, ${weatherData.sys.country}`
                  : weatherData?.name 
                    ? weatherData.name
                    : "Mumbai, India"
                }
              </h3>
            </div>
            
            <div className="h-40 w-full flex items-center justify-center gap-23">
              <div className="flex items-center justify-center text-white">
                <WiDayWindy className="h-20 w-20" />
                <div>
                  <p>{weatherData?.main?.humidity || 28}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="flex items-center justify-center text-white">
                <WiNightAltSprinkle className="h-20 w-20 text-white" />
                <div>
                  <p>{weatherData?.wind?.speed ? Math.round(weatherData.wind.speed) : 28}%</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Map container styled like a card */}
      <div className="rounded-xl shadow-lg overflow-hidden h-128 m-10 sm:64 w-170 sm:64 hover:shadow-2xl relative bg-white ml-3">
        {!geolocationPosition && !isLoadingPosition && (
          <button 
            type="button" 
            onClick={getPosition} 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Use your position
          </button>
        )}
        
        {isLoadingPosition && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md">
            Loading...
          </div>
        )}
        <MapContainer
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {weatherData?.coord && (
            <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
              <Popup>
                <div className="text-center">
                  <strong>{weatherData.name}</strong>
                  <br />
                  {getTemperatureInCelsius()}°C
                  <br />
                  Humidity: {weatherData?.main?.humidity || 'N/A'}%
                </div>
              </Popup>
            </Marker>
          )}
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}

export default Weather;