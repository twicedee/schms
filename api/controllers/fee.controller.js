import Fee from "../models/fee.model.js";
import Student from "../models/student.model.js";
import FeeStructure from "../models/feeStructure.model.js";

import { errorHandler } from "../utils/error.js";

export const confirmPayment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to confirm payments."));
    }

    const { studentId, term, amountPaid } = req.body;

    if (!studentId || !term || !amountPaid) {
        return next(errorHandler(400, "Please provide all required fields: studentId, term, and amountPaid."));
    }

    try {
        const feeEntry = await Fee.findOne({ studentId, term });

        if (!feeEntry) {
            return next(errorHandler(404, `No fee record found for the student in ${term}.`));
        }

        if (amountPaid > feeEntry.amount) {
            return next(errorHandler(400, "Amount paid exceeds the outstanding fee balance."));
        }

        feeEntry.amount -= amountPaid;

        // Save the updated fee entry
        await feeEntry.save();

        res.status(200).json({
            message: "Payment confirmed successfully.",
            feeEntry,
        });
    } catch (error) {
        next(error);
    }
};

export const getStudentFees = async (req, res, next) => {

    try {
        const fees = await Fee.find({ ...(req.query.admNumber && { admNumber: req.query.admNumber }), })

        if (!fees.length) {
            return next(errorHandler(404, "No fee records found for the student."));
        }

        res.status(200).json(fees);
    } catch (error) {
        next(error);
    }
};

export const addFeeRecord = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to add fee records."));
    }

    const { studentId, term, amount } = req.body;

    if (!studentId || !term || !amount) {
        return next(errorHandler(400, "Please provide all required fields: studentId, term, and amount."));
    }

    try {
        const existingFee = await Fee.findOne({ studentId, term });

        if (existingFee) {
            return next(errorHandler(400, `Fee record for ${term} already exists.`));
        }

        const newFee = new Fee({ studentId, term, amount });
        const savedFee = await newFee.save();

        res.status(201).json(savedFee);
    } catch (error) {
        next(error);
    }
};



export const bulkUpdateStudentFees = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  try {
    // Fetch all fee structures
    const feeStructures = await FeeStructure.find();

    if (!feeStructures || feeStructures.length === 0) {
      return res.status(404).json({ message: "No fee structure found." });
    }

    // Perform bulk update
    await Student.updateMany(
      { level: { $in: feeStructures.map((fee) => fee.level) } },
      [
        {
          $set: {
            feeBalance: {
              $arrayToObject: {
                $map: {
                  input: {
                    $filter: {
                      input: feeStructures,
                      as: "fee",
                      cond: { $eq: ["$$fee.level", "$level"] },
                    },
                  },
                  as: "fee",
                  in: { k: "$$fee.term", v: "$$fee.amount" },
                },
              },
            },
          },
        },
      ]
    );

    res.status(200).json({ message: "Student fees updated successfully." });
  } catch (error) {
    next(error);
  }
};
