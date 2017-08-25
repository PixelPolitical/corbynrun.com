window.trackOutboundLink = function(ele) {
	var url = this.attributes.href.value
	ga('send', 'event', 'outbound', 'click', url)
	fbq('track', 'linkClick', url)
}

window.trackEvent = function(ele) {
	var name = this.dataset.eventName
	ga('send', 'event', 'click', 'link', name)
	fbq('track', name);
}

var trackingLinks = document.getElementsByClassName('track-link')
for (var i=0; i<trackingLinks.length; i++) {
	trackingLinks[i].onclick = window.trackOutboundLink
}

var trackingEvents = document.getElementsByClassName('track-event')
for (var i=0; i<trackingEvents.length; i++) {
	trackingEvents[i].onclick = window.trackEvent
}