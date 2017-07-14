
let http = require('http');
let url = require('url');
let topic = require('./topic');

http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url, true);
  if(pathname === "/api/data") {
      if (req.method === "GET") {
        let dataStr = ''; //数据拼接字符串
        Object.keys(query.data).forEach(item => {
          dataStr += item + '=' + query.data[key] + '&';
        });
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(dataStr);
      } else if (req.method === "POST") {
          res.setHeader('content-type', 'application/json;charset=utf-8');
          res.end(JSON.stringify(query.data));
      } else {
          res.statusCode = 404;
          res.end('not found');
      }
  }

}).listen(4000);
