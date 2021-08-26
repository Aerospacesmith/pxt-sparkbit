{
    // rotate motor on output #1 500 ms clockwise
    sparkbitO.rotateMotorModule(sparkbitO.__sparkbitOutputPort(1), SparkbitDirection.Clockwise, 100, 500);
    basic.pause(100);
    sparkbitO.stopMotorModule(1);

    // set light on output #2 red for 500 ms
    sparkbitO.setLightModule(sparkbitO.__sparkbitOutputPort(2), SparkbitColors.Red, 100, 500);
    basic.pause(100);
    sparkbitO.stopLightModule(2);

    // Play V2 audio on speaker
    soundExpression.giggle.playUntilDone();

    // Play V1 audio on speaker
    music.startMelody(music.builtInMelody(Melodies.Dadadadum));

    // Read sensor #1
    basic.showNumber(sparkbitI.analogSensorPercent(1));


}
