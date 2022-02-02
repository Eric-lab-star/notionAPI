import express from "express";
import "dotenv/config";
import { Client } from "@notionhq/client";

const app = express();
//init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const listDatabase = async () => {
  const res = await notion.databases.list();
  console.log(res);
};

listDatabase();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("base");
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
