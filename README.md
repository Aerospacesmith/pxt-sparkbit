## MakeCode Package for Kid Spark Education Spark:bit robotics platform.

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/kidspark/pxt-sparkbit** and import



## Driving the motors individually

If you want more fine grain control of individal motors, use `sparkbitO.rotateMotorDuration(...)` to drive a particular motor either clockwise or counterclockwise.
You can specify the direction (Clockwise or Counterclockwise) and speed between 0 and 100. You can specify an optional duration (in milliseconds) for the motor to rotate before it automatically stops.
```blocks
// Drive motor #1 clockwise at speed 60%.
sparkbitO.rotateMotorDuration(1, 60, Directions.Clockwise)

// Drive motor #2 counterclockwise at speed 80% for 10 seconds (10,000 milliseconds).
sparkbitO.rotateMotorDuration(2, 80, Directions.Counterclockwise, 10000)
```

## Stopping
When the motor speed is set to zero then it stops. There is also a dedicated command for this.
```blocks
// Stop motor #1.
sparkbitO.stopMotor(1)
```



## Supported targets

* for PXT/microbit

## License

MIT
