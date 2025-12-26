import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ activeModal, onAddItem, handleCloseClick }) => {
  const defaultValues = { name: "", link: "", weather: "" };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      name="add-garment"
      buttonText="Add Garment"
      title="New Garment"
      handleCloseClick={handleCloseClick}
      activeModal={activeModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL{""}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset
        role="radiogroup"
        aria-required="true"
        className="modal__radio-btns"
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather"
            value="hot"
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
