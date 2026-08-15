const express = require("express");

const {
  createBooking,
  getUserBookings,
  getAllBookings,
  markAttendance,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);

router.get("/user/:userId", getUserBookings);

router.get("/", getAllBookings);

router.put("/:id/attendance", markAttendance);
module.exports = router;