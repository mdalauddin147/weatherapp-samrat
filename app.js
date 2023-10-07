const express = require('express');

const app = express();  

require('dotenv').config();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});