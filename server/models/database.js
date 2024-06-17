const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcrypt');

const initDB = async () => {
        const db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });
  
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS memes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS captions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS meme_captions (
        meme_id INTEGER,
        caption_id INTEGER,
        FOREIGN KEY (meme_id) REFERENCES memes(id),
        FOREIGN KEY (caption_id) REFERENCES captions(id)
      );
  
      CREATE TABLE IF NOT EXISTS rounds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        meme_id INTEGER,
        selected_caption_id INTEGER,
        points INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (meme_id) REFERENCES memes(id),
        FOREIGN KEY (selected_caption_id) REFERENCES captions(id)
      );
    `);
  
    // Insert initial data
    await db.run(`INSERT INTO users (username, password) VALUES ('user1', '${await bcrypt.hash('password1', 10)}')`);
    await db.run(`INSERT INTO users (username, password) VALUES ('user2', '${await bcrypt.hash('password2', 10)}')`);
    await db.run(`INSERT INTO memes (url) VALUES ('https://i.kym-cdn.com/entries/icons/original/000/050/148/moass.jpg')`);
    await db.run(`INSERT INTO memes (url) VALUES ('https://i.kym-cdn.com/entries/icons/original/000/026/217/thumb.png')`);
    await db.run(`INSERT INTO captions (text) VALUES ('Caption 1')`);
    await db.run(`INSERT INTO captions (text) VALUES ('Caption 2')`);
    await db.run(`INSERT INTO captions (text) VALUES ('Caption 3')`);
    await db.run(`INSERT INTO meme_captions (meme_id, caption_id) VALUES (1, 1)`);
    await db.run(`INSERT INTO meme_captions (meme_id, caption_id) VALUES (1, 2)`);
    await db.run(`INSERT INTO meme_captions (meme_id, caption_id) VALUES (2, 3)`);
  
    return db;
  };
  