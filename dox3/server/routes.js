import express from 'express';
import db from './database.js';

const router = express.Router();

// Create a new story
router.post('/stories', (req, res) => {
  const { title, content } = req.body;
  const stmt = db.prepare('INSERT INTO stories (title, content) VALUES (?, ?)');
  const info = stmt.run(title, content);
  res.json({ id: info.lastInsertRowid });
});

// Read all stories
router.get('/stories', (req, res) => {
  const stmt = db.prepare('SELECT * FROM stories');
  const stories = stmt.all();
  res.json({ stories });
});

// Read a single story by ID
router.get('/stories/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('SELECT * FROM stories WHERE id = ?');
  const story = stmt.get(id);
  res.json({ story });
});

// Update a story by ID
router.put('/stories/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const stmt = db.prepare('UPDATE stories SET title = ?, content = ? WHERE id = ?');
  const info = stmt.run(title, content, id);
  res.json({ changes: info.changes });
});

// Delete a story by ID
router.delete('/stories/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM stories WHERE id = ?');
  const info = stmt.run(id);
  res.json({ changes: info.changes });
});

export default router;
