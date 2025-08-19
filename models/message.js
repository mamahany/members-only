const pool = require('../config/pool');

const getAllMessages = async ()=>{
    const {rows} = await pool.query(`
        SELECT messages.id, title, content, created_at,
        author_id, first_name, last_name
        FROM messages
        LEFT JOIN users ON messages.author_id = users.id
        ORDER BY created_at DESC
        `);
    return rows;
}

const addMessage = async (title, content, author_id)=>{
    await pool.query(`INSERT INTO messages (title, content, author_id)
         VALUES ($1, $2, $3)`, [title, content, author_id])
}

const deleteMessage = async(id)=>{
    await pool.query('DELETE FROM messages WHERE id = $1', [id])
}

module.exports = {
    getAllMessages,
    addMessage,
    deleteMessage
}