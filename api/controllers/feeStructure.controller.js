import FeeStructure from "../models/feeStructure.model.js";
import { errorHandler } from "../utils/error.js";


export const createFeeStructure = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not authorized to set the fee structure."));
    }

    const { dayBoarding, year, level, term, amount } = req.body;

    if (!dayBoarding ||!level|| !year || !term || !amount) {
        return next(errorHandler(400, "Please provide level, term, and amount."));
    }

    try {
        // Find existing fee structure for the level and term
        const existingFee = await FeeStructure.findOne({dayBoarding, level, term});

        if (existingFee) {
            // Update the existing fee structure
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
        // Get all fee structures sorted by year (descending), then level, then term
        const feeStructures = await FeeStructure.find().sort({ year: -1, level: 1, term: 1 });
        
        // Group by year for better organization
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