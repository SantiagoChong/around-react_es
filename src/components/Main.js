import React, {useContext} from "react";
import pencil from "../images/pencil.svg";
import addButton from "../images/add_button.svg";
import Card from "./Card";
import {CurrentUserContext} from "../contetxs/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="container">
        <section className="profile">
          <div className="profile__container">
            <img src={currentUser.avatar} alt="imagen de perfil" className="profile__photo" />
            <button type="button" className="profile__photo-opacity" onClick={props.onEditAvatar}>
              <img src={pencil} alt="imagen de perfil editar" className="profile__photo-edit" />
            </button>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              <p className="profile__text">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
            <img src={addButton} alt="boton de añadir" className="profile__button-item" />
          </button>
        </section>
        <section className="elements">
          <div className="cards">
            {props.cards.map((card) => {
              const _card =
                card !== undefined ? (
                  <Card
                    key={card._id}
                    card={card}
                    name={card.name}
                    link={card.link}
                    _id={card._id}
                    likes={card.likes.length}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onDeleteCard={props.onDeleteCard}
                  />
                ) : (
                  <> </>
                );
              return _card;
            })}
          </div>
        </section>
      </main>
    </>
  );
}
