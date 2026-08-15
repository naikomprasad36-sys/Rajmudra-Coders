const Booking = require("../models/Booking");
const Event = require("../models/Event");


const createBooking = async (req, res) => {
  try {
    const { userId, eventId, ticketCount } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        message: "User ID and Event ID are required",
      });
    }

    const tickets = Number(ticketCount) || 1;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const bookings = await Booking.find({
      event: eventId,
      status: "booked",
    });

    const bookedTickets = bookings.reduce(
      (total, booking) => total + booking.ticketCount,
      0
    );

    const availableTickets = event.capacity - bookedTickets;

    if (tickets > availableTickets) {
      return res.status(400).json({
        message: "Not enough tickets available",
        availableTickets,
      });
    }

    const totalAmount = event.price * tickets;

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      ticketCount: tickets,
      totalAmount,
    });

    const populatedBooking = await Booking.findById(
      booking._id
    )
      .populate("user", "name email")
      .populate("event", "title date time venue price");

    res.status(201).json({
      message: "Booking successful",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    })
      .populate("event", "title date time venue price image")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get User Bookings Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event", "title date venue")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get All Bookings Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
 

const getAttendance = async (req, res) => {
  try {
    const bookings = await Booking.find({
      status: "booked",
    })
      .populate("user", "name email")
      .populate("event", "title date time venue")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get Attendance Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};




const updateAttendance = async (req, res) => {
  try {
    const { checkedIn } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        checkedIn: checkedIn,
      },
      {
        new: true,
      }
    )
      .populate("user", "name email")
      .populate("event", "title date time venue");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Attendance updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update Attendance Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
};

const markAttendance = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.checkedIn = true;

    await booking.save();

    const updatedBooking = await Booking.findById(
      booking._id
    )
      .populate("user", "name email")
      .populate("event", "title date time venue");

    res.status(200).json({
      message: "Attendance marked successfully",
      booking: updatedBooking,
    });

  } catch (error) {
    console.error("Attendance Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  markAttendance,
};