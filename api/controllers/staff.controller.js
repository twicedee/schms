import Staff from "../models/staff.model.js";
import { errorHandler } from '../utils/error.js';


export const addStaff = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to admit a Staff!'));
    }

    const {
        firstName,
        middleName,
        lastName,
        department,

    } = req.body;
    if (
        !firstName ||
        !middleName ||
        !lastName ||
        !DOB ||
        !department
    ) {
        return next(errorHandler(400, 'Please provide all required fields for the Staff.'));
    }
    if (!req.body) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }



    const newStaff = new Staff(req.body)
    try {
        const savedStaff = await newStaff.save()
        return res.status(200).json(savedStaff)
    }
    catch (error) {
        next(error)
    }
}

export const getStaff = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 25;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const Staffs = await Staff.find({
            ...(req.query.firstName && { firstName: req.query.firstName }),
            ...(req.query.LastName && { lastName: req.query.lastName }),
            ...(req.query.middleName && { middleName: req.query.middleName }),
            ...(req.query.gender && { gender: req.query.gender }),
            ...(req.query.department && { department: req.query.department }),
            ...(req.query.phone && { phone: req.query.phone }),
            ...(req.query.searchTerm && {
                $or: [
                    { firstName: { $regex: req.query.searchTerm, $options: 'i' } },
                    { lastName: { $regex: req.query.searchTerm, $options: 'i' } }
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalStaffs = await Staff.countDocuments();

        const now = new Date();

        res.status(200).json({
            Staffs,
            totalStaffs,
        });
    } catch (error) {
        next(error);
    }
};




export const updateStaff = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this staff'));
    }
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.admNumber,
            {
                $set: {
                    firstName: req.query.firstName,
                    lastName: req.query.lastName,
                    middleName: req.query.middleName,

                },
            },
            { new: true }
        );
        res.status(200).json(updatedStaff);
    } catch (error) {
        next(error);
    }

}


export const deleteStaff = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
        await Staff.findByIdAndDelete(req.params.admNumber);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }

}

