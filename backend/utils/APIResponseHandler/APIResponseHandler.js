let ResponseCodes = require("./HttpResponseCodes");
let HTTPResponseCodes = new ResponseCodes();

class APIResponseHandler {
  handle(response, result, type) {
    let successStatus = 200;
    if (type === "POST") {
      successStatus = 201;
      result = result._doc;
    }
    if (!result.errors) {
      return response.status(successStatus).send(result);
    } else {
      return response
        .status(HTTPResponseCodes.BAD_REQUEST())
        .send(result.errors);
    }
  }
}

module.exports = APIResponseHandler;
