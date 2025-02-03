import TermDates from "../models/termDates.model.js";
import eventDates from "../models/events.model.js"
import { errorHandler } from "../utils/error.js";

export const setTermDates = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized action" ));
  }

  const { term, startDate, endDate } = req.body;

  if (!term || !startDate || !endDate) {
    return next(errorHandler(403,"Please provide term, startDate, and endDate." ));
  }

  try {
    const existingTerm = await TermDates.findOne({ term });
    if (existingTerm) {
      existingTerm.startDate = startDate;
      existingTerm.endDate = endDate;
      await existingTerm.save();
    } else {
      const term = new TermDates({ term, startDate, endDate });
      const newTerm = await newTerm.save();
    }

    res.status(200).json(newTerm);
  } catch (error) {
    next(error);
  }
};

export const getTermDates = async (req, res, next) => {
  try {
    const terms = await TermDates.find();
    res.status(200).json(terms);
  } catch (error) {
    next(error);
  }
};


export const setEventDates = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  const { event, date, description } = req.body;

  if (!event || !date || !description ) {
    return next(errorHandler(403,"Please provide term, startDate, and endDate." ));
  }

  try {
    const existingTerm = await TermDates.findOne({ term });
    if (existingTerm) {
      existingTerm.startDate = startDate;
      existingTerm.endDate = endDate;
      await existingTerm.save();
    } else {
      const newTerm = new eventDates({ term, startDate, endDate });
      await newTerm.save();
    }

    res.status(200).json({ message: "Term dates set successfully." });
  } catch (error) {
    next(error);
  }
};

export const getEventDates = async (req, res, next) => {
  try {
    const terms = await TermDates.find();
    res.status(200).json(terms);
  } catch (error) {
    next(error);
  }
};

