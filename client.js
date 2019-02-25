var net = require('net');

var client = net.connect(5000);
client.on('connect', ()=>{
    client.write('Oi, eu sou o CLIENTE');
})

client.on('data', (message)=>{
    console.log(message.toString());
});

process.stdin.on('readable', ()=>{
    var message = process.stdin.read();
    if (!message) return;
    message = message.toString().replace(/\n/, '');
    client.write(message);
});