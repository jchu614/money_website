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

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build/'));
	
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// 	});
// }

//PROCESS ENV
app.listen(port, process.env.IP, function(){
	console.log("API Port is online");
})