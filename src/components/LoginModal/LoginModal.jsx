import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const LoginModal = ({
  activeModal,
  handleLogin,
  handleCloseClick,
  handleModalSwitch,
}) => {
  const defaultValues = { email: "", password: "" };
  const {
    values,
    handleChange,
    handleReset,
    errors,
    isValid,
    validateForm,
    isSubmitted,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    handleLogin(values, handleReset);
  }

  return (
    <ModalWithForm
      name="login"
      buttonText="Log in"
      title="Log in"
      handleCloseClick={handleCloseClick}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      redirectButton={
        <button
          type="button"
          className="modal__redirect-button"
          onClick={() => handleModalSwitch("register")}
        >
          or Register
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          name="email"
          className={
            "modal__input " +
            (isSubmitted && errors.email ? "modal__input_invalid" : "")
          }
          id="email"
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
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="password"
          name="password"
          className={
            "modal__input " +
            (isSubmitted && errors.password ? "modal__input_invalid" : "")
          }
          id="password"
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
    </ModalWithForm>
  );
};

export default LoginModal;
