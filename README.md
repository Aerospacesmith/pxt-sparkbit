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

Used to trigger an event when the bump sensor is pressed.

### sparkbitI.bumpSensorIsPressed
```sig
sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)
```
Returns the bump sensor value as a Boolean `true` if pressed, `false` if not pressed.

**Parameter**
* Input - the input port (1-8) where the bump sensor is connected to the Spark:bit.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)){
    }
})
```

## Angle Sensor (green)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/AS.png?raw=true" alt="Angle Sensor" width="200"/>  

Used to measure the rotation angle between two parts of the mechanism.

### sparkbitI.angleSensor
Returns the angle sensor value as an integer in degrees (`0-359`) or as a percent (`0-100`).

```sig
sparkbitI.angleSensor(SparkbitInPort.Input1, SparkbitAngle.Degree)
```

**Paramaters**
* Input - the input port (1-8) where the angle sensor is connected to the Spark:bit.
* Angle units - the units of the returned value in degrees (`0-359`) or as a percent (`0-100`). 

**Eample**
```blocks
basic.forever(function () {
    basic.showNumber(sparkbitI.angleSensor(SparkbitInPort.Input1, SparkbitAngle.Degree))
})
```

### sparkbitI.angleSensorCompareDegree
Compares the angle sensor value to a number in degrees (`0-359`) and returns a Boolean value of `true` or `false`.

```sig
sparkbitI.angleSensorCompareDegree(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```

**Parameters**
* Input - the input port (1-8) where the angle sensor is connected to the Spark:bit.
* Comparison - the mathmatical operand (equal to, not equal to, less than, lass than or equal to, greater than, greater than or equal to).
* Number - a number in degrees (`0-359`) to compare the angle sensor value against.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.angleSensorCompareDegree(SparkbitInPort.Input1, SparkbitLogic.GT, 90)) {
    }
})
```

### sparkbitI.angleSensorComparePercent
Compares the angle sensor value to a number as a percent (`0-100`) and returns a Boolean value of `true` or `false`.

```sig
sparkbitI.angleSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```

**Parameters**
* Input - the input port (1-8) where the angle sensor is connected to the Spark:bit.
* Comparison - the mathmatical operand (equal to, not equal to, less than, lass than or equal to, greater than, greater than or equal to).
* Number - a number as a percent (`0-100`) to compare the angle sensor value against.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.angleSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.GT, 25)) {
    }
})
```

## Light Sensor (yellow)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Sensor.png?raw=true" alt="Light Sensor" width="200"/>  

Used to measure the amount of light.

### sparkbitI.lightSensorPercent
Returns the light sensor value as an integer between `0` dark and `100` bright.

```sig
sparkbitI.lightSensorPercent(SparkbitInPort.Input1)
```

**Parameter**
* Input - the input port (1-8) where the light sensor is connected to the Spark:bit.

**Example**
```blocks
basic.forever(function () {
    basic.showNumber(sparkbitI.lightSensorPercent(SparkbitInPort.Input1))
})
```

### sparkbitI.lightSensorComparePercent
Compares the light sensor value to a number as a percent (`0-100`) and returns a Boolean value of `true` or `false`.

```sig
sparkbitI.lightSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.EQ, 0)
```

**Parameters**
* Input - the input port (1-8) where the light sensor is connected to the Spark:bit.
* Comparison - the mathmatical operand (equal to, not equal to, less than, lass than or equal to, greater than, greater than or equal to).
* Number - a number as a percent (`0-100`) to compare the light sensor value against.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.lightSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.LT, 50)) {
    }
})
```

## IR Tx/Rx

IR transmiter and receiver block pairs can be combined to make different sensors. A high power pair can project IR light farther to act as a proximity detector or longer range light gate.

To make a low power IR pair, use a Low-Power IR Transmitter (grey) and an IR Receiver (white).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Low%20Power%20IR%20Transmitter.png?raw=true" alt="Low Power IR Transmitter" width="200"/>  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>

To make a high power IR pair, use a High-Power IR Transmitter (black) and an IR Receiver (white).  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/High%20Power%20IR%20Transmitter.png?raw=true" alt="High Power IR Transmitter " width="200"/>  
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/IR%20Sensing%20Receiver.png?raw=true" alt="IR Receiver" width="200"/>

### sparkbitI.irTransmitterIsReceived
Returns a Boolean value of `true` if an IR signal is received from the IR transmitter indicating no obstical. Returns a Boolean value of `false` if the IR signal is not received due to an obstical or being too far apart. This coding block works with both the low-power transmitter (grey) and the high-power transmitter (black).

