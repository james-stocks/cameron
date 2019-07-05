# cameron.js

This is a NodeJS app that I use to subscribe to a specific topic on a MQTT broker.

I am using this app to detect motion events detected by a Yi / Xiaomi 1080p camera. When a motion event occurs, it triggers Shinobi to record a video clip. When the motion event finishes, recording stops.

I made this because although fully featured, motion detection in software is really inefficient and puts a lot of strain on CPU. Even with hardware acceleration turned on, I found monitoring an RTSP stream, decoding it and doing differencing with ffmpeg to make my mobile CPU very toasty.

## Stuff I'll maybe do in future
* Pipeline images / video into an object recognition service
* Directly capture from RTSP using ffmpeg
* Trigger a notification?
