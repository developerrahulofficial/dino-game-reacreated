const express = require("express");

const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

