const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'surya',
    host: 'localhost',
    database: 'PG_DATABASE',
    password: 'surya123',
    port:'5432',
});

const uploadFile = async (req: any, res: any) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    try {
        const client = await pool.connect();
        const stream = fs.createReadStream(filePath);
        const csvStream = csv();

        csvStream
            .on('data', async (row: any) => {
                const { name, age } = row;
                await client.query('INSERT INTO data (name, age) VALUES ($1, $2)', [name, parseInt(age)]);
            })
            .on('end', async () => {
                client.release();
                fs.unlinkSync(filePath); 
                res.send('File processed');
            });

        stream.pipe(csvStream);
    } catch (error) {
        res.status(500).send('Error processing file');
        console.error(error);
    }
};

module.exports = {
    uploadFile,
};
