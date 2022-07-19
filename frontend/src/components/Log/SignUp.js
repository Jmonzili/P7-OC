import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Login from "./Login";

//Structure de la page Signup
const SignUp = () => {
  //Etat de base des données attendu
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  //Fonction d'envoi du formulaire
  const handleSignup = async (e) => {
    e.preventDefault();

    //Gestion des erreurs avec Regexp et conditions
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    const nameRegex = /^[a-z]{2,10}$/i;
    const emailRegex =
      /^[a-z0-9\-_]+[a-z0-9.\-_]*@[a-z0-9\-_]{2,}\.[a-z.\-_]+[a-z\-_]+$/i;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9].*?[0-9]).{8,100}$/g;

    if (!username || !email || !password || !controlPassword) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      passwordConfirmError.innerHTML = " ";

      if (nameRegex.test(username)) {
        usernameError.innerText = " ";
      } else {
        usernameError.innerText =
          "Saisir un nom d'utilisateur valide (2-10 caractères / pas de chiffres)";
        usernameError.style.background = "#FD2D01";
        usernameError.style.color = "white";
      }
      if (emailRegex.test(email)) {
        emailError.innerText = " ";
      } else {
        emailError.innerText = "Format d'Email invalide";
        emailError.style.background = "#FD2D01";
        emailError.style.color = "white";
      }
      if (passwordRegex.test(password)) {
        passwordError.innerText = " ";
      } else {
        passwordError.innerText =
          "Saisir un mot de passe valide (8 - 100 caractères / minimums deux chiffres / minuscules et majuscules obligatoires)";
        passwordError.style.background = "#FD2D01";
        passwordError.style.color = "white";
      }
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
        passwordConfirmError.style.background = "#FD2D01";
        passwordConfirmError.style.color = "white";
      } else {
        passwordConfirmError.innerHTML = " ";
      }
    }
    if (
      nameRegex.test(username) &&
      emailRegex.test(email) &&
      !passwordRegex.test(password) &&
      password === controlPassword
    ) {
      //Récupération des données de l'API
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/signup`,
        data: {
          email,
          password,
          username,
        },
      })
        .then((res) => {
          setFormSubmit(true);
        })
        .catch((err) => {
          if (err.response.data.error) {
            if (
              err.response.data.error === "Ce nom d'utilisateur existe déja !"
            ) {
              usernameError.innerHTML = err.response.data.error;
              usernameError.style.background = "#FD2D01";
              usernameError.style.color = "white";
            } else {
              usernameError.innerHTML = null;
            }
            if (err.response.data.error === "Cet utilisateur existe déja !") {
              emailError.innerHTML = err.response.data.error;
              emailError.style.background = "#FD2D01";
              emailError.style.color = "white";
            } else {
              emailError.innerHTML = null;
            }
          }
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <h4 className="signUp_message">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <Form
          action=""
          onSubmit={handleSignup}
          id="sign-up-form"
          className="form_log"
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username"
              name="username"
              aria-labelledby="username"
            />
            <div className="username error"></div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez l'e-mail"
              name="email"
              id="email"
              aria-labelledby="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
            <Form.Text className="text-muted">
              Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              aria-labelledby="password"
              placeholder="tapez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password-conf">
              Confirmer Mot de passe
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password-conf"
              aria-labelledby="password confirmation"
              placeholder="tapez votre mot de passe"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
          </Form.Group>

          <Button
            variant="custom"
            type="submit"
            value="Valider inscription"
            className="logBtn"
            id="submitBtn"
            aria-label="Valider inscription : Envoie du formulaire"
          >
            Valider inscription
          </Button>
        </Form>
      )}
    </>
  );
};

export default SignUp;
