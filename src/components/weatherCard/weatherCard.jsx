import "./weatherCard.css";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="container">
      <div>
        <span className="cityName">{weatherData?.name}</span>
        <span className="counteryName">{weatherData?.sys?.country}</span>
      </div>

      <div>
        <div><span>{weatherData?.main?.temp}</span>°C</div>
        <div>{weatherData?.weather?.[0]?.main}</div>
      </div>

      <div>
        <span>Pressure: {weatherData?.main?.pressure}</span>
        <span>Humidity: {weatherData?.main?.humidity}</span>
        <span>Wind: {weatherData?.wind?.speed}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
