import React from "react";

function PopupWithForm({
  title,
  name,
  saveButtonName,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__window">
        <button
          className="popup__close-button popup__close-button_info"
          type="button"
          onClick={onClose}
        ></button>
        <section className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form
            className="form"
            name={name}
            // noValidate
            onSubmit={onSubmit}
          >
            {children}
            <button className="popup__save-button" id={name} type="submit">
              <span className="popup__save-button-text">{saveButtonName}</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
export default PopupWithForm;
