import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import MobileModal from "../MobileModal/MobileModal";
import Profile from "../Profile/Profile";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { addItem, getItems, removeItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
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

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeModal();
        handleReset();
      })
      .catch(console.error);
  };

  const onDeleteItem = (selectedCard) => {
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

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
          handleDeleteClick={handleDeleteClick}
        />
        <MobileModal
          name="mobile"
          handleCloseClick={closeModal}
          handleAddClick={handleAddClick}
          activeModal={activeModal}
        />
        <DeleteModal
          handleCloseClick={closeModal}
          name="delete-confirmation"
          activeModal={activeModal}
          onDeleteItem={onDeleteItem}
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
