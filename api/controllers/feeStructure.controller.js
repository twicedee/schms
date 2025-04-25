import FeeStructure from "../models/feeStructure.model.js";
import { errorHandler } from "../utils/error.js";
import Student from "../models/student.model.js";



export const createFeeStructure = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to set the fee structure."));
    }

    const { dayBoarding, year, level, term, amount } = req.body;

    if (!dayBoarding || !level || !year || !term || !amount) {
        return next(errorHandler(400, "Please provide level, term, and amount."));
    }

    try {
        const existingFee = await FeeStructure.findOne({ dayBoarding, level, term });

        if (existingFee) {
            existingFee.amount = amount;
            const updatedFee = await existingFee.save();
            return res.status(200).json({
                message: `Fee structure for ${level} - ${term} updated successfully.`,
                feeStructure: updatedFee,
            });
        } else {
            // Create a new fee structure
            const newFee = new FeeStructure({ dayBoarding, level, term, year, amount });
            const savedFee = await newFee.save();
            return res.status(201).json({
                message: `Fee structure ${dayBoarding} school for ${level} - ${term} created successfully.`,
                feeStructure: savedFee,
            });
        }
    } catch (error) {
        next(error);
    }
};

// export const createFeeStructure = async (req, res, next) => {
//     if (!req.user.isAdmin) {
//         return next(errorHandler(403, "You are not authorized to set the fee structure."));
//     }

//     const { dayBoarding, year, level, term, amount } = req.body;

//     if (!dayBoarding || !level || !year || !term || !amount) {
//         return next(errorHandler(400, "Please provide level, term, and amount."));
//     }

//     try {
//         // Always create a new fee structure
//         const newFee = new FeeStructure({ dayBoarding, level, term, year, amount });
//         const savedFee = await newFee.save();
//         return res.status(201).json({
//             message: `Fee structure ${dayBoarding} school for ${level} - ${term} created successfully.`,
//             feeStructure: savedFee,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const getFeeStructures = async (req, res, next) => {
    try {
        const feeStructures = await FeeStructure.find().sort({ year: -1, level: 1, term: 1 });
        const groupedByYear = feeStructures.reduce((acc, fee) => {
            if (!acc[fee.year]) {
                acc[fee.year] = [];
            }
            acc[fee.year].push(fee);
            return acc;
        }, {});
        res.status(200).json(groupedByYear);
    } catch (error) {
        next(error);
    }
};

export const getFeeForLevelAndTerm = async (req, res, next) => {
    const { level, term } = req.query;

    if (!level || !term) {
        return next(errorHandler(400, "Please provide level and term."));
    }
    try {
        const feeStructure = await FeeStructure.findOne({ level, term });

        if (!feeStructure) {
            return next(errorHandler(404, `Fee structure for ${level} - ${term} not found.`));
        }

        res.status(200).json(feeStructure);
    } catch (error) {
        next(error);
    }
};

export const deleteFeeStructure = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to delete a fee structure."));
    }

    const { id } = req.params;

    try {
        const deletedFee = await FeeStructure.findByIdAndDelete(id);

        if (!deletedFee) {
            return next(errorHandler(404, "Fee structure not found."));
        }

        res.status(200).json({
            message: "Fee structure deleted successfully.",
        });
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

        const feeStructures = await FeeStructure.find({
            year: currentYear
        });

        if (!feeStructures || feeStructures.length === 0) {
            return next(errorHandler(404, 'No fee structures found for the current year'));
        }

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
                const matchingFees = feeStructures.filter(
                    fee => fee.level === student.level &&
                        fee.dayBoarding === student.dayBoarding
                );

                const updatedFeeBalances = terms.map(term => {
                    const matchingFee = matchingFees.find(fee => fee.term === term);
                    const existingBalance = student.feeBalances?.find(
                        fb => fb.term === term && fb.year === currentYear
                    ) || { paid: 0 };

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

                const validFeeBalances = updatedFeeBalances.filter(fb => fb !== null && fb !== undefined);

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
