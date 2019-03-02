var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
var config = require('./configs/config');
const router = require('./routes/index');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

mongoose.connect(
    config.MONGO_URL, {
        useNewUrlParser: true
    }
);

router.includeRoutes(app);

var server = app.listen(process.env.PORT || 80, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
})

module.exports = app;