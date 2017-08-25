
var loading = document.getElementById('loading')
var progressBar = document.getElementById('progress')

var gameLoadStart

window.UnityProgress = function(gameInstance, progress) {
	if (!gameInstance.Module)
		return
	// console.log((progress*100)+'% loaded')
	if (progress === 0) {
		gameLoadStart = performance.now()
	}
	if (progress === 1) {
		// done
		loading.style.display = 'none'
		ga('send', 'timing', 'Game', 'load', Math.round(performance.now() - gameLoadStart));
	} else {
		loading.style.display = 'block'
	}
	progressBar.style.width = (progress*100) + '%'
}

window.unityLoaded = function(){
	UnityLoader.instantiate("game", "./static/v1/game/CorbynRun.json", { onProgress: window.UnityProgress })
}

var md = new MobileDetect(window.navigator.userAgent);
if (!(md.mobile() || md.tablet())) {
	window.UnityProgress({ Module: true, progress: 0.05 })
	var script = document.createElement("script");
	script.src = "./static/v1/game/UnityLoader.js";
	script.type = "text/javascript";
	document.getElementsByTagName("body")[0].appendChild(script);
	document.body.className = document.body.className+' can-play-game'
} else {
	document.body.className = document.body.className+' no-can-play-game'
}
