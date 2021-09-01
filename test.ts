{
    // rotate motor on output #1 clockwise for 500 ms non-blocking
    sparkbitO.rotateMotorModule(SparkbitOutPort.Output1, SparkbitDirection.Clockwise, 100, 500)

    //rotate motor on output #2 Counterclockwise for 2000 ms blocking program until complete
    sparkbitO.rotateMotorModule(SparkbitOutPort.Output2, SparkbitDirection.Counterclockwise, 100)
    basic.pause(2000);
    sparkbitO.stopMotorModule(SparkbitOutPort.Output2);

    // set light on output #3 red for 3000 ms non-blocking
    sparkbitO.setLightModule(SparkbitOutPort.Output3, SparkbitColor.Red, 100, 3000)

    //set light on output #4 green for 5000 ms blocking program until complete
    sparkbitO.setLightModule(SparkbitOutPort.Output4, SparkbitColor.Green, 100)
    basic.pause(5000)
    sparkbitO.stopLightModule(SparkbitOutPort.Output4)

    // Play V2 audio on speaker
    //soundExpression.giggle.playUntilDone()

    // Play V1 audio on speaker
    //music.startMelody(music.builtInMelody(Melodies.Dadadadum))

    // Read sensor #1
    basic.showNumber(sparkbitI.analogSensorPercent(SparkbitInPort.Input1))


}
