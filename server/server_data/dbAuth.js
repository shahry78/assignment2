const mongo = require('mongodb')
const client = mongo.MongoClient;
const dbPop = require('./dbPop');

client.connect("mongodb+srv://alpha:eagle@cluster0.gfqak.mongodb.net/chatapp?retryWrites=true&w=majority",  { useNewUrlParser: true, useUnifiedTopology: true }).then(async (client) => {
	try {
		db = client.db("chitterDB")
		dbPop.populateDatabase();
	} catch (err) {
        console.warn(err)
		response.status(500).json("Something Bad Occured")
	}
});

module.exports.loginParse = async function loginParse(email, pass){
	try {
		const collection = db.collection("userList");
		const user = await collection.find({ "email":email }).limit(1).toArray();
		console.log(user);

		if (user.length === 0){
			//console.log("User isn't real");
			return false;
		} if (user[0].pass === pass){
			//console.log("User was \"hacked\" successfully");
			return true;
		} else {
			//console.log("Wrong email or password");
			return false;
		}
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: User Check")
	}
}

module.exports.accountParse = async function accountParse(email){
	try {
		const collection = db.collection("userList");
		const user = await collection.find({ "email":email }).limit(1).toArray();
		if (user === 0){
			//console.log("Trouble finding data");
			return
		} if (user[0].email === email){
			//console.log("Found user and their details");
			return user[0];
		}
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: Account retrieval")
	}
}

module.exports.groupParse = async function groupParse(){
	try {
		const collection = db.collection("groupList");
		const group = await collection.find({}).toArray();
		//console.log("Groups Retrieved")
		return group;
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: Groups retrieval")
	}
}

module.exports.channelParse = async function channelParse(name){
	try {
		const collection = db.collection("channelList");
		const query = { "memberlist": {$elemMatch: {$eq: name }}};
		//console.log(query);
		const channel = await collection.find(query).toArray();
		//console.log("Channels Retrieved")
		//console.log(channel)
		return channel;
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: Channel retrieval")
	}
}

module.exports.messageList = async function messageList(cID){
	try {
		const collection = db.collection("messageList");
		const message = await collection.find({ "cID":cID }).toArray();
		//console.log("Message Data Retrieved");
		//console.log(message)
		return message;
	} catch (err) {
		console.warn(err)
		response.status(500).json("FAILED: Message retrieval")
	}
}