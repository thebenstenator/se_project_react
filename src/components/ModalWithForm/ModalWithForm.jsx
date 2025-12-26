import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  name,
  onSubmit,
}) {
  return (
    <div className={`modal ${activeModal === name ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
