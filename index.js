const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

function replaceKeys(obj, find, replace) {
  return Object.keys(obj).reduce (
    (acc, key) => Object.assign(acc, { [key.replace(find, replace)]: obj[key] }), {});
}

app.get('/', function(req, res){
  res.sendfile('index2.html');
});

var users = []

io.on('connection', function(socket){

//  let info  = {}
  let init  = false

  console.log('a user connected ' + socket.id)

  socket.on('map', function(data) {

     console.log('msg from frontend: ' + data.magic)

     if ( data.magic == "Hello" ) {

        let info = {email: data.email, id: socket.id}

        let user = users.find(x => x.email === info.email)

        if (typeof user === 'undefined') {

           // insert new user info 
           users.push(info)

        } else {

           //find the index of object from array that you want to update
           const objIndex = users.findIndex(obj => obj.email === info.email);

           // make new object of updated object.   
           const updatedObj = { ...users[objIndex], id: info.id};

          // make final new array of objects by combining updated object.
          const updatedUsers = [
             ...users.slice(0, objIndex),
             updatedObj,
             ...users.slice(objIndex + 1),
          ];

          // update users array
          users = updatedUsers;
        }
     }
     console.dir(users,{depth:null}) 
 /* 
     if (init == false) {
        init = true
        var interval = setInterval(function () {
	     io.to(socket.id).emit('ping', 'Your ID is: ' + socket.id);
        }, 1000)
     }
  */
  })
 
  socket.on('click', function(data) {

     let info = {email: data.email, id: socket.id}

     let user = users.find(x => x.email === info.email)

     if (typeof user !== 'undefined') {
        io.to(user.id).emit('ping', 'map clicked to marker: ' + user.email)
        console.log('ping', 'map clicked to marker: ' + user.email)
     } else {
        io.emit('ping', 'broadcast to all connected socket, your ID is: ' + socket.id); // broadcast to all connected socket
        console.log('ping', 'broadcast to all connected socket')
     }
  })

})

/*
setInterval(() => {
  io.emit('ping', { data: (new Date())/1});
}, 100);
*/

http.listen(8082, function(){
  console.log('listening on *:8082');
});
