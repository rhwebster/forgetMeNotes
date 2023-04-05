const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { Task, User, List, Tag, TaggedTask } = require('../db/models');
const { asyncHandler } = require('./utils');
const path = require('path');

router.get('/', asyncHandler(async (req, res, next) => {
    if (req.session.auth) {
        const userId = req.session.auth.userId;
        const list = await List.findOne({ where: { name: "Inbox", userId } });
        const lists = await List.findAll({ where: { userId } });
        const tasks = await Task.findAll({ where: { userId, listId: list.id }, });
        const tags = await Tag.findAll();
        let pageName = 'index';
        res.render('index', { title: "Forget Me Notes Home", tasks, tags, lists, pageName });
    } else {
        res.redirect('/users/login');
    }
}));

router.get('/images/logo', asyncHandler(async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../images/fmnlogo1.png'));
}));

router.get('/images/rtm', asyncHandler(async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../images/rtm_screenshot.png'));
}));

module.exports = router;