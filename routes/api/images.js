const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');
const { request } = require('express');

const Image = require('../../models/Image')

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    let tmp = file.originalname.split('.')
    const ext = tmp[tmp.length - 1];
    cb(null, Date.now() + '.' + ext)
  }
});
const upload = multer({ storage: storage })

router.post('/uploadfile', passport.authenticate('jwt', { session: false }), upload.single('myfile'), function (request, response) {
  const newImage = new Image({
    userId: request.user._id,
    imagePath: request.file.path,
  });
  newImage.save()
  .then(img => response.json({ data: img, message: '已新增' }))
  .catch(err => response.json({ status: 'error', data: err }));
});

module.exports = router;