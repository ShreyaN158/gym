const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const workoutController =
require("../controllers/workoutController");

router.post(
 "/create",
 protect,
 authorizeRoles("trainer"),
 workoutController.createWorkout
);

module.exports = router;