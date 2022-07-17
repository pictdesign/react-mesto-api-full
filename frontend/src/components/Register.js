import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="popup__title popup__title_color_white">
        Регистрация
      </h2>
      <div className="form__container">
        <fieldset className="popup__input-container">
          <label className="popup__field">
            <input 
              id="email"
              onChange={handleChangeEmail}
              value={email}
              className="popup__input popup__input_bg_black" 
              type="email"
              placeholder="Email"
            />
          </label>
          <label className="popup__field">
            <input 
              id="password"
              onChange={handleChangePassword}
              value={password}
              className="popup__input popup__input_bg_black" 
              type="password"
              placeholder="Пароль"
            />
          </label>
        </fieldset>
        <button className="popup__submit-button popup__submit-button_place_login" type="submit">
          Зарегистрироваться
        </button>

      </div>
      <p className="form__text">
        Уже зарегистрированы? <Link to="signin" className="form__link">Войти</Link>
      </p>
    </form>
  )
}

export default Register;