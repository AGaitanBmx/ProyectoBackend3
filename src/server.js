require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/mongoose');
const apiRouter = require('./routes');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (_req, res) => {
res.json({ status: 'ok', message: 'API running' });
});


app.use('/api', apiRouter);


connectDB()
.then(() => {
app.listen(PORT, () => {
console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
})
.catch((err) => {
console.error('❌ DB connection error:', err);
process.exit(1);
});