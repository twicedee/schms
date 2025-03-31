import Student from "../models/student.model.js";
import { errorHandler } from '../utils/error.js';

export const admitStudent = async (req, res, next) => {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to admit a student!'));
    }

    // Destructure required fields from the request body
    const {
        enrollmentDate,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        grade,
        level,
        parent,
        contact,
        feeBalance
    } = req.body;

    // Validate required fields
    if (
        !enrollmentDate||
        !firstName ||
        !lastName ||
        !DOB ||
        !gender ||
        !grade ||
        !level
    ) {
        return next(errorHandler(400, 'Please provide all required fields for the student.'));
    }

    // Create a new student object (excluding admNumber)
    const newStudent = new Student({
        enrollmentDate,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        grade,
        level,
        parent,
        contact,
        feeBalance
    });

    try {
        // Save the student (pre-save middleware will auto-generate admNumber)
        const savedStudent = await newStudent.save();
        return res.status(200).json(savedStudent);
    } catch (error) {
        next(error);
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) ;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const students = await Student.find({
            ...(req.query.admNumber && { admNumber: req.query.admNumber }),
            ...(req.query.firstName && { firstName: req.query.firstName }),
            ...(req.query.LastName && { lastName: req.query.lastName }),
            ...(req.query.middleName && { middleName: req.query.middleName }),
            ...(req.query.gender && { gender: req.query.gender }),
            ...(req.query.level && { level: req.query.level }),
            ...(req.query.grade && { grade: req.query.grade }),
            ...(req.query.feeBalance && { feeBalance: req.query.feeBalance }),
            ...(req.query.searchTerm && {
                $or: [
                    { admNumber: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalstudents = await Student.countDocuments();

        

        const now = new Date();

        res.status(200).json({
            students,
            totalstudents,
        });
    } catch (error) {
        next(error);
    }
};




export const updateStudent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to update this student'));
    }
    
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { admNumber: req.params.admNumber },  // Find by admission number
            {
                $set: {
                    enrollmentDate: req.body.enrollmentDate,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    middleName: req.body.middleName,
                    gender: req.body.gender,
                    level: req.body.level,
                    grade: req.body.grade,
                    feeBalance: req.body.feeBalance,
                    // Add other fields as needed
                },
            },
            { new: true }  // Return the updated document
        );

        if (!updatedStudent) {
            return next(errorHandler(404, 'Student not found'));
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
};


export const deleteStudent = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this student'));
    }
    try {
        await Student.findOneAndDelete({ admNumber: req.params.admNumber });
        res.status(200).json('This student has been deleted');
    } catch (error) {
        next(error);
    }

}

