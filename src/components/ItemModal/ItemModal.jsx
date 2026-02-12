import "./ItemModal.css";
import { useModalHandlers } from "../../hooks/useModalHandlers";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  name,
  handleDeleteClick,
}) {
  const { handleOverlayMouseDown } = useModalHandlers(
    activeModal,
    name,
    handleCloseClick,
    { esc: true },
  );

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card && currentUser && card.owner === currentUser._id;

  return (
    <div
      className={`modal ${
        activeModal === name ? "modal_opened" : ""
      } modal_type_item`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className="modal__content modal__content_type_item">
        <button
          onClick={handleCloseClick}
          className="modal__close modal__close_type_item"
          type="button"
        ></button>
        {card && (
          <>
            <img src={card.imageUrl} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>

            {isOwn && (
              <button
                className="modal__delete-button"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
