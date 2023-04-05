const express = require("express");

const router = express.Router();
const db = require("../db/models");
const { List, Tag } = require("../db/models");
const { check, validationResult } = require("express-validator");
const { asyncHandler } = require("../routes/utils");
const { requireAuth } = require("../auth");

router.get(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
        const { userId } = req.session.auth;
        const lists = await db.List.findAll({
            where: {
                userId,
            },
        });
        res.json({ lists });
    })
);
const listValidator = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for list name")
        .isLength({ max: 20 })
        .withMessage("List name must not be more than 20 characters long"),
];
router.post(
    "/",
    requireAuth,
    listValidator,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const { userId } = req.session.auth;
        const listFoundInDB = await db.List.findOne({ where: { name, userId } });
        let list;
        if (!listFoundInDB) {
            list = db.List.build({
                name,
                userId,
            });
        }

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty() && !listFoundInDB) {
            await list.save();
            const lists = await db.List.findAll({
                where: {
                    userId,
                },
            });
            res.json({ lists });
        } else {
            let errors = validatorErrors.array().map((error) => error.msg);
            if (listFoundInDB)
                errors.push(
                    `List already exists for ${req.session.auth.userFirstName}`
                );
            res.status(400).json({ errors });
        }
    })
);

router.get(
    "/inbox",
    asyncHandler(async (req, res) => {
        const list = await db.List.findOne({
            where: {
                userId: req.session.auth.userId,
                name: "Inbox",
            },
        });
        res.json({ list });
    })
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const listId = req.params.id;
        const tasks = await db.Task.findAll({
            where: { listId },
            include: [
                List,
                {
                    model: Tag,
                    as: "TasksWithTags",
                },
            ],
        });
        res.json({ tasks });
    })
);

router.delete(
    "/:id",
    requireAuth,
    // csrfProtection,
    // tagValidator,
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.session.auth;
        const list = await db.List.findOne({
            where: {
                id,
                userId,
            },
        });
        try {
            await list.destroy();
            res.json({ id });
        } catch (e) {
            res.status(400).json(e);
        }
    })
);

module.exports = router;