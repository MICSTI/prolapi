const fs = require("fs");
const express = require("express");

const port = 3333;

const app = express();

// allow CORS from specified resources
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) =>
  res
    .status(200)
    .send("👨‍💻 Hi there! This is the awesome Programming Language API 👩‍💻")
);
const languages = require("./data");

const getLanguageById = id => languages.find(item => item.id === parseInt(id));

app.get("/api/languages", (req, res) => res.status(200).json(languages));
app.get("/api/languages/:id", (req, res) => {
  const language = getLanguageById(req.params.id);
  if (!language) {
    return res.status(404).send("Not found");
  }
  res.status(200).json(language);
});
app.get("/api/languages/:id/hello", (req, res) => {
  const language = getLanguageById(req.params.id);
  if (!language) {
    return res.status(404).send("Not found");
  }
  fs.readFile(`./assets/${language.hello}`, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(data);
  });
});
app.use("/public", express.static("assets"));

app.listen(port, () =>
  console.log(
    `🚀 The awesome Programming Language API is running on port ${port} 🚀`
  )
);

module.exports = app;
