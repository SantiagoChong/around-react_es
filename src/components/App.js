import "../index.css";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] = useState(false);
  const [isEditAvatarPopUpOpen, setIsEditAvatarPopUpOpen] = useState(false);
  const [isAddPlacePopUpOpen, setIsAddPlacePopUpOpen] = useState(false);
  const [isDeleteCardPopUpOpen, setIsDeleteCardPopUpOpen] = useState(false);
  const [isSelectedCardOpen, setIsSelectedCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getProfileInfo().then((data) => {
      setCurrentUser(data);
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

  function onDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopUpOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopUpOpen(false);
    setIsAddPlacePopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsSelectedCardOpen(false);
    setIsDeleteCardPopUpOpen(false);
  }

  function handleUpdateUser({name, about}) {
    setLoading(true);
    api.editProfile(name, about).then((data) => {
      setCurrentUser(data);
      setLoading(false);
      setIsEditProfilePopUpOpen(false);
    });
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api.newAvatar(data.avatar).then((data) => {
      setCurrentUser(data);
      setLoading(false);
      setIsEditAvatarPopUpOpen(false);
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    setLoading(true);
    api.addNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      setLoading(false);
      setIsAddPlacePopUpOpen(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete(data) {
    setLoading(true);
    api.deleteCard(data._id).then(() => {
      const newCards = cards.filter((c) => c._id !== data._id);
      setCards(newCards);
      setLoading(false);
      setIsDeleteCardPopUpOpen(false);
    });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={onEditProfileClick}
          onEditAvatar={onEditAvatarClick}
          onAddPlace={onAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDeleteCard={onDeleteCardClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopUpOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          loading={loading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopUpOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          loading={loading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopUpOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          loading={loading}
        />
        <ImagePopup card={selectedCard} isOpen={isSelectedCardOpen} onClose={closeAllPopups} />
        <DeletePlacePopup
          isOpen={isDeleteCardPopUpOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          loading={loading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
