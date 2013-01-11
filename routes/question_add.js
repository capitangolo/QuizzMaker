var base = require('../base');
module.exports = function(app, base){
  app.get('/quizz/1/add', function(req, res){

    var args = {};
    res.render('question_add.ejs', args);

  });
}
