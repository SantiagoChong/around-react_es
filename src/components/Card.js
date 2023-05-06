import React from "react";
export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="cards__item" key={props._id}>
      <img src={props.link} alt={props.name} className="cards__image" onClick={handleClick} />
      <button className="cards__delete-button" onClick={props.onDeleteCard} />
      <div className="cards__rectangle">
        <h3 className="cards__text">{props.name}</h3>
        <div className="cards__like-container">
          <button className="cards__like-button"></button>
          <p className="cards__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}
