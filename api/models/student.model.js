import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        admNumber: {
            type: Number,
            required: true,
            unique: true
        },

        firstName: {
            type: String,
            required: true,

        },

        middleName: {
            type: String,
            
        },
        lastName: {
            type: String,
            required: true,

        },

        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true
        },

        

        studentPhoto: {
            type: String,
            default:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },

        level: {
            type: String,
            enum: ["Pre-Primary", "Lower School", "Middle School", "Junior High School", "Senior High School"],
            required: true,

        },

        grade: {
            type: String,
            required: true,
            enum: ["Play Group", "PP1", "PP2", "grade 1", "grade 2", "grade 3", "grade 4", "grade 5", "grade 6", "grade 7", "grade 8", "grade 9", "grade 10", "grade 12", "grade 12"]
        },

        DOB: {
            type: Date,
            required: true
        },

        parent: {
            type: String,
        },
        contact: {
            type: Number,
        },

        feeBalance: {
            type: Map,
            of: Number,
        }



    },
    { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
