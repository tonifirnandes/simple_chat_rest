const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio');
const express = require('@feathersjs/express');
const config = require('./config');

const chatService = require('./chat_service');
//express app
const app = express(feathers());

//parse json middleware
app.use(express.json());

//config socket.io realtime rest-api
app.configure(socketio());

//enable rest-service
app.configure(express.rest());

//routers middleware
app.use(config.chat_rest_path, new chatService());

//new connections for streams apis
app.on('connection', con => app.channel(config.chat_stream_channel).join(con));

//publish event to streams channel
app.publish(data => app.channel(config.chat_stream_channel));

// Start the application on port 3030
app.listen(config.port, (err) => {
    if(!err) return console.log("Server is running on port: ", config.port );
    console.log("Server is not running caused of: ", err);
});