const  express = require('express')
const  WebSocket = require('ws')

const app = express();
const server = require('http').createServer(app);
//initialize a simple http server


//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

app.use(express.static('client/build'))
wss.on('connection', (ws) => {
    console.log("Websocket connection formed")

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(message);
    });

   
});

//start our server
server.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});