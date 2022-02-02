import express from "express";
import "dotenv/config";
import { Client } from "@notionhq/client";

const app = express();

//init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database_id = process.env.DATABASE_ID;
//

(async () => {
  const response = await notion.databases.retrieve({ database_id });
  console.log(response);

  /*      database_id,
  const response = await notion.request({
  }); */
})();

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("base");
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
