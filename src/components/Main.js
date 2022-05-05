import React from "react";
import editButton from "../images/EditButton.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="avatar">
          <img
            className="avatar__photo"
            alt="Аватар"
            src={currentUser.avatar}
          />
          <div className="avatar__overlay" onClick={onEditAvatar}>
            <img
              className="avatar__edit-symbol"
              src={editButton}
              alt="значок редактирования"
            />
          </div>
        </div>
        <div className="info">
          <h1 className="info__name">{currentUser.name}</h1>
          <button
            className="info__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="info__engagement">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              data={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
