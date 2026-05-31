const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const reportController =
require("../controllers/reportController");

router.get(
 "/attendance",

 protect,

 authorizeRoles("admin"),

 reportController.monthlyReport
);

module.exports = router;