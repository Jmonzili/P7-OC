import React, { useEffect, useState } from "react";
import ReseauHandle from "../ReseauHandle";
import Api from "../../Api/users";

//Appel des données pour la page Reseau
const ReseauCallData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      await Api.get(`users`, {}).then((res) => {
        setData(res.data);
      });
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="reseau-container">
      {data.map((reseau, index) => (
        <ReseauHandle key={index} reseau={reseau} />
      ))}
    </div>
  );
};

export default ReseauCallData;
