import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('./stories.db');
const db = new Database(dbPath);

// Create the stories table
db.exec(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )
`);

export default db;
