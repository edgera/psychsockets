var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  // super lazy session variables. (use a real session library in future)
  socket.circle_count = 0;
  socket.circles = [];
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('background click',  function(msg){
    if (socket.circle_count < 3){
        console.log('adding a circle@'+[msg.x, msg.y]+' to the existing ' + socket.circle_count);
        
        socket.circle_count = socket.circle_count+1;   
        socket.circles.push([msg.x, msg.y])
        socket.emit('create circle', {x:msg.x, y:msg.y})
    }else{
        console.log('circle count at max');
    }    
  });
  
  
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});