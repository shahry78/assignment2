const connections = [];

module.exports.connect = function(io, db) {
    io.on('connection', socket => {
        connections.push(socket);
        socket.on('disconnect', () => delete connections.indexOf(socket));
        socket.on('message', msg => {
            //console.log(msg);
            connections.forEach(sock => sock.emit('message', msg));
            const collection = db.collection('messageList')
            collection.insertOne(msg)
        })
    })
}


/*

module.exports = {
    connect: function(io, db){
        var messages = [];
        io.on('connection',(socket) => {

            console.log('user connection on port '+ PORT +' : '+ socket.id);
        }

        socket.on('message', (data)=>{
            if(data){
                io.emit('message', messages);
                const collection = db.collection('messageList')
                collection.insertOne(data,(err,dbres) => {
                })
            }        
        });
    })    
}
*/