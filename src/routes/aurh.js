const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  profile,
  verifyToken,
} = require("../controllers/auth");
const { authRequired } = require("../middlewares/validateToken");
const { validateSchema } = require("../middlewares/validatorMiddleware");
const { registerSchema, loginSchema } = require("../schemas/auth");

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/verify", verifyToken);

module.exports = router;
