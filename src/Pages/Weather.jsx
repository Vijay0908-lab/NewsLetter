

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

function Weather() {
  const [city, setcity] = useState("");
  const { weatherData, weatherLoading } = useNews();
  
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
        
        <div className="h-70 flex items-center justify-center flex-col">
          <WiDayFog className="h-40 w-40 text-white" />
          <h1 className="font-bold text-lg text-white">21 &#8451;</h1>
          <h3 className="font-bold text-white text-lg">Mumbai, India</h3>
        </div>
        
        <div className="h-40 w-full flex items-center justify-center gap-23">
          <div className="flex items-center justify-center text-white">
            <WiDayWindy className="h-20 w-20" />
            <div>
              <p>28%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="flex items-center justify-center text-white">
            <WiNightAltSprinkle className="h-20 w-20 text-white" />
            <div>
              <p>28%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
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
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}

export default Weather;