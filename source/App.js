enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "luna://com.palm.wifi/findnetworks"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
   			{kind: "onyx.Button", content: "Subscribe", ontap: "subscribeTap"}
		]}
	],
	subscribeTap: function(inSender, inEvent) {
		var enyoWebosVersion = enyo && enyo.version && enyo.version["enyo-webos"];
		this.log("enyo-webos version:", enyoWebosVersion);
		
        var wifiRequest = new enyo.ServiceRequest({service: "luna://com.palm.wifi", method: "findnetworks", subscribe: true, resubscribe: false});
		this.$.main.addContent("enyo-webos version: " + enyoWebosVersion + '     timeout: ' + wifiRequest.timeout + '<br>');
        var wifiParameters = {};
        console.log("findnetworks", wifiParameters);
        wifiRequest.go(wifiParameters);
        wifiRequest.response(handleWifiResponse.bind(this));
        wifiRequest.error(handleWifiFailure.bind(this));
        
        function handleWifiResponse(inSender, inResponse) {
        	console.log("handleWifiResponse:", inResponse);
        	if (inResponse.foundNetworks) {
        		this.$.main.addContent(inResponse.foundNetworks.length + ' networks found<br>');
        	} else {
        		this.$.main.addContent(JSON.stringify(inResponse) + '<br>');
        	}
        }
        
        function handleWifiFailure(inSender, inResponse) {
        	console.error("handleWifiFailure", inResponse);
        	this.$.main.addContent(JSON.stringify(inResponse) + '<br>');
        }
	}
});
