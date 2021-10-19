const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const bodyParser = require('body-parser');

const mongo = require('mongodb')
const client = mongo.MongoClient;

const dbAuth = require('./server_data/dbAuth');

const PORT = 3000;  //Define port used for the server

app.use(cors());   //Apply express middleware
app.use(bodyParser.json());

client.connect("mongodb+srv://alpha:eagle@cluster0.gfqak.mongodb.net/chatapp?retryWrites=true&w=majority",  { useNewUrlParser: true, useUnifiedTopology: true }).then(async (client) => {
    let db = client.db("chatapp")
    sockets.connect(io, db);  //Setup Socket
});

server.listen(http, PORT);  //Start server listening for requests

app.post("/login", async function (req, res) {
    try {
        //console.log(req.body);
        const { email, pass } = req.body;
        const succeeded = await dbAuth.loginParse(email, pass);
        if (succeeded) { 
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json("Server couldn't deal with /login")
    }
});

app.post("/account", async function (req, res) {
    try {
        //console.log(req.body);
        const { email } = req.body;
        const userData = await dbAuth.accountParse(email);
        if (userData === '' ) {
            res.json("Error - No Data Retrieved");
        } else {
            res.json(userData);
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json("Server couldn't deal with /account")
    }
})

app.post("/group", async function (req, res) {
    try {
        const groupData = await dbAuth.groupParse();
        res.json(groupData);
    } catch (err) {
        console.warn(err)
        res.status(500).json("Server couldn't deal with /group")
    }
})

app.post("/channel", async function (req, res) {
    try {
        //console.log(req.body);
        const { name } = req.body;
        const userData = await dbAuth.channelParse(name);
        if (userData === '' ) {
            res.json("Error - No Data Retrieved");
        } else {
            res.json(userData);
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json("Server couldn't deal with /channel")
    }
})

app.post("/messageList", async function (req, res) {
    try {
        //console.log("server sees:",req.body);
        const { cID } = req.body;
        const messageList = await dbAuth.messageList(cID);
        if (messageList === '' ) {
            res.json("Error - No Data Retrieved");
        } else {
            res.json(messageList);
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json("Server couldn't deal with /messageList")
    }
})


//});

//Route for default page (root of site)
app.get('/',function(req,res){
    res.sendFile(__dirname + '/../src/app/login/login.component.html');
});
