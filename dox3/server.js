// server.js
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
const app = express();
const port = 3000;

// Initialize SQLite database
const db = new Database('my-database.db');

// Create a table
db.exec('CREATE TABLE IF NOT EXISTS stories (id INTEGER PRIMARY KEY, text TEXT, completed BOOLEAN)');

app.use(cors());

app.use(express.json());

// Get all todos
app.get('/api/stories', (req, res) => {
  const todos = db.prepare('SELECT * FROM stories').all();
  res.json(stories);
});

// Add a new todo
app.post('/api/stories', (req, res) => {
  const { text, completed } = req.body;
  const info = db.prepare('INSERT INTO stories (text, completed) VALUES (?, ?)').run(text, completed);
  res.json({ id: info.lastInsertRowid, text, completed });
});

// Delete a todo
app.delete('/api/stories/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM stories WHERE id = ?').run(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});