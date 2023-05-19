import React, {createRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="profile-photo"
      title="Cambiar foto de perfil"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      size="small"
      loading={props.loading}
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
          ref={inputRef}
        />
        <span className="photo-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
