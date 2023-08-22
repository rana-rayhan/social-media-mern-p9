// const multer = require("multer");

// //
// // file upload with multer
// const storage = multer.memoryStorage();
// //
// //
// // filter file ---***
// const fileFilter = (req, file, cb) => {
//   const allowedFIleType = ["image/jpg", "image/jpeg", "image/png"];
//   const maxFileSize = 2097152;

//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only image files are allowed"), false);
//   }
//   if (file.size > maxFileSize) {
//     return cb(new Error("File size limits is max 2mb"), false);
//   }
//   if (!allowedFIleType.includes(file.mimetype)) {
//     return cb(new Error("File type is not allowed"), false);
//   }
//   cb(null, true);
// };

// //
// //
// //upload module and apply file filter and limits
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// module.exports = upload;
