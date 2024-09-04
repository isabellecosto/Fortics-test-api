import database from "../database.js"

database.run(`
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        comment TEXT NOT NULL,
        date TEXT NOT NULL
    )
`);

