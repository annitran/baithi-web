const controller = {};
const models = require('../models');

controller.index = async (req, res) => {
    let threads = await models.Thread.findAll({
        attributes: ['id', 'content', 'mediaUrl', 'createdAt'],
        include: [{
            model: models.User,
            attributes: ['username']
        }, {
            model: models.Like,
            attributes: ['threadId']
        }, {
            model: models.Comment,
            attributes: ['threadId']
        }],
        order: [['createdAt', 'DESC']],
        limit: 5
    });

    res.locals.threads = threads;
    res.render('index');
}

controller.postThread = async (req, res) => {
    try
    {
        let userId = (23880048 % 10) + 1;;
        let { content } = req.body;
        let mediaUrl = "/assets/images/sample.jpg";

        await models.Thread.create({
            userId: userId,
            content: content,
            mediaUrl: mediaUrl
        }); 
    
        res.redirect('/');
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send("Opps, can not post content!")
    }
}

module.exports = controller;