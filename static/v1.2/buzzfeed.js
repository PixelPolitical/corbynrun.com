
var loading = document.getElementById('loading')
var progressBar = document.getElementById('progress')

var gameLoadStart

window.UnityProgress = function(gameInstance, progress) {
	if (!gameInstance.Module)
		return
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

window.activateOnLoad = false

window.playGame = function(){
	if (window.corbynReady) {
		UnityLoader.instantiate("game", "./static/v1.1/game/CorbynRun-release.json", { onProgress: window.UnityProgress })
	} else {
		window.activateOnLoad = true
	}
}

window.unityLoaded = function(){
	window.corbynReady = true
	if (window.activateOnLoad) {
		window.playGame()
	}
}

window.UnityProgress({ Module: true, progress: 0.05 })
var script = document.createElement("script");
script.src = "./static/v1.1/game/UnityLoader.js";
script.type = "text/javascript";
document.getElementsByTagName("body")[0].appendChild(script);
document.body.className = document.body.className+' can-play-game'


window.playGame()