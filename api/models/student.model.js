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
            required: true,
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
            enum: ["Lower School", "Middle School", "Junior High School", "Senior High School"],
            required: true,

        },

        grade: {
            type: String,
            required: true,
        },

        DOB: {
            type: Date,
            required: true
        },

        parent: {
            type: String,
        },

        feeBalance: {
            type: Number,
            default: 30000

        }



    },
    { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
