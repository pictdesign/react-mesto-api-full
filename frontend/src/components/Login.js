import React, { useState } from "react";

const Login = ( {onLogin} ) => {

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
    onLogin(email, password, clearForm);
  }

  function clearForm() {
    setEmail('');
    setPassword('');
  }
  
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="popup__title popup__title_color_white">
        Вход
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
          Войти
        </button>
        
      </div>
    </form>
    
  )
}

export default Login;