const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

// const fs = require('fs');
// const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

const connectDB = require('./config/connect');
const corsMiddleware = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// app.use(morgan('common', { stream: accessLogStream })); //เก็บ log การ request มาใน access.log
app.use(morgan('common')); 

app.use(corsMiddleware());

app.use(express.urlencoded({ extended: false, limit: "500MB" }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ msg: "Welcome to Node.js Express.js" });
});

app.get('/product', (req, res) => {
  return res.status(200).json({ msg: "Hello Endpoint 555" });
});

app.use('/api/v1/', require('./routes'));


//การใช้  Route 3 แบบที่ 3 loop ไปอ่านโฟลเดอร์ routes ว่ามีกี่ไฟล์  ต้อง require('fs') มาเพื่อใช้สำหรับอ่านไฟล์
// readdirSync('./routes').map(r => app.use('/api',require('./routes/'+r))).

const port = dotenv.parsed.PORT;

const startServer = async () => {
  try {
    await connectDB(dotenv.parsed.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
