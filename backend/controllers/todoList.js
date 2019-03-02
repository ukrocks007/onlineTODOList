const ToDoList = require('../models/ToDoList');
const Users = require('../models/Users');

const create = async (newList, reqUser) => {
    try {
        let user = await Users.findOne({
            _id: reqUser._id
        });
        if (user) {
            let list = new ToDoList({
                title: newList.title ? newList.title : "",
                owner: user._id,
                list: newList.list ? (newList.list.length > 0 ? newList.list : []) : [],
            });
            list = await list.save();
            console.log(list);
            return {
                success: true,
                todo: list
            }
        }
    } catch (ex) {
        console.log(ex);
        return ex;
    }
}

const remove = async (id, reqUser) => {
    try {
        var op = await ToDoList.deleteOne({
            _id: id,
            owner: reqUser._id
        });
        return {
            success: true,
            op: op
        }
    } catch (ex) {
        console.log(ex);
        return ex;
    }
}

const update = async (updatedList, reqUser) => {
    try {
        if (updatedList._id) {
            var op = await ToDoList.updateOne({
                _id: updatedList._id
            }, {
                title: updatedList.title ? updatedList.title : "",
                list: updatedList.list ? (updatedList.list.length > 0 ? updatedList.list : []) : [],
            });
            return {
                success: true,
                op: op
            }
        } else {
            throw {
                message: "_id missing!"
            }
        }
    } catch (ex) {
        console.log(ex);
        return ex;
    }
}

const get = async (reqUser) => {
    try {
        let todos = await ToDoList.find({
            owner: reqUser._id
        });
        return {
            success: true,
            todo: todos
        }
    } catch (ex) {
        console.log(ex);
        return ex;
    }
}

module.exports = {
    create,
    remove,
    update,
    get,
}