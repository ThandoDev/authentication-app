const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//1) MIDDLEWARES
app.use(cors());
app.use(express.json());

//2) ROUTE


//3) MONGO DB CONNECTION
mongoose
  .connect('mongodb://127.0.0.1:27017/authentication')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

//4) GLOBAL ERROR HANDLER
app.use((err, res, req, next)=>{
    err.statuCode = err.statuCode || 500;
    err.status = err.status || error;

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message,
    });
});

//5) SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
