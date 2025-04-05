import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'subscriber', 'member'],
        default: 'subscriber'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Delete any existing model before creating a new one
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model('User', UserSchema);

export default User;