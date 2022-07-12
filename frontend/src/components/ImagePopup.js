import React from "react";

function ImagePopup({card, onClose}) {
 return(
  <div className={`popup ${card.link ? "popup_opened" : ""}`} name="preview-image">
    {card && (
      <div className="popup__container popup__container_size_m">
        <button onClick={onClose} className="popup__close-button" type="button"></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__element-title">{card.name}</h3>
      </div>
    )}
  </div>
 )
}

export default ImagePopup;