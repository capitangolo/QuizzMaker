var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).sort().forEach(function(file) {
        if (file == "index.js") return;
        if (file.split('.')[1] != "js") return;
        console.log("Loading routes from " + file);
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}
