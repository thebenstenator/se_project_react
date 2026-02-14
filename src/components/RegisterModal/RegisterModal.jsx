import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({
  activeModal,
  handleCloseClick,
  handleModalSwitch,
  handleRegister,
}) => {
  const defaultValues = { email: "", password: "", name: "", avatar: "" };
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
    handleRegister(values, handleReset);
  }

  return (
    <ModalWithForm
      name="register"
      buttonText="Next"
      title="Sign up"
      handleCloseClick={handleCloseClick}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      redirectButton={
        <button
          type="button"
          className="modal__redirect-button"
          onClick={() => handleModalSwitch("login")}
        >
          or Log in
        </button>
      }
    >
      <label htmlFor="register-email" className="modal__label">
        Email{""}
        <input
          type="email"
          name="email"
          className={
            "modal__input " +
            (isSubmitted && errors.email ? "modal__input_invalid" : "")
          }
          id="register-email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.email ? "modal__error_visible" : "")
          }
        >
          {errors.email}
        </span>
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{""}
        <input
          type="password"
          name="password"
          className={
            "modal__input " +
            (isSubmitted && errors.password ? "modal__input_invalid" : "")
          }
          id="register-password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.password ? "modal__error_visible" : "")
          }
        >
          {errors.password}
        </span>
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{""}
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
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{""}
        <input
          type="url"
          name="avatar"
          className={
            "modal__input " +
            (isSubmitted && errors.avatar ? "modal__input_invalid" : "")
          }
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
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

export default RegisterModal;
