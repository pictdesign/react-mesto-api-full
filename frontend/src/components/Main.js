import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
            aria-label="Edit"
          ></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
