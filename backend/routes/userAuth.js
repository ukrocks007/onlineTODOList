const express = require('express');
const router = express.Router();
const userAuthCont = require('../controllers/userAuth');

router.post("/", async (req, res, next) => {
    try {
        console.log("body: ", req.body);
        var op = await userAuthCont.login(req.body.username, req.body.password);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

router.post("/create", async (req, res, next) => {
    try {
        console.log("body: ", req.body);
        var op = await userAuthCont.createUser(req.body.username, req.body.password);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

module.exports = router;