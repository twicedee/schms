import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ['teaching', 'non-teaching'],
            required: true,
        },

        firstName: {
            type: String,
            required: true,

        },
        middleName: {
            type: String,
            required: false,

        },

        lastName: {
            type: String,
            required: true,

        },
        contact: {
            type: Number,
            required: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },


        profilePicture: {
            type: String,
            default:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },

        department: {
            type: String,
            default: 'uncategorized',
        },

        subjects: {
            type: String,
            default: 'uncategorized',
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
