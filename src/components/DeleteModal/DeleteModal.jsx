import "./DeleteModal.css";

function DeleteModal({ name, activeModal, handleCloseClick }) {
  return (
    <div
      className={`modal ${
        activeModal === name ? "modal_opened" : ""
      } modal_type_delete`}
    >
      <div className="modal__content modal__content_type_delete">
        <button
          className="modal__close modal__close_type_delete"
          onClick={handleCloseClick}
        ></button>
        <p className="modal__warning">
          Are you sure you want to delete this item?
          <span className="modal__span">This action is irreversible.</span>
        </p>
        <button className="modal__confirm-delete-button" type="submit">
          Yes, delete item
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
