import "./weatherCard.css";
import ClearSky from "../images/clearSky.png";
import Cloudy from "../images/cloudy.png";
import Rain from "../images/rain.png";
import MostlyCloudy from "../images/mostlyCloudy.png";
import Snow from "../images/snow.png";
import * as Icon from "react-bootstrap-icons";


const WeatherCard = ({ weatherData }) => {
  let weatherImgData = weatherData?.weather?.[0]?.main;
  console.log(weatherImgData);

  let weatherImg = ClearSky;
  if (weatherImgData === "Snow") {
    weatherImg = Snow;
  } else if (weatherImgData === "Rain") {
    weatherImg = Rain;
  } else if (weatherImgData === "Clouds") {
    weatherImg = Cloudy;
  } else if (weatherImgData === "Mostly Clouds") {
    weatherImg = MostlyCloudy;
  }

  const currentDate = new Date();

  const fullDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const monthName = currentDate.toLocaleDateString("en-US", { month: "short" });
  console.log(fullDate, currentTime);
  let date = `${fullDate}`;
  let time = `${currentTime}`;


  return (
    <div className="container">
      <div>
        <div>
          <span>{weatherData?.name}</span>
          <span>{weatherData?.sys?.country}</span>
        </div>
        <div>
          <p><Icon.Calendar />{date}</p>
          <p><Icon.Clock />{time}</p>
        </div>
      </div>

      <div>
        <div className="weatherIconContainer">
          <div>{weatherData?.weather?.[0]?.main}</div>
          <div className="iconImg">
            <img src={weatherImg} alt="App Icon" width={100} height={100} />
          </div>
        </div>

        <div className="mainDataContainer">
          <div>
            <span>{weatherData?.main?.temp}</span>°C
          </div>
          <div className="minMaxTempContainer">
            <span><Icon.Thermometer />Min:{weatherData?.main?.temp_min}<span>°C</span></span>
            <span><Icon.ThermometerHigh />Max:{weatherData?.main?.temp_max}<span>°C</span></span>
          </div>
        </div>
      </div>

      <div>
        <span><Icon.Compass /> Pressure: {weatherData?.main?.pressure} Pa</span>
        <span><Icon.Moisture /> Humidity: {weatherData?.main?.humidity} %</span>
        <span><Icon.Wind /> Wind: {weatherData?.wind?.speed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherCard;
