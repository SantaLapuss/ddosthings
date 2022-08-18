const request = require('request');
const fs = require('fs');

const valid = [];

const colors = require('colors');

function log(string) {
    let d = new Date();

    let hours = (d.getHours()<10?'0':'') + d.getHours();
    let minutes = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let seconds = (d.getSeconds()<10?'0':'') + d.getSeconds();

    console.log(`(${hours}:${minutes}:${seconds}) ${string}`);
}

function sendReq(args, proxy) {
	request({
        url: args.target,
        proxy: "http://" + proxy,
        headers: {
            'Connection': 'keep-alive',
        }
    }, (err, res, body) => {
        if (!err) {
            log('[' + 'Info'.cyan + `] Valid: ${proxy}`);
			valid.push(proxy);
		}
    });
}

function start(args) {
	var proxies = fs.readFileSync("proxy.txt", 'utf-8').toString().replace(/\r/g, '').split("\n");
	
	proxies.forEach((proxy) => {
		sendReq(args, proxy);
	})
	
	setTimeout(() => {
        if (valid.length > 10) {
            return require('./emulation/index')(args, valid);
        } else {
            log('[' + 'Error'.red + '] Attack can\'t be started because not enough valid proxy.');
            process.exit(-1);
            process.exit(-1);
            process.exit(-1);
        }
	}, 10 * 1000);
}

module.exports = start;