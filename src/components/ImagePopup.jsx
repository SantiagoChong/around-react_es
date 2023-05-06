import closeButton from "../images/close-icon.svg";

export default function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_image ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__image-container">
          <img
            src={closeButton}
            alt="icono de cerrar"
            className="popup__toggle popup__toggle_close_image"
            onClick={props.onClose}
          />
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <p className="popup__image-title">{props.card.name}</p>
        </div>
      </div>
    </>
  );
}
