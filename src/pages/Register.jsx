import React, { useState } from "react";
import { useTranslation } from "../context/language";

export default function Register() {
  const { t } = useTranslation();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [registerDataError, setRegisterDataError] = useState({
    nameError: null,
    emailError: null,
    usernameError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^()_+])[A-Za-z\d@.#$!%*?&^()_+]{8,}$/;

  const handleFieldChange = (e) => {
    const { id, value } = e.target;

    setRegisterData({ ...registerData, [id]: value });

    let error = null;

    switch (id) {
      case "name":
        error = value.length === 0 ? t("required") : value.length < 3 ? t("minChars") : null;
        setRegisterDataError((prev) => ({ ...prev, nameError: error }));
        break;

      case "email":
        error = value.length === 0 ? t("required") : !EMAIL_REGEX.test(value) ? t("invalidEmail") : null;
        setRegisterDataError((prev) => ({ ...prev, emailError: error }));
        break;

      case "username":
        error =
          value.length === 0
            ? t("required")
            : /\s/.test(value)
            ? t("noWhitespace")
            : !USERNAME_REGEX.test(value)
            ? t("usernameRequirements")
            : null;
        setRegisterDataError((prev) => ({ ...prev, usernameError: error }));
        break;

      case "password":
        error =
          value.length === 0
            ? t("required")
            : value.length < 8
            ? t("passwordMinLength")
            : !PASSWORD_REGEX.test(value)
            ? t("passwordRequirements")
            : null;
        setRegisterDataError((prev) => ({ ...prev, passwordError: error }));
        break;

      case "confirmPassword":
        error =
          value.length === 0
            ? t("required")
            : value !== registerData.password
            ? t("passwordMismatch")
            : null;
        setRegisterDataError((prev) => ({ ...prev, confirmPasswordError: error }));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      nameError: registerData.name.length < 3 ? t("minChars") : null,
      emailError: !EMAIL_REGEX.test(registerData.email) ? t("invalidEmail") : null,
      usernameError: !USERNAME_REGEX.test(registerData.username) ? t("usernameRequirements") : null,
      passwordError: !PASSWORD_REGEX.test(registerData.password) ? t("passwordRequirements") : null,
      confirmPasswordError:
        registerData.confirmPassword !== registerData.password ? t("passwordMismatch") : null,
    };

    setRegisterDataError(errors);

    const hasError = Object.values(errors).some((error) => error !== null);

    if (!hasError) {
      alert(t("registerSuccess"));
      setRegisterData({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-dark text-white text-center py-4">
              <h2 className="mb-0">{t("createAccount")}</h2>
            </div>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {[
                    {
                      id: "name",
                      type: "text",
                      placeholder: t("enterFullName"),
                      label: t("name"),
                      error: registerDataError.nameError,
                      icon: "user",
                      colSize: "col-md-12"
                    },
                    {
                      id: "email",
                      type: "email",
                      placeholder: t("enterEmail"),
                      label: t("email"),
                      error: registerDataError.emailError,
                      icon: "envelope",
                      colSize: "col-md-6"
                    },
                    {
                      id: "username",
                      type: "text",
                      placeholder: t("chooseUsername"),
                      label: t("username"),
                      error: registerDataError.usernameError,
                      icon: "at",
                      colSize: "col-md-6"
                    },
                    {
                      id: "password",
                      type: "password",
                      placeholder: t("createPassword"),
                      label: t("password"),
                      error: registerDataError.passwordError,
                      icon: "lock",
                      colSize: "col-md-6"
                    },
                    {
                      id: "confirmPassword",
                      type: "password",
                      placeholder: t("confirmYourPassword"),
                      label: t("confirmPassword"),
                      error: registerDataError.confirmPasswordError,
                      icon: "key",
                      colSize: "col-md-6"
                    },
                  ].map(({ id, type, placeholder, label, error, icon, colSize }) => (
                    <div className={`${colSize} mb-3`} key={id}>
                      <label htmlFor={id} className="form-label fw-bold">
                        {label}
                      </label>
                      <div className="input-group">
                        <input
                          type={type}
                          id={id}
                          value={registerData[id]}
                          onChange={handleFieldChange}
                          placeholder={placeholder}
                          className={`form-control ${error ? "is-invalid" : ""}`}
                        />
                        {error && <div className="invalid-feedback">{error}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg w-100"
                  >
                    {t("register")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

