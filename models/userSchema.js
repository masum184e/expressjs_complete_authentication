import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    profilePicture: {
        type: String,
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;