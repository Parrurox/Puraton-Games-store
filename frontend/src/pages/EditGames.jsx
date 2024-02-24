import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditGames = () => {
  const [title, setTitle] = useState("");
  const [developer, setDeveloper] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/games/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDeveloper(res.data.developer);
        setPublicationYear(res.data.publicationYear);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //edit handler
  const handleEditGame = () => {
    const data = {
      title,
      developer,
      publicationYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/games/${id}`, data)
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
      <h1 className="text-3xl my-4">Edit Game</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-{600px} p-4 mx-auto">
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Title</span>
            <input
              className="border-2 border-gray-500 px-4 py-2 w-full"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Developer</span>
            <input
              className="border-2 border-gray-500 px-4 py-2 w-full"
              type="text"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
            />
          </div>
          <div className="my-4">
            <span className="test-xl mr-4 text-gray-500">Publication Year</span>
            <input
              className="border-2 border-gray-500 px-4 py-2 w-full"
              type="text"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
            />
          </div>
          <button
            onClick={handleEditGame}
            className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditGames;
