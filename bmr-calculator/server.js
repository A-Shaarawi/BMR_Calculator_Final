const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://shaarawi:UJh7wc1p1pa3Wujc@bmrcalculator.j9x6qjx.mongodb.net/bmrcalculator?retryWrites=true&w=majority&appName=BMRCalculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Connection state:', mongoose.connection.readyState);
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Connection state:', mongoose.connection.readyState);
});

// Add connection event handlers
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// BMR History Schema
const bmrHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    weight: Number,
    age: Number,
    height: Number,
    days: String,
    gender: String,
    bmr: Number,
    dailyCalories: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BMRHistory = mongoose.model('BMRHistory', bmrHistorySchema);

// Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            'your_jwt_secret_key_here',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            'your_jwt_secret_key_here',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Save a new BMR calculation
app.post('/api/bmr', async (req, res) => {
    try {
        const { userId, username, weight, age, height, days, gender, bmr, dailyCalories } = req.body;
        
        // Validate required fields
        if (!userId || !username) {
            return res.status(400).json({ message: 'userId and username are required' });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const entry = new BMRHistory({
            userId,
            username,
            weight,
            age,
            height,
            days,
            gender,
            bmr,
            dailyCalories
        });

        console.log('Attempting to save BMR entry:', entry);
        const savedEntry = await entry.save();
        console.log('Successfully saved BMR entry:', savedEntry);
        
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error('Error saving BMR history:', error);
        res.status(500).json({ 
            message: 'Error saving BMR history', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get all BMR calculations for a user
app.get('/api/bmr', async (req, res) => {
    try {
        const { userId } = req.query;
        const history = await BMRHistory.find({ userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching BMR history', error: error.message });
    }
});

// Delete a BMR calculation by id
app.delete('/api/bmr/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await BMRHistory.findByIdAndDelete(id);
        res.json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting entry', error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 