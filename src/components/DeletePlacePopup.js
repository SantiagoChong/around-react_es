import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup(props) {
  function handleDeleteClick(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="¿Estás seguro/a?"
      size="confirmation"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleDeleteClick}
      loading={props.loading}
    ></PopupWithForm>
  );
}
