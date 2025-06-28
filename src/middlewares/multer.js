import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype.split("/")[0] === "image")
      cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    let filename =
      new Date().toISOString().replaceAll(":", "_") +
      file.originalname.replaceAll(" ", "_");
    cb(null, filename);
  },
});

const multerStorage = multer({ storage: storage });

export default multerStorage;
