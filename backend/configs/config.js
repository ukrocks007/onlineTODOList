module.exports = {
    MONGO_URL: "mongodb://localhost:27017/ToDoList" || process.env.MONGO_URL,
    //Use "mongodb://mongo:27017/ToDoList" when using docker
    JWT: {
        secret: "secretTODOList@123" || process.env.JWTSecret,
        expire: 604800
    }
}