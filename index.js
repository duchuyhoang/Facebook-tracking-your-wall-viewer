const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({
  limits: { fieldSize: Infinity },
});
app.set("view engine", "ejs");
app.use(express.static("asset"));
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.post("/input", upload.none(), (req, res) => {
  //   const readStream = fs.createReadStream(path.resolve(__dirname, "file.txt"));
  let bufferList = [];
  console.log(req.body.value)
  if (!req.body.value) {
    res.render("list", {
      data: [],
    });
    return;
  }
  const child_process = spawn("node", ["calculateViewerProcess.js"]);
  //   readStream.on("data", (data) => {
  //     bufferList.push(data);
  //   });

  //   readStream.on("end", () => {
  child_process.stdin.end(req.body.value);
  //   });

  child_process.stdout.on("data", (data) => {
    // res.json({ data: JSON.parse(data.toString()) });
    res.render("list", {
      data: JSON.parse(data.toString()),
    });
  });
});
app.get("/", upload.none(), (req, res) => {
  res.render("index", {});
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
