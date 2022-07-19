import axios from "axios";

// Lecture des commentaires
export const getComments = (post) =>
  axios.get(`${process.env.REACT_APP_API_URL}api/comments/${post.post.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Création d'un commentaire
export const createComments = ({ formData, post }) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}api/comments/${post.post.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

// Suppression d'un commentaire
export const deleteComments = (id) =>
  axios.delete(`${process.env.REACT_APP_API_URL}api/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
