import mongoose from 'mongoose';




const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    subjects:[{ type: String }],
    staffMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }]
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;