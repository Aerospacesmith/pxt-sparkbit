{

// Inputs

    //sparkbitI.bumpSensorIsPressed
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)){
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
        basic.clearScreen()
    }

    //sparkbitI.angleSensor
    basic.showNumber(sparkbitI.angleSensor(SparkbitInPort.Input1, SparkbitAngle.Degree))

    //sparkbitI.angleSensorCompareDegree
    if (sparkbitI.angleSensorCompareDegree(SparkbitInPort.Input1, SparkbitLogic.GT, 90)) {
    }

    //sparkbitI.angleSensorComparePercent
    if (sparkbitI.angleSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.GT, 25)) {
    }

    //sparkbitI.lightSensorPercent
    basic.showNumber(sparkbitI.lightSensorPercent(SparkbitInPort.Input1))

    //sparkbitI.lightSensorComparePercent
    if (sparkbitI.lightSensorComparePercent(SparkbitInPort.Input1, SparkbitLogic.LT, 50)) {
    }

    //sparkbitI.irTransmitterIsReceived
    if (sparkbitI.irTransmitterIsReceived(SparkbitInPort.Input1, SparkbitInPort.Input2)) {
    }

    //sparkbitI.analogSensor
    basic.showNumber(sparkbitI.analogSensor(SparkbitInPort.Input1))

    //sparkbitI.analogSensorPercent
    basic.showNumber(sparkbitI.analogSensorPercent(SparkbitInPort.Input1))


// Outputs

    //sparkbitO.rotateMotorModule
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100, 500)
    }

    //sparkbitO.stopMotorModule
    sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100)
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
    }

    //sparkbitO.rotateMotorModuleVelocity
    sparkbitO.rotateMotorModuleVelocity(SparkbitOutPort.Output1, -50)
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.stopMotorModule(SparkbitOutPort.Output1)
    }

    //sparkbitO.setLightModule
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100, 500)
    }

    //sparkbitO.stopLightModule
    sparkbitO.setLightModule(SparkbitOutPort.Output1, SparkbitColor.Green, 100)
    if (sparkbitI.bumpSensorIsPressed(SparkbitInPort.Input1)) {
        sparkbitO.stopLightModule(SparkbitOutPort.Output1)
    }
}
