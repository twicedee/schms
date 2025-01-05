import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,

    },
    initials: {
      type: String,
      enum: ["Mr.", "Mrs.", "Miss.", "Dr."],
      required: true,
    },

    firstName: {
      type: String,
      required: true,

    },

    middleName: {
      type: String

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
    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },

    department: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    },

    subjects: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    },

    isHOD: {
      type: Boolean,
      default: false
    },
    isClassTeacher: {
      type: Boolean,
      default: false
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
