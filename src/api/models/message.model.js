const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        id: {
            type: String
        },
        user: {
            name: String,
            id: String,
            avatar: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
