const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
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

const userDataSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User ', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    mobileNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Validate for a 10-digit mobile number
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    votingId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    aadharId: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
});

// Middleware to update the updatedAt field before saving
userDataSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User ', userSchema);
const UserData = mongoose.model('User Data', userDataSchema);

module.exports = { User, UserData };