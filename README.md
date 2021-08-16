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
    ![Bump Sensor](https://raw.githubusercontent.com/KidSpark/pxt-sparkbit/assets/images/Bump Sensor.png)
Returns true if pressed, false if not pressed

### Angle Sensor  (green)
    ![Angle Sensor](https://raw.githubusercontent.com/KidSpark/pxt-sparkbit/assets/images/AS.png)

### Light Sensor (yellow)
    ![Light Sensor](https://raw.githubusercontent.com/KidSpark/pxt-sparkbit/assets/images/Light Sensor.png)

### IR Tx/Rx
    ![Gate Sensor](https://raw.githubusercontent.com/KidSpark/pxt-sparkbit/assets/images/IR Sensing Receiver.png)
    High Power IR Transmitter
    Low Power IR Transmitter



  
  
# Driving the outputs

## Rotate Motor
    ![Motor Module](https://raw.githubusercontent.com/KidSpark/pxt-sparkbit/assets/images/Motor Module.png)
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
// Drive motor #1 at speed 60% and direction clockwise.
sparkbitO.rotateMotorDuration(1, 60, Directions.Clockwise)

// Drive motor #2 at speed 100% and direction counterclockwise for 10 seconds (10,000 milliseconds).
sparkbitO.rotateMotorDuration(2, 100, Directions.Counterclockwise, 10000)

//Stop motor #1.
sparkbitO.stopMotor(1)
```

  
  
## Light module
    ![Light Module](https://github.com/KidSpark/pxt-sparkbit/blob/master/assets/images/Light%20Module.png?raw=true)
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
// Turn on light module #2 at brightness 100% and color Red.
sparkbitO.setLightModule(2, 100, Colors.Red)

// Turn on light module #4 at brightness 80% and color Green for 10 seconds (10,000 milliseconds).
sparkbitO.setLightModule(4, 80, Colors.Green, 10000)

//Turn off Light #2.
sparkbitO.stopLight(2)
```


## Supported targets

* for PXT/microbit

## License

MIT
