import React from "react";
import {Link} from 'react-router-dom';

export default function Register({handleRegister}) {
  const [email, setEmail] = React.useState("test@test.ru");
  const [password, setPassword] = React.useState("test");

  function handleEmailChange(e) {
    setEmail(e.target.value)
    console.log('введен емайл', email)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
    console.log('введен пароль', password)
  }

  function onRegister(e) {
    e.preventDefault();
    handleRegister(email, password)
  }

  return (
      <div className="popup__window popup__window_dark-theme">
        <section className="popup__content">
          <h3 className="popup__title popup__title_dark-theme">Регистрация</h3>
          <form
            className="form"
            name="register"
            // noValidate
            onSubmit={onRegister}
          >
            <input
              className="form__input form__input_dark-theme"
              type="email"
              placeholder="E-mail"
              name="element__mask-group"
              required
              onChange={handleEmailChange}
              value={email}
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
            value={password}
          />
          <span className="popup__error" id="element__name"></span>
            <button className="popup__save-button popup__save-button_dark-theme" type="submit">
              <span className="popup__save-button-text popup__save-button-text_dark-theme">
                Зарегистрироваться
              </span>
            </button>
            <p className="popup__subscribe">
            {`Уже зарегистрированы? `}
            <Link className="popup__subscribe popup__subscribe_login" to="/signin">Войти</Link>
            </p>
          </form>
        </section>
      </div>
  );
}
