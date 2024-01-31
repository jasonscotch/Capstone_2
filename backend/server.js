require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const { NotFoundError } = require("./expressError");

const app = express();
const port = +process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Set your ElephantSQL connection string
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test the database connection
pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connected to PostgreSQL database');
});


// API Routes
app.get('/chapter/:chapterId', async function(req, res, next) {
    const { chapterId } = req.params;
    try {
        const result = await pool.query(
            'SELECT s.* FROM stories s WHERE s.chapter_id = $1'
        , [chapterId]);
        return res.json(result.rows);
    } catch (err) {
        return next(err);
    }
});

app.get('/item/:chapterId', async function(req, res, next) {
    const { chapterId } = req.params;
    try {
        const result = await pool.query(
            'SELECT i.*, e.* FROM stories s LEFT JOIN story_item si ON s.chapter_id = si.chapter_id LEFT JOIN item i ON si.item_id = i.item_id LEFT JOIN effect e ON i.effect_id = e.effect_id WHERE s.chapter_id = $1'
        , [chapterId]);
        return res.json(result.rows);
    } catch (err) {
        return next(err);
    }
});

app.get('/enemy/:chapterId', async function(req, res, next) {
    const { chapterId } = req.params;
    try {
        const result = await pool.query(
            'SELECT m.* FROM stories s LEFT JOIN story_monster sm ON s.chapter_id = sm.chapter_id LEFT JOIN monster m ON sm.monster_id = m.monster_id WHERE s.chapter_id = $1'
        , [chapterId]);
        return res.json(result.rows);
    } catch (err) {
        return next(err);
    }
});




/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
