import React, { useEffect, useState } from "react";
import CommentUser from "./CommentUser";
import { Form, Button } from "react-bootstrap";
import {
  getComments,
  createComments,
  deleteComments,
} from "../../../Api/comments";

//Récupération et mappage des données de l'API, lecture des commentaires
const Comments = (post) => {
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState({
    content: "",
    attachment: "",
  });

  const handleComments = () => {
    getComments(post)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!comments) {
      handleComments(post);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, post]);

  const handleCommentCreated = (e) => {
    e.preventDefault();

    //Préparation des données du formulaire
    const formData = new FormData();
    formData.append("content", newComment.content);
    formData.append("attachment", newComment.attachment);

    //Récupération des données de l'API
    createComments({ formData, post })
      .then((res) => {
        handleComments();
      })
      // .catch((err) => console.log(err));
      .catch((err) => {
        console.log(err);
        alert("taille d'image maximal atteinte: 600ko");
      });
  };

  //Evenement au click si il y a un fichier ou non
  const handleComment = (e) => {
    if (e.target.name !== "attachment") {
      setNewComment({ ...newComment, [e.target.name]: e.target.value });
    } else {
      setNewComment({
        ...newComment,
        attachment: e.target.files[0],
      });
    }
  };

  const handleDeleteComment = (id) => {
    deleteComments(id)
      .then((res) => {
        const data = comments.filter((comment) => comment.id !== id);
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="comments-container_area">
      {comments ? (
        <>
          <Form
            onSubmit={handleCommentCreated}
            method="post"
            encType="multipart/form-data"
          >
            <div className="commentPublication-container">
              <Form.Group className="mb-3 content-container">
                <Form.Label htmlFor="content">Commenter : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contenu de la publication"
                  onChange={(e) => handleComment(e)}
                  value={newComment.content}
                  id="content"
                  name="content"
                  aria-labelledby="content"
                  className="content-area"
                />
              </Form.Group>
              <div className="sendCommentBtn-container">
                <Button
                  variant="custom"
                  type="submit"
                  aria-label="Envoie du commentaire"
                  className="sending-comment"
                >
                  <i className="fa-solid fa-paper-plane iconSendComment"></i>
                </Button>
              </div>
            </div>

            <Form.Group className="mb-3 comment-form">
              <Form.Label htmlFor="attachment">
                <i className="fa-solid fa-image iconSendPictures"></i>
              </Form.Label>
              <Form.Control
                id="attachment"
                name="attachment"
                type="file"
                aria-labelledby="attachment"
                onChange={(e) => handleComment(e)}
                className="test-inputSend "
              />
            </Form.Group>
          </Form>
        </>
      ) : null}

      {comments && (
        <>
          <div>
            {comments.map((comment) => (
              <CommentUser
                key={comment.id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
