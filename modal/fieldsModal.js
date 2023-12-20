const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    address: {
        street: String,
        city: String,
    },
    pitchType: String,
    capacity: Number,
    features: [String],
    imageUrl: String,
    openingHours: {
        monday: { start: String, end: String },
        tuesday: { start: String, end: String },
        wednesday: { start: String, end: String },
        thursday: { start: String, end: String },
        friday: { start: String, end: String },
        saturday: { start: String, end: String },
        sunday: { start: String, end: String },
    },
    bookings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserField',
            },
            bookedAt: {
                type: Date,
                default: Date.now,
            },
            bookedDate: Date,
            bookedTime: String,
        },
    ],
},{ timestamps: true });

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
