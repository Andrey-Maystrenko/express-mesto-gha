import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleUserNameChange(e) {
    setName(e.target.value);
  }
  function handleUserDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-info"
      saveButtonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="form__input form__input_info_name"
            type="text"
            name="info__name"
            required
            minLength="2"
            maxLength="40"
            id="form__input_info_name"
            placeholder="Имя"
            value={name||"Жак-Ив Кусто"}
            onChange={handleUserNameChange}
          />
          <span className="popup__error" id="info__name"></span>
          <input
            className="form__input form__input_info_engagement"
            type="text"
            name="info__engagement"
            required
            minLength="2"
            maxLength="200"
            id="form__input_info_engagement"
            placeholder="Род занятий"
            value={description||"Исследователь океана"}
            onChange={handleUserDescriptionChange}
          />
          <span className="popup__error" id="info__engagement"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
