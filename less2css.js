var http = require('http'),
    less = require('less'),
    fs = require('fs'),// 加载File System读写模块
    iconv = require('iconv-lite');// 加载编码转换模块
http.createServer(function (req, res) {
    var cssPath = req.url;
    console.log(cssPath);
    var lessPath = cssPath.substr(1, cssPath.length).replace(".css", ".less");
    console.log(lessPath);
    fs.readFile(lessPath, function (err, data) {
        if (err) {
            console.log("Read file fail.\n" + err);
            res.end(" ");
        }
        else {
            // 读取成功时
            var str = iconv.decode(data, 'utf-8');
            less.render(str, function (err, css) {
                if (err) {
                    console.log("Convert less to css fail.\n" + err);
                    res.end(" ");
                } else {
                    console.log(css.css);
                    res.end(css.css);
                }
            });
        }
    });
}).listen(1337, "127.0.0.1");
