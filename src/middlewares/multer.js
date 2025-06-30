import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype.split("/")[0] === "image")
      cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    let filename =
      req.image_type +
      "-" +
      new Date().toISOString().replaceAll(":", "_") +
      "." +
      ext;
    cb(null, filename);
  },
});

const multerStorage = multer({ storage: storage });

export default multerStorage;
