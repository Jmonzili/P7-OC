import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Form, Button } from "react-bootstrap";
import { getPosts, addPost, deletePost, updatePost } from "../../../Api/posts";

//Récupération et mappage des données de l'API, lecture des posts
const Posts = (props) => {
  // const userData = useContext(UidContext);
  const date = new Date(props.date).toLocaleDateString();
  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    attachment: "",
  });

  const handlePosts = () => {
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!posts) {
      handlePosts();
    }
  }, [posts]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("attachment", newPost.attachment);

    addPost(formData)
      .then((res) => {
        handlePosts();
      })
      .catch((err) => {
        console.log(err);
        alert("taille d'image maximal atteinte: 600ko");
      });
  };

  const handlePost = (e) => {
    if (e.target.name !== "attachment") {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    } else {
      setNewPost({
        ...newPost,
        attachment: e.target.files[0],
      });
    }
  };

  const handleDeletePost = (id) => {
    deletePost(id)
      .then((res) => {
        const data = posts.filter((post) => post.id !== id);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdatePost = ({ formData, post }) => {
    updatePost({ formData, post })
      .then((res, req) => {
        handlePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [homeHandle, setHomeHandle] = useState(false);
  const homeHandleModals = (e) => {
    if (e.target.id === "on") {
      setHomeHandle(true);
    } else if (e.target.id === "off") {
      setHomeHandle(false);
    }
  };

  return (
    <>
      {posts ? (
        <>
          <div className="homeHandle">
            <p>
              Aujourd'hui nous sommes le : <br /> {date}
            </p>
            <div className="homeHandle_btn">
              <div className="postCreated_container">
                <Button
                  variant="custom"
                  className="homeHandle_btn"
                  onClick={homeHandleModals}
                  id="on"
                  aria-label="Créer une publication : ouverture du formulaire de création d'un message"
                >
                  Créer une publication
                </Button>
              </div>
            </div>
          </div>
          {homeHandle !== false ? (
            <div className="container-form">
              <Form
                action=""
                onSubmit={submitHandler}
                method="post"
                encType="multipart/form-data"
                id="test"
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="attachment">Images : *</Form.Label>
                  <Form.Control
                    type="file"
                    name="attachment"
                    onChange={(e) => handlePost(e)}
                    width="30%"
                    id="attachment"
                    aria-labelledby="attachment"
                  />
                </Form.Group>
                <h6>* L'image ne sera ensuite plus modifiable !</h6>
                {newPost.title || newPost.content || newPost.attachment ? (
                  <Button
                    variant="custom"
                    onClick={homeHandleModals}
                    id="off"
                    aria-label="Annuler : Fermeture du formulaire de création d'un message"
                    className="card-btn"
                  >
                    Annuler
                  </Button>
                ) : null}
                {newPost.title !== "" ||
                newPost.content !== "" ||
                newPost.attachment !== "" ? (
                  <Button
                    variant="custom"
                    type="submit"
                    aria-label="Envoyer la publication : Envoie du formulaire"
                    className="card-btn"
                  >
                    Envoyer la publication
                  </Button>
                ) : (
                  <Button
                    variant="custom"
                    type="submit"
                    aria-label="Envoyer la publication : Envoie du formulaire"
                    className="card-btn"
                    disabled
                  >
                    Envoyer la publication
                  </Button>
                )}
              </Form>
            </div>
          ) : null}

          {posts && (
            <>
              <div className="post-container">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    post={post}
                    handleUpdatePost={handleUpdatePost}
                    handleDeletePost={handleDeletePost}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Posts;
