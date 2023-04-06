const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser, requireAuth } = require('../auth');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', csrfProtection, (req, res) => {
    res.render("log-in", {
        title: "Login",
        csrfToken: req.csrfToken(),
    });
});

router.get('/lists', csrfProtection, (req, res) => {
    res.render("lists", {
        title: "Lists",
        csrfToken: req.csrfToken(),
    });
});

const userValidators = [
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for First Name")
        .isLength({ max: 30 })
        .withMessage("First Name must not be more than 30 characters long"),
    check("lastName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Last Name")
        .isLength({ max: 30 })
        .withMessage("Last Name must not be more than 30 characters long"),
    check("email")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Email Address")
        .isLength({ max: 50 })
        .withMessage("Email Address must not be more than 50 characters long")
        .isEmail()
        .withMessage("Email Address is not a valid email")
        .custom((value) => {
            return db.User.findOne({ where: { email: value } }).then((user) => {
                if (user) {
                    return Promise.reject(
                        "The provided Email Address is already in use by another account"
                    );
                }
            });
        }),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Password")
        .isLength({ min: 6, max: 50 })
        .withMessage(
            "Password must not be more than 50 characters long and have at least 6 characters"
        ),
    check("confirmPassword")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a value for Confirm Password")
        .isLength({ min: 6, max: 50 })
        .withMessage(
            "Password must not be more than 50 characters long and have at least 6 characters"
        )
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Password does not match Password");
            }
            return true;
        }),  
];

