const express = require("express");
const router = express.Router();
const {
  create,
  updatePassword,
  closeAccount,
} = require("../controllers/userController");

router.post("/", create);
router.patch("/new-password", updatePassword);
router.delete("/close-account", closeAccount);
module.exports = router;
