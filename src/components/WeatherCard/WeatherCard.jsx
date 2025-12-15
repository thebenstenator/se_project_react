import { weatherOptions } from "../../utils/constants.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img
        src={weatherOptionUrl}
        alt="Weather Today"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
