/*global config*/
let gridContainer = document.getElementsByClassName('grid-container')[0];
let serverURL = 'http://localhost:4000/get_users';
let usersArray = [];

gridContainer.style.gridTemplateColumns = 'auto '.repeat(config.numberOfColumns);
document.body.style.background = `url(${config.backgroundURL})`;

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
	
},10000);

function getUsers(callback) {
	fetch(`${serverURL}?hostId=${config.channelId}`,{
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
				wrapper.getElementsByClassName('channel-name')[0].innerHTML = json.items[0].snippet.title;
				wrapper.getElementsByClassName('channel-subscriber-count')[0].innerHTML = json.items[0].statistics.subscriberCount;
				wrapper.parentElement.getElementsByClassName('profile-picture')[0].src = json.items[0].snippet.thumbnails.default.url;
			});
	}
}

// https://yt3.ggpht.com/a-/AAuE7mDQ1-4gPIEKqpGr6Uw_ZJFgRQ8gCEi5IknhQEaU=s288-c-k-c0xffffffff-no-rj-mo
// https://yt3.ggpht.com/a-/AAuE7mC48eLNNt9M65fqy_g44-Ws78zK0LJ6YjL_QhBpnA=s288-c-k-c0xffffffff-no-rj-mo