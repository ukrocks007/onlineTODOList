//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ToDoList = require('../models/ToDoList');
let Users = require('../models/Users');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let testUser = {};

let token = "";

let newTodo = {
    "newList": {
        "title": "Cab service app",
        "list": [{
                "item": "Create customer app",
                "done": false,
                "timeStamp": "1551511762226"
            },
            {
                "item": "Create driver app",
                "done": false,
                "timeStamp": "1551511762239"
            },
            {
                "item": "Create admin app",
                "done": false,
                "timeStamp": "1551511762240"
            }
        ]
    }
};

let updatedTodo = {};

chai.use(chaiHttp);

describe('ToDoList', () => {

    //Creates test user
    before(async () => {
        await Users.deleteOne({
            email: "test1@gmail.com"
        });

        testUser = new Users({
            email: "test1@gmail.com",
            password: "qw"
        });

        testUser = await testUser.save();
    });

    //Login and save the token
    beforeEach((done) => {
        chai.request(server)
            .post('/auth/')
            .send({
                username: "test1@gmail.com",
                password: "qw"
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    //Create
    describe('/POST create todo', () => {
        it('it should create new todos', (done) => {
            chai.request(server)
                .post('/apis/todo/')
                .send(newTodo)
                .set('authorization', token)
                .end((err, res) => {
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });

    //Get
    describe('/GET get all todo', () => {
        it('it should GET all the todos', (done) => {
            chai.request(server)
                .get('/apis/todo/')
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.todo.length.should.be.eql(1);
                    updatedTodo = res.body.todo[0];
                    done();
                });
        });
    });

    //Update
    describe('/POST update todo', () => {
        it('it should update a todo list', (done) => {
            updatedTodo.list[0].done = true;
            chai.request(server)
                .post('/apis/todo/update')
                .send({
                    updatedList: updatedTodo
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.body.should.have.property('success').eql(true);
                    res.body.op.nModified.should.be.eql(1);
                    done();
                });
        });
    });

    //Remove
    describe('/POST delete todo', () => {
        it('it should delete todo list', (done) => {
            updatedTodo.list[0].done = true;
            chai.request(server)
                .post('/apis/todo/remove')
                .send({
                    id: updatedTodo._id
                })
                .set('authorization', token)
                .end((err, res) => {
                    res.body.should.have.property('success').eql(true);
                    res.body.op.deletedCount.should.be.eql(1);
                    done();
                });
        });
    });

    //CleanUp
    after(async () => {
        await ToDoList.deleteMany({
            owner: testUser._id
        });

        await Users.deleteOne({
            _id: testUser._id
        });
    });
});