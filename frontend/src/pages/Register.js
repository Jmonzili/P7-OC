import React from "react";
import Connect from "../components/Connect";

//Page d'enregistrement des utilisateurs
const SignOut = () => {
  const logOut = localStorage.clear();
  return (
    <div>
      <>{logOut}</>
      <Connect />
    </div>
  );
};

export default SignOut;
