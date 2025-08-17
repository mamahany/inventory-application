const { Client } = require('pg');

const SQL = `CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS languages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR ( 50 ) NOT NULL UNIQUE,
   first_release INT,
   paradigm VARCHAR(100),
   author_id INT REFERENCES authors(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS frameworks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL UNIQUE,
    release_year INT,
    description TEXT,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(id) ON DELETE SET NULL
);
INSERT INTO authors (name) VALUES
('Brendan Eich'),
('Guido van Rossum'),
('Meta')
ON CONFLICT DO NOTHING;


INSERT INTO languages (name, first_release, paradigm, author_id) VALUES
('JavaScript', 1995, 'Multi-paradigm', 1),
('Python', 1991, 'Multi-paradigm', 2)
ON CONFLICT DO NOTHING;


INSERT INTO frameworks (name, release_year, description, language_id, author_id) VALUES
('React', 2013, 'Frontend UI library', 1, 3),
('Django', 2005, 'High-level web framework', 2, NULL),
('Express', 2010, 'Web framework for Node.js', 1, NULL)
ON CONFLICT DO NOTHING;
`
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