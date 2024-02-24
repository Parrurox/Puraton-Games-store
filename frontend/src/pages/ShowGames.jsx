import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowGames = () => {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/games/${id}`)
      .then((res) => {
        setGame(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Game</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Title</span>
            <span>{game.title}</span>
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Developer</span>
            <span>{game.developer}</span>
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Publication Year</span>
            <span>{game.publicationYear}</span>
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Created</span>
            <span>{new Date(game.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Last Updated</span>
            <span>{new Date(game.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowGames;
