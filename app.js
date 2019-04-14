const app = require('./config/server.js')


const server = app.listen(80, ()=>{
    console.log('Servidor online')
})

let io = require('socket.io').listen(server)

app.set('io', io)

//create connection with websocket
io.on('connection', (socket) =>{
     console.log('Usuario logado');

     socket.on('disconnect', () =>{
         console.log('Usuario deslogado');
     })

     //create a dialog
     socket.on('msgParaServidor', (data)=>{
        socket.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})
     })

     socket.broadcast.on('msgParaServidor', (data)=>{
        socket.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})
     })

     //update attendees
     //if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
        socket.on('participanteParaCliente', (data)=>{
            socket.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})
        })

        socket.broadcast.on('participanteParaCliente', (data)=>{
            socket.emit('msgParaCliente', {apelido : data.apelido, mensagem : data.mensagem})
        })
   // }

     

})