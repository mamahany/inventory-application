const pool = require('./pool');

async function getAllLanguages(){
    const {rows} = await pool.query('SELECT * FROM languages');
    return rows;
}

async function getLanguageById(id) {
    const {rows} = await pool.query(`SELECT 
        languages.id,
        languages.name,
        languages.first_release,
        languages.paradigm,
        languages.author_id,
        authors.name AS author_name
     FROM languages
         LEFT JOIN authors ON languages.author_id = authors.id WHERE languages.id = $1`, [id]);
    return rows[0];
}

async function addLanguage(name, first_release, paradigm, author_id) {
    await pool.query(`INSERT INTO languages (name, first_release, paradigm, author_id) VALUES
            ($1, $2, $3, $4)`, [name, first_release, paradigm || null, author_id || null]);
}

async function updateLanguage(id, name, first_release, paradigm, author_id) {
    await pool.query(`UPDATE languages SET name = $1, first_release = $2, paradigm = $3, author_id = $4 WHERE id = $5`, [name, first_release, paradigm || null, author_id || null, id]);
}

async function deleteLanguage(id) {
    await pool.query('DELETE FROM languages WHERE id = $1', [id]);
}

async function getAuthors(){
    const {rows} = await pool.query('SELECT * FROM authors ORDER BY name ASC');
    return rows;
}

async function getAuthorById(id) {
    const {rows} = await pool.query('SELECT * FROM authors WHERE authors.id = $1', [id])
    return rows[0];
}

async function addAuthor(name) {
    await pool.query(`INSERT INTO authors (name) VALUES($1)`, [name]);
}

async function updateAuthor(id, name) {
    await pool.query(`UPDATE authors SET name = $1 WHERE id = $2`, [name, id]);
}

async function deleteAuthor(id) {
    await pool.query('DELETE FROM authors WHERE id = $1', [id]);
}

async function getAllFrameworks(){
    const {rows} = await pool.query('SELECT * FROM frameworks');
    return rows;
}

async function addFramework(name, release_year, description, author_id, language_id) {
    await pool.query(`INSERT INTO frameworks (name, release_year, description, author_id, language_id) VALUES
            ($1, $2, $3, $4, $5)`, [name, release_year, description || null, author_id || null, language_id]);
}

async function getFrameworkById(id) {
    const {rows} = await pool.query(`SELECT 
        frameworks.id,
        frameworks.name,
        frameworks.release_year,
        frameworks.description,
        frameworks.author_id,
        frameworks.language_id,
        authors.name AS author_name,
        languages.name AS language_name
     FROM frameworks
         LEFT JOIN authors ON frameworks.author_id = authors.id
         LEFT JOIN languages ON frameworks.language_id = languages.id
          WHERE frameworks.id = $1`, [id]);
    return rows[0];
}

async function deleteFramework(id) {
    await pool.query('DELETE FROM frameworks WHERE id = $1', [id]);
}

async function updateFramework(id, name, release_year, description, author_id, language_id) {
    await pool.query(`UPDATE frameworks SET name = $1, release_year = $2, description = $3, author_id = $4, language_id = $5 WHERE id = $6`, [name, release_year, description || null, author_id || null, language_id || null, id]);
}

module.exports = {
    getAllLanguages,
    getLanguageById,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    getAuthors,
    addAuthor,
    getAuthorById,
    deleteAuthor,
    updateAuthor,
    getAllFrameworks,
    addFramework,
    getFrameworkById,
    deleteFramework,
    updateFramework
}