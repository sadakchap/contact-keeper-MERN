const express = require("express");
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 1930;
app.listen(PORT, () => console.log(`Server is up & running at ${PORT}`))