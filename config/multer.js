const multer = require('multer');

const upload = multer({
    limit: {
        // 限制上傳檔案的大小為 1MB
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        // 只接受三種圖片格式
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'))
        }
        cb(null, true)
    }
});

module.exports = upload;