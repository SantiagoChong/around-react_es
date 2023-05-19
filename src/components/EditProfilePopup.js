import React, {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Editar Perfil"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      loading={props.loading}
    >
      <fieldset className="popup__input-container popup__fieldset">
        <label className="popup__label"></label>
        <input
          type="text"
          className="popup__item popup__item_el_name"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="name-error popup__item-error"></span>

        <label className="popup__label"></label>
        <input
          type="text"
          className="popup__item popup__item_el_description"
          name="description"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="description-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
