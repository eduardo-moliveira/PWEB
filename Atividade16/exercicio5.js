const { EventEmitter } = require("events");

const emitter = new EventEmitter();

emitter.on("data", (data) => {
	console.log(data);
});

emitter.emit("data", `Started at ${Date.now()}`);

setInterval(() => {
	emitter.emit("data", Date.now());
}, 500);
