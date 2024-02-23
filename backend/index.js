import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import Mongoose from "mongoose";
import { Game } from "./models/gameModel.js";

// initiallize express app
const app = express();
app.use(express.json()); // ! v important

app.get("/", (request, response) => {
  console.log(request); //!

  return response.status(234).send("welcome to mern stack app");
});

// Route for saving a new game---------------------------
app.post("/games", async (req, res) => {
  try {
    if (!req.body.title || !req.body.developer || !req.body.publicationYear) {
      return res.status(400).send({
        message: "All fields are required: title, developer, publicationYear",
      });
    }
    const newGame = {
      title: req.body.title,
      developer: req.body.developer,
      publicationYear: req.body.publicationYear,
    };
    const game = await Game.create(newGame);

    return res.status(201).send(game);
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for getting all games---------------------------
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find({});
    return res.status(200).json({
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for individual game from db by id---------------------------
app.get("/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

//Route for updating a game by id---------------------------

app.put("/games/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.developer || !req.body.publicationYear) {
      return res.status(400).send({
        message: "All fields are required: title, developer, publicationYear",
      });
    }

    const { id } = req.params;

    const result = await Game.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).send({ message: "Game updated successfully" });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

// Route for deleting a game by id---------------------------

app.delete("/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Game.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).send({ message: "Game deleted successfully" });
  } catch (error) {
    console.log("error", error.message); //!
    res.status(500).send({ message: error.message });
  }
});

//---------------------------------

//connect to mongodb
Mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("App connected to mongodb");
    //run server only if db is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
