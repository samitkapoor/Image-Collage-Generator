const express = require("express");
const path = require("path");
const fs = require("fs");
const bp = require("body-parser");

const { createCollage } = require("@wylie39/image-collage");

const app = express();

const PORT = 3000 || process.env.PORT;

app.set("view engine", "ejs");

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/collage", (req, res, next) => {
  const photos = req.body.images.split(" ");

  createCollage(photos, 1224).then((imageBuffer) => {
    console.log(imageBuffer);

    fs.writeFileSync("./views/collage.png", imageBuffer);

    src = "data:image/jpeg;base64," + imageBuffer.toString("base64");

    res.render("image", { src });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
