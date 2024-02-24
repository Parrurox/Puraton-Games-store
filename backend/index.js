import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import Mongoose from "mongoose";
import { Game } from "./models/gameModel.js";
import cors from "cors";

import gamesRoute from "./routes/gamesRoute.js";

// initiallize express app
const app = express();
app.use(express.json()); // ! v important

//  ! middleware for handling Cors policy
// option 1 : allow all origins with default of cors(*)
app.use(cors());

// option 2 : allow specific/custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "Post", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

//========================
app.get("/", (request, response) => {
  console.log(request); //!

  return response.status(234).send("welcome to mern stack app");
});

// ! use the gamesRoute
app.use("/games", gamesRoute);

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
