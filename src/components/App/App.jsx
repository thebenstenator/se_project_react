// React imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//Component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import MobileModal from "../MobileModal/MobileModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import "./App.css";

// Utility imports
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import * as api from "../../utils/api.js";
import { coordinates, apiKey } from "../../utils/constants";
import AppContext from "../../contexts/AppContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import * as auth from "../../utils/auth.js";

// Assets
import avatar from "../../assets/avatar.svg";

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
  const [usingDefaultLocation, setUsingDefaultLocation] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleModalSwitch = (modalName) => {
    setActiveModal(modalName);
  };

  const onAddItem = (inputValues, handleReset) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };

    api
      .addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeModal();
        handleReset();
      })
      .catch(console.error);
  };

  const onDeleteItem = (selectedCard) => {
    const token = localStorage.getItem("jwt");

    api
      .removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id),
        );
        closeModal();
      })
      .catch(console.error);
  };

  const fetchAndSetWeather = (coords) => {
    getWeather(coords, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  };

  const handleManualSubmit = (evt) => {
    evt.preventDefault();
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLng);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      setUsingDefaultLocation(false);
      fetchAndSetWeather({ latitude: lat, longitude: lon });
    }
  };

  const handleLogin = (values, handleReset) => {
    auth
      .login({ email: values.email, password: values.password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        closeModal();
        handleReset();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleRegister = (values, handleReset) => {
    auth
      .register({
        email: values.email,
        password: values.password,
        name: values.name,
        avatar: values.avatar,
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        closeModal();
        handleReset();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const onEditProfile = (values, handleReset) => {
    const token = localStorage.getItem("jwt");

    api
      .updateCurrentUser({ name: values.name, avatar: values.avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeModal();
        handleReset();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUsingDefaultLocation(false);
          fetchAndSetWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation failed, using default coordinates:", error);
          setUsingDefaultLocation(true);
          fetchAndSetWeather(coordinates);
        },
        { timeout: 10000 },
      );
    } else {
      setUsingDefaultLocation(true);
      fetchAndSetWeather(coordinates);
    }

    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{ isLoggedIn }}>
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
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                onSignUpClick={() => setActiveModal("register")}
                onLogInClick={() => setActiveModal("login")}
              />
              {usingDefaultLocation && (
                <div className="page__location-notice">
                  <div>
                    Location not available — showing weather at the North Pole.
                    Allow location access to see weather for your area, or enter
                    coordinates below to view weather for a specific location.
                  </div>
                  <form
                    className="page__location-form"
                    onSubmit={handleManualSubmit}
                  >
                    <input
                      className="page__location-input"
                      type="number"
                      step="any"
                      placeholder="Latitude"
                      value={manualLat}
                      onChange={(e) => setManualLat(e.target.value)}
                    />
                    <input
                      className="page__location-input"
                      type="number"
                      step="any"
                      placeholder="Longitude"
                      value={manualLng}
                      onChange={(e) => setManualLng(e.target.value)}
                    />
                    <button className="page__location-button" type="submit">
                      Use location
                    </button>
                  </form>
                </div>
              )}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleCardLike={handleCardLike}
                        handleSignOut={handleSignOut}
                      />
                    </ProtectedRoute>
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
            <LoginModal
              handleCloseClick={closeModal}
              name="login"
              activeModal={activeModal}
              handleModalSwitch={handleModalSwitch}
              handleLogin={handleLogin}
            />
            <RegisterModal
              handleCloseClick={closeModal}
              name="register"
              activeModal={activeModal}
              handleModalSwitch={handleModalSwitch}
              handleRegister={handleRegister}
            />
            <EditProfileModal
              handleCloseClick={closeModal}
              name="edit-profile"
              activeModal={activeModal}
              onEditProfile={onEditProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
