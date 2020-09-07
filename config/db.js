const mongoose = require("mongoose");
const config = require("config");
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`Connected to mongo DB at PORT: ${conn.connection.port}`);
    } catch (err) {
        console.log('ERROR CONNECTING TO MONGODB ');
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;