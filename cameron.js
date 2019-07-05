var mqtt = require('mqtt');
var request = require('request');

var Topic = 'yicam/motion';
var Broker_URL = 'mqtt://localhost';
var options = {
	clientId: 'Mosquitto',
	port: 1883,
	username: 'MQTTUSERNAME', 
	password: 'MQTTPASSWORD',
	keepalive : 60
};

var client  = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect(){
	console.log("Connecting MQTT");
	client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
	console.log("Subscribed to " + Topic);

	//run this function when subscribed
	mqtt_messsageReceived();
	if (err) {console.log(err);}
}

function mqtt_reconnect(err){
	console.log("Reconnect MQTT");
	if (err) {console.log(err);}
	client  = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
	console.log("Error!");
	if (err) {console.log(err);}
}

function mqtt_messsageReceived(topic, message, packet) {
	if (message == 'motion_stop') {
		console.log(Date() + ' ' + message + ' stop recording');
		request('http://localhost:8080/APIKEY/monitor/GROUPNAME/CAMERAIDENTIFIER/start');
	} else {
		console.log(Date() + ' ' + message + ' OMG MOTIONNNNN!!!!!');
		request('http://localhost:8080/APIKEY/monitor/GROUPNAME/CAMERAIDENTIFIER/record');
	}
}


function mqtt_close(){
	console.log("Close MQTT");
}
