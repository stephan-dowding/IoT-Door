console.log("starting...");
var awsIot = require('aws-iot-device-sdk');
var Gpio = require('chip-gpio').Gpio;
var deviceName = "chip-door";
var deviceCredentials = {
  keyPath: '/home/chip/certs/us-east-1/private.pem.key',
  certPath: '/home/chip/certs/us-east-1/certificate.pem.crt',
  caPath: '/home/chip/certs/root-CA.pem',
  clientId: deviceName,
  region: 'us-east-1',
  reconnectPeriod: 1500
};

var door = new Gpio(1, 'out');
door.write(1);

var device = awsIot.device(deviceCredentials);
device.on('connect', function() {
  console.log('connected');
  device.subscribe("door");
});

device.on('error', function(error) {
  console.log("ERROR **************");
  console.log(error);
  console.log("********************");
})

device.on('message', function(topic, payload) {
  console.log("recieved message");
  payload = JSON.parse(payload);
  console.log(payload);
  switch (payload.event) {
    case "open":
      console.log("OPEN!!");
      door.write(0);
      setTimeout(() => {door.write(1)}, 1000);
      break;
  }
});

console.log("started");
