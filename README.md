# IoT-Door

## Chip Setup

### Connect via USB

Identify the correct device with:

`ls /dev/tty*`

Then connect to the device with:

`screen /dev/tty.usbmodem1411 115200`.

and login with `chip` password `chip`.


### Connect to WiFi

`sudo nmcli device wifi connect '<Network Name>' password '<Password>' ifname wlan0`

### Checkout this repo into /home/chip

```
git clone https://github.com/tw-sg-maker-night/IoT-Door.git
cd IoT-Door
```

### Install dependencies

`npm install`

### Run!

`sudo node index.js`
