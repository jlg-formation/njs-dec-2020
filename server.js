const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 3000;
const www = "public";

app.use(express.static(www));
app.use(serveIndex(www));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
