module.exports = function(base) {
  this.base = base;
  this.redis = base.redisClient;

  return {
      generateId: generateId
    , saveQuestion: saveQuestion
    , listQuestions: listQuestions
    , getQuestion: getQuestion
  }
};

function generateId(callback) {
  redis.incr("ids:questions", function(error, newid) {
    callback(error, newid);
  });
}

function saveQuestion(statement, answers, callback) {
  var id = generateId(function(error, newid) {
    if (error) callback(error);

    var question = {
        "id": newid
      , "statement": statement
    };
    var solutions = new Array();

    for (index in answers) {
      var answer = answers[index];
      question["answer_" + index] = answer["text"];
      if (answer["solution"]) {
        solutions.push(index);
      }
    }

    question["solution"] = solutions.join();

    var quizzid = 1;
    redis.hmset("quizz:" + quizzid + ":question:" + newid, question);
    redis.sadd("quizz:" + quizzid + ":questions", newid);

    callback(error);
  });
}

function listQuestions(quizzid, callback) {
  redis.smembers("quizz:" + quizzid + ":questions", function (error, data) {
    if (error) {
      callback(error, null);
    }

    var commands = new Array();
    data.forEach(function(questionid) {
      commands.push(["hgetall","quizz:" + quizzid + ":question:" + questionid]);
    })

    redis.multi(commands).exec(function(errors, datas) {
      if (errors) {
        callback(errors, null);
      }

      callback(null, datas);
    })
  });
}

function getQuestion(quizzid, questionid, callback) {
  redis.hgetall("quizz:" + quizzid + ":question:" + questionid, function (error, data) {
    if (error) {
      callback(error, null);
    }

    callback(null, data);
  });
}
