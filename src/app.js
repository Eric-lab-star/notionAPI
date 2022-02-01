import express from "express";

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("base");
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
