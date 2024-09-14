const mongoose = require('mongoose')

//define mongodb url
const mongoURL = 'mongodb://localhost:27017/hotels';

//setup mongoose connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongo server');
})
db.on('disconnected',()=>{
    console.log('disconnected to mongo server');
})
db.on('error',(err)=>{
    console.log('connected to mongo server',err);
})

module.exports=db;