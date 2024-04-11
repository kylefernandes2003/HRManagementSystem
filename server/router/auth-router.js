const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signUpSchema = require("../validators/auth-validation");
const validate = require("../middlewares/validate-middleware");
const loginSchema = require("../validators/auth-login-validation");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate.validate(signUpSchema), authControllers.register);
router
  .route("/login")
  .post(validate.validateLogin(loginSchema), authControllers.login);
router.route("/users").get(authControllers.getAllUsers);
router.route("/users/:userId").get(authControllers.getUserById);

router.route("/turnover").post(authControllers.addTurnover);
router
  .route("/turnover-rate")
  .get(authControllers.getTurnoverDataWithDepartments);
router
  .route("/absenteeism")
  .get(authControllers.getAbsenteeismDataByDepartment);

router.route("/age-dist").get(authControllers.getAgeDistribution);

router.route("/absent").post(authControllers.addAbsentData);
router.route("/transaction").post(authControllers.addTransaction);
// router.route("/transactions").get(authControllers.getRecentTransactions); // Add this route

module.exports = router;
