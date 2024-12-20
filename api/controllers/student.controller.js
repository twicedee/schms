import Student from "../models/student.model";
import { errorHandler } from './error.js';


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
        email, 
        phone, 
        address, 
        department } = req.body;
    if (
        !admNumber||
        !firstName || 
        !middleName || 
        !lastName || 
        !DOB || 
        !gender || 
        !email || 
        !phone || 
        !address ) {
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


}


export const updateStudent = async (req, res, next) => {

}


export const deleteStudent = async (req, res, next) => {

}

