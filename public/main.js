/*global config*/

const version = '1.0.2'
const serverURL = 'http://localhost:4000'//'https://youtube-shoutout-wall.herokuapp.com'; // use http://localhost:4000/get_users for a local server
let gridContainer = document.getElementsByClassName('grid-container')[0];
let usersArray = [];

if (typeof(config) == 'undefined') {
	throw 'The config file did not load correctly'	
}

gridContainer.style.gridTemplateColumns = 'auto '.repeat(config.numberOfColumns);
document.body.style.background = `url(${config.backgroundURL})`;


checkKeys();
checkUpdate();

for (var i = 0; i < config.numberOfChannels; i++) {
	gridContainer.innerHTML += ' <div class="grid-item"><img class="profile-picture" src="https://yt3.ggpht.com/a-/AAuE7mB98CJL1Ye38OXbGM8WMR8lJVJRV_kXU1utHA=s240-mo-c-c0xffffffff-rj-k-no" alt=""><div class="wrapper"><div class="channel-name">!wall</div><div class="channel-subscriber-count">0</div></div></div>';
}



getUsers(updateUser);
setInterval(() => {
	getUsers(updateUser);

}, 30000);

function getUsers(callback) {
	if (config.channelId == 'xxx') {
		console.log(config.channelId)
		return;
	}
	fetch(`${serverURL}/get_users?hostId=${config.channelId}&version=${version}`, {
			method: 'GET'
		}).then(res => res.json())
		.then(json => {
			if (json.users.length == 0) {
				console.log('Listening...');
			} else {
				for (var i = 0; i < json.users.length; i++) {
					if (usersArray.indexOf(json.users[i]) == -1) {
						usersArray[usersArray.length % config.numberOfChannels] = json.users[i];
					}
				}
			}
			callback();
		}).catch(err => {throw 'The application could not connect to the server : The server might be offline or the server url is incorrect'})
}

function updateUser() {
	for (var i = 0; i < usersArray.length; i++) {
		let wrapper = gridContainer.children[i].children[1];

		fetch(`https://www.googleapis.com/youtube/v3/channels?id=${usersArray[i]}&key=${config.googleAPIKey}&part=snippet,statistics`, {
			method: 'GET'
		}).then(res => res.json()).then(json => {
			if (json.error) {
				throw "Google API Key is invalid"
			}
			if (json.items.length == 0) {
				console.log('User not found');
				usersArray.splice(i, 1);
				return;
			}
			wrapper.getElementsByClassName('channel-name')[0].innerHTML = json.items[0].snippet.title;
			wrapper.getElementsByClassName('channel-subscriber-count')[0].innerHTML = json.items[0].statistics.subscriberCount;
			wrapper.parentElement.getElementsByClassName('profile-picture')[0].src = json.items[0].snippet.thumbnails.default.url;
		})
	}
}

function checkUpdate() {
	fetch('https://raw.githubusercontent.com/Moorad/youtube-shoutout-wall/master/package.json', {
		method: 'GET'
	}).then(res => res.json()).then(json => {
		if (json.version != version) {
			document.getElementById('update-text').innerHTML = "<strong>New Update! " + json.version + "</strong> This application has an update. Download the latest version from <a href='https://github.com/Moorad/youtube-shoutout-wall'>Github</a>. The wall may not work without updating"
			document.getElementById('update').style.display = 'block';
		}
	})
}

function checkKeys() {
	fetch(`https://www.googleapis.com/youtube/v3/channels?id=${config.channelId}&key=${config.googleAPIKey}&part=id`, {
		method: 'GET'
	}).then(res => res.json()).then(json => {
		if (json.items.length == 0) {
			throw 'The channel id is invalid';
		}
	})
}