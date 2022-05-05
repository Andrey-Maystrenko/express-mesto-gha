import React from "react";
import success from "../images/success.svg";
import failure from "../images/failure.svg";

export default function InfoTooltip({
  onClose,
  onSuccess,
  onFailure,
  successMessage,
  failureMessge,
}) {
  return (
    (onSuccess) ? 
        <div className={`popup ${onSuccess ? "popup_opened" : ""}`}>
          <div className="popup__window popup__window_message">
            <button
              className="popup__close-button popup__close-button_info"
              type="button"
              onClick={onClose}
            ></button>
            <section className="popup__content">
              <img
                className="popup__infotooltip"
                src={success}
                alt="успешная регистрация"
              />
              <h3 className="popup__title popup__title_message">
                {successMessage}
              </h3>
            </section>
          </div>
        </div>
:
  (onFailure) ?
        <div className={`popup ${onFailure ? "popup_opened" : ""}`}>
          <div className="popup__window popup__window_message">
            <button
              className="popup__close-button popup__close-button_info"
              type="button"
              onClick={onClose}
            ></button>
            <section className="popup__content">
              <img
                className="popup__infotooltip"
                src={failure}
                alt="неудачная регистрация"
              />
              <h3 className="popup__title popup__title_message">
                {failureMessge}
              </h3>
            </section>
          </div>
        </div>
: null
  )
}

// export default function InfoTooltip({
//   title,
//   name,
//   isOpen,
//   onClose,
//   children,
// }) {

//   return (
//     <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
//       <div className="popup__window popup__window_message">
//         <button
//           className="popup__close-button popup__close-button_info"
//           type="button"
//           onClick={onClose}
//         ></button>
//         <section className="popup__content">
//           {children}
//           <h3 className="popup__title popup__title_message">{title}</h3>
//           <form
//             className="form"
//             name={name}
//           >
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }
