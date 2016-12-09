/**
 * Created by vadim on 09.12.2016.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');
var app = express();


var connect =  "postrgres://vadim:1111@localhost/rulesmovdb";

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {

    pg.connect(connect, function(err, client, done){
        if(err){
            return console.log('error fetching client from pool', err);
        }
        client.query('SELECT * FROM reports', function(err, result){
            if(err){
                return console.error('error running query', err);

            }
            res.render('index', {reports: result.rows});
            done();
        });
    });
});

app.listen(3000, function () {
    console.log('server start on port 3000');
});
