## MakeCode Package for Kid Spark Education Spark:bit robotics platform.

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/kidspark/pxt-sparkbit** and import

# Reading the inputs

###
Use `sparkbitI.readAnalogSensor(...)` to read a particular input sensor.

### Bump Sensor (blue)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Bump%20Sensor.png?raw=true" alt="Bump Sensor" width="200"/>  
Returns `true` if pressed, `false` if not pressed.

```blocks
basic.forever(function () {
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)){
    }
}

```

### Angle Sensor (green)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/AS.png?raw=true" alt="Angle Sensor" width="200"/>  
Returns angle sensor value as an integer between `0` and `100`.

### Light Sensor (yellow)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Sensor.png?raw=true" alt="Light Sensor" width="200"/>  
Returns light sensor value as an integer between `0` and `100`.


## IR Tx/Rx
### Light Gate
To make a light gate, use an IR Receiver (white) and Low Power IR Transmitter (grey).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Low%20Power%20IR%20Transmitter.png?raw=true" alt="Low Power IR Transmitter" width="200"/>  

### Proximity Detector
To make a proximity detector, use an IR Receiver (white) and High Power IR Transmitter (black).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/High%20Power%20IR%20Transmitter.png?raw=true" alt="High Power IR Transmitter " width="200"/>  

Returns `true` if an IR signal is received from the IR transmitter indicating no obstical. Use a `not` block 

  
# Driving the outputs

## Rotate Motor
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Motor%20Module.png?raw=true" alt="Motor Module" width="200"/>
Use `sparkbitO.rotateMotorDuration(...)` to drive a particular motor either clockwise or counterclockwise.
You can specify the direction (Clockwise or Counterclockwise) and speed between 0 and 100. You can specify an optional duration (in milliseconds) for the motor to rotate before it automatically stops.

The block takes four parameters: motor select, direction, speed, and optionally duration.
* Motor select is the output port integer value between `1` and `4`
* Direction must be either `Clockwise` or `Counterclockwise`
* Speed is an integer value between `0` and `100`
* Duration is an integer value in milliseconds

## Stopping
When the motor speed is set to zero then it stops. There is also a dedicated function for this.
Use `sparkbitO.stopMotor(...)` to stop the specified motor module.

### Examples
```blocks
// Drive motor #1 clockwise at 60% speed.
sparkbitO.rotateMotorDuration(1, Directions.Clockwise, 60)

// Drive motor #2 counterclockwise at 100% speed for 10 seconds (10,000 milliseconds).
sparkbitO.rotateMotorDuration(2, Directions.Counterclockwise, 100, 10000)

//Stop motor #1.
sparkbitO.stopMotor(1)
```

  
  
## Light module (orange)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Module.png" alt="Light Module" width="200"/>
Use `setLightModule(...)` to turn on the LED in the light module.
You can specify the color (Green or Red) and brightness between 0 and 100. You can specify an optional duration (in milliseconds) for the LED to illuminate before it automatically turns off.

The block takes four parameters: light select, color, brightness, and optionally duration.
* Light select is the output port integer value between `1` and `4`
* Color must be either `Green` or `Red`
* Brightness is an integer value between `0` and `100`
* Duration is an integer value in milliseconds

## Turning off
When the LED brightness is set to zero then it turns off. There is also a dedicated function for this.
Use `sparkbitO.stopLight(...)` to turn off the specified light module.

### Examples
```blocks
// Turn light module #2 Red at 100% brightness.
sparkbitO.setLightModule(2, Colors.Red, 100)

// Turn light module #4 Green at 80% brightness for 10 seconds (10,000 milliseconds).
sparkbitO.setLightModule(4, Colors.Green, 80, 10000)

//Turn off Light #2.
sparkbitO.stopLight(2)
```


## Supported targets

* for PXT/microbit

## License

MIT

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
