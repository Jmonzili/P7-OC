import React, { useContext, useState, useEffect } from "react";
import Comments from "../getComments/Comments";
import { Form, Button } from "react-bootstrap";
import PostLike from "../LikePost/PostLike";
import ProfilsBtn from "../ProfilsSetting/ProfilsBtn";
import { UidContext } from "../../Context/AppContext";
import { getPosts } from "../../../Api/posts";

//Utilisation du props "post" définie sur le composant Posts. Structure des posts.
const Card = ({ post, handleDeletePost, handleUpdatePost }) => {
  const userData = useContext(UidContext);
  const date = new Date(post.createdAt).toLocaleString();

  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState({
    title: post.title,
    content: post.content,
  });

  useEffect(() => {
    if (!posts) {
      handlePosts();
    }
  }, [posts]);

  const handlePosts = () => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);

    handleUpdatePost({ formData, post });
  };

  const handlePost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const [updatePostBtn, setUpdatePostBtn] = useState(false);
  const updatePostModals = (e) => {
    if (e.target.id === "onUpdate") {
      setUpdatePostBtn(true);
    } else if (e.target.id === "offUpdate") {
      setUpdatePostBtn(false);
    }
  };

  return (
    <div className="card">
      <div className="card_header">
        <h2 className="card_header--size">{post.username}</h2>
        <div>
          <h2 className="card_header--title">{post.title}</h2>
        </div>
      </div>
      <div className="card_infos">
        <p className="card_infos--content">{post.content}</p>

        <div className="card_infos--imgContainer">
          {post.attachment ? (
            <img
              src={post.attachment}
              alt="photographie du message"
              className="card_infos--img"
            />
          ) : null}
        </div>

        <div className="comments-container">
          <div className="d-grid gap-2">
            <Comments post={post} />
          </div>
        </div>
      </div>

      <div className="card_footer">
        <p>
          Publié le
          <br />
          {date}
        </p>
        <div>
          <div className="card_footer--link">
            <div className="card_footer--linkChange profilBtn">
              <ProfilsBtn post={post} />
            </div>
            <div className="card_footer--linkChange">
              <div>
                <PostLike post={post} />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="postHandle">
        <>
          {userData.userAdmin || userData.userData === post.userId ? (
            <div className="card_footer--linkChange">
              <Button
                variant="outline-secondary"
                aria-label="Supprimer la publication"
                onClick={() => handleDeletePost(post.id)}
                className="card-btn"
              >
                Supprimer la publication
              </Button>{" "}
            </div>
          ) : null}
        </>
        <div className="card_footer--updateLink">
          {userData.userData === post.userId ? (
            <div className="commentBtn">
              <Button
                variant="outline-secondary"
                onClick={updatePostModals}
                id="onUpdate"
                aria-label="modifier la publication"
                className="card-btn"
              >
                modifier la publication
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={updatePostModals}
                id="offUpdate"
                className="commentBtn_close card-btn"
                aria-label="fermeture du formulaire de modification du message"
              >
                X
              </Button>{" "}
            </div>
          ) : null}
          {updatePostBtn !== false ? (
            <div className="container-form">
              <Form
                action=""
                onSubmit={submitHandler}
                method="post"
                encType="multipart/form-data"
                id="test"
                className="form"
              >
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="title">Titre : </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Titre de la publication"
                    onChange={(e) => handlePost(e)}
                    value={newPost.title}
                    id="title"
                    name="title"
                    aria-labelledby="title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="content">Contenu : </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contenu de la publication"
                    onChange={(e) => handlePost(e)}
                    value={newPost.content}
                    id="content"
                    name="content"
                    aria-labelledby="content"
                  />
                </Form.Group>

                <Button
                  variant="custom"
                  type="submit"
                  aria-label="Envoyer la publication : Envoie de la modification du message"
                  className="card-btn"
                >
                  Envoyer la publication
                </Button>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
