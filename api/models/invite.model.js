import mongoose from 'mongoose';

const inviteSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    expirationTime: { type: Date, required: true },
});

const Invite = mongoose.model('Invite', inviteSchema);
export default Invite;
