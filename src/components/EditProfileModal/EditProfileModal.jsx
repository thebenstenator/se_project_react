import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

const EditProfileModal = ({ activeModal, handleCloseClick, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: "",
    avatar: "",
  };

  const {
    values,
    handleChange,
    handleReset,
    errors,
    isValid,
    validateForm,
    isSubmitted,
    setValues,
  } = useFormWithValidation(defaultValues);

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    onEditProfile(values, handleReset);
  }

  return (
    <ModalWithForm
      name="edit-profile"
      buttonText="Save Changes"
      title="Change profile data"
      handleCloseClick={handleCloseClick}
      activeModal={activeModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *{""}
        <input
          type="text"
          name="name"
          className={
            "modal__input " +
            (isSubmitted && errors.name ? "modal__input_invalid" : "")
          }
          id="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
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
      <label htmlFor="avatar" className="modal__label">
        Avatar *{""}
        <input
          type="url"
          name="avatar"
          className={
            "modal__input " +
            (isSubmitted && errors.avatar ? "modal__input_invalid" : "")
          }
          id="avatar"
          placeholder="Avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.avatar ? "modal__error_visible" : "")
          }
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
