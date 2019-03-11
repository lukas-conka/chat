var net = require('net');
var connections = [];

var broadcast = (message, origin)=>{
  connections.forEach((connection)=> {
      if(connection === origin) return;
      connection.write(message);
  });  
};

net.createServer((connection) =>{
    connections.push(connection);
    connection.write('Oi, eu sou o server.');

    connection.on('data', (message) => {
        var command = message.toString();
        if(command.indexOf('/nickname') === 0){
            var nickname = command.replace('/nickname', '');
            broadcast(connection.nickname + 'Agora é ' + nickname);
            //console.log(nickname);
            connection.nickname = nickname;
            return;
        }
        broadcast(connection.nickname + ' > ' + message, connection);
    });
    connection.on('end', ()=>{
        broadcast(connection.nickname + ' has left!', connection);
        connections.splice(connections.indexOf(connection), 1);
    })
    
}).listen(5000, ()=>{
    console.log('Servidor ok');
});