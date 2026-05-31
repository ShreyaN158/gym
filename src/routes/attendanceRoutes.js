const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const attendanceController =
require("../controllers/attendanceController");

router.post(
 "/checkin",
 protect,
 attendanceController.checkIn
);

router.put(
 "/checkout",
 protect,
 attendanceController.checkOut
);

router.get(
 "/history",
 protect,
 attendanceController.history
);

module.exports = router;