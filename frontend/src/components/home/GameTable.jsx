import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const GameTable = ({ games }) => {
  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No.</th>
            <th className="border border-slate-600 rounded-md">Title</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Developer
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Publication Year
            </th>
            <th className="border border-slate-600 rounded-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={game._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md">
                {game.title}
              </td>
              <td className="border border-slate-700 rounded-md max-md:hidden">
                {game.developer}
              </td>
              <td className="border border-slate-700 rounded-md max-md:hidden">
                {game.publicationYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/games/details/${game._id}`}>
                    <BsInfoCircle className="text-green-800 text-2xl" />
                  </Link>
                  <Link to={`/games/edit/${game._id}`}>
                    <AiOutlineEdit className="text-yellow-600 text-2xl" />
                  </Link>
                  <Link to={`/games/delete/${game._id}`}>
                    <MdOutlineDelete className="text-red-600 text-2xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameTable;
