import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CurrentUserContext  from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';

const Header = ({ loggedIn, onLogout }) => {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (location.pathname === '/signin') return setLinkText('Регистрация');
    if (location.pathname === '/signup') return setLinkText('Войти');
  }, [location]);


    return (
      <header className="header">
        <img className="logo" alt="Логотип Место" src={logo} />
        <div>
          {loggedIn ? (
            <div className="header__info">
              <p className="header__email">{user.email}</p>
              <Link to="/signin" className="header__link header__link_color_gray" onClick={onLogout}>
                Выйти
              </Link>
            </div>
          ) : (
              <Link className="header__link" 
              to={(location) => {
                if (location.pathname === '/signin') return 'signup';
                if (location.pathname === '/signup') return 'signin'
              }}>
             
                {linkText}
            </Link>
          )}
        </div>
      </header>
    );
  }

  export default Header;
        
        