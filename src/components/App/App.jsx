import { useEffect, useState } from "react";

import "./App.css";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import MobileModal from "../MobileModal/MobileModal";
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleMobileClick = () => {
    setActiveModal("mobile");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    setClothingItems([
      ...clothingItems,
      {
        name: inputValues.name,
        weather: inputValues.weather,
        link: inputValues.link,
      },
    ]);
    closeModal();
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            activeModal={activeModal}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleMobileClick={handleMobileClick}
          />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
          <Footer />
        </div>
        <AddItemModal
          onAddItem={onAddItem}
          activeModal={activeModal}
          handleCloseClick={closeModal}
        />
        <ItemModal
          name="preview"
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeModal}
        />
        <MobileModal
          name="mobile"
          handleCloseClick={closeModal}
          handleAddClick={handleAddClick}
          activeModal={activeModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
