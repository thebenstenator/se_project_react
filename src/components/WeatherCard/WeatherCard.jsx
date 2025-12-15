import sunny from "../../assets/sunny.png";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img src={sunny} alt="Weather Today" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
