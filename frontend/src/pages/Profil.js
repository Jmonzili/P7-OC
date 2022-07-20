import React from 'react';
import Header from '../components/nav/Header';
import ProfilHandle from '../components/ProfilsHandle';
import ScrollBtn from '../components/ScrollBtn';

//  Page affichant le profil des autres utilisateurs
const Profil = () => {
  return (
    <div>
      <Header />
      <ProfilHandle />
      <ScrollBtn />
    </div>
  );
};

export default Profil;
