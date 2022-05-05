import React from "react";

export default function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function onLogin(e) {
    e.preventDefault();
    handleLogin(email, password).catch();
  }
  return (
    <div className="popup__window popup__window_dark-theme">
      <section className="popup__content">
        <h3 className="popup__title popup__title_dark-theme">Вход</h3>
        <form
          className="form"
          name="register"
          // noValidate
          onSubmit={onLogin}
        >
          <input
            className="form__input form__input_dark-theme"
            type="email"
            placeholder="E-mail"
            name="element__mask-group"
            required
            onChange={handleEmailChange}
          />
          <input
            className="form__input form__input_dark-theme"
            type="password"
            placeholder="Пароль"
            name="element__name"
            required
            minLength="2"
            maxLength="30"
            onChange={handlePasswordChange}
          />
          <span className="popup__error" id="element__name"></span>
          <button
            className="popup__save-button popup__save-button_dark-theme"
            type="submit"
          >
            <span className="popup__save-button-text popup__save-button-text_dark-theme">
              Войти
            </span>
          </button>
        </form>
      </section>
    </div>
  );
}
