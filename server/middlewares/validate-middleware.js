const express = require("express");

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        //console.log(err);
        const status = 422;
        const message = "Input Valid Data";
        const extraDetails = err.errors[0].message;
        //console.log(message);

        const error={
            status,
            message,
            extraDetails,
        };
        //res.status(400).json({msg: message});
        next(error);
    }
}

const validateLogin = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        //console.log(err);
        const status = 422;
        const message = "Input Valid Login Data";
        const extraDetails = err.errors[0].message;
        //console.log(message);

        const error={
            status,
            message,
            extraDetails,
        };
        //res.status(400).json({msg: message});
        next(error);
    }
}

module.exports = {validate, validateLogin};