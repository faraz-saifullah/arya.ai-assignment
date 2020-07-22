const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

// const reqLog = {};
// const respLog = {};

router.post("/:username/images", async function (req, res) {
  console.log("Add Image Request: ");
  console.log(`Username: ${req.params.username}`);
  console.log(`Image Name: ${req.body.name}`);
  let result = await new User().addImage(req);
  if (!result.errors) console.log("Add Image Response: ", result._doc._id);
  else console.error("Add Image Error Response: ", result.errors);
  return new APIResponseHandler().handle(res, result, "POST");
});

router.get("/:username/images", async function (req, res) {
  console.log("Get All Images Request: ");
  console.log(`Username: ${req.params.username}`);
  let result = await new User().getAllImages(req);
  if (!result.errors)
    console.log("Add Image Response: Found", result.length, "images");
  else console.error("Add Image Error Response: ", result.errors);
  return new APIResponseHandler().handle(res, result, "GET");
});

module.exports = router;
