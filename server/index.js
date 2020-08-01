const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const app = express();

/* 
    CORS
*/
app.use(cors());

/* 
    Config
*/
let pathENV = path.resolve(__dirname, '../.env');
if (fs.existsSync(pathENV)) {
    dotenv.config({
        path: pathENV
    });
} else {
    console.log(`Error en direccion: ${pathENV}`);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
    Routes
*/
app.use(require('./routes/index'));

app.listen(
    process.env.PORT,
    err => err ? console.log(err) : console.log(`Server on port ${process.env.PORT}`)
);