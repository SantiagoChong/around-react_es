import React, {createContext, useState, useEffect, createRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  /*const titleRef = React.createRef();
  const linkRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Nuevo Lugar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
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
          ref={titleRef}
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
          ref={linkRef}
        />
        <span className="image-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );*/

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name,
      link: url,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Nuevo Lugar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      loading={props.loading}
    >
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className="image-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
