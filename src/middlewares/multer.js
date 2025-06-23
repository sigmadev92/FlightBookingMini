import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image") cb(null, "/public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename);
  },
});

const multerStorage = multer({ storage: storage });

export default multerStorage;
