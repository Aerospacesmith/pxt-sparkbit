basic.forever(function () {
    if (sparkbitI.bumpSensor(sparkbitI.__inputNumber(1))) {
        sparkbitO.rotateMotorDuration(sparkbitO.__outputNumber(1), 100, Directions.Clockwise)
    } else {
        sparkbitO.rotateMotorDuration(sparkbitO.__outputNumber(1), 100, Directions.Clockwise)
    }
    if (sparkbitI.testLightSensorPercent(sparkbitI.__inputNumber(2), LogicCompare.LogicCompareGT, 73)) {
        sparkbitO.setLightModule(sparkbitO.__outputNumber(2), 100, Colors.Red)
    } else if (sparkbitI.testAngleSensorDeg(sparkbitI.__inputNumber(3), LogicCompare.LogicCompareLT, 284)) {
        sparkbitO.setLightModule(sparkbitO.__outputNumber(2), 100, Colors.Green)
    } else {
        sparkbitO.stopLight(sparkbitO.__outputNumber(2))
    }
    if (sparkbitI.proximity(sparkbitI.__inputNumber(6), sparkbitI.__inputNumber(8))) {
        sparkbitO.rotateMotorDuration(sparkbitO.__outputNumber(3), Math.constrain(sparkbitI.readLightSensor(sparkbitI.__inputNumber(1)) * sparkbitI.readAngleSensorDeg(DegreePercent.Degree, sparkbitI.__inputNumber(1)), 0, 100), Directions.Clockwise)
    } else {
        sparkbitO.stopMotor(sparkbitO.__outputNumber(3))
    }
    serial.writeValue("Sensor #7", sparkbitI.readAnalogSensorPercent(sparkbitI.__inputNumber(7)))
    serial.writeString("Is angle sensor 5 greater than 50%? ")
    serial.writeLine("" + (sparkbitI.testAngleSensorPercent(sparkbitI.__inputNumber(5), LogicCompare.LogicCompareEQ, 50)))

})