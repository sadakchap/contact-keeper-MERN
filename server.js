const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");


app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Welcome to ContactKeeper API..😍😍'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);


const PORT = process.env.PORT || 1930;
app.listen(PORT, () => console.log(`Server is up & running at ${PORT}`))