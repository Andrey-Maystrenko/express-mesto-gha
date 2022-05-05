import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      avatarRef.current
    );
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      saveButtonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="form__input form__input_element_mask-group"
            type="url"
            placeholder="Ссылка на картинку"
            name="avatar"
            required
            id="form__input_avatar"
            ref={avatarRef}
          />
          <span className="popup__error" id="avatar"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
