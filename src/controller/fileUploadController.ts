const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'surya',
    host: 'localhost',
    database: 'PG_DATABASE',
    password: 'surya123',
    port: '5432',
});

exports.uploadFile = async (req: any, res: any) => {
    try {
        await pool.connect();
        const filePath = path.resolve(req.file.path);
        const copyCommand = `
          COPY persons (first_name, last_name, dob, email)
          FROM '${filePath}'
          DELIMITER ','
          CSV HEADER;
        `;
        await pool.query(copyCommand);
        res.json({ message: "Successfully uploaded files" });
    } catch (error) {
        res.status(500).send('Error processing file');
        console.error(error);
    }
    finally {
        await pool.end();
    }
};