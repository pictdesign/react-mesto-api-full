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
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(), 
        api.getInitialCards()
        ])
        .then(([userData, cardsData]) => {
          setCurrentUser((user) => ({
            ...user,
            ...userData,
          }));
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
      });
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    auth
      .getContent()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser((user) => ({
          ...user,
          email: res.data.email,
        }));
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
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
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });

    }

  const handleAuthorization = (email, password) => {
    return auth
      .authorization(email, password)
      .then((data) => {
        if(data){
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessRegistration(false);
        setIsInfoTooltipOpen(true);
      });
      
  }

  const handleLogout = () => {
    setLoggedIn(false);
    history.push('/signin');
  }

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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
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

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .changeUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
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
                <Footer />
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
            <Footer />
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
              
              <Route path="*">
                <Redirect to="/signin" />
              </Route>

              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                successRegistration={successRegistration}
                onClose={closeAllPopups}
              />
          
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
