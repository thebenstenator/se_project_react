import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleMobileClick,
  onSignUpClick,
  onLogInClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </Link>
      <button
        className="header__menu-btn"
        type="button"
        onClick={handleMobileClick}
      ></button>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        // Show when logged in
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link className="header__user-container" to="/profile">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                <span className="header__avatar-initial">
                  {getInitial(currentUser.name)}
                </span>
              </div>
            )}
          </Link>
        </>
      ) : (
        // Show when logged out
        <div className="header__auth-buttons">
          <button onClick={onSignUpClick} className="header__signup-btn">
            Sign Up
          </button>
          <button onClick={onLogInClick} className="header__login-btn">
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
