import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick, name }) {
  return (
    <div
      className={`modal ${
        activeModal === name ? "modal_opened" : ""
      } modal_type_item`}
    >
      <div className="modal__content modal__content_type_item">
        <button
          onClick={handleCloseClick}
          className="modal__close modal__close_type_item"
          type="button"
        ></button>
        {card && (
          <>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
