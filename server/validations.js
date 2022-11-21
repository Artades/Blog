import {body} from 'express-validator';


export const loginValidation = [
    body('email', "Invalid type of email").isEmail(),
    body('password', "Invalid data").isLength({min: 5}),
]


export const registerValidation = [
    body('email', "Invalid type of email").isEmail(),
    body('password', "Invalid data").isLength({min: 5}),
    body('fullName', "Invalid format of name").isLength({min: 3}),
    body('avatarUrl', "Invalid link").optional().isURL(),
];

export const postCreateValidation =  [
    body('title', "Enter title").isLength({min: 3}).isString(),
    body('text', "Enter text").isLength({min: 10}).isString(),
    body('tags', "Enter the tags").optional().isArray(),
    body('imageUrl', "Invalid link").optional().isString(),
];

