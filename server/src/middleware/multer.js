import multer from "multer";

const storage = multer.memoryStorage(); // 🧠 no local folder
const upload = multer({ storage });

export default upload;
