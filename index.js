const express = require('express');

const app = express();

let fetchedUsers = [];

app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
	console.log('Server is running | port: '+(process.env.PORT || 4000));
});

app.get('/push_user', (req,res) => {
	console.log(req.query.uid);
	// req.headers['nightbot-channel']
	// let nightbotId = 'req.query.nId';
	let userId = getQueryVariable(req.headers['nightbot-channel'],'name');
	res.json({Hello:'Hello'});
});

app.get('/get_users', (req,res) => {
	let nightbotId = req.query.nId;
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