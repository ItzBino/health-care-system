import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // specify upload folder
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname); // avoid name conflicts
  }
});

const upload = multer({ storage });

export default upload;
