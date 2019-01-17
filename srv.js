var http = require('http')
    , socketio = require('socket.io'), users = []; 
 var server = http.createServer().listen(process.env.PORT, process.env.IP);
socketio.listen(server).set('log level', 1).on('connection', function (socket) {
    
    socket.on('addUser',function(usrname) {
        socket.userD = usrname.usrn;
        users.push({'idUser':socket.userD, 'timrr':usrname.timr});
        updateUsers('');
    });
    socket.on('disconnect', function () {
           for(var i=0; i<users.length; i++) {
            if(users[i]['idUser'] == socket.userD) {
                socket.emit('abort',socket.userD);
                socket.broadcast.emit('abort',socket.userD);
                users.splice(i,1);
                delete [socket];
            }
        }
        updateUsers('');
    });
    socket.on('update',function(who) {
        updateUsers(who);
    });
    function updateUsers(me){
        socket.emit('loadUser', {updateUsersName:users,changeTo:me});
        socket.broadcast.emit('loadUser', {updateUsersName:users,changeTo:me});
    }
    socket.on('message', function (msg) {
        var message = msg.msg;
        message = message.slice(0,1).toUpperCase() + message.slice(1);
        socket.broadcast.emit('message', {messageSend:message,username:msg.user,timerWhen:msg.timer});
        socket.emit('message', {messageSend:message,username:msg.user,timerWhen:msg.timer});
    });
    socket.on('upload', function(pro) {
        socket.emit('proUpload',{percentP: pro.progress, serialString: pro.DataSerial,wwst:pro.wws});
        socket.broadcast.emit('proUpload',{percentP: pro.progress, serialString: pro.DataSerial,wwst:pro.wws});
    });
    socket.on('showUp',function(showFile) {
        socket.emit('sendFile',{wf:showFile.file, rtf:showFile.Retrieve,rrfn:showFile.srfn});
        socket.broadcast.emit('sendFile',{wf:showFile.file, rtf:showFile.Retrieve,rrfn:showFile.srfn});
    });
    socket.on('it',function(w) {
      socket.emit('itn',{whomI:w.whom});
      socket.broadcast.emit('itn',{whomI:w.whom});
    });
    socket.on('int',function(wh) {
      socket.emit('intn',{whomIn:wh.whoI});
      socket.broadcast.emit('intn',{whomIn:wh.whoI});
    });
    socket.on('icCME',function(ic) {
      socket.emit('icCMRE',{wicCM:ic.whoIC, wicc:ic.wic});
      socket.broadcast.emit('icCMRE',{wicCM:ic.whoIC, wicc:ic.wic});
      console.log(ic.whoIC+' '+ic.wic);
    });
    socket.on('icCM',function(iuc) {
      socket.emit('icCME',{wiCM:iuc.whoI});
      socket.broadcast.emit('icCME',{wiCM:iuc.whoI});
    });
});
