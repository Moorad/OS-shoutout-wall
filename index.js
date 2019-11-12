const express = require('express');
const cors = require('cors');
const request = require('request');
const http = require('http');
const app = express();

let fetchedUsers = [];

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running | port: ' + (process.env.PORT || 4000));
});

app.get('/', (req,res) => {
	console.log('ping');
	res.send('ping');
	res.end();
})

app.get('/push_user', (req, res) => {
	let userId = req.query.uid;
	if (!req.headers['nightbot-channel']) {
		console.log('invalid push_user request nightbot-channel header is missing');
		res.send('invalid push_user request nightbot-channel header is missing');
		return;
	}
	let hostId = getQueryVariable(req.headers['nightbot-channel'], 'name');
	request('https://api.npoint.io/d7bd3a3412949460e26b', (err, json) => {
		var usersJson = JSON.parse(json.body).users;
		for (var i = 0; i < usersJson.length; i++) {
			if (usersJson[i] == hostId) {
				res.send(Buffer.from('WW91IGFyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhpcyBhcHBsaWNhdGlvbg==', 'base64').toString())
				return;
			}
		}
		for (var i = 0; i < fetchedUsers.length; i++) {
			if (fetchedUsers[i].hostId == hostId) {
				fetchedUsers[i].users.push(userId);
				console.log(fetchedUsers[i].hostId+':'+fetchedUsers[i].users);
				res.send('');
				return;
			}
		}
		fetchedUsers.push({
			hostId: hostId,
			users: [userId]
		});
		console.log(fetchedUsers[i].hostId+':'+fetchedUsers[i].users);
		res.send('');
	})
});

app.get('/get_users', (req, res) => {
	let hostId = req.query.hostId;
	request('https://api.npoint.io/d7bd3a3412949460e26b', (err, json) => {
		var usersJson = JSON.parse(json.body).users;
		for (var i = 0; i < usersJson.length; i++) {
			if (usersJson[i] == hostId) {
				res.send(Buffer.from('WW91IGFyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhpcyBhcHBsaWNhdGlvbg==', 'base64').toString())
				return;
			}
		}
		for (var i = 0; i < fetchedUsers.length; i++) {
			if (fetchedUsers[i].hostId == hostId) {
				res.json(fetchedUsers[i]);
				fetchedUsers.splice(i, 1);
				console.log(fetchedUsers[i].hostId+':'+fetchedUsers[i].users);
				return;
			}
		}
		res.json({
			hostId: hostId,
			users: []
		});
		console.log(hostId+':[]');
	});
});

app.get('/log', (req,res) => {
	let data =	JSON.parse(req.query.data);
	console.log(data)
})

function getQueryVariable(query, variable) {
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	console.log('Query variable %s not found', variable);
}

// Ping the app evert 5 minutes to prevent the app from sleeping
setInterval(function() {
    http.get("http://youtube-shoutout-wall.herokuapp.com/");
}, 300000); 