```sig
sparkbitI.irTransmitterIsReceived(SparkbitInPort.Input1, SparkbitInPort.Input2)
```

**Parameters**
* Transmitter input - the input port (1-8) where the IR transmitter (grey or black) is connected to the Spark:bit.
* Receiver input - the input port (1-8) where the IR receiver (white) is connected to the Spark:bit.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.irTransmitterIsReceived(SparkbitInPort.Input1, SparkbitInPort.Input2)) {
    }
})
```

## Analog Sensor Value

### sparkbitI.analogSensor
Returns the value of any input sensor as a 10-bit integer (`0-1023`).

```sig
sparkbitI.analogSensor(SparkbitInPort.Input1)
```

**Parameters**
* Input - the input port (1-8) where the sensor is connected to the Spark:bit.

**Example**
```blocks
basic.forever(function () {
    basic.showNumber(sparkbitI.analogSensor(SparkbitInPort.Input1))
})
```

### sparkbitI.analogSensorPercent
Returns the value of any input sensor as a percent (`0-100`).

```sig
sparkbitI.analogSensorPercent(SparkbitInPort.Input1)
```

**Parameter**
* Input - the input port (1-8) where the sensor is connected to the Spark:bit.

**Example**
```blocks
basic.forever(function () {
    basic.showNumber(sparkbitI.analogSensorPercent(SparkbitInPort.Input1))
})
```

# Output Modules

## Motor Module (red)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Motor%20Module.png?raw=true" alt="Motor Module" width="400"/>  

Used to rotate parts of the mechanism.

### sparkbitO.rotateMotorModule
Rotates the motor module based on direction, speed, and optional duration.

```sig
sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100)
```

**Paramters**
* Output - the output port (1-4) where the motor module is connected to the Spark:bit.
* Direction - the direction to rotate the motor `clockwise` or `counterclockwise`.
* Speed - the speed of the motor as an integer value from `0` stop to `100` max speed.
* Duration (optional) - by expanding the coding block, you may specify the duration for the motor to rotate in milliseconds (1000 ms = 1 second). If no duration is specified, the motor module will rotate until programmed to stop.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100, 500)
    }
})
```

### sparkbitO.stopMotorModule
Stops the motor module.

```sig
sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
```

**Paramter**
* Output - the output port (1-4) where the motor module is connected to the Spark:bit.

**Example**
```blocks
sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100)
if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
    sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
}
```

### sparkbitO.rotateMotorModuleVelocity
Rotates the motor module based on a velocity and an optional duration. The direction is determined by the value of the velocity, positive values rotate clockwise and negative values rotate counterclockwise.

```sig
sparkbitO.rotateMotorModuleVelocity(SparkbitOutPort.Output1, 0)
```

**Paramters**
* Output - the output port (1-4) where the motor module is connected to the Spark:bit.
* Veloicty - the speed and direction of the motor as an integer value from `-100` to `100`.
* Duration (optional) - by expanding the coding block, you may specify the duration for the motor to rotate in milliseconds (1000 ms = 1 second). If no duration is specified, the motor module will rotate until programmed to stop.

**Example**
```blocks
sparkbitO.rotateMotorModuleVelocity(SparkbitOutPort.Output1, -50)
if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
    sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
}
```

## Light Module (orange)
<img src="https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Module.png?raw=true" alt="Light Module" width="200"/>  

Used to illuminate a red or green LED light.

### sparkbitO.setLightModule
Turns on a red a green LED at a brightness and optional duration.

```sig
sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100)
```

**Parameters**
* Output - the output port (1-4) where the light module is connected to the Spark:bit.
* Color - the color of the LED `red` or `green`
* Brightness - the brightness of the LED as an integer value between `0` off and `100` max brightness.
* Duration (optional) - by expanding the coding block, you may specify the duration for the light module to stay on in milliseconds (1000 ms = 1 second). If no duration is specified, the light module will stay on until programmed to turn off.

**Example**
```blocks
basic.forever(function () {
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100, 500)
    }
})
```

### sparkbitO.stopLightModule
Turns off the light module.

```sig
sparkbitO.stopLightModule(SparkbitOutPort.Output1)
```

**Parameter**
* Output - the output port (1-4) where the light module is connected to the Spark:bit.

**Example**
```blocks
sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100)
if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
    sparkbitO.stopLightModule(SparkbitOutPort.Output1)
}
```

## Supported targets

* for PXT/microbit

## License

MIT

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
