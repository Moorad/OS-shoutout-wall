const express = require('express');

const app = express();

let fetchedUsers = [];

app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running | port: '+(process.env.PORT || 4000));
});

app.get('/push_user', (req,res) => {
	let userId = req.query.uid
	// req.headers['nightbot-channel']
	// let nightbotId = 'req.query.nId';
	let hostId = getQueryVariable(req.headers['nightbot-channel'],'name');
	for (var i = 0;i < fetchedUsers.length;i++) {
		if (fetchedUsers[i].hostId == hostId) {
			fetchedUsers[i].users.push(userId);
			console.log(fetchedUsers)
			res.send('');
			return;
		}
	}
	fetchedUsers.push({hostId:hostId,users:[userId]});
	console.log(fetchedUsers);
	res.send('');
});

app.get('/get_users', (req,res) => {
	let hostId = req.query.hostId;
	for (var i = 0;i < fetchedUsers.length;i++) {
		if (fetchedUsers[i].hostId == hostId) {
			fetchedUsers.splice(i,1);
			res.json(fetchedUsers[i]);
			console.log(fetchedUsers[i]);
			console.log(fetchedUsers);
			return;
		}
	}
});

function getQueryVariable(query,variable) {
    var query = query;
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}