import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(data);
  }
  //определяю моя ли это карточка
  const isOwn = data.owner._id === currentUser._id;
  //определяю класс корзины в зависимости от того, моя карточка или нет
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "" : "element__trash_invisible"
  }`;

  function handleDeleteClick() {
    onCardDelete(data)
  }

  //определяю лайкнута карточка или нет
  const isLiked = data.likes.some((i) => i._id === currentUser._id);
  //задаю класс иконки лайка в зависимости от того, лайкнута карточка или нет
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(data);
  }

  return (
    <div className="element">
      <button className="element__button-mask-group" type="button">
        <img
          className="element__mask-group"
          src={data.link}
          alt={data.name}
          onClick={handleClick}
        />
      </button>
      <div className="element__group">
        <h2 className="element__name">{data.name}</h2>
        <div className="element__like-group">
          <button
            // className="element__like"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-amount">{data.likes.length}</p>
        </div>
      </div>
      <button
        // className="element__trash element__trash_invisible"
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}
export default Card;
