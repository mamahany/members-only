const bcrypt = require('bcryptjs');

const generatePassword = async (password)=>{
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
}

const validatePassword = async (password, hashedPass)=>{
    const match = await bcrypt.compare(password, hashedPass);
    return match;
}

module.exports = {generatePassword, validatePassword};