module.exports = function(app, base){
  this.base = app.base;
  this.questions = base.questions;

  app.post('/quizz/1/add', function(req, res){

    var statement = req.param("statement");
    var answers = [
        {text: req.param("answer1"), solution: req.param("answer1sol")}
      , {text: req.param("answer2"), solution: req.param("answer2sol")}
      , {text: req.param("answer3"), solution: req.param("answer3sol")}
      , {text: req.param("answer4"), solution: req.param("answer4sol")}
    ];

    questions.saveQuestion(statement, answers, function(error){
      res.write("OK<br/>");
      res.write("Error?: " + error);
      res.end();
    });

  });
}
