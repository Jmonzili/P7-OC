import Header from "../components/nav/Header";
import ReseauCallData from "../components/ReseauSetting/ReseauCallData";
import ScrollBtn from "../components/ScrollBtn";

//Page avec visuel de tous les utilisateurs de Groupomania
const Reseau = () => {
  return (
    <div>
      <Header />
      <h2 className="reseau">Connaissez-vous...</h2>
      <ReseauCallData />
      <ScrollBtn />
    </div>
  );
};

export default Reseau;
