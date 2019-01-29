'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

var upload = multer({dest: 'uploads/'});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res,) => {
           if(!req.file){
             res.send('Error - no input file')
           }
           else{
             res.json({
               "name": req.file.originalname,
               "type": req.file.mimetype,
               "size": req.file.size
             })
           } 
         })

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
