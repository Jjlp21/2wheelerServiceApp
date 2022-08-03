const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let dbName = 'DoorstepMotoService-app-database'
let dbUrl = `mongodb+srv://jjlp:jjlp@cluster0.9ias7.mongodb.net/${dbName}`;

module.exports={dbUrl,mongodb,MongoClient}