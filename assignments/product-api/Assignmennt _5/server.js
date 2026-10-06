const express = require("express");
const app = express();

app.use("/files", express.static("files"));
app.use(express.static(__dirname)); // serves index.html if it’s in the same folder

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
