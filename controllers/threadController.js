const controller = {};
const models = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

controller.index = async (req, res) => {
    let threads = await models.Thread.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }, {
            model: models.Like,
            attributes: []
        }, {
            model: models.Comment,
            attributes: []
        }],
        attributes: ['id', 'content', 'mediaUrl', 'createdAt',
            [sequelize.literal('(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id")'), 'totalLikes'],
            [sequelize.literal('(SELECT COUNT(*) FROM "Comments" WHERE "Comments"."threadId" = "Thread"."id")'), 'totalComments']
        ],
        order: [['createdAt', 'DESC']],
        limit: 5
    });

    res.locals.threads = threads.map(thread => ({
        ...thread.dataValues, // Sao chép tất cả các thuộc tính gốc từ thread
        totalLikes: parseInt(thread.dataValues.totalLikes, 10) || 0, // Chuyển đổi thành số nguyên
        totalComments: parseInt(thread.dataValues.totalComments, 10) || 0
    }));

    res.render('index');
}

controller.profile = (req, res) => {
    res.render('profile');
}

controller.threadDetail = async (req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    
    let thread = await models.Thread.findOne({
        attributes: ["id", "content", "mediaUrl",
            [sequelize.literal('(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."threadId" = "Thread"."id")'), 'totalLikes'],
            [sequelize.literal('(SELECT COUNT(*) FROM "Comments" WHERE "Comments"."threadId" = "Thread"."id")'), 'totalComments']
        ],
        where: { id },
        include: [{
            model: models.User,
            attributes: ['username']
        }, {
            model: models.Like,
            attributes: []
        }, {
            model: models.Comment,
            attributes: []
        }],
    });

    let comments = await models.Comment.findAll({
        attributes: ['content'],
        where: { threadId: id },
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']],
    })

    res.locals.thread = {
        ...thread.dataValues,
        totalLikes: parseInt(thread.dataValues.totalLikes, 10) || 0,
        totalComments: parseInt(thread.dataValues.totalComments, 10) || 0
    };
    res.locals.comments = comments;

    res.render('thread');
}

module.exports = controller;