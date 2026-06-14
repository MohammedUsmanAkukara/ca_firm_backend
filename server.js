require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

console.log("Mera URL hai:", process.env.MONGODB_URI);

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('CA Firm API is running gracefully.');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Modular backend server running on port ${PORT}`);
});

// const express = require('express');
// require('dotenv').config();
// const app = express();
// const {mongoose} = require('mongoose');

// //database
// mongoose
// .connect(process.env.MONGODB_URL)
// .then(() => console.log('DB connected'))
// .catch((err) => console.log(err.message));

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // 🛑 APNA PASSWORD YAHAN DALNA HAI (*** ki jagah)
// // Direct string use kar rahe hain, .env ki zaroorat nahi abhi
// const TEST_MONGODB_URI = "mongodb+srv://cafirm_admin:jjm0H4otrWUu9T47@cafirm.leerymx.mongodb.net/ca_firm_db?retryWrites=true&w=majority&appName=cafirm";

// const startServer = async () => {
//     try {
//         console.log("⏳ MongoDB se connect karne ki koshish kar raha hu...");
        
//         // Mongoose connection
//         await mongoose.connect(TEST_MONGODB_URI, {
//             serverSelectionTimeoutMS: 5000, // 5 second me bata dega agar fail hua
//             family: 4 // Force IPv4
//         });
        
//         console.log('✅ BINGO! MongoDB Server.js se Connected Successfully!');

//         // DB connect hone ke baad server start karein
//         app.listen(5000, () => {
//             console.log('🚀 Server is running on port 5000');
//         });

//     } catch (error) {
//         console.error('❌ MongoDB Connection Failed!!!');
//         console.error('Error Details:', error.message);
//     }
// };

// // Function ko call karein
// startServer();

// // Bas ek testing route
// app.get('/', (req, res) => {
//     res.send('Database Testing is live!');
// });




