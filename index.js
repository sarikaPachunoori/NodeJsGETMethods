const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Welcome to Database ");
    });
  } catch (e) {
    console.log(`Database Error : ${e.message}`);
    process.exit(1);
  }
};

initializeDbServer();

app.get("/books/", async (request, response) => {
  const books = `SELECT * FROM book order by book_id`;
  const bookTable = await db.all(books);

  response.send(bookTable);
});

app.get("/books/:bookId", async (request, response) => {
  const { bookId } = request.params;
  console.log(bookId);
  const single = `
  SELECT * FROM book where book_id=${bookId}`;
  const sinBook = await db.get(single);
  response.send(sinBook);
});
