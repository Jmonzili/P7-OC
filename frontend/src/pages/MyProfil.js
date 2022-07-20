import React from 'react';
import Header from '../components/nav/Header';
import MyProfilHandle from '../components/MyProfilHandle';
import ScrollBtn from '../components/ScrollBtn';

//  Page affichant mon profil
const MyProfil = () => {
  return (
    <div className="profil-body">
      <Header />
      <MyProfilHandle />
      <ScrollBtn />
    </div>
  );
};

export default MyProfil;
