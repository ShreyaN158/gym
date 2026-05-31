const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const authController =
require("../controllers/authController");

router.put(
 "/block/:id",

 protect,

 authorizeRoles("admin"),

 authController.blockUser
);

module.exports = router;