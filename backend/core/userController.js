var Image = require('../models/image');
class User {
  async addImage(req) {
    try {
      const newImage = new Image({
        username: req.params.username,
        imageName: req.body.name,
        imageData: req.body.base64Image
      });
      return await newImage.save();
    } catch (err) {
      return err;
    }
  }

  async getAllImages(req) {
    try {
      return await Image.find({ username: `${req.params.username}` })
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
