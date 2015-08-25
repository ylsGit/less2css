var http = require('http'),
    less = require('less'),
    fs = require('fs'),// ����File System��дģ��
    iconv = require('iconv-lite');// ���ر���ת��ģ��
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
            // ��ȡ�ɹ�ʱ
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
