var base = require('../base');
module.exports = function(app){
  app.get('/', function(req, res){

    var args = {};
    res.render('index.ejs', args);

  });
}
