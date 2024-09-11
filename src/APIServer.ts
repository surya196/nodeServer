const express = require('express');
import cors = require('cors');
const routes = require('./routes/v1/Route')

const app = express();
const port = 3000;
app.use(cors());
app.use('/v1', function (req: any, res: any) { routes });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});