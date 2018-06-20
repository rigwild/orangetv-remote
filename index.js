const OrangeTvRemoteHttp = require('./OrangeTvRemoteHttp.js');

const ipPrefix = '192.168.1.';
const tvPort = 8080;



OrangeTvRemoteHttp.findTvIP()
	.then(res => {
		const tvIP = res;
		console.log("Found your Orange TV's IP : " + tvIP);
		OrangeTvRemoteHttp.pushButton(tvIP, 113);
	})
	.catch(err => console.error("Could not find the Orange TV's IP.", err));