var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
var myID = 0;
client.connect(PORT, HOST, function () {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected,
    //the server will receive it as message from the client 
    client.write("hi")
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function (data) {
    if(data.toString().startsWith("you're ")){
        console.log(''+data);
        myID = parseInt(data.toString().slice(7))
        client.write(Math.floor(Math.random() * 32) + "") // first trial
    }
    else if(data+"" == "noop"){
        client.write(Math.floor(Math.random() * 32) + "") // n trial
    }else if(data.toString().match(/^[0-9]+$/) != null){
        if(parseInt(data+"") == myID){
            console.log("YOU WIN")
        }else{
            console.log("YOU LOSE, THE WINNER IS "+data)
        }
        client.destroy()
    }else if(data.toString().startsWith("sorry")){
        console.log(''+data);
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
    console.log('Connection closed');
});