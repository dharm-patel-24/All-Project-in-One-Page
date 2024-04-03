const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const useRouter = require('./routes/router');

app.set('view engine', 'ejs');

app.use('/', useRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on Port 8080");
});