/**
 * server.js
 * 配置系统环境
 * Created by zheqi on 2016/1/18.
 */

'use strict';

var init    = require('./backend/lib/init')(),
    fs      = require('fs'),
    express = require('express'),
    app     = require('./backend/app'),
    path    = require('path'),
    logger  = require('morgan'),
    config  = JSON.parse(fs.readFileSync(path.join(__dirname, './config/config.json'), 'utf8'));


/**
 * 判断运行环境，默认是development
 */
if (app.get('env') == 'development') {
    app.use(logger('dev'));
    app.set('host', config.development.host);
    app.set('port', config.development.port);
    app.use(express.static(path.join(__dirname, '../')));
    app.use(express.static(path.join(__dirname, './tep')));
    app.use(express.static(path.join(__dirname, './frontend')));

    app.all('/*', function(req, res){
        res.sendFile(path.join(__dirname, './frontend/index.html'));
    })

} else {
    app.set('host', config.production.host);
    app.set('port', config.production.port);
    app.use(express.static(path.join(__dirname, './frontend')));

    app.all('/*', function(req, res){
        res.sendFile(path.join(__dirname, './frontend/index.html'));
    });
}

/**
 * 监听端口
 */
app.listen(app.get('port'), app.get('host'), function(){
    console.log('Server in ' + app.get('env') + ' environment running at ' + app.get('host') + ': ' + app.get('port'));
});

