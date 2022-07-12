import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(0);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input
            ref={avatarRef}
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            name="change_link"
            required
          />
          <span className="popup__input-error" id="change_link-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default PopupAvatar;
