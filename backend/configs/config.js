module.exports = {
    MONGO_URL: "mongodb://mongo:27017/ToDoList" || process.env.MONGO_URL,
    JWT: {
        secret: "secretTODOList@123" || process.env.JWTSecret,
        expire: 604800
    }
}