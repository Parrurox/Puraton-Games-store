import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteGames = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteGame = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/games/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("An error occurred, pls check console");
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Remove Game copy</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 items-center border-sky-400 rounded-xl w-fit p-8 mx-auto">
          <h3 className="text-2xl">are you sure u wanna delete this game?</h3>
          <button
            onClick={handleDeleteGame}
            className="bg-red-500 text-white p-4 rounded-md m-8 w-full"
          >
            Yes, Delete it
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteGames;
