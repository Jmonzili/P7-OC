import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Button } from "react-bootstrap";

const Log = () => {
  //Initialisation de l'état des boutons d'accès au formulaire de Login et Signup
  const [signUpModal, setSignUpModal] = useState();
  const [loginModal, setLoginModal] = useState();

  //Activation au click sur l'un ou l'autre des boutons
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };

  //Structure des Boutons
  return (
    <div className="connection-form">
      <div className="form-container">
        <>
          <Button
            variant="custom"
            onClick={handleModals}
            id="register"
            className="logBtn"
            aria-label="S'inscrire : Chemin vers le formulaire d'inscription"
          >
            S'inscrire
          </Button>

          <Button
            variant="custom"
            onClick={handleModals}
            id="login"
            className="logBtn"
            aria-label="Se connecter : Chemin vers le formulaire de connexion"
          >
            Se connecter
          </Button>
        </>
        {signUpModal && <SignUp />}
        {loginModal && <Login />}
      </div>
    </div>
  );
};

export default Log;
