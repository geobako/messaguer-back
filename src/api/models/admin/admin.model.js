const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobileAppCode: {
            type: String
        },
        appointments: [{ type: mongoose.Schema.ObjectId, ref: 'AppointmentSchema' }],
        password: {
            type: String,
            required: true
        },
        settings: {},
        notifications: [{ type: mongoose.Schema.ObjectId, ref: 'NotificationSchema' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
