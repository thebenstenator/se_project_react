import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-profile-button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-button" onClick={handleSignOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
