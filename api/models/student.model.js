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
        

        studentPhoto: {
            type: Image,
            default:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },

        level: {
            type: String,
            default: 'uncategorized',
        },

        grade: {
            type: String,
            default: 'uncategorized',
        },

        DOB: {
            type: Date,
            required: true
        },

        parent: {
            type: String,
            required: true,
            unique: true,
        },

        contact: {
            type: Number,
            required: true
        },

    },
    { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
