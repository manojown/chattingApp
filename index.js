var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
   
    fs = require('fs');

// index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, username) {
    // When the username is received it’s stored as a session variable and informs the other people
    socket.on('new_client', function(username) {
       //to save usernme for perticular user
        socket.username = username;
        socket.broadcast.emit('new_client', username);
    });
    socket.on('typing', function(username) {

        socket.broadcast.emit('showType',{u :{username: socket.username, message: 'is Typing'}});
       
     });
    // When a message is received, the client’s username is retrieved and sent to the other people
    socket.on('message', function (message) {
        //message = ent.encode(message);
        socket.broadcast.emit('message',{u :{username: socket.username, message: message}});
        
    }); 
});

server.listen(8080);