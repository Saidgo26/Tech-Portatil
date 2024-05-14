const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
        var extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
        cb(null,  Date.now() + extension )
    }
  })
  
  const upload = multer({ storage })

module.exports = upload;  