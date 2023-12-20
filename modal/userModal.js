const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    , bookedFields: [{
        fieldId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Field',
            required: true,
        }, bookedDate: Date,
        bookedTime: String,
        bookedHours: [String],
        bookedAt: {
            type: Date,
            default: Date.now,
        }
    }]
}, { timestamps: true })
module.exports = mongoose.model('UserField', userSchema)
