// var iterationRow = 1;
// while (iterationRow <= CONFIG.numberOfRows) {
// 	var htmlRow = '<div class="row row_' + iterationRow +
// 		'"> <div class="col-l"> <div class="card-group border-0"> </div> </div> </div>';
// 	$(".container").append(htmlRow);
// 	var iterationCard = 1;
// 	while (iterationCard <= CONFIG.numberOfChannels / CONFIG.numberOfRows) {
// 		var channelNumberObject = Math.floor(iterationCard + ((iterationRow - 1) * CONFIG.numberOfChannels / CONFIG
// 			.numberOfRows));
// 		var htmlSubscriberCard = "<div class='channel_" + channelNumberObject +
// 			" card'> <img class='channelImage card-img-top img-fluid rounded-top' src='https://yt3.ggpht.com/a-/AAuE7mB98CJL1Ye38OXbGM8WMR8lJVJRV_kXU1utHA=s240-mo-c-c0xffffffff-rj-k-no'/> <ul class='list-group list-group-flush'> <li class='list-group-item bg-danger'> <h5 class='channelName card-title text-center text-#ffffff text-truncate'>!wall</h5> </li> <li class='list-group-item text-center'>	<h2 class='subscriberCount card-title text-center odometer'>0</h2> </li> </ul> </div>";
// 		$(".row_" + iterationRow + " .col-l .card-group").append(htmlSubscriberCard);
// 		iterationCard++;
// 	}
// 	iterationRow++;
// }

let gridContainer = document.getElementsByClassName('grid-container')[0];

gridContainer.style.gridTemplateColumns = 'auto '.repeat(config.numberOfColumns);
document.body.style.background = `url(${config.backgroundURL})`;

for (var i =0; i < config.numberOfChannels;i++) {
	gridContainer.innerHTML += ' <div class="grid-item"><img src="https://yt3.ggpht.com/a-/AAuE7mB98CJL1Ye38OXbGM8WMR8lJVJRV_kXU1utHA=s240-mo-c-c0xffffffff-rj-k-no" alt=""><div class="wrapper"><div class="channel-name">!wall</div><div class="channel-subscriber-count">0</div></div></div>'
}

setInterval(() => {console.log('sent')},30000)