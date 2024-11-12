var express = require('express');
var cors = require('cors');
var app = express();



//var server = require('http').Server(app);
//const io = require('socket.io')(server);
var port = 3000;


const io = require('socket.io')(3000, {
    cors: {
        origin: "*",
    },
});




app.use(cors());
app.use(express.static(__dirname + 'public'));

/*
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/public/index.html');    
})

server = server.listen(port, function()
{
    console.log(`server now listening on port ${port}`);
});
*/

io.on('connection', (socket) =>
{
    console.log("new connection");




    socket.on('disconnect', function()
    {
        console.log('disconnected');        
    });

});


var counter = 0
var signal = 0;
setInterval(()=>{
    counter++;
    signal = Math.sin(counter / 100)
    console.log(`${counter} ${signal}`);
    io.emit("data", counter, signal);
}, 20);