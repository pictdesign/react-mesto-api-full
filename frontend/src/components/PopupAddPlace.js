import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddPlace({ isOpen, onClose, onAddPlace }) {
  const placeNameRef = React.useRef(0);
  const placeLinkRef = React.useRef(0);

  useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: placeLinkRef.current.value,
      name: placeNameRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="image"
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      submitText="Создать"
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input
            ref={placeNameRef}
            className="popup__input"
            type="text"
            placeholder="Название"
            name="image_name"
            required
            minLength="2"
            maxLength="30 "
          />
          <span className="popup__input-error" id="image_name-error"></span>
        </label>
        <label className="popup__field">
          <input
            ref={placeLinkRef}
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            name="image_link"
            required
          />
          <span className="popup__input-error" id="image_link-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default PopupAddPlace;
