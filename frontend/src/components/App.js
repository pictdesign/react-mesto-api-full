import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupProfile from "./PopupProfile";
import PopupAvatar from "./PopupAvatar";
import PopupAddPlace from "./PopupAddPlace";
import InfoTooltip from "./InfoToolTip";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoadingContext from '../contexts/LoadingContext';
const user = {};  


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState(user);
  const [successRegistration, setSuccessRegistration] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await api.getUserInfo();
      setCurrentUser((user) => ({
        ...user,
        ...userData.data,
      })); 
    }

    const fetchCards = async () => {
      const cards = await api.getInitialCards();
      setCards(cards);
    };

    try {
      loggedIn && fetchUserData();
      loggedIn && fetchCards();
    } catch (err) {
      console.log(err);
    }
  }, [loggedIn]);

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  };

  const tokenCheck = () => {
    auth
      .getContent()
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', escFunction);
    return window.removeEventListener('keyup', escFunction);
  }, []);

  const handleRegistration = (email, password) => {
    setSuccessRegistration(false);
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          history.push("/signin");
          setSuccessRegistration(true);
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen({ isOpen: true });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
    }

  const handleAuthorization = (email, password) => {
    return auth
      .authorization(email, password)
      .then((res) => {
        tokenCheck();
      })
      .catch((err) => {
        setSuccessRegistration(false);
        setIsInfoTooltipOpen({ isOpen: true });
      });
  }

  const handleLogout = () => {
    auth.signout(); 
    setLoggedIn(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = ()  => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  };
  
  function handleCardLike(card) {
    setIsLoading(true);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .changeUserInfo(userData)
      .then((res) => {
        setCurrentUser((user) => ({        
          ...user,
          ...res,
        }));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }
 

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <LoadingContext.Provider value={isLoading}>
          <Header loggedIn={loggedIn} onLogout={handleLogout} />
          <Switch>
            <Route path="/signin">
                <Login
                  onLogin={handleAuthorization}
                />
            </Route>
            <Route path="/signup">
              <Register
                onRegister={handleRegistration}
              />
            </Route>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
            </ProtectedRoute>
          </Switch>
          <PopupProfile
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <PopupAvatar
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupAddPlace
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup 
              card={selectedCard} 
              onClose={closeAllPopups} 
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              successRegistration={successRegistration}
              onClose={closeAllPopups}
            />
            
            <Route path="*">
              <Redirect to="/signin" />
            </Route>
          <Footer />
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
