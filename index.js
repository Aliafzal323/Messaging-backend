const express= require('express');
var http= require('http');
const cors=require('cors');
const app=express();
const port=process.env.port || 5000
var server=http.createServer(app);
var io=require('socket.io')(server);


//middleware
app.use(express.json());
app.use(cors());

var clients={};

const routes=require('./routes');   
app.use('/routes',routes);

io.on("connection",(socket)=>{
    console.log("Connected");
    console.log(socket.id,"has joined");
   

    socket.on('/test1',(data)=>{
        console.log(data)
    })

    //Getting id of user and attaching it to socket object
    socket.on("/signin", (id) => {
        console.log(`User signed in with ID: ${id}`);
        clients[id] = socket;  // Store socket object against user ID
        console.log("Active Clients:", Object.keys(clients));
    });

    //Recieving messages Event
   socket.on('message', (msg) => {
    let targetId = msg.targetId.split(" ")[0]; // Extract numeric ID
    console.log(`Checking clients for target: '${targetId}'`);
    console.log("Active Clients:", Object.keys(clients));

    if (clients[targetId]) {
        console.log(`Sending message to '${targetId}'`);
        clients[targetId].emit("message", msg);
    } else {
        console.log(`User '${targetId}' not found in clients, storing message`);
    }
});

    socket.emit("/rana",{
        message:"Hello from server"
    });

    
});

app.route('/check').get((req,res)=>{
    return res.json("Your app is working fine");
});

server.listen(port,"0.0.0.0",()=>{
    console.log("Server Connected");
});

