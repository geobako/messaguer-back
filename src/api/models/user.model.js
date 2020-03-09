const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String,
            required: false
        },
        mobileToken: {
            type: String,
            required: false
        },
        subscription: Object
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
