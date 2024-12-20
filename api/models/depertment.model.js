import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
    {
        department: {
            type: String,
            default: " ",// math, sience, e.t.c
            required: true
        },
        hod:{ //head of department 
            type: String,
            required: true
        },

        subjects:{
            type: String,
            required: true

        },

        members:{
            type: String,

        },

    },
    { timestamps: true }
);

const User = mongoose.model('Staff', staffSchema);

export default User;