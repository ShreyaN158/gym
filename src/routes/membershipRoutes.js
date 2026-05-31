const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const membershipController =
require("../controllers/membershipController");

router.post(
  "/subscribe",
  protect,
  membershipController.subscribe
);

router.get(
 "/status",
 protect,
 membershipController.getMembershipStatus
);

router.put(
 "/renew",
 protect,
 membershipController.renewMembership
);
module.exports = router;