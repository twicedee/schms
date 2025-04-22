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
    return next(errorHandler(403, 'Unauthorized action'));
  }

  try {
    const currentYear = new Date().getFullYear();
    const terms = ["Term 1", "Term 2", "Term 3"];
    
    // Fetch all fee structures grouped by level and dayBoarding
    const feeStructures = await FeeStructure.find({
      year: currentYear
    });

    if (!feeStructures || feeStructures.length === 0) {
      return next(errorHandler(404, 'No fee structures found for the current year'));
    }

    // Get all students in batches to avoid memory issues
    const batchSize = 100;
    let skip = 0;
    let studentsUpdated = 0;

    while (true) {
      const students = await Student.find()
        .skip(skip)
        .limit(batchSize)
        .lean();

      if (students.length === 0) break;

      const bulkOps = [];

      for (const student of students) {
        // Find matching fee structures for this student's level and dayBoarding
        const matchingFees = feeStructures.filter(
          fee => fee.level === student.level && 
                 fee.dayBoarding === student.dayBoarding
        );

        // Prepare updated fee balances
        const updatedFeeBalances = terms.map(term => {
          const matchingFee = matchingFees.find(fee => fee.term === term);
          const existingBalance = student.feeBalances?.find(
            fb => fb.term === term && fb.year === currentYear
          ) || { paid: 0 };

          // For sponsored students, set to fully paid
          if (student.sponsored) {
            return {
              term,
              year: currentYear,
              amount: matchingFee?.amount || 0,
              paid: matchingFee?.amount || 0,
              balance: 0,
              status: "Paid"
            };
          }

          // For non-sponsored students
          const amount = matchingFee?.amount || 0;
          const paid = existingBalance.paid || 0;
          const balance = amount - paid;
          const status = balance <= 0 ? "Paid" : (paid > 0 ? "Partial" : "Unpaid");

          return {
            term,
            year: currentYear,
            amount,
            paid,
            balance,
            status
          };
        });

        // Filter out null/undefined fee balances
        const validFeeBalances = updatedFeeBalances.filter(fb => fb !== null && fb !== undefined);

        // Prepare update operation
        bulkOps.push({
          updateOne: {
            filter: { _id: student._id },
            update: {
              $set: {
                feeBalances: validFeeBalances
              }
            }
          }
        });
      }

      // Execute bulk operations for this batch
      if (bulkOps.length > 0) {
        const result = await Student.bulkWrite(bulkOps);
        studentsUpdated += result.modifiedCount;
      }

      skip += batchSize;
    }

    res.status(200).json({
      success: true,
      message: `Successfully updated fees for ${studentsUpdated} students`,
      studentsUpdated
    });
  } catch (error) {
    next(error);
  }
};
