import axios from "axios";

//Exportation de divers appels API en lien avec les posts
//Lecture des posts
export const getPosts = () =>
  axios.get(`${process.env.REACT_APP_API_URL}api/posts/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//Lecture d'un post
export const getPost = (userData) =>
  axios.get(`${process.env.REACT_APP_API_URL}api/posts/${userData.userData}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//Creation d'un post
export const addPost = (formData) =>
  axios.post(`${process.env.REACT_APP_API_URL}api/posts/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//Supprimer un post
export const deletePost = (id) =>
  axios.delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//Modifier un post
export const updatePost = ({ formData, post }) =>
  axios.put(
    `${process.env.REACT_APP_API_URL}api/posts/update/${post.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

//Récupérer un profil par rapport à son post
export const getProfilByPost = (post) =>
  axios.get(
    `${process.env.REACT_APP_API_URL}api/posts/profile/${post.post.id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
