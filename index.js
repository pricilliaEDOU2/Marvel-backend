require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(express.json());

app.get("/characters", async (req, res) => {
  console.log(req.query);
  try {
    const name = req.query.name || "";
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.body.limit) || 100;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = Number(req.body.limit) || 100;
    const skip = Number(req.query.skip) || 0;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/?${characterId}?apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Page not found");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server on started"));
