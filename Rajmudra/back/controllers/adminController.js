const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");


const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalEvents = await Event.countDocuments();

    const totalBookings = await Booking.countDocuments({
      status: "booked",
    });

    const checkedIn = await Booking.countDocuments({
      checkedIn: true,
      status: "booked",
    });

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalBookings,
      checkedIn,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAdminStats,
};