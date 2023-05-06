import "../index.css";
import React, {useState, useEffect} from "react";
import Header from "./Hearder";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";

export default function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] = useState(false);
  const [isEditAvatarPopUpOpen, setIsEditAvatarPopUpOpen] = useState(false);
  const [isAddPlacePopUpOpen, setIsAddPlacePopUpOpen] = useState(false);
  const [isDeleteCardPopUpOpen, setIsDeleteCardPopUpOpen] = useState(false);
  const [isSelectedCardOpen, setIsSelectedCardOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("{}");

  useEffect(() => {
    api.getProfileInfo().then((data) => {
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
      setUserName(data.name);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, []);

  function onEditProfileClick() {
    setIsEditProfilePopUpOpen(true);
  }

  function onEditAvatarClick() {
    setIsEditAvatarPopUpOpen(true);
  }

  function onAddPlaceClick() {
    setIsAddPlacePopUpOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardOpen(true);
  }

  function onDeleteCardClick() {
    setIsDeleteCardPopUpOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopUpOpen(false);
    setIsAddPlacePopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsSelectedCardOpen(false);
    setIsDeleteCardPopUpOpen(false);
  }

  return (
    <div className="root">
      <Header />
      <Main
        onEditProfile={onEditProfileClick}
        onEditAvatar={onEditAvatarClick}
        onAddPlace={onAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteCard={onDeleteCardClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
      />
      <Footer />
      <PopupWithForm name="profile" title="Editar Perfil" isOpen={isEditProfilePopUpOpen} onClose={closeAllPopups}>
        <fieldset className="popup__input-container popup__fieldset">
          <label className="popup__label"></label>
          <input
            type="text"
            id="name"
            className="popup__item popup__item_el_name"
            name="name"
            placeholder="Nombre"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="name-error popup__item-error"></span>
          <label className="popup__label"></label>
          <input
            type="text"
            id="description"
            className="popup__item popup__item_el_description"
            name="description"
            placeholder="Acerca de mí"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="description-error popup__item-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="profile-photo"
        title="Cambiar foto de perfil"
        isOpen={isEditAvatarPopUpOpen}
        onClose={closeAllPopups}
        size="small"
      >
        <fieldset className="popup__input-container popup__fieldset">
          <label className="popup__label"></label>
          <input
            type="url"
            id="photo"
            className="popup__item popup__item_el_name"
            name="photo"
            placeholder="Enlace de la imagen"
            required
          />
          <span className="photo-error popup__item-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name="new-card" title="Nuevo Lugar" isOpen={isAddPlacePopUpOpen} onClose={closeAllPopups}>
        <fieldset className="popup__input-container popup__fieldset">
          <label className="popup__label"></label>
          <input
            type="text"
            id="title"
            className="popup__item popup__item_el_name"
            name="title"
            placeholder="Título"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="title-error popup__item-error"></span>
          <label className="popup__label"></label>
          <input
            type="url"
            id="image"
            className="popup__item popup__item_el_description"
            name="image"
            placeholder="Enlace de la imagen"
            required
          />
          <span className="image-error popup__item-error"></span>
        </fieldset>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isSelectedCardOpen} onClose={closeAllPopups}></ImagePopup>
      <PopupWithForm
        name="confirmation"
        title="¿Estás seguro/a?"
        size="confirmation"
        isOpen={isDeleteCardPopUpOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>
    </div>
  );
}
