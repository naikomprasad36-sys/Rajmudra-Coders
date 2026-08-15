const Event = require("../models/Event");

// =========================
// GET ALL EVENTS
// =========================

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Get Events Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// GET SINGLE EVENT
// =========================

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// CREATE EVENT
// =========================

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      category,
      price,
      capacity,
      image,
    } = req.body;

    if (!title || !date || !venue || !capacity) {
      return res.status(400).json({
        message: "Title, date, venue and capacity are required",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      category,
      price: price || 0,
      capacity,
      image,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// UPDATE EVENT
// =========================

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// DELETE EVENT
// =========================

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};