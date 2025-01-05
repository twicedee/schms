import Fee from "../models/fee.model.js";
import Student from "../models/student.model.js";
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
    const { studentId } = req.params;

    try {
        const fees = await Fee.find({ studentId }).populate("studentId", "firstName lastName admNumber");

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
