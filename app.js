const http = require('http');

http.createServer(function (req, res) {
    res.write("Web service...coming right up!");
    res.end();
}).listen(3000);

console.log("Server started on port 3000");

