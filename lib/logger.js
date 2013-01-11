module.exports = function(enabled){
  return function(req, res, next){
    if (enabled) {
      console.log("-> " + req.method + ": " + req.url);
    }

    next();
  }
}
