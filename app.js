const express = require('express');
const path = require('path');

const { loggers, errorHandlers } = require('./utils');

const app_one = express();
const app_two = express();
const app_three = express();


loggers(app_one);

app_one.use(express.static(path.join(__dirname, 'apps/one')));
app_one.listen(3000);

loggers(app_two);

app_two.use(express.static(path.join(__dirname, 'apps/two')));
app_two.listen(3001);

loggers(app_three);

app_three.use(express.static(path.join(__dirname, 'apps/three')));
app_three.listen(3002);


// error handling
errorHandlers(app_one);
errorHandlers(app_two);
errorHandlers(app_three);

// Don't forget to update the Nginx config & server blocks
// Refer to `nginxdefault`