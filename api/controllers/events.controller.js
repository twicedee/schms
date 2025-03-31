import eventDates from "../models/events.model.js";
import { errorHandler } from "../utils/error.js";

// Create or update event dates
export const setEventDates = async (req, res, next) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized action"));
  }

  const { event, date, description, term, startDate, endDate } = req.body;

  // Validate required fields based on the event type
  if (event === "important") {
    if (!date || !description ) {
      return next(
        errorHandler(400, "Please provide date, description, and year for important dates.")
      );
    }
  } else if (event === "term") {
    if (!term || !startDate || !endDate) {
      return next(
        errorHandler(400, "Please provide term, startDate, and endDate for term dates.")
      );
    }
  } else {
    return next(errorHandler(400, "Invalid event type."));
  }

  try {
    let newEvent;

    if (event === "important") {
      // Create or update important date
      newEvent = new eventDates({
        event,
        date,
        description,
      });
    } else if (event === "term") {
      // Create or update term date
      newEvent = new eventDates({
        event,
        term,
        startDate,
        endDate,
      });
    }

    await newEvent.save();
    res.status(200).json({ message: "Event date saved successfully.", newEvent });
  } catch (error) {
    next(error);
  }
};

// Fetch all event dates
export const getEventDates = async (req, res, next) => {
  try {
    const events = await eventDates.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};