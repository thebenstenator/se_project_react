import avatar from "../../assets/avatar.svg";

function MobileModal({ activeModal, handleCloseClick, handleAddClick, name }) {
  return (
    <div
      className={`modal ${
        activeModal === name ? "modal_opened" : ""
      } modal_type_mobile`}
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
