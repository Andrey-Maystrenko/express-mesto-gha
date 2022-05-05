import React from "react";

function ImagePopup({ card, onClose }) {
  if (!card) return null;
  return (
    <div className="popup popup_mask-group popup_opened">
      <div className="popup__window-mask-group">
        <button
          className="popup__close-button popup__close-button_mask-group"
          type="button"
          onClick={onClose}
        ></button>
        <section className="popup__content">
          <img
            className="popup__mask-group-full-size"
            src={card.link}
            alt={card.name}
          />
          <h3 className="popup__title-mask-group">{card.name}</h3>
        </section>
      </div>
    </div>
  );
}
export default ImagePopup;
