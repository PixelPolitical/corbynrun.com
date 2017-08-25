
var loading = document.getElementById('loading')
var progressBar = document.getElementById('progress')

var gameLoadStart
var flInterval

function fakeLoading() {
	var progress = 0.3
	flInterval = setInterval(function(){
		progress += 0.2
		progressBar.style.width = (progress*100) + '%'
	}, 500)
}

window.UnityProgress = function(gameInstance, progress) {
	if (!gameInstance.Module)
		return
	if (progress === 0) {
		gameLoadStart = performance.now()
	}
	if (progress === 1) {
		// done
		fakeLoading()
	} else {
		loading.style.display = 'block'
	}
	progressBar.style.width = (progress / 10) * 3 + '%'
	window.gameInstance = gameInstance
}

window.unityLoaded = function(){
	UnityLoader.instantiate("game", "./static/v3/game/CorbynRun.json", { onProgress: window.UnityProgress })
}

var loaded = false

function GameLoaded() {
	if (!loaded) {
		clearInterval(flInterval)
		progressBar.style.width = 100 + '%'
		loaded = true
		setTimeout(function(){
			loading.style.display = 'none'
			ga('send', 'timing', 'Game', 'load', Math.round(performance.now() - gameLoadStart))
		}, 750)
	}
}

var md = new MobileDetect(window.navigator.userAgent);
if (!(md.mobile() || md.tablet())) {
	window.UnityProgress({ Module: true, progress: 0.05 })
	var script = document.createElement("script");
	script.src = "./static/v3/game/UnityLoader.js";
	script.type = "text/javascript";
	document.getElementsByTagName("body")[0].appendChild(script);
	document.body.className = document.body.className+' can-play-game'
} else {
	document.body.className = document.body.className+' no-can-play-game'
}
