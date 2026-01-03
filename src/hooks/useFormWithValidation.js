import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    let message = "";
    if (name === "name") {
      if (!value || String(value).trim() === "") message = "Name is required";
      if (value.length < 1) message = "Name must be at least 1 character";
      if (value.length > 30) message = "Name must be at most 30 characters";
    } else if (name === "imageUrl") {
      if (!value || String(value).trim() === "")
        message = "Image URL is required";
      else {
        try {
          // URL constructor will throw for invalid urls
          // allow protocol-relative urls by ensuring a protocol exists
          new URL(value);
        } catch (e) {
          message = "Enter a valid URL";
        }
      }
    } else if (name === "weather") {
      if (!value) message = "Select the weather type";
    }
    return message;
  };

  const validateAll = (vals) => {
    const nextErrors = {};
    const keys = Object.keys({ ...defaultValues, ...vals });
    for (const key of keys) {
      nextErrors[key] = validateField(key, vals[key]);
    }
    const nextIsValid = Object.values(nextErrors).every((m) => !m);
    setErrors(nextErrors);
    setIsValid(nextIsValid);
    return nextIsValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      return next;
    });

    // If the user already tried to submit, validate individual field on change
    if (isSubmitted) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      setIsValid(
        Object.values({ ...errors, [name]: validateField(name, value) }).every(
          (m) => !m
        )
      );
    }
  };

  const validateForm = (vals = values) => {
    setIsSubmitted(true);
    return validateAll(vals);
  };

  const handleReset = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsSubmitted(false);
    },
    [defaultValues]
  );

  return {
    values,
    handleChange,
    handleReset,
    setValues,
    errors,
    isValid,
    validateForm,
    isSubmitted,
  };
}
