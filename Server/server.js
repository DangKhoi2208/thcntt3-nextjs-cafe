const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456', //adjust as needed
    database: 'datathcntt3', //adjust as needed
    connectionLimit: 10 // Adjust as needed
});

//remember to adjust the links
//api get
app.get('/cafe', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM cafe');
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cafe:', error);
        res.status(500).json({ error: 'Error fetching cafe' });
    }
});

//find with id
app.get('/cafe/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM cafe WHERE id = ?', [id]);
        connection.release();
        if (rows.length === 0) {
            // If no item found with the specified ID
            res.status(404).json({ error: 'Cafe not found' });
        } else {
            res.status(200).json(rows[0]); 
        }
    } catch (error) {
        console.error('Error fetching cafe by ID:', error);
        res.status(500).json({ error: 'Error fetching cafe by ID' });
    }
});

app.post('/cafe', async (req, res) => {
    const { name, gia, soluong } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO cafe (name, gia, soluong,img) VALUES (?, ?, ?)', [name, gia, soluong,img]);
        connection.release();
        res.status(201).end();
    } catch (error) {
        console.error('Error adding cafe:', error);
        res.status(500).json({ error: 'Error adding cafe' });
    }
});

//api put
app.put('/cafe/:id', async (req, res) => {
    const { id } = req.params;
    const { name, gia, soluong } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('UPDATE cafe SET name = ?, gia = ?, soluong = ? WHERE id = ?', [name, gia, soluong, id]);
        connection.release();
        res.status(200).end();
    } catch (error) {
        console.error('Error updating cafe:', error);
        res.status(500).json({ error: 'Error updating cafe' });
    }
});

//api delete
app.delete('/cafe/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM cafe WHERE id = ?', [id]);
        connection.release();
        res.status(200).end();
    } catch (error) {
        console.error('Error deleting cafe:', error);
        res.status(500).json({ error: 'Error deleting cafe' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
