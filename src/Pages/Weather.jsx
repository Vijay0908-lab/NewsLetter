import { useNews } from "../Services/HomeApi";

function Weather() {

  const {weatherData , isLoading}= useNews();
  console.log(weatherData);

  return <div>Weather info</div>;
}

export default Weather;


