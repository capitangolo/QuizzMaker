module.exports = function(app, base){
  this.base = app.base;
  this.questions = base.questions;

  app.get('/quizz/:quizzid/question/:questionid', function(req, res){

    var quizzid = req.param("quizzid");
    var questionid = req.param("questionid");

    questions.getQuestion(quizzid, questionid, function(error, question){
      var args = {
        question: question
      }
console.log(question);
      res.render('question.ejs', args);
    });

  });
}
