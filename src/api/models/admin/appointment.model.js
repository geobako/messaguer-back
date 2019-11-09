const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String
        },
        isFromApp: {
            type: Boolean,
            default: false
        },
        // userRef: {
        //     type: mongoose.Schema.ObjectId,
        //     ref: 'AppointmentSchema',
        //     default : null
        // },
        patientInfo: {
            name: String,
            surname: String,
            email: String,
            phone: {
                type: String,
                required: true
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
