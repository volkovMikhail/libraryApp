const { MongoClient } = require('mongodb');
const client = new MongoClient(
    'mongodb+srv://Mikhail:qwerty123@cluster0.2tlux.mongodb.net/library?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
client.connect();

module.exports = client;
