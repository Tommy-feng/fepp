/**
 * app.js
 * express�������ļ�
 * Created by zheqi on 2016/1/18.
 */

'use strict';

/**
 * ��������
 */
var express     = require('express'),
    app         = express(),
    path        = require('path'),
    fs          = require('fs'),
    config      = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));

/**
 * �������л���
 */
app.set('env', app.get('env') || 'development');

/**
 * �������ݿ�
 */
require('./lib/database')(app.get('env'));


module.exports = app;