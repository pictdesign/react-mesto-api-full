import { React, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const [isLiked, setIsLiked] = React.useState(false);
  const [isOwn, setIsOwn] = React.useState(false);
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    setIsLiked(() => card.likes.some(i => i === currentUser._id))
    setIsOwn(card.owner === currentUser._id);
  }, [currentUser, card]);

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : ""
  }`;
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <button
        onClick={() => {
          onCardDelete(card);
        }}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like">
          <button
            onClick={() => {
              onCardLike(card);
            }}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
