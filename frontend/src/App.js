import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UidContext } from "./components/Context/AppContext";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Profils from "./pages/Profils";
import Reseau from "./pages/Reseau";
import SignOut from "./pages/SignOut";
import jwt_decode from "jwt-decode";
import Api from "./Api/users";

function App() {
  //Récupération de données utilisateurs à utiliser dans UseContext
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userBio, setUserBio] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);
  const [userAttachment, setUserAttachment] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      await Api.get(`users/profile/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res) => {
        setUserData(res.data.user.id);
        setUsername(res.data.user.username);
        setUserEmail(res.data.user.email);
        setUserBio(res.data.user.bio);
        setUserAdmin(res.data.user.isAdmin);
        setUserAttachment(res.data.user.attachment);
      });
    };

    let userToken = "";
    const handleToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(localStorage.getItem("token"));
        const dateNow = new Date();
        if (decodedToken.exp > dateNow / 1000) {
          userToken = true;
        } else {
          userToken = false;
        }
      }
    };
    handleToken();
    if (userToken === true) {
      fetchUser();
    }
  }, [userData, username, userBio, userAttachment]);

  //Routage de l'application
  return (
    <BrowserRouter>
      <UidContext.Provider
        value={{
          userData,
          username,
          userEmail,
          userBio,
          userAdmin,
          userAttachment,
        }}
      >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profils" element={<Profils />} />
          <Route path="/reseau" element={<Reseau />} />
          <Route path="/signOut" element={<SignOut />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </UidContext.Provider>
    </BrowserRouter>
  );
}

export default App;
