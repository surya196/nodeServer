const express = require('express');
import cors = require('cors');

const weather = require('./routes/v1/weatherRouter');
const fileUpload = require('./routes/v1/fileUploadRoute');

const app = express();
const port = 3000;

app.use(cors());
app.use('/weather', weather);
app.use('/file', fileUpload);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});