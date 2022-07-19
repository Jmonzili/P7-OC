import axios from "axios";

export const getProfils = () =>
  axios.get(`${process.env.REACT_APP_API_URL}api/users/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getProfil = (userData) =>
  axios.get(
    `${process.env.REACT_APP_API_URL}api/users/profile/${userData.userData}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

export const updateProfil = ({ formData, id }) =>
  axios.put(
    `${process.env.REACT_APP_API_URL}api/users/profile/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
