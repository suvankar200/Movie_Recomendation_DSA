import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const db = new Database(join(__dirname, '../movies.db'));

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Initialize database
db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Get comments for a movie
app.get('/api/comments/:movieId', (req, res) => {
    const { movieId } = req.params;
    const comments = db.prepare('SELECT * FROM comments WHERE movie_id = ? ORDER BY timestamp DESC').all(movieId);
    res.json(comments);
});

// Add a new comment
app.post('/api/comments', (req, res) => {
    const { movieId, comment } = req.body;
    
    try {
        const stmt = db.prepare('INSERT INTO comments (movie_id, text) VALUES (?, ?)');
        const result = stmt.run(movieId, comment);
        res.json({ id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});