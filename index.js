var awsIot = require('aws-iot-device-sdk');
var Gpio = require('chip-gpio').Gpio;
var deviceName = "chip-door";
var deviceCredentials = {
  keyPath: '/home/chip/certs/private.pem.key',
  certPath: '/home/chip/certs/certificate.pem.crt',
  caPath: '/home/chip/certs/root-CA.pem',
  clientId: deviceName,
  region: 'ap-southeast-1',
  reconnectPeriod: 1500
};

var door = new Gpio(0, 'out');
door.write(0);

var device = awsIot.device(deviceCredentials);
device.subscribe("door");
device.on('message', function(topic, payload) {
    payload = JSON.parse(payload);
    switch (payload.event) {
      case "open":
        door.write(1);
        setTimeout(() => {door.write(0)}, 1000);
        break;
    }
});
