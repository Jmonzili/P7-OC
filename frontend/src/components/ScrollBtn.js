import React from "react";
import ScrollToTop from "react-scroll-to-top";

//Creation d'un bouton scroll to top sur la home page
export default function ScrollBtn() {
  return (
    <div className="scrollToTop">
      <ScrollToTop
        smooth
        color="#6f00ff"
        aria-label="Bouton vers le haut de la page"
      />
    </div>
  );
}
