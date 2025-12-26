import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl;

  if (filteredOptions.length === 0) {
    weatherOptionUrl =
      defaultWeatherOptions[weatherData.isDay ? "day" : "night"].url;
  } else {
    weatherOptionUrl = filteredOptions[0]?.url;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
        &deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt="Weather right now"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
