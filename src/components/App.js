import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
// import success from "../images/success.svg";
// import failure from "../images/failure.svg";
import * as mestoAuth from "../utils/mestoAuth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isSuccessfulRegister, setIsSuccessfulRegister] = React.useState(false);
  const [isFailuredRegister, setIsFailuredRegister] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: "../images/avatar.jpg",
  });
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [email, setEmail] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   tokenCheck();
  // }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  React.useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      api
        .getInitialCards()
        .then((values) => {
          setCards(values);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    // document.querySelector('.popup_add-element').classList.add('popup_opened')
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    // document.querySelector('.popup_opened').classList.remove('popup_opened');
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessfulRegister(false);
    setIsFailuredRegister(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
    api
      .patchUserInfo(
        JSON.stringify({
          name: userData.name,
          about: userData.about,
        })
      )
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleUpdateAvatar(avatarData, input) {
    api
      .patchAvatar(
        JSON.stringify({
          avatar: avatarData.avatar,
        })
      )
      .then((res) => {
        setCurrentUser(res);
        input.value = "";
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  // if (!currentUser) return null;

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(
          JSON.stringify({
            likes: card.owner.name,
          }),
          card._id
        )
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      api
        .deleteLike(
          JSON.stringify({
            likes: card.owner.name,
          }),
          card._id
        )
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((updatedCard) => updatedCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // if (!cards) return null;

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(
        JSON.stringify({
          name: card.name,
          link: card.link,
          likes: [],
        })
      )
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleRegister(email, password) {
    mestoAuth
      .register(email, password)
      .then(() => {
        history.push("/signin");
        setIsSuccessfulRegister(true);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        return setIsFailuredRegister(true);
      });
  }

  function handleLogin(email, password) {
    return mestoAuth
      .authorize(email, password)
      .then((token) => {
        if (token) {
          localStorage.setItem("jwt", token);
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        return setIsFailuredRegister(true);
      });
  }

  function tokenCheck() {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      mestoAuth
        .getContent(jwt)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signup" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          saveButtonName="Да"
          onClose={closeAllPopups}
          // onSubmit
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          onSuccess={isSuccessfulRegister}
          onFailure={isFailuredRegister}
          successMessage="Вы успешно зарегистрировались!"
          failureMessge="Что-то пошло не так! Попробуйте еще раз."

          // children={
          //   <img
          //     className="popup__infotooltip"
          //     src={success}
          //     alt="успешная регистрация"
          //   />
          // }
        />
        {/* <InfoTooltip
          title="Вы успешно зарегистрировались!"
          name="success"
          isOpen={isSuccessfulRegister}
          onClose={closeAllPopups}
          children={
            <img
              className="popup__infotooltip"
              src={success}
              alt="успешная регистрация"
            />
          }
        />
        <InfoTooltip
          title="Что-то пошло не так! Попробуйте еще раз."
          name="failure"
          isOpen={isFailuredRegister}
          onClose={closeAllPopups}
          children={
            <img
              className="popup__infotooltip"
              src={failure}
              alt="неудачная регистрация"
            />
          }
        />
      
      {/* <Main
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      cards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
    /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}
export default withRouter(App);
