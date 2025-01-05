import Student from "../models/student.model.js";
import { errorHandler } from '../utils/error.js';


export const admitStudent = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to admit a student!'));
    }

    const {
        admNumber,
        firstName,
        middleName,
        lastName,
        DOB,
        gender,
        grade,
        level,
    } = req.body;
    if (
        !admNumber ||
        !firstName ||
        !middleName ||
        !lastName ||
        !DOB ||
        !gender ||
        !grade ||
        !level
    ) {
        return next(errorHandler(400, 'Please provide all required fields for the student.'));
    }
    if (!req.body) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }



    const newStudent = new Student(req.body)
    try {
        const savedStudent = await newStudent.save()
        return res.status(200).json(savedStudent)
    }
    catch (error) {
        next(error)
    }
}

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
    if (!req.user.isAdmin ) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.admNumber,
            {
                $set: {
                    firstName: req.query.firstName,
                    lastName: req.query.lastName,
                    middleName: req.query.middleName,
                    gender: req.query.gender,
                    level: req.query.level,
                    grade: req.query.grade,
                    feeBalance: req.query.feeBalance
                },
            },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }

}


export const deleteStudent = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Student.findByIdAndDelete(req.params.admNumber);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }

}

