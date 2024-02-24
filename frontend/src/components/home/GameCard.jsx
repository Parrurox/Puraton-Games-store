import React from "react";
import { Link } from "react-router-dom";

import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import GameSingleCard from "./GameSingleCard";

const GameCard = ({ games }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((item) => (
        <GameSingleCard key={item._id} game={item} />
      ))}
    </div>
  );
};

export default GameCard;
