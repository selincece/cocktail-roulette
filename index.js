import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const cocktail = result.data.drinks[0];
    res.render("index.ejs", { cocktail });
  } catch (error) {
    console.error("Error fetching cocktail:", error.message);
    res.status(500).send("Error fetching cocktail data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});