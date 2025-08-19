const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

const validateMessage = [
    body('title').trim().notEmpty().withMessage("Title is required")
    .isLength({min:1, max:150}).withMessage('Title must be between 1 and 150 characters'),

    body('content').trim().notEmpty().withMessage("Content is required")
    .isLength({min:1, max:500}).withMessage('Content must be between 1 and 500 characters')
]

const getAllMessages = async (req, res)=>{
    const messages = await Message.getAllMessages();
    res.render('index', {messages})
}

const addMessageGet = async (req, res)=>{
    res.render('form/postMsgForm');
}

const addMessagePost = [
    validateMessage,
    async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('form/postMsgForm', {errors:errors.array()})
        }
        const id = req.user.id;
        const {title, content} = req.body;
        await Message.addMessage(title, content, id);
        res.redirect('/');
    }
]

const deleteMessage = async (req, res)=>{
    const {id} = req.params;
    await Message.deleteMessage(id);
    res.redirect('/');
}
module.exports = {
    getAllMessages,
    addMessageGet,
    addMessagePost,
    deleteMessage
}