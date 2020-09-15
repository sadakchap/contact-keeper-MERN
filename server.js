const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const connectDB = require("./config/db");
const path = require("path");

connectDB();

// Init Middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         msg: 'Welcome to ContactKeeper API..😍😍'
//     });
// });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', userRoutes);

// Server static assets in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 1930;
app.listen(PORT, () => console.log(`Server is up & running at ${PORT}`))