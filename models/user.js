const pool = require('../config/pool');

const getUserByEmail = async(email)=>{
    const {rows} = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return rows[0];
}
const addUser = async (first_name, last_name, email, password)=>{
    await pool.query(`INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, password])
}

const addUserToCommunity = async (id)=>{
    await pool.query('UPDATE users SET is_member = true WHERE users.id = $1', [id])
}

const addAdmin = async(id)=>{
    await pool.query('UPDATE users SET is_admin = true WHERE users.id = $1', [id])
}
module.exports = {
    addUser,
    addUserToCommunity,
    addAdmin,
    getUserByEmail
}