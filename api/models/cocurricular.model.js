import mongoose from 'mongoose';

const coCurricularSchema = new mongoose.Schema(
    {
        type: {
            type: String,  //club or sport
            required: true
        },

        patron: {
            type: String,
            default: false,
        },
        members:{
            type: String,

        }
    },
    { timestamps: true }
);

const User = mongoose.model('coCurricular', coCurricularSchema);

export default User;