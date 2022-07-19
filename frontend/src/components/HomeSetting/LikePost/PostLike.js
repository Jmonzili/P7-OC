import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Api from "../../../Api/users";
import { UidContext } from "../../Context/AppContext";

//Utilisation du props "post" définie sur le composant Posts. Gestion des likes.
const PostLike = ({ post }) => {
  //Initialisation de l'état du like et récupération du context.
  const userData = useContext(UidContext);
  const [likes, setLikes] = useState([post.likes]);

  const handlePostLike = async (e) => {
    e.preventDefault();

    //Récupération des données de l'API
    await Api.post(`posts/${post.id}/like`, {})
      .then((res, req) => {
        Api.get(`posts/onPost/${post.id}`, {}).then((res, req) => {
          setLikes(res.data.post.likes);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card_footer--linkCount">
      {userData.userData !== post.userId ? (
        <div className="card_footer--linkCount ">
          <Button
            variant="outline-secondary"
            aria-label="Like - dislike : fonctionnalité"
            onClick={handlePostLike}
            className="card-btn"
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </Button>{" "}
          <p>{likes}</p>
        </div>
      ) : (
        <div className="card_footer--linkCount ">
          <Button
            variant="outline-secondary"
            aria-label="Like - dislike : fonctionnalité"
            onClick={handlePostLike}
            className="card-btn"
            disabled
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </Button>{" "}
          <p>{likes}</p>
        </div>
      )}
    </div>
  );
};

export default PostLike;
