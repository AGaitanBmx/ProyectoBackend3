const mongoose = require('mongoose');


async function connectDB() {
const uri = process.env.MONGO_URI;
if (!uri) {
throw new Error('MONGO_URI no definido. Configurá .env');
}
mongoose.set('strictQuery', true);
await mongoose.connect(uri);
console.log('✅ Conectado a MongoDB');
}


module.exports = { mongoose, connectDB };