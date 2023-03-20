var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin","*");
    //允许的header类型
    response.setHeader("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    response.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    response.writeHead(200, {'Content-Type': 'application/json'});
    //设置允许跨域的域名，*代表允许任意域名跨域

    //var paraObj = url.parse(request.url,true)
    //console.log(paraObj.query.value)

    var data = JSON.parse(fs.readFileSync('data.json'))
    //data.param = paraObj
    console.log(data)
    response.end(JSON.stringify(data))
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/data');
