import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const AddItemModal = ({ activeModal, onAddItem, handleCloseClick }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const {
    values,
    handleChange,
    handleReset,
    errors,
    validateForm,
    isSubmitted,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    onAddItem(values, handleReset);
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
      <label htmlFor="add-garment-name" className="modal__label">
        Name{""}
        <input
          type="text"
          name="name"
          className={
            "modal__input " +
            (isSubmitted && errors.name ? "modal__input_invalid" : "")
          }
          id="add-garment-name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.name ? "modal__error_visible" : "")
          }
        >
          {errors.name}
        </span>
      </label>
      <label htmlFor="add-garment-imageUrl" className="modal__label">
        Image URL{""}
        <input
          type="text"
          name="imageUrl"
          className={
            "modal__input " +
            (isSubmitted && errors.imageUrl ? "modal__input_invalid" : "")
          }
          id="add-garment-imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.imageUrl ? "modal__error_visible" : "")
          }
        >
          {errors.imageUrl}
        </span>
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
            className={
              "modal__radio-input " +
              (isSubmitted && errors.weather ? "modal__input_invalid" : "")
            }
            id="hot"
            name="weather"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className={
              "modal__radio-input " +
              (isSubmitted && errors.weather ? "modal__input_invalid" : "")
            }
            id="warm"
            name="weather"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className={
              "modal__radio-input " +
              (isSubmitted && errors.weather ? "modal__input_invalid" : "")
            }
            id="cold"
            name="weather"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.weather ? "modal__error_visible" : "")
          }
        >
          {errors.weather}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
