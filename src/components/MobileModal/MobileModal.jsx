import avatar from "../../assets/avatar.svg";
import { useModalHandlers } from "../../hooks/useModalHandlers";

function MobileModal({ activeModal, handleCloseClick, handleAddClick, name }) {
  const { handleOverlayMouseDown } = useModalHandlers(
    activeModal,
    name,
    handleCloseClick,
    { esc: false }
  );

  return (
    <div
      className={`modal ${
        activeModal === name ? "modal_opened" : ""
      } modal_type_mobile`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className="modal__content modal__content_type_mobile">
        <button
          onClick={handleCloseClick}
          className="modal__close modal__close_type_mobile"
          type="button"
        ></button>
        <div className="modal__user-container">
          <p className="modal__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="modal__avatar" />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="modal__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
    </div>
  );
}

export default MobileModal;
