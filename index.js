// You might want to have a look at this file :)
// This project is no longer maintained
const express = require('express');
const cors = require('cors');
const request = require('request');
const http = require('http');
const app = express();
const package = require('./package.json');

let fetchedUsers = [];

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(process.env.PORT || 4000, () => {
	console.log('RUNNING :: Port ' + (process.env.PORT || 4000));
});

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname+'/public/index.html')
// 	// console.log('PING');
// 	// res.send('PING');
// 	// res.end();
// });


app.get('/setup', (req,res) => {
	res.sendFile(__dirname+'/public/routes/setup/index.html');
});

app.get('/push_user', (req, res) => {
	let userId = req.query.uid;
	let hostId = getQueryVariable(req.headers['nightbot-channel'], 'name');

	if (!req.headers['nightbot-channel']) {
		console.log(`PUSH REFUSED ${hostId} :: Missing nightbot-channel header`);
		res.send('Invalid push_user request nightbot-channel header is missing');
		return;
	}

	request(Buffer.from('aHR0cHM6Ly9hcGkubnBvaW50LmlvL2Q3YmQzYTM0MTI5NDk0NjBlMjZi', 'base64').toString(), (err, json) => {
		var usersJson = JSON.parse(json.body).users;
		for (var i = 0; i < usersJson.length; i++) {
			if (usersJson[i] == hostId) {
				console.log(`PUSH REFUSED ${hostId} :: User is unauthorised`);
				res.send(Buffer.from('WW91IGFyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhpcyBhcHBsaWNhdGlvbg==', 'base64').toString())
				return;
			}
		}
		for (var i = 0; i < fetchedUsers.length; i++) {
			if (fetchedUsers[i].hostId == hostId) {
				fetchedUsers[i].users.push(userId);
				console.log(`PUSH ${hostId} :: ${userId}`);
				res.send('You have been added to the wall successfully, it might take a couple of minutes to appear.');
				return;
			}
		}
		fetchedUsers.push({
			hostId: hostId,
			users: [userId]
		});
		console.log(`PUSH ${hostId} :: ${userId}`);
		res.send('You have been added to the wall successfully, it might take a couple of minutes to appear.');
	})
});

app.get('/get_users', (req, res) => {
	let hostId = req.query.hostId;
	let version = req.query.version;

	if (version != package.version) {
		console.log(`PULL REFUSED ${hostId} :: Using version ${version} rather than ${package.version}`);
		res.json({
			error: 'The server refused to connect because this application is using an old version: Please update from ' + version + ' to ' + package.version + '. Download the latest version from https://github.com/Moorad/youtube-shoutout-wall.'
		})
	}
	request(Buffer.from('aHR0cHM6Ly9hcGkubnBvaW50LmlvL2Q3YmQzYTM0MTI5NDk0NjBlMjZi', 'base64').toString(), (err, json) => {
		var usersJson = JSON.parse(json.body).users;
		for (var i = 0; i < usersJson.length; i++) {
			if (usersJson[i] == hostId) {
				console.log(`PULL REFUSED ${hostId} :: User is unauthorised`);
				res.status(401);
				res.send(Buffer.from('WW91IGFyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhpcyBhcHBsaWNhdGlvbg==', 'base64').toString())
				return;
			}
		}
		for (var i = 0; i < fetchedUsers.length; i++) {
			if (fetchedUsers[i].hostId == hostId) {
				res.json(fetchedUsers[i]);
				console.log(`PULL ${hostId} :: ${fetchedUsers[i].users}`);
				fetchedUsers.splice(i, 1);
				return;
			}
		}
		res.json({
			hostId: hostId,
			users: []
		});
		console.log(`PULL ${hostId}`);
	});
});

app.get('/log', (req, res) => {
	let data = JSON.parse(req.query.data);
	console.log(data)
})

app.use(function(req, res, next){
	res.status(404);
	res.sendFile(__dirname+'/public/routes/404/index.html');
  });


function getQueryVariable(query, variable) {
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
}

// Ping the app evert 5 minutes to prevent the app from sleeping
setInterval(function () {
	http.get("http://youtube-shoutout-wall.herokuapp.com/");
}, 300000);