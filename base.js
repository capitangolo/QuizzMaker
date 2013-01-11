var express = require('express'),
    fs = require('fs'),
    redis_port = 6580,
    redis  = require('redis'),
    client = redis.createClient(redis_port),
    app = express.createServer(), //options),
    logger = require('./lib/logger.js'),
    RedisStore = require('connect-redis')(express)
    ;

// Configuration
app.configure(function(){

  // Logger
  app.use(logger(true));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('current_permission', 3);

  app.use(express.bodyParser());

  app.use(express.cookieParser());
  app.use(express.session({ secret: "foo bar bye", store: new RedisStore({client:client}) }));

  app.use(express.methodOverride())
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Date functions
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
}

Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.getCustomDate = function(){
    var day = this.getDate(),
        mon = this.getMonth() + 1;

    if (day.toString().length < 2){ day = "0" + day; }
    if (mon.toString().length < 2){  mon = "0" + mon; }
    return day + "-" + mon + "-" + this.getFullYear();
}

// Boolean functions
Boolean.parse = function(bool){
  return bool != 0 && bool != undefined && ( bool == 1 || bool == "1" || bool.toLowerCase() == "true" );
}

// base functions
exports.isEmpty = function (obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length && obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    return true;
}

exports.newClient = function() {
  return redis.createClient(redis_port);
}

exports.redisClient = client
exports.express = express
exports.app = app
