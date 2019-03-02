const express = require('express');
const router = express.Router();
const todoCont = require('../controllers/todoList');

router.get("/", async (req, res, next) => {
    try {
        var op = await todoCont.get(req.user);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

router.post("/", async (req, res, next) => {
    try {
        console.log("body: ", req.body);
        var op = await todoCont.create(req.body.newList, req.user);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

router.post("/update", async (req, res, next) => {
    try {
        console.log("body: ", req.body);
        var op = await todoCont.update(req.body.updatedList, req.user);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

router.post("/remove", async (req, res, next) => {
    try {
        console.log("body: ", req.body);
        var op = await todoCont.remove(req.body.id, req.user);
        res.status(200).send(op);
    } catch (ex) {
        console.log(ex);
        res.status(400).send(ex);
    }
});

module.exports = router;