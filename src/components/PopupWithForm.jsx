import closeButton from "../images/close-icon.svg";

export default function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className={`form form_${props.name}`}>
          <img className="popup__toggle" src={closeButton} alt="icono de cerrar" onClick={props.onClose} />
          <form className={`popup__container popup__container_${props.size}`} name={`${props.name}-form`} noValidate>
            <h1 className="popup__title">{props.title}</h1>
            {props.children}
            <fieldset className="popup__handlers">
              <button type="submit" className="popup__button">
                {props.name === "confirmation" ? "Sí" : "Guardar"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
