const mongo = require('mongodb')
const client = mongo.MongoClient;

let db;

let drop = false;
let debug = false;

// POPULATE EMPTY DATABASE
module.exports.populateDatabase = function () {
	client.connect("mongodb+srv://alpha:eagle@cluster0.gfqak.mongodb.net/chatapp?retryWrites=true&w=majority",  { useNewUrlParser: true, useUnifiedTopology: true }).then(async (client) => {
		try {
			db = client.db("chitterDB")
			// Populate User List
			let collection = db.collection("userList");
			let content = await collection.find({ "name":"Admin" }).limit(1).toArray().then()
			if (content.length > 0 && drop === true){
				console.log("DROPPING USER LIST")
				await collection.drop();
			}
			if (content.length === 0 && drop === false){	// If no database exists, create dummy database
				await collection.insertMany([
				{
					"name":"Admin",
					"email":"admin",
					"pass":"admin",
					"admin":"super"
				},
				{
					"name":"The Coolest Kid",
					"email":"abc",
					"pass":"123",
					"admin":"no"
				},
				{
					"name":"Mangu Pangu",
					"email":"bcd",
					"pass":"234",
					"admin":"group"
				},
				{
					"name":"Hero of the Chat Forum",
					"email":"cde",
					"pass":"345",
					"admin":"super"
				},
				{
					"name":"Eek",
					"email":"def",
					"pass":"456",
					"admin":"no"
				}
				])
			}
			if (debug){
				console.log(await collection.find({}).toArray());
			}
			//-------------------------------------------------
			// Populate Group List
			collection = db.collection("groupList");
			content = await collection.find({ "id":0 }).limit(1).toArray();
			if (content.length > 0 && drop === true){
				console.log("DROPPING GROUP LIST")
				await collection.drop();
			}
			if (content.length === 0 && drop === false){	// If no database exists, create dummy database
				await collection.insertMany([
				{
					"id":0,
					"gname":"Cat"
				},
				{
					"id":1,
					"gname":"Dog"
				},
				{
					"id":2,
					"gname":"Snake"
				},
				{
					"id":3,
					"gname":"Badger"
				},
				{
					"id":4,
					"gname":"Horse"
				},
				{
					"id":5,
					"gname":"Spider"
				},
				{
					"id":6,
					"gname":"Goose"
				},
				{
					"id":7,
					"gname":"Falcon"
				}
				])
			}
			if (debug){
				console.log(await collection.find({}).toArray());
			}
			//-------------------------------------------------
			// Populate Channel List
			collection = db.collection("channelList");
			content = await collection.find({ "id":0 }).limit(1).toArray();
			if (content.length > 0 && drop === true){
				console.log("DROPPING CHANNEL LIST")
				await collection.drop();
			}
			if (content.length === 0 && drop === false){	// If no database exists, create dummy database
				await collection.insertMany([
				{
					"id":0,
					"cname":"Calcio",
					"group":"Cat",
					"owner":"Admin",
					"memberlist":["Admin", "The Coolest Kid", "Eek"]
				},
				{
					"id":1,
					"cname":"Ragdoll",
					"group":"Cat",
					"owner":"Admin",
					"memberlist":["Admin", "Hero of the Chat Forum", "Eek"]

				},
				{
					"id":2,
					"cname":"Persian",
					"group":"Cat",
					"owner":"Admin",
					"memberlist":["Admin", "Mangu Pangu", "Eek"]
				},
				{
					"id":3,
					"cname":"Bombay",
					"group":"Cat",
					"owner":"Admin",
					"memberlist":["Admin", "The Coolest Kid", "Eek"]
				},
				{
					"id":4,
					"cname":"Viper",
					"group":"Snake",
					"owner":"Mangu Pangu",
					"memberlist":["Admin", "Mangu Pangu"]
				},
				{
					"id":5,
					"cname":"Rattlesnake",
					"group":"Snake",
					"owner":"Mangu Pangu",
					"memberlist":["Admin", "Mangu Pangu", "Eek"]
				},
				{
					"id":6,
					"cname":"Cobra",
					"group":"Snake",
					"owner":"Mangu Pangu",
					"memberlist":["Admin", "Mangu Pangu"]
				},
				{
					"id":7,
					"cname":"Border Collie",
					"group":"Dog",
					"owner":"Admin",
					"memberlist":["Admin"]
				},
				{
					"id":8,
					"cname":"unnamed",
					"group":"Goose",
					"owner":"Admin",
					"memberlist":["Admin"]
				},
				{
					"id":9,
					"cname":"Gyrfalcon",
					"group":"Falcon",
					"owner":"Admin",
					"memberlist":["Admin"]
				},
				{
					"id":10,
					"cname":"Redback",
					"group":"Spider",
					"owner":"Admin",
					"memberlist":["Admin"]
				},
				{
					"id":11,
					"cname":"Arabian",
					"group":"Horse",
					"owner":"Admin",
					"memberlist":["Admin"]
				}
				])
			}
			if (debug){
				console.log(await collection.find({}).toArray());
			}
			//-------------------------------------------------
			// Populate Message List
			collection = db.collection("messageList");
			content = await collection.find({ "id":0 }).limit(1).toArray();
			if (content.length > 0 && drop === true){
				console.log("DROPPING MESSAGE LIST")
				await collection.drop();
			}
			if (content.length === 0 && drop === false){	// If no database exists, create dummy database
				await collection.insertMany([
				{
					"time":"01:20",
					"user":"The Coolest Kid",
					"body":"This channel was established to talk about Calcio cats.",
					"cID":0

				},
				{
					"time":"13:21",
					"user":"Mangu Pangu",
					"body":"This channel should be about space cats!",
					"cID":0

				},
				{
					"time":"04:53",
					"user":"Hero of the Chat Forum",
					"body":"Welcome to the party room",
					"cID":2
					
				},
				{
					"time":"14:53",
					"user":"Admin",
					"body":"I'll remove you if you ever speak again Mangu Pangu",
					"cID":0
				}
				])
			}
			if (debug){
				console.log(await collection.find({}).toArray());
			}
		} catch (err) {
			console.warn(err)
			response.status(500).json("Something Bad Occured")
		}
	});
}