const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const uri = 'mongodb+srv://hitmangogo7:O6v7o8AoBtiCN3i3@cluster0.4xyg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;