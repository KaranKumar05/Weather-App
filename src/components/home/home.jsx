import { useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "../weatherCard/weatherCard.jsx";
import "./home.css";

const Home = () => {
  //-------State for Weather Data-------//
  const [weatherData, setWeatherData] = useState(null);

  // Getting Value From input in react using useRef
  const cityNameInput = useRef(null);

  //---------- Weather Handler Function-----------//
  const weatherHandler = async (e) => {
    e.preventDefault(); // Preventing Default Refresh

    let cityName = cityNameInput.current.value;
    console.log(cityName);
    let API_KEY = "bd30503813924350feea847416d7bff9";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <div className="main">
      <form onSubmit={weatherHandler}>
        <div>
          <input
            type="text"
            id="cityNameInput"
            maxLength={20}
            minLength={2}
            ref={cityNameInput}
            placeholder="Enter City Name"
            required
          />
        </div>
        <div>
          <button type="submit">Get Weather</button>
        </div>
      </form>
      <div>
        {/* Checking if Data is Available Then Render The Card Otherwise "No Data" */}
        {weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <div className="noDataContainer">No Data</div>
        )}
      </div>
    </div>
  );
};

export default Home;
