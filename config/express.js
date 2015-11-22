var config = require('./config'),
    http = require('http'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);
    
    

module.exports = function(db) {
    var app = express();
    var server = http.createServer(app);
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
    
    var mongoStore = new MongoStore({
        db: db.connection.db
    });
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/review.server.route.js')(app);
    
    app.use('/public', express.static('/home/ubuntu/workspace/public'));
    app.use('/node_modules', express.static('/home/ubuntu/workspace/node_modules'));
    
    return server;
};