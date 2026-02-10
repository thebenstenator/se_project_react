import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({
  activeModal,
  handleLogin,
  handleCloseClick,
  handleModalSwitch,
}) => {
  const defaultValues = { email: "", password: "", name: "", avatarUrl: "" };
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
    handleLogin(data, handleReset);
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
          required
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
          required
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
      <label htmlFor="name" className="modal__label">
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
      <label htmlFor="avatarUrl" className="modal__label">
        AvatarUrl{""}
        <input
          type="url"
          name="avatarUrl"
          className={
            "modal__input " +
            (isSubmitted && errors.avatarUrl ? "modal__input_invalid" : "")
          }
          id="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl || ""}
          onChange={handleChange}
          required
        />
        <span
          className={
            "modal__error " +
            (isSubmitted && errors.avatarUrl ? "modal__error_visible" : "")
          }
        >
          {errors.avatarUrl}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
