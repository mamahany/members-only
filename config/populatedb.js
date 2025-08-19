const {Client} = require('pg');

const SQL = `CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255),
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
is_member BOOLEAN DEFAULT FALSE,
is_admin BOOLEAN DEFAULT FALSE);

CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);`
const dbUrl = process.argv[2];

if (!dbUrl) {
  console.error("Please provide a database URL");
  process.exit(1);
}
async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: dbUrl,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();