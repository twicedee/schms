import mongoose from 'mongoose';

// Step 1: Define the Counter Schema
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Identifier for the counter
    lastAdmNumber: { type: Number, default: 1001 } // Start from 1000
});

// Step 2: Create the Counter Model
const Counter = mongoose.model('Counter', counterSchema);

// Step 3: Define the Student Schema
const studentSchema = new mongoose.Schema({
    admNumber: { type: Number, unique: true },
    enrollmentDate: {type: Date, required: true},
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    studentPhoto: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    level: {
        type: String,
        enum: ["Pre-Primary", "Lower School", "Middle School", "Junior High School", "Senior High School"],
        required: true
    },
    grade: {
        type: String,
        required: true,
        enum: ["Play Group", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
    },
    DOB: { type: Date, required: true },
    parent: { type: String },
    contact: { type: Number },
    feeBalance: { type: Map, of: Number }
}, { timestamps: true });

// Step 4: Pre-Save Middleware to Auto-Increment Admission Number
studentSchema.pre('save', async function (next) {
    if (!this.isNew) {
        // If the document is not new, skip admission number generation
        return next();
    }

    try {
        // Find and increment the counter
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'studentAdmNumber' }, // Identifier for the counter
            { $inc: { lastAdmNumber: 1 } }, // Increment the lastAdmNumber by 1
            { new: true, upsert: true } // Create the counter if it doesn't exist
        );

        // Assign the incremented value to the student's admNumber
        this.admNumber = counter.lastAdmNumber;
        next();
    } catch (error) {
        next(error);
    }
});

// Step 5: Create the Student Model
const Student = mongoose.model('Student', studentSchema);

export default Student;