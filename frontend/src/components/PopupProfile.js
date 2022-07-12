import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input
            value={name || ""}
            onChange={handleNameChange}
            className="popup__input"
            type="text"
            placeholder="Имя"
            name="profile_name"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error" id="profile_name-error"></span>
        </label>
        <label className="popup__field">
          <input
            value={description || ""}
            onChange={handleDescriptionChange}
            className="popup__input"
            type="text"
            placeholder="Профессиональная деятельность"
            name="profile_status"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error" id="profile_status-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default PopupProfile;
