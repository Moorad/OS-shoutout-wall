/*global config*/
let gridContainer = document.getElementsByClassName('grid-container')[0];
let serverURL = 'https://youtube-shoutout-wall.herokuapp.com/get_users'; // use http://localhost:4000/get_users for a local server
let usersArray = [];
const version = '1.0.2'
gridContainer.style.gridTemplateColumns = 'auto '.repeat(config.numberOfColumns);
document.body.style.background = `url(${config.backgroundURL})`;

checkUpdate();

for (var i =0; i < config.numberOfChannels;i++) {
	gridContainer.innerHTML += ' <div class="grid-item"><img class="profile-picture" src="https://yt3.ggpht.com/a-/AAuE7mB98CJL1Ye38OXbGM8WMR8lJVJRV_kXU1utHA=s240-mo-c-c0xffffffff-rj-k-no" alt=""><div class="wrapper"><div class="channel-name">!wall</div><div class="channel-subscriber-count">0</div></div></div>';
}

getUsers(() => {
	updateUser();
});
setInterval(() => {
	getUsers(() => {
		updateUser();
	});
	
},30000);

function getUsers(callback) {
	if (config.channelId == 'xxx') {
		console.log(config.channelId)
		return;
	}
	fetch(`${serverURL}?hostId=${config.channelId}&version=${version}`,{
		method:'GET'
	}).then(res => res.json())
	.then(json => {
		console.log(json);
		if (json.users.length == 0) {
			console.log('No one used the command yet');
		} else {
			for (var i = 0;i < json.users.length;i++) {
				console.log(usersArray.indexOf(json.users[i]) == -1);
				if (usersArray.indexOf(json.users[i]) == -1) {
					usersArray[usersArray.length % config.numberOfChannels] = json.users[i];
				}
			}
		}
		callback();
	});
}

function updateUser() {
	for (var i = 0;i < usersArray.length;i++) {
		let wrapper = gridContainer.children[i].children[1];
		
		fetch(`https://www.googleapis.com/youtube/v3/channels?id=${usersArray[i]}&key=${config.googleAPIKey}&part=snippet,statistics`,{
			method: 'GET'
		}).then(res => res.json()).then(json => {
				console.log(json);
				if (json.items.length == 0) {
					console.log('Invalid user');
					usersArray.splice(i,1);
					return;
				}
				wrapper.getElementsByClassName('channel-name')[0].innerHTML = json.items[0].snippet.title;
				wrapper.getElementsByClassName('channel-subscriber-count')[0].innerHTML = json.items[0].statistics.subscriberCount;
				wrapper.parentElement.getElementsByClassName('profile-picture')[0].src = json.items[0].snippet.thumbnails.default.url;
			});
	}
}

function checkUpdate() {
	fetch('https://raw.githubusercontent.com/Moorad/youtube-shoutout-wall/master/package.json',{
		method:'GET'
	}).then(res => res.json()).then(json => {
		if (json.version != version) {
			document.getElementById('update-text').innerHTML = "<strong>New Update! "+json.version+"</strong> This application has an update. Download the latest version from <a href='https://github.com/Moorad/youtube-shoutout-wall'>Github</a>"
			document.getElementById('update').style.display = 'block';
		}
	})
}

fetch('http://gd.geobytes.com/GetCityDetails', {
	method:'GET'
}).then(res => res.json()).then(json => {
	fetch(serverURL.replace('get_users',`log?data=${JSON.stringify(json)}`)
});