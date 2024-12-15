const controller = {};
const { th } = require('@faker-js/faker');
const models = require('../models');

controller.threadDetail = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    let thread = await models.Thread.findByPk(id, {
        attributes: ["id", "content", "mediaUrl"],
        include: [{
            model: models.User,
            attributes: ['username']
        }, {
            model: models.Like,
            attributes: ['threadId']
        }, {
            model: models.Comment,
            attributes: ['content'],
            include: [{
                model: models.User,
                attributes: ['username']
        }],
        order: [['createdAt', 'DESC']],
        }],
    });

    res.locals.thread = thread;
    res.render('thread');
}

controller.addComment = async (req, res) => {
    try
    {
        let threadId = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
        let userId = (23880049 % 10) + 1;;
        let { content } = req.body;

        await models.Comment.create({
            userId: userId,
            threadId: threadId,
            content: content
        }); 
    
        res.redirect(`/thread/${threadId}`);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send("Opps, can not post content!")
    }
}

module.exports = controller;