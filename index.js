const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');


const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));




app.listen(config.port, function () {
  console.log("it is ALIVE!!  @"+config.port);
});
