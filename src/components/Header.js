import React from "react";
import logo from "../images/Header_logo.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Switch>
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <Link className="header__exit" to="/signup" onClick={onSignOut}>
          Выйти
          </Link>
        </Route>
        <Route path="/signup">
          <Link className="header__login" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__register" to="/signup">
          Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
