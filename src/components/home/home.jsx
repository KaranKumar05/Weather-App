import { useEffect, useRef, useState } from "react";
import axios from "axios";
import WeatherCard from "../weatherCard/weatherCard.jsx";
import * as Icon from "react-bootstrap-icons";

import "./home.css";
import AppIcon from "../images/AppIcon.png";

const Home = () => {
  //-------State for Weather Data-------//
  // const [weatherData, setWeatherData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Getting Value From input in react using useRef
  const cityNameInput = useRef(null);

  // const [isLoading, setIsLoading] = useState(false)

  // const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  //-----Function to get the current location of User onload------//
  useEffect(() => {
    //--- AbortController for aborting the request if user closes the tab or browser---//
    const controller = new AbortController();
    //--Checking the location if found--//
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        try {
          // setIsLoading(true);         //--Instead of city name gating weather by lon & lat--//
          let API_KEY = "bd30503813924350feea847416d7bff9";
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`,
            {
              signal: controller.signal,
            }
          );
          console.log(response.data);
          setWeatherData(response.data);
          // setIsLoading(false);         //--Instead of city name gating weather by lon & lat--//
          // setCurrentLocationWeather(response.data);
        } catch (error) {
          console.log(error.data);
          // setIsLoading(false);         //--Instead of city name gating weather by lon & lat--//
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      controller.abort(); //Abort the request if user closes the tab or browser
    };
  }, []);

  //---------- Weather Handler Function-----------//
  const weatherHandler = async (e) => {
    e.preventDefault(); // Preventing Default Refresh

    let cityName = cityNameInput.current.value;
    console.log(cityName);
    let API_KEY = "bd30503813924350feea847416d7bff9";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error.data);
      alert("City Not Found");
      window.location.reload();
    }
  };

  return (
    <div className="main">
      <form onSubmit={weatherHandler}>
        <img src={AppIcon} alt="App Icon" />
        <h1>Weather App</h1>
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
          <button type="submit">
            Get Weather <Icon.Search />
          </button>
        </div>
        <div>
          <p>
            Developed By:{" "}
            <a
              href="https://github.com/KaranKumar05/weather-app.git"
              target="_blank"
            >
              Karan Kumar
            </a>
          </p>
          {/* Todo: History Component that Hold tha previous search of the user */}
        </div>
      </form>
      <div>
        {/* {isLoading? <div className="noDataContainer">Loading....</div>: null} */}
        {/* {isLoading? null: <div className="noDataContainer">No Data</div>} */}
        {/* Checking if Data is Available Then Render The Card Otherwise "No Data" */}
        {/* {(weatherData.length || currentLocationWeather) ? (
          null
        ) : (
          <div className="noDataContainer">No Data</div>
        )} */}

        {weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <div className="noDataContainer">Loading....</div>
        )}
        {/* {!weatherData || isLoading ? <div className="noDataContainer">No Data</div>: null} */}
        {/* {weatherData ? <WeatherCard weatherData={weatherData} /> : null} */}
        {/* {currentLocationWeather ? (
          <WeatherCard weatherData={currentLocationWeather} />
        ) : null} */}
      </div>
    </div>
  );
};

export default Home;
