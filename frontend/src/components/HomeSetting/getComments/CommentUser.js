import React, { useContext } from "react";
import { UidContext } from "../../Context/AppContext";
import { Button } from "react-bootstrap";

//Utilisation du props "comment" définie sur le composant Comments. Structure des commentaires.
const CommentUser = ({ comment, handleDeleteComment }) => {
  const userData = useContext(UidContext);

  if (comment === undefined || comment === null) {
    return null;
  } else {
    const date = new Date(comment.createdAt).toLocaleString();
    return (
      <div className="comments">
        <header className="comments_container">
          <h1 className="comments_header">{comment.username}</h1>
          <div className="comments_handle">
            <div className="comments_date">{date}</div>
            <>
              {userData.userAdmin || userData.userData === comment.userId ? (
                <div>
                  <Button
                    variant="outline-secondary"
                    aria-label="Supprimer : suppression du commentaire"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="card-btn"
                  >
                    Supprimer
                  </Button>{" "}
                </div>
              ) : null}
            </>
          </div>
        </header>
        <div className="comments_body">
          <div>
            <p className="comments_body--content">{comment.content}</p>
            <footer className="comments_footer">
              <div className="comments_pictures">
                {comment.attachment ? (
                  <img
                    src={comment.attachment}
                    alt="photographie du commentaire"
                    className="comments_pictures--resize"
                  />
                ) : null}
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
};

export default CommentUser;
