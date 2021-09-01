const db = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
 
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTERS}/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority`;

db.Promise = global.Promise;

const connect = async () => {
    await db.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
        .then( () => console.log('BD connected successfully'))
        .catch( e => console.error('BD', e));
};

module.exports = {
    connect,
};
