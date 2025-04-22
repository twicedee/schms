import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    lastAdmNumber: { type: Number, default: 1001 }
});

const Counter = mongoose.model('Counter', counterSchema);

const studentSchema = new mongoose.Schema({
    admNumber: { type: Number, unique: true },
    enrollmentDate: { type: Date, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dayBoarding: { 
        type: String, 
        enum: ["Day", "Boarding"], 
        required: true 
    },
    sponsored: { type: Boolean, default: false, required: true },
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
    feeBalances: [{
        term: { type: String, enum: ["Term 1", "Term 2", "Term 3"] },
        year: { type: Number },
        amount: { type: Number, default: 0 },
        paid: { type: Number, default: 0 },
        balance: { type: Number, default: 0 },
        status: { type: String, enum: ["Paid", "Partial", "Unpaid"], default: "Unpaid" }
    }],
    feeHistory: [{
        date: { type: Date, default: Date.now },
        amount: { type: Number },
        term: { type: String },
        year: { type: Number },
        receiptNumber: { type: String },
        recordedBy: { type: String }
    }]
}, { timestamps: true });

studentSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'studentAdmNumber' },
            { $inc: { lastAdmNumber: 1 } },
            { new: true, upsert: true }
        );
        this.admNumber = counter.lastAdmNumber;
        next();
    } catch (error) {
        next(error);
    }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;