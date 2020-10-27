const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


app.use(cookieParser());
app.use(express.json());


//REQUIRED ROUTES
const moneyRoutes = require("./routes/moneyroute");
const userRoutes = require("./routes/signin");

//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES
app.get('/', function(req, res){
	res.send("you did it!");
});

app.use('/api/money', moneyRoutes);
app.use('/api/account', userRoutes);

app.use(express.static(path.join(__dirname, '../client/src')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/src/index.html'))
})

//PROCESS ENV
app.listen(port, process.env.IP, function(){
	console.log("API Port is online");
})