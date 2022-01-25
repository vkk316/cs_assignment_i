var net = require("net");

var HOST = "127.0.0.1";
var PORT = 6969;

var ans = Math.floor(Math.random() * 100);

db = []

net.createServer(function (sock) {
    //state mapping
    // 0: greating
    // 1: mining
    // 2: someone hit
    // 3: announced

    var state = 0 //idle
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    sock.on("data", function (data) {
      switch(state){
        case 0:
            if(data.toString().startsWith('I am')){
                sock.write(data.toString().slice(5))
                //register here
                create(sock, data.toString().slice(5))
                console.log(db.length)
                sock.write("here you go, "+data.toString().slice(5))
                state = 1
            }
            break
        case 1:
            if (data.toString() == ans.toString()) {
              sock.write("yes")
            }
            else{
              sock.write("noop")
            }
            break         
    }
    });

    sock.on("close", function (data) {
      console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
    });

    sock.on("error", function (err) {
      remove(sock.remotePort)
      sock.destroy(); //terminated
    });
  })
  .listen(PORT, HOST);

console.log("Server listening on " + HOST + ":" + PORT);

//model
//{
//  id: Socket.remotePort
//  name: String
//  sock: Socket
//  score: Int
//}
function create(socket, name){
  newData = {
    "id": socket.remotePort,
    "name": name,
    "sock": socket,
    "score": 0
  }
  db.push(newData)
}

function updateScore(sockID) {
  let temp = objs.find(x => x.id === sockID)
  Object.assign(temp, {"score": temp["score"] + 1})
  remove(sockID) // order does not matter
  db.push(temp)
}

function remove(sockID){
  //some search for remove object
  db = db.filter(item => item["id"] !== sockID)
}