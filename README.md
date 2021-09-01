## MakeCode Extension for Kid Spark Education Spark:bit robotics platform.

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the **Advanced** category
* search for **https://github.com/kidspark/pxt-sparkbit** and import

## Tutorials

MakeCode step-by-step tutorials for the STEM Pathways Lab are available on the [Kid Spark Education](https://kidsparkeducation.org/robotics) website.

# Input Sensors

## Bump Sensor (blue)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Bump%20Sensor.png?raw=true" alt="Bump Sensor" width="200"/>  

### sparkbitI.bumpSensorIsPressed
Returns `true` if pressed, `false` if not pressed.

```sig
sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)
```


```blocks
basic.forever(function () {
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)){
    }
})
```

## Angle Sensor (green)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/AS.png?raw=true" alt="Angle Sensor" width="200"/>  

### sparkbitI.angleSensor
Returns angle sensor value as an integer in degrees or as a percent.

```sig
sparkbitI.angleSensor(SparkbitInPort.Input1, SparkbitAngle.Degree)
```

Paramaters
Degree
Percent

### sparkbitI.angleSensorCompareDegree

```sig
sparkbitI.angleSensorCompareDegree(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```

### sparkbitI.angleSensorComparePercent

```sig
sparkbitI.angleSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```


## Light Sensor (yellow)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Sensor.png?raw=true" alt="Light Sensor" width="200"/>  


### sparkbitI.lightSensorPercent

```sig
sparkbitI.lightSensorPercent(SparkbitInPort.Input1)
```


### sparkbitI.lightSensorComparePercent
Returns light sensor value as an integer between `0` and `100`.

```sig
sparkbitI.lightSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```


## IR Tx/Rx

To make a light gate, use an IR Receiver (white) and Low-Power IR Transmitter (grey).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Low%20Power%20IR%20Transmitter.png?raw=true" alt="Low Power IR Transmitter" width="200"/>  

To make a proximity detector, use an IR Receiver (white) and High-Power IR Transmitter (black).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/High%20Power%20IR%20Transmitter.png?raw=true" alt="High Power IR Transmitter " width="200"/>  

### sparkbitI.irTransmitterIsReceived

Returns `true` if an IR signal is received from the IR transmitter indicating no obstical. Use a `not` block 

```sig
sparkbitI.irTransmitterIsReceived(SparkbitInPort.Input1, SparkbitInPort.Input2)
```

## Analog Sensor Value

### sparkbitI.analogSensor

```sig
sparkbitI.analogSensor(SparkbitInPort.Input1)
```

### sparkbitI.analogSensorPercent

Use `sparkbitI.readAnalogSensor(...)` to read a particular input sensor.

```sig
sparkbitI.analogSensorPercent(SparkbitInPort.Input1)
```




# Output Modules

## Motor Module
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Motor%20Module.png?raw=true" alt="Motor Module" width="200"/> 

### sparkbitO.rotateMotorModule

```sig
sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100)
```


### sparkbitO.stopMotorModule

```sig
sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
```

### sparkbitO.rotateMotorModuleVelocity

```sig
sparkbitO.rotateMotorModuleVelocity(SparkbitOutPort.Output1, 0)
```


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
sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 60)

// Drive motor #2 counterclockwise at 100% speed for 10 seconds (10,000 milliseconds).
sparkbitO.rotateMotorModule(SparkbitOutPort.Output2, SparkbitDirection.Counterclockwise, 100, 10000)

//Stop motor #1.
sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
```

  
  
## Light Module (orange)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Module.png?raw=true" alt="Light Module" width="200"/>  
Use `setLightModule(...)` to turn on the LED in the light module.
You can specify the color (Green or Red) and brightness between 0 and 100. You can specify an optional duration (in milliseconds) for the LED to illuminate before it automatically turns off.

### sparkbitO.setLightModule

```sig
sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100)
```

### sparkbitO.stopLightModule

``sig
sparkbitO.stopLightModule(SparkbitOutPort.Output1)
```

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
sparkbitO.setLightModule(SparkbitOutPort.Output2, SparkbitColor.Red, 100)

// Turn light module #4 Green at 40% brightness for 10 seconds (10,000 milliseconds).
sparkbitO.setLightModule(SparkbitOutPort.Output4, SparkbitColor.Green, 40, 10000)

//Turn off Light #2.
sparkbitO.stopLightModule(SparkbitOutPort.Output2)
```


## Supported targets

* for PXT/microbit

## License

MIT

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
