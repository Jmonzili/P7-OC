import axios from "axios";

// Exportation d'une route de base avec autorisation
export default axios.create({
  baseURL: `http://localhost:3000/api/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
