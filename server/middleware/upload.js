const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        // random ชื่อไฟล์รูปโดย ใช้วัน + กับจำนวนตัวเลข
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.round(Math.random() * 1E9));
        // ดึงนามสกุลไฟล์ออกมาโดยที่นี้ให้ตัด /images/แล้วจะได้ array ให้เลือกตัวที่ 1 จะเป็นนามสกุลไฟล์
        const FileType = '.' + file.mimetype.split('image/')[1];
        // ประกอบไฟล์ จะเอาคำว่า file ต่อด้วย ชื่อไฟล์ที่ random และ ต่อด้วย นามสกุลของไฟล์
        cb(null, file.fieldname + '-' + uniqueSuffix + FileType);
    }
});

const productsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/product');
    },
    filename: function (req, file, cb) {
        // random ชื่อไฟล์รูปโดย ใช้วัน + กับจำนวนตัวเลข
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.round(Math.random() * 1E9));
        // ดึงนามสกุลไฟล์ออกมาโดยที่นี้ให้ตัด /images/แล้วจะได้ array ให้เลือกตัวที่ 1 จะเป็นนามสกุลไฟล์
        const FileType = '.' + file.mimetype.split('image/')[1];
        // ประกอบไฟล์ จะเอาคำว่า file ต่อด้วย ชื่อไฟล์ที่ random และ ต่อด้วย นามสกุลของไฟล์
        cb(null, file.fieldname + '-' + uniqueSuffix + FileType);
    }
});

exports.upload = multer({ storage: storage }).single('file');
exports.productsUpload = multer({ storage: productsStorage }).single('file');
