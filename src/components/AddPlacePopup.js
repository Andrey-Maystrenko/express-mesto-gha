import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  // const newCardNameRef = React.useRef();
  // const newCardLinkRef = React.useRef();
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);
  function handleAddPlaceNameChange(e) {
    setName(e.target.value);
  }
  function handleAddPlaceLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(
      {
        name: name,
        link: link,
      }
      // ,
      // newCardNameRef.current,
      // newCardLinkRef.current
    );
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      saveButtonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="form__input form__input_element_name"
            type="text"
            placeholder="Название"
            name="element__name"
            required
            minLength="2"
            maxLength="30"
            id="form__input_element_name"
            value={name}
            onChange={handleAddPlaceNameChange}
          />
          <span className="popup__error" id="element__name"></span>
          <input
            className="form__input form__input_element_mask-group"
            type="url"
            placeholder="Ссылка на картинку"
            name="element__mask-group"
            required
            id="form__input_element_mask-group"
            value={link}
            onChange={handleAddPlaceLinkChange}
          />
          <span className="popup__error" id="element__mask-group"></span>
        </>
      }
    />
  );
}
export default AddPlacePopup;
