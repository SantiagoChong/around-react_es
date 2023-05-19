import React, {useContext} from "react";
import {CurrentUserContext} from "../contetxs/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `cards__delete-button ${
    isOwn ? "cards__delete-button" : "cards__delete-button_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like-button ${isLiked ? "cards__like-button_active" : "cards__like-button"}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteCard(props.card);
  }

  return (
    <div className="cards__item" key={props._id}>
      <img src={props.link} alt={props.name} className="cards__image" onClick={handleClick} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteCard} />
      <div className="cards__rectangle">
        <h3 className="cards__text">{props.name}</h3>
        <div className="cards__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="cards__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}
