const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public/assets'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log('listening');
});
