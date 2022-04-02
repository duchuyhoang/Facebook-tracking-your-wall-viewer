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

function spliceSlice(str, index, count, add) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

app.post("/input", upload.none(), (req, res) => {
  //   const readStream = fs.createReadStream(path.resolve(__dirname, "file.txt"));
  let bufferList = [];
  //   console.log(req.body.value)
  if (!req.body.value) {
    res.render("list", {
      data: [],
    });
    return;
  }
  //   const child_process = spawn("node", ["calculateViewerProcess.js"]);
  //   readStream.on("data", (data) => {
  //     bufferList.push(data);
  //   });

  //   readStream.on("end", () => {
  //   child_process.stdin.end(req.body.value);
  //   });

  const startString = "chat_sidebar_contact_rankings";
  const index1 =
    req.body.value.indexOf("chat_sidebar_contact_rankings") +
    startString.length +
    ":[".length +
    1;
  let newString = req.body.value.slice(index1);
  let result = [];
  let count = 0;
  try {
    while (newString.indexOf('{"status"') !== -1) {
      let start = newString.indexOf('{"status"');
      let end = newString.indexOf('"}}}') + 4;
      const info = JSON.parse(
        newString.slice(0, newString.indexOf('"}}}') + 4)
      );
      result.push(info);
      newString = spliceSlice(newString, start, end + 1, "");
      //   if (count < 300) count++;
      //   else break;
    }
    // return console.log(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    // return console.log(e.message);
  }
  res.render("list", {
    data: result,
  });

  //   child_process.stdout.on("data", (data) => {
  //     console.log(data.toString());
  //     // res.json({ data: JSON.parse(data.toString()) });
  //     res.render("list", {
  //       data: JSON.parse(data.toString()),
  //     });
  //   });
});
app.get("/", upload.none(), (req, res) => {
  res.render("index", {});
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
