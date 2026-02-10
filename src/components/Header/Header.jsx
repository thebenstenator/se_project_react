import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleMobileClick,
  currentUser,
  isLoggedIn,
  onSignUpClick,
  onLogInClick,
}) {
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

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
            <p className="header__username">
              {currentUser?.name || "Terrence Tegegne"}
            </p>
            <img
              src={currentUser?.avatar || avatar}
              alt={currentUser?.name || "User"}
              className="header__avatar"
            />
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
