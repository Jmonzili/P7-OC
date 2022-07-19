import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

//Structure de la page Login
const Login = () => {
  //Etat de base des données attendu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Fonction d'envoi du formulaire
  const handleLogin = (e) => {
    e.preventDefault();

    //Gestion des erreurs avec Regexp et conditions
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    if (!email || !password) {
      alert("veuillez remplir tous les champs du formulaire");
    } else {
      //Récupération des données de l'API
      axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: `${process.env.REACT_APP_API_URL}api/users/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res, req) => {
          console.log(res);
          if (res.data.token && res.data.userId) {
            console.log(res.data.token);
            console.log(res.data.userId);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            window.location = "/home";
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message !== undefined) {
            emailError.innerHTML = err.response.data.message;
            emailError.style.background = "#FD2D01";
            emailError.style.color = "white";
          } else {
            emailError.innerHTML = null;
          }

          if (err.response.data.error) {
            passwordError.innerHTML = err.response.data.error;
            passwordError.style.background = "#FD2D01";
            passwordError.style.color = "white";
          } else {
            passwordError.innerHTML = null;
          }
        });
    }
  };

  return (
    <Form action="" onSubmit={handleLogin} className="form_log">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez l'e-mail"
          name="email"
          aria-labelledby="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <Form.Text className="text-muted">
          Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="password"
          aria-labelledby="password"
          placeholder="tapez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
      </Form.Group>
      <Button
        variant="custom"
        type="submit"
        className="logBtn"
        aria-label="Se connecter : Envoie du formulaire"
      >
        Se connecter
      </Button>
    </Form>
  );
};

export default Login;
