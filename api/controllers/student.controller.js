import Student from "../models/student.model.js";
import FeeStructure from "../models/feeStructure.model.js";
import { errorHandler } from '../utils/error.js';

export const admitStudent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to admit a student!'));
    }

    const {
        enrollmentDate,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        grade,
        level,
        dayBoarding,
        parent,
        contact,
        sponsored
    } = req.body;

    if (
        !enrollmentDate ||
        !firstName ||
        !lastName ||
        !DOB ||
        !gender ||
        !grade ||
        !level ||
        !dayBoarding
    ) {
        return next(errorHandler(400, 'Please provide all required fields for the student.'));
    }

    const currentYear = new Date().getFullYear();
    const initialFeeBalances = ["Term 1", "Term 2", "Term 3"].map(term => ({
        term,
        year: currentYear,
        amount: 0,
        paid: 0,
        balance: 0,
        status: "Unpaid"
    }));

    const newStudent = new Student({
        enrollmentDate,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        grade,
        level,
        dayBoarding,
        parent,
        contact,
        sponsored,
        feeBalances: initialFeeBalances
    });

    try {
        const savedStudent = await newStudent.save();
            await assignDefaultFees(savedStudent._id, level, dayBoarding, currentYear, sponsored);
        
        return res.status(201).json(savedStudent);
    } catch (error) {
        next(error);
    }
};

const assignDefaultFees = async (studentId, level, dayBoarding, year, sponsored) => {
    try {
        const terms = ["Term 1", "Term 2", "Term 3"];
        
        for (const term of terms) {
            const feeStructure = await FeeStructure.findOne({
                level,
                dayBoarding,
                term,
                year
            });
            
            if (feeStructure) {
                const update = sponsored 
                    ? {
                        "feeBalances.$[elem].amount": feeStructure.amount,
                        "feeBalances.$[elem].paid": feeStructure.amount,
                        "feeBalances.$[elem].balance": 0,
                        "feeBalances.$[elem].status": "Paid"
                    }
                    : {
                        "feeBalances.$[elem].amount": feeStructure.amount,
                        "feeBalances.$[elem].balance": feeStructure.amount
                    };

                await Student.findByIdAndUpdate(studentId, {
                    $set: update
                }, {
                    arrayFilters: [{ "elem.term": term, "elem.year": year }]
                });
            }
        }
    } catch (error) {
        console.error("Error assigning default fees:", error);
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        
        const query = {
            ...(req.query.admNumber && { admNumber: parseInt(req.query.admNumber) }),
            ...(req.query.firstName && { firstName: { $regex: req.query.firstName, $options: 'i' } }),
            ...(req.query.lastName && { lastName: { $regex: req.query.lastName, $options: 'i' } }),
            ...(req.query.middleName && { middleName: { $regex: req.query.middleName, $options: 'i' } }),
            ...(req.query.gender && { gender: req.query.gender }),
            ...(req.query.level && { level: req.query.level }),
            ...(req.query.grade && { grade: req.query.grade }),
            ...(req.query.dayBoarding && { dayBoarding: req.query.dayBoarding }),
            ...(req.query.sponsored && { sponsored: req.query.sponsored === 'true' }),
            ...(req.query.searchTerm && {
                $or: [
                    { admNumber: { $regex: req.query.searchTerm, $options: 'i' } },
                    { firstName: { $regex: req.query.searchTerm, $options: 'i' } },
                    { lastName: { $regex: req.query.searchTerm, $options: 'i' } }
                ]
            })
        };

        const students = await Student.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalStudents = await Student.countDocuments(query);

        res.status(200).json({
            students,
            totalStudents
        });
    } catch (error) {
        next(error);
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findOne({ admNumber: parseInt(req.params.admNumber) });
        if (!student) {
            return next(errorHandler(404, 'Student not found'));
        }
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to update this student'));
    }
    
    try {
        if (req.body.feePayment) {
            return handleFeePayment(req, res, next);
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { admNumber: parseInt(req.params.admNumber) },
            { $set: req.body },
            { new: true }
        );

        if (!updatedStudent) {
            return next(errorHandler(404, 'Student not found'));
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
};

const handleFeePayment = async (req, res, next) => {
    try {
        const { amount, term, year, receiptNumber, recordedBy } = req.body.feePayment;
        
        const paymentAmount = Number(amount);
        if (isNaN(paymentAmount)) {
            return next(errorHandler(400, 'Invalid payment amount'));
        }

        const student = await Student.findOne({ admNumber: parseInt(req.params.admNumber) });
        if (!student) {
            return next(errorHandler(404, 'Student not found'));
        }

        if (student.sponsored) {
            return res.status(200).json({
                ...student.toObject(),
                message: "Student is sponsored - fees are fully paid"
            });
        }

        const feeBalanceIndex = student.feeBalances.findIndex(
            fb => fb.term === term && fb.year === year
        );

        if (feeBalanceIndex === -1) {
            return next(errorHandler(400, 'Fee structure not found for this term and year'));
        }

        const currentPaid = Number(student.feeBalances[feeBalanceIndex].paid) || 0;
        const feeAmount = Number(student.feeBalances[feeBalanceIndex].amount) || 0;
        
        const updatedPaid = currentPaid + paymentAmount;
        const updatedBalance = feeAmount - updatedPaid;
        const status = updatedBalance <= 0 ? "Paid" : (updatedPaid > 0 ? "Partial" : "Unpaid");

        const paymentRecord = {
            date: new Date(),
            amount: paymentAmount,
            term,
            year,
            receiptNumber,
            recordedBy: recordedBy || req.user.username
        };

        const updatedStudent = await Student.findOneAndUpdate(
            { admNumber: parseInt(req.params.admNumber) },
            {
                $set: {
                    [`feeBalances.${feeBalanceIndex}.paid`]: updatedPaid,
                    [`feeBalances.${feeBalanceIndex}.balance`]: updatedBalance,
                    [`feeBalances.${feeBalanceIndex}.status`]: status
                },
                $push: { feeHistory: paymentRecord }
            },
            { new: true }
        );

        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
};


export const deleteStudent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to delete this student'));
    }
    try {
        await Student.findOneAndDelete({ admNumber: parseInt(req.params.admNumber) });
        res.status(200).json('Student has been deleted');
    } catch (error) {
        next(error);
    }
};

export const getStudentFeeDetails = async (req, res, next) => {
    try {
        const student = await Student.findOne({ admNumber: parseInt(req.params.admNumber) });
        if (!student) {
            return next(errorHandler(404, 'Student not found'));
        }

        const currentYear = new Date().getFullYear();
        const feeStructures = await FeeStructure.find({
            level: student.level,
            dayBoarding: student.dayBoarding,
            year: currentYear
        });

        res.status(200).json({
            student,
            feeStructures
        });
    } catch (error) {
        next(error);
    }
};