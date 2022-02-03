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

const notionData = async () => {
  const { results } = await notion.databases.query({ database_id });
  const infos = results.map((a) => {
    return {
      id: a.id,
      Date: a.properties.Date.date.start,
      Name: a.properties.Name.title[0].text.content,
    };
  });
  return infos;

  /* const payload = {
    path: `databases/${database_id}/query`,
    method: `POST`,
  };
  const { results } = await notion.request(payload);

  const infos = results.map((a) => {
    return {
      id: a.id,
      Date: a.properties.Date.date.start,
      Name: a.properties.Name.title[0].text.content,
    };
  });
  return infos; */
};
//
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
//
app.use(express.static("public"));
//
app.get("/", async (req, res) => {
  res.render("base");
});
//
app.get("/infos", async (req, res) => {
  const datas = await notionData();
  res.json(datas);
});

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
