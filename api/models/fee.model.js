import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        term: {
            type: String,
            enum: ["Term 1", "Term 2", "Term 3"],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
