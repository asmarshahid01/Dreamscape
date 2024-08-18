const { Analytic, User } = require("../models");
const {
  handleErrorResponse,
  handleSuccessResponse,
} = require("../utils/responseHandlers");

const analytics = async (req, res) => {
  try {
    const response = await Analytic.find();
    return handleSuccessResponse(res, "Analytics sent", response[0]);
  } catch (err) {
    return handleErrorResponse(res, err);
  }
};

const user = async (req, res) => {
  try {
    const data = await User.find();
    return handleSuccessResponse(res, "User info sent", data);
  } catch (err) {
    return handleErrorResponse(res, err);
  }
};

module.exports = {
  analytics,
  user,
};
