import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ["Pre-Primary", "Lower School", "Middle School", "Junior High School", "Senior High School"],
        required: true
    },
    dayBoarding: {
        type: String,
        enum: ["Day", "Boarding"],
        required: true
    },
    term: {
        type: String,
        enum: ["Term 1", "Term 2", "Term 3"],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add compound index to ensure unique fee structure per level/dayBoarding/term/year
feeStructureSchema.index(
    { level: 1, dayBoarding: 1, term: 1, year: 1 },
    { unique: true }
);

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
export default FeeStructure;