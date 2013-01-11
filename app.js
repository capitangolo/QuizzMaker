/**
 * Module dependencies.
 */
var base = require('./base'),
    app = base.app;

// We load routes after the middleware, obiously
var routes = require('./routes')(app, base);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
