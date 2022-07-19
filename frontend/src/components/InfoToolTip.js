import React from 'react';
import successIcon from '../images/success.png';
import failIcon from '../images/fail.png';

const InfoTooltip = ({ isOpen, onClose, successRegistration }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <img src={successRegistration ? successIcon : failIcon} alt="" className="popup__icon" />
        <p className="popup__title popup__title_tooltip">
          {successRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так' };
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;