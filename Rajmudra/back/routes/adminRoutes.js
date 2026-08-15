const express = require("express");

const {
  getAdminStats,
} = require("../controllers/adminController");

const {
  getAllBookings,
  getAttendance,
  updateAttendance,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/stats", getAdminStats);

router.get("/bookings", getAllBookings);

router.get("/attendance", getAttendance);

router.put("/attendance/:id", updateAttendance);

module.exports = router;