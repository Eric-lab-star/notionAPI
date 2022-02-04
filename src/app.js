import express from "express";
import "dotenv/config";
import { Client, LogLevel } from "@notionhq/client";
const checkboxId = process.env.CHECKBOX;
const dateId = process.env.DATE;
const desId = process.env.DESCRIPTION;
const titleId = process.env.TITLE;
const numberID = process.env.NUMBER;
const database_id = process.env.DATABASE_ID;
const newDate = new Date();
const app = express();

//init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
});

//
const getDatabase = async () => {
  const response = await notion.databases.retrieve({ database_id });
  console.log(notionPropertiesById(response.properties));
};

getDatabase();

const reducer = (obj, property) => {
  const { id, ...rest } = property;
  return { ...obj, [id]: rest };
};

function notionPropertiesById(properties) {
  return Object.values(properties).reduce(reducer, {});
}

const createPage = async ({ title, description, isTrue, number }) => {
  const page = await notion.pages.create({
    parent: { database_id },
    properties: {
      [titleId]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      [desId]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: description,
            },
          },
        ],
      },
      [dateId]: {
        date: {
          start: newDate.toISOString(),
        },
      },
      [checkboxId]: {
        checkbox: isTrue,
      },
      [numberID]: {
        number: number,
      },
    },
  });
  return page;
};
createPage({
  title: "test",
  description: "notion integration",
  isTrue: true,
  number: 1,
});

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
/* app.get("/infos", async (req, res) => {
  const datas = await getDatabase();
  res.json(datas);
}); */

app.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
