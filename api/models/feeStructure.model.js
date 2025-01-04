import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            enum: ["Lower School", "Middle School", "Junior High School", "Senior High School"],
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

feeStructureSchema.index({ level: 1, term: 1 }, { unique: true }); // Ensure unique combinations of level and term

const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);

export default FeeStructure;
