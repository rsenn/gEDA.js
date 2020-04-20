import express from "express";
import path from "path";
import fs from "fs";

var app = express();
const p = path.join(path.dirname(process.argv[1]), ".");

console.log("Serving from", p);

app.use((req, res, next) => {
  console.log("Request:", req.url);
  next();
});

app.use("/", express.static(p));
app.use("/js/parsers", express.static(path.join(p, "formats")));
app.use("/include", express.static(path.join(p, "include")));

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(p, "index.html"));
});

app.get("/", (req, res) => {
  res.redirect(302, "/index.html");
});

app.listen(4000);
