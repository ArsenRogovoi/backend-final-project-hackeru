const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");

router.get("/", async (req, res) => {
  try {
    return res.send({ users: [{ username: "Arsen" }] });
  } catch (error) {
    const { status } = error;
    return handleError(res, status || 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
