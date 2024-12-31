const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    mobileNumber: { 
        type: String, 
        required: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    votingId: { 
        type: String, 
        required: true 
    },
    aadharId: { 
        type: String, 
        required: true, 
        unique: true // Assuming Aadhar ID should be unique
    },
    createdAt: { 
        type: Date, 
        default: Date.now // Automatically set the creation date
    },
    updatedAt: { 
        type: Date 
    }
});

// Middleware to update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User ', userSchema);