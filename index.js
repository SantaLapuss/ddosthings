const events = require('events');

// Remove useless errors
process.on('uncaughtException', function(e) { });
process.on('unhandledRejection', function(e) { });

process.setMaxListeners(0);

const colors = require('colors');
const execSync = require('child_process').execSync;

//execSync('wget https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt -O proxy.txt');

function log(string) {
    let d = new Date();

    let hours = (d.getHours()<10?'0':'') + d.getHours();
    let minutes = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let seconds = (d.getSeconds()<10?'0':'') + d.getSeconds();

    console.log(`(${hours}:${minutes}:${seconds}) ${string}`);
}

events.EventEmitter.defaultMaxListeners = Infinity;
events.EventEmitter.prototype._maxListeners = Infinity;

const args = require('minimist')(process.argv.slice(2));

var arguments = {
	target: process.argv[2],
	time: process.argv[3],

	humanitization: args["humanitization"] || 'false',

	sessions: args["sessions"] || 15,
	clicktext: args["push"] || 'false',

	rate: args["rate"] || '128',
	threads: args["threads"] || '8',
};


setTimeout(() => {
    process.exit(0);
}, arguments.time * 1000);

function run(arguments) {
	return require('./checker.js')(arguments);
}

run(arguments);