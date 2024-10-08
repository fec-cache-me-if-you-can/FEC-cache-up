const path = require('path');
const express = require('express'); // npm installed
const morgan = require('morgan');

const router = require('./routes.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
// other configuration...

app.use('/', router);

app.listen(3000);