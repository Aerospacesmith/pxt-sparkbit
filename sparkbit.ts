


/**
  * Enumeration of directions.
  */
enum SparkbitDirection {
    //% block="clockwise"
    Clockwise = 0,
    //% block="counterclockwise"
    Counterclockwise = 1
}

/**
  * Enumeration of LED Colors.
  */
enum SparkbitColor {
    //% block="green"
    Green = 0,
    //% block="red"
    Red = 1
}

enum SparkbitLogic {
    //% block="="
    EQ,
    //% block="≠"
    NEQ,
    //% block="<"
    LT,
    //% block="≤"
    LTE,
    //% block=">"
    GT,
    //% block="≥"
    GTE
}

enum SparkbitAngle {
    //% block="degrees (°)"
    Degree,
    //% block="percent (%)"
    Percent
}

  /**
  * Enumeration of Inputs.
  */
//% emitAsConstant
enum SparkbitInPort {
    //% block="input 1"
    Input1 = 1,
    //% block="input 2"
    Input2 = 2,
    //% block="input 3"
    Input3 = 3,
    //% block="input 4"
    Input4 = 4,
    //% block="input 5"
    Input5 = 5,
    //% block="input 6"
    Input6 = 6,
    //% block="input 7"
    Input7 = 7,
    //% block="input 8"
    Input8 = 8
}

  /**
  * Enumeration of Outputs.
  */
//% emitAsConstant
enum SparkbitOutPort {
    //% block="output 1"
    Output1 = 1,
    //% block="output 2"
    Output2 = 2,
    //% block="output 3"
    Output3 = 3,
    //% block="output 4"
    Output4 = 4
}

//% enumIdentity="SparkbitInPort.Input1"
const INPUT1 = SparkbitInPort.Input1;
//% enumIdentity="SparkbitInPort.Input2"
const INPUT2 = SparkbitInPort.Input2;
//% enumIdentity="SparkbitInPort.Input3"
const INPUT3 = SparkbitInPort.Input3;
//% enumIdentity="SparkbitInPort.Input4"
const INPUT4 = SparkbitInPort.Input4;
//% enumIdentity="SparkbitInPort.Input5"
const INPUT5 = SparkbitInPort.Input5;
//% enumIdentity="SparkbitInPort.Input6"
const INPUT6 = SparkbitInPort.Input6;
//% enumIdentity="SparkbitInPort.Input7"
const INPUT7 = SparkbitInPort.Input7;
//% enumIdentity="SparkbitInPort.Input8"
const INPUT8 = SparkbitInPort.Input8;


//% enumIdentity="SparkbitOutPort.Output1"
const OUTPUT1 = SparkbitOutPort.Output1;
//% enumIdentity="SparkbitOutPort.Output2"
const OUTPUT2 = SparkbitOutPort.Output2;
//% enumIdentity="SparkbitOutPort.Output3"
const OUTPUT3 = SparkbitOutPort.Output3;
//% enumIdentity="SparkbitOutPort.Output4"
const OUTPUT4 = SparkbitOutPort.Output4;

/**
 * Custom Blocks for Sparkbit Input functionality.
 */
//% color="#ff9933"  weight=601 icon="\uf085" block="Spark:bit Inputs"
//% groups="['Bump Sensor (blue)','Angle Sensor (green)','Light Sensor (yellow)','IR Tx/Rx (black/white or gray/white)']"
namespace sparkbitI {

    /**
     * Returns 10 bit analog value of sensor
     * @param channel Sensor Input (1-8) eg: 1
     */
    //% block="analog sensor $channel 10 bit value"
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% advanced = true
    //% parts="v2"
    export function analogSensor(channel: number): number {
        if (channel < 1) channel = 1;
        if (channel > 8) channel = 8;
        switch (channel) { //reverses sensor ports 1-8 to match schematics.
            case 1:
                channel = 8;
                break;
            case 2:
                channel = 7;
                break;
            case 3:
                channel = 6;
                break;
            case 4:
                channel = 5;
                break;
            case 5:
                channel = 4;
                break;
            case 6:
                channel = 3;
                break;
            case 7:
                channel = 2;
                break;
            case 8:
                channel = 1;
                break;
        }
        channel -= 1;
        let result = 0x0000;
        let configurationByte = ((channel << 1) & 0b00001110) | 0b01100001;
        pins.i2cWriteNumber(MAX11608_I2C_ADDR, (configurationByte & (~0x80)), NumberFormat.UInt8BE);

        result = pins.i2cReadNumber(MAX11608_I2C_ADDR, NumberFormat.UInt16BE) & 0x03FF;
        // result = pins.i2cReadNumber(MAX11608_I2C_ADDR, NumberFormat.UInt16BE) - 0xFC00;
        // result = (pins.i2cReadNumber(MAX11608_I2C_ADDR, NumberFormat.UInt8BE, true) & 0x03) << 8;
        // result |= pins.i2cReadNumber(MAX11608_I2C_ADDR, NumberFormat.UInt8BE, false) & 0x00ff;
        return result;
    }


    /**
     * Returns value of analog sensor in percentage
     * @param channel Sensor Input (1-8) eg: 1
     */
    //% block="analog sensor $channel percent (\\%)"
    //% weight=1
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitAngleEnum" operator.defl=SparkbitAngle.Degree
    //% advanced = true
    //% parts="v2"
    export function analogSensorPercent(channel: number): number {
        let value = analogSensor(channel);
        value = Math.map(value, 0, 1023, 0, 100);
        value = Math.round(value);
        if (value > 99) value = 100;
        if (value < 1) value = 0;
        return value;
    }


    /**
     * Returns true if pressed, false if not pressed
     * @param channel Sensor Input (1-8) eg: 1
     */
    //% block="bump sensor $channel is pressed"
    //% group="Bump Sensor (blue)"
    //% weight=200
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% parts="v2"
    export function bumpSensorIsPressed(channel: number): boolean {
        return readDigitalSensorBool(channel);
    }


    /**
     * Returns value of angle sensor
     * @param channel Sensor Input (1-8) eg: 1
     */
    //% block="angle sensor $channel $operator"
    //% group="Angle Sensor (green)"
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitAngleEnum" operator.defl=SparkbitAngle.Degree
    //% weight=100
    //% parts="v2"
    export function angleSensor(channel: number, operator: SparkbitAngle): number {
        if (operator == SparkbitAngle.Degree) {
            return Math.round(Math.map(analogSensor(channel), 0, 1023, 0, 359));
        }
        else if (operator == SparkbitAngle.Percent) {
            return Math.round(Math.map(analogSensor(channel), 0, 1023, 0, 100));
        }
        else return 0;
    }


    /**
      * Compares Angle Degree to Value and returns Boolean
      * @param channel Sensor Input (1-8) eg: 1
      */
    //% block="angle sensor $channel $operator $value degrees (°)"
    //% group="Angle Sensor (green)"
    //% weight=99
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitLogic_enum" operator.defl=SparkbitLogic.EQ
    //% value.min=0 value.max=359
    //% parts="v2"
    export function angleSensorCompareDegree(channel: number, operator: SparkbitLogic, value: number): boolean {
        let percentInputValue = Math.map(analogSensor(channel), 0, 1023, 0, 359);
        return (sparkbitLogicCompare(operator, percentInputValue, value));
    }

 
    /**
      * Compares Angle Percent to Value and returns Boolean
      * @param channel Sensor Input (1-8) eg: 1
      */
    //% block="angle sensor $channel $operator $value percent (\\%)"
    //% group="Angle Sensor (green)"
    //% weight=98
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitLogic_enum" operator.defl=SparkbitLogic.EQ
    //% value.min=0 value.max=100
    //% parts="v2"
    export function angleSensorComparePercent(channel: number, operator: SparkbitLogic, value: number): boolean {
        let percentInputValue = Math.map(analogSensor(channel), 0, 1023, 0, 100);
        return (sparkbitLogicCompare(operator, percentInputValue, value));
    }


    /**
     * Returns value of light sensor
     * @param channel Sensor Input (1-8) eg: 1
     */
    //% block="light sensor $channel percent (\\%)"
    //% group="Light Sensor (yellow)"
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitAngleEnum" operator.defl=SparkbitAngle.Degree
    //% weight=150
    //% parts="v2"
    export function lightSensorPercent(channel: number): number {
        let value = analogSensor(channel);
        value = Math.map(value, 0, 1023, 0, 100);
        value = Math.round(value);
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        return value;
    }


    /**
      * Compares Light Percent to Value and returns Boolean
      * @param channel Sensor Input (1-8) eg: 1
      */
    //% block="light sensor $channel $operator $value percent (\\%)"
    //% group="Light Sensor (yellow)"
    //% weight=149
    //% channel.shadow="input" channel.defl=sparkbitI._input(INPUT1)
    //% operator.shadow="sparkbitLogic_enum" operator.defl=SparkbitLogic.EQ
    //% value.min=0 value.max=100
    //% parts="v2"
    export function lightSensorComparePercent(channel: number, operator: SparkbitLogic, value: number): boolean {
        let percentInputValue = Math.map(analogSensor(channel), 0, 1023, 0, 100);
        return (sparkbitLogicCompare(operator, percentInputValue, value));
    }

 
    /**
     * Pulses IR Transmitter and checks if signal is reflected. Returns Boolean.
     * @param TXpin Sensor Input (1-8) eg: 1
     * @param RXpin Sensor Input (1-8) eg: 2
     */
    //% block="IR transmitter $TXpin is received on $RXpin"
    //% group="IR Tx/Rx (black/white or gray/white)"
    //% weight=50
    //% TXpin.shadow="input" TXpin.defl=sparkbitI._input(INPUT1)
    //% RXpin.shadow="input" RXpin.defl=sparkbitI._input(INPUT1)
    //% parts="v2"
    export function irTransmitterIsReceived(TXpin: number, RXpin: number): boolean {
        if (TXpin == RXpin) {   // error, TXpin cannot equal RXpin
            TXpin = 1;
            RXpin = 2;
        }
        setDigitalSensorDir(TXpin, 0);
        writeDigitalSensor(TXpin, 1);
        basic.pause(2);
        let ProxIn = !readDigitalSensorBool(RXpin);
        writeDigitalSensor(TXpin, 0);
        setDigitalSensorDir(TXpin, 1);

        return ProxIn;
    }

 
    //% blockId=input 
    //% block="$input"
    //% blockHidden=true
    //% parts="v2"
    export function _input(input : SparkbitInPort): number {
        return input;
    }
  
    //% blockId=INPUT1 
    //% block="input 1"
    //% blockHidden=true
    //% parts="v2"
    export function _INPUT1(): number {
        return 1;
    }

 

    //% blockId=sparkbitLogic_enum
    //% block="$operator"
    //% blockHidden=true
    //% operator.fieldEditor="gridpicker"
    //% operator.fieldOptions.width=220
    //% operator.fieldOptions.columns=1
    //% parts="v2"
    export function _sparkbitLogic_enum(operator: SparkbitLogic): number {
        switch (operator) {
            case SparkbitLogic.EQ: return 0;
            case SparkbitLogic.NEQ: return 1;
            case SparkbitLogic.LT: return 2;
            case SparkbitLogic.LTE: return 3;
            case SparkbitLogic.GT: return 4;
            case SparkbitLogic.GTE: return 5;
            default: return -1;
        }
    }

    /**
      * Return true if both inputs equal each other.
      */
    //% blockId=EQ 
    //% block="="
    //% blockHidden=true
    //% parts="v2"
    export function _EQ(): number {
        return 0;
    }
    /**
      * Return true if both inputs are not equal to each other.
      */
    //% blockId=NEQ 
    //% block="≠"
    //% blockHidden=true
    //% parts="v2"
    export function _NEQ(): number {
        return 1;
    }
    /**
      * Return true if the first input is smaller than the second input.
      */
    //% blockId=LT 
    //% block="<"
    //% blockHidden=true
    //% parts="v2"
    export function _LT(): number {
        return 2;
    }
    /**
      * Return true if the first input is smaller than or equal to the second input.
      */
    //% blockId=LTE 
    //% block="≤"
    //% blockHidden=true
    //% parts="v2"
    export function _LTE(): number {
        return 3;
    }
    /**
      * Return true if the first input is greater than the second input.
      */
    //% blockId=GT 
    //% block=">"
    //% blockHidden=true
    //% parts="v2"
    export function _GT(): number {
        return 4;
    }
    /**
      * Return true if the first input is greater than or equal to the second input.
      */
    //% blockId=GTE 
    //% block="≥"
    //% blockHidden=true
    //% parts="v2"
    export function _GTE(): number {
        return 5;
    }

    //% blockId=sparkbitAngleEnum
    //% block="$operator"
    //% blockHidden=true
    //% operator.fieldEditor="gridpicker"
    //% operator.fieldOptions.width=220
    //% operator.fieldOptions.columns=1
    //% parts="v2"
    export function _sparkbitAngleEnum(operator: SparkbitAngle): number {
        switch (operator) {
            case SparkbitAngle.Degree: return 0;
            case SparkbitAngle.Percent: return 1;
            default: return -1;
        }
    }
    /**
      * Returns a number value of 0-359
      */
    //% blockId=sparkbitAngleDegree 
    //% block="degrees (°)"
    //% blockHidden=true
    //% parts="v2"
    export function _sparkbitAngleDegree(): number {
        return 0;
    }
    /**
     * Returns a number value of 0-100
     */
    //% blockId=sparkbitAnglePercent 
    //% block="percent (\\%)"
    //% blockHidden=true
    //% parts="v2"
    export function _sparkbitAnglePercent(): number {
        return 1;
    }

 

  
}

/**
 * Custom Blocks for Sparkbit Output functionality.
 */
//% color="#ff9933"  weight=600 icon="\uf085" block="Spark:bit Outputs"
//% groups="['Motor Module (red)','Light Module (orange)']"
namespace sparkbitO {

    /**
     * Turns a motor module with direction, speed (0 to 100), and duration.
     * @param motor Output (1-4) eg: 1
     */
    //% block="rotate motor module $motor $direction at speed $speed percent (\\%) || for $duration ms"
    //% group="Motor Module (red)"
    //% weight=90
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% motor.shadow="output" motor.defl=sparkbitO._output(OUTPUT1)
    //% direction.shadow="sparkbitDirectionEnum" direction.defl=SparkbitDirection.Clockwise
    //% speed.min=0 speed.max=100 speed.defl=100
    //% duration.shadow=timePicker
    //% parts="v2"
    export function rotateMotorModule(motor: number, direction: SparkbitDirection, speed: number, duration?: number): void {
        speed = Math.map(speed, 0, 100, 0, 1023);

        if (duration == undefined) {
            if (direction == SparkbitDirection.Clockwise) {
                motorWrite(motor, false, speed);
            }
            else if (direction == SparkbitDirection.Counterclockwise) {
                motorWrite(motor, true, speed);
            }
        }
        else {
            switch (motor) {
                case 1:
                    if (direction == SparkbitDirection.Clockwise) outputsState[0] = false;
                    else if (direction == SparkbitDirection.Counterclockwise) outputsState[0] = true;
                    outputsValue[0] = speed;
                    outputsDuration[0] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_1_DELAY_OFF, 10);
                    break;
                case 2:
                    if (direction == SparkbitDirection.Clockwise) outputsState[1] = false;
                    else if (direction == SparkbitDirection.Counterclockwise) outputsState[1] = true;
                    outputsValue[1] = speed;
                    outputsDuration[1] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_2_DELAY_OFF, 10);
                    break;
                case 3:
                    if (direction == SparkbitDirection.Clockwise) outputsState[2] = false;
                    else if (direction == SparkbitDirection.Counterclockwise) outputsState[2] = true;
                    outputsValue[2] = speed;
                    outputsDuration[2] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_3_DELAY_OFF, 10);
                    break;
                case 4:
                    if (direction == SparkbitDirection.Clockwise) outputsState[3] = false;
                    else if (direction == SparkbitDirection.Counterclockwise) outputsState[3] = true;
                    outputsValue[3] = speed;
                    outputsDuration[3] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_4_DELAY_OFF, 10);
                    break;
            }
        }
    }

    /**
     * Stops motor module.
     * @param motor Output (1-4) eg: 1
     */
    //% block="stop motor module $motor"
    //% group="Motor Module (red)"
    //% weight=80
    //% motor.shadow="output" motor.defl=sparkbitO._output(OUTPUT1)
    //% parts="v2"
    export function stopMotorModule(motor: number): void {
        motorWrite(motor, false, 0);
    }
    

    //% parts="v2"
    export function motorWrite(motor: number, direction: boolean, speed: number): void {
        if (speed < 0) speed = 0;
        if (speed > 1023) speed = 1023;
        speed /= 4; //range to 0-255
        if (motor > 4 || motor < 1) motor = 1;
        switch (motor) { //reverses sensor ports 1-4 to match schematics. 5-8 are fine.
            case 1:
                motor = 4;
                break;
            case 2:
                motor = 3;
                break;
            case 3:
                motor = 2;
                break;
            case 4:
                motor = 1;
                break;
        }

        let dirBit = 1 << (2 * (motor - 1));
        let clearBit = ~dirBit;

        let regDada = getreg(SX1509_I2C_ADDR, REG_DATA_B);
        if (direction) regDada |= dirBit;
        else regDada &= clearBit;

        setreg(SX1509_I2C_ADDR, REG_DATA_B, regDada);   //set Direction

        switch (motor) {
            case 1:
                setreg(SX1509_I2C_ADDR, REG_I_ON_9, 255 - speed);
                break;
            case 2:
                setreg(SX1509_I2C_ADDR, REG_I_ON_11, 255 - speed);
                break;
            case 3:
                setreg(SX1509_I2C_ADDR, REG_I_ON_13, 255 - speed);
                break;
            case 4:
                setreg(SX1509_I2C_ADDR, REG_I_ON_15, 255 - speed);
                break;
        }
    }

    /**
     * Turns a motor module with velocity (-100 to 100), and duration.
     * @param motor Output (1-4) eg: 1
     */
    //% block="rotate motor module $motor at velocity $velocity percent (\\%) || for $duration ms"
    //% group="Motor Module (red)"
    //% weight=70
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% motor.shadow="output" motor.defl=sparkbitO._output(OUTPUT1)
    //% velocity.min=-100 velocity.max=100
    //% duration.shadow=timePicker
    //% advanced = true
    //% parts="v2"
    export function rotateMotorModuleVelocity(motor: number, velocity: number, duration?: number): void {
        if (velocity > 0){
            velocity = Math.map(velocity, 0, 100, 0, 1023);
        }
        else if (velocity < 0) {
            velocity = -Math.map(Math.abs(velocity), 0, 100, 0, 1023);
        }

        if (velocity < -1023) velocity = -1023;
        if (velocity > 1023) velocity = 1023;

        if (duration == undefined) {
            if (velocity > 0) {
                motorWrite(motor, COUNTER_CLOCKWISE, velocity);
            }
            else {
                motorWrite(motor, CLOCKWISE, -velocity);
            }
        }
        else {
            switch (motor) {
                case 1:
                    if (velocity > 0) outputsState[0] = false;
                    else if (velocity < 0) outputsState[0] = true;
                    outputsValue[0] = Math.abs(velocity);
                    outputsDuration[0] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_1_DELAY_OFF, 10);
                    break;
                case 2:
                    if (velocity > 0) outputsState[1] = false;
                    else if (velocity < 0) outputsState[1] = true;
                    outputsValue[1] = Math.abs(velocity);
                    outputsDuration[1] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_2_DELAY_OFF, 10);
                    break;
                case 3:
                    if (velocity > 0) outputsState[2] = false;
                    else if (velocity < 0) outputsState[2] = true;
                    outputsValue[2] = Math.abs(velocity);
                    outputsDuration[2] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_3_DELAY_OFF, 10);
                    break;
                case 4:
                    if (velocity > 0) outputsState[3] = false;
                    else if (velocity < 0) outputsState[3] = true;
                    outputsValue[3] = Math.abs(velocity);
                    outputsDuration[3] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_4_DELAY_OFF, 10);
                    break;
            }
        }

    }

    /**
     * Turns on the LED in the light module with color (Green or Red), brightness (0 to 100), and duration.
     * @param output Output (1-4) eg: 1
     */
    //% block="set light module $output to $color at brightness $brightness percent (\\%) || for $duration ms"
    //% group="Light Module (orange)"
    //% weight=20
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% output.shadow="output" output.defl=sparkbitO._output(OUTPUT1)
    //% color.shadow="sparkbitColorEnum" color.defl=SparkbitColor.Green
    //% brightness.min=0 brightness.max=100 brightness.defl=100
    //% duration.shadow=timePicker
    //% parts="v2"
    export function setLightModule(output: number, color: SparkbitColor, brightness: number, duration?: number): void {
        brightness = Math.map(brightness, 0, 100, 0, 1023);

        if (duration == undefined) {
            if (color == SparkbitColor.Red) {
                motorWrite(output, true, brightness);
            }
            else if (color == SparkbitColor.Green) {
                motorWrite(output, false, brightness);
            }
        }
        else {
            switch (output) {
                case 1:
                    if (color == SparkbitColor.Red) outputsState[0] = true;
                    else if (color == SparkbitColor.Green) outputsState[0] = false;
                    outputsValue[0] = brightness;
                    outputsDuration[0] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_1_DELAY_OFF, 10);
                    break;
                case 2:
                    if (color == SparkbitColor.Red) outputsState[1] = true;
                    else if (color == SparkbitColor.Green) outputsState[1] = false;
                    outputsValue[1] = brightness;
                    outputsDuration[1] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_2_DELAY_OFF, 10);
                    break;
                case 3:
                    if (color == SparkbitColor.Red) outputsState[2] = true;
                    else if (color == SparkbitColor.Green) outputsState[2] = false;
                    outputsValue[2] = brightness;
                    outputsDuration[2] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_3_DELAY_OFF, 10);
                    break;
                case 4:
                    if (color == SparkbitColor.Red) outputsState[3] = true;
                    else if (color == SparkbitColor.Green) outputsState[3] = false;
                    outputsValue[3] = brightness;
                    outputsDuration[3] = duration;
                    control.raiseEvent(EVENTID_OUTPUT_4_DELAY_OFF, 10);
                    break;
            }
        }
    }

    /**
     * Turns off the LED in the light module.
     * @param output Output (1-4) eg: 1
     */
    //% block="turn off light module $output"
    //% group="Light Module (orange)"
    //% weight=10
    //% output.shadow="output" output.defl=sparkbitO._output(OUTPUT1)
    //% parts="v2"
    export function stopLightModule(output: number): void {
        motorWrite(output, false, 0);
    }


 
    //% blockId=sparkbitDirectionEnum
    //% block="$direction"
    //% blockHidden=true
    //% direction.fieldEditor="gridpicker"
    //% direction.fieldOptions.width=220
    //% direction.fieldOptions.columns=1
    //% parts="v2"
    export function _sparkbitDirectionEnum(direction: SparkbitDirection): SparkbitDirection {
        return direction;
    }

    //% blockId=sparkbitColorEnum
    //% block="$color"
    //% blockHidden=true
    //% color.fieldEditor="gridpicker"
    //% color.fieldOptions.width=220
    //% color.fieldOptions.columns=1
    //% parts="v2"
    export function _sparkbitColorEnum(color: SparkbitColor): SparkbitColor {
        return color;
    }

 
    //% blockId=output 
    //% block="$output"
    //% blockHidden=true
    //% parts="v2"
    export function _output(output : SparkbitOutPort): number {
        return output;
    }


}


/**
 * Constants
 */
const REG_INPUT_DISABLE_B = 0x00	//	RegInputDisableB Input buffer disable register _ I/O[15_8] (Bank B) 0000 0000
const REG_INPUT_DISABLE_A = 0x01	//	RegInputDisableA Input buffer disable register _ I/O[7_0] (Bank A) 0000 0000
const REG_LONG_SLEW_B = 0x02	//	RegLongSlewB Output buffer long slew register _ I/O[15_8] (Bank B) 0000 0000
const REG_LONG_SLEW_A = 0x03	//	RegLongSlewA Output buffer long slew register _ I/O[7_0] (Bank A) 0000 0000
const REG_LOW_DRIVE_B = 0x04	//	RegLowDriveB Output buffer low drive register _ I/O[15_8] (Bank B) 0000 0000
const REG_LOW_DRIVE_A = 0x05	//	RegLowDriveA Output buffer low drive register _ I/O[7_0] (Bank A) 0000 0000
const REG_PULL_UP_B = 0x06	//	RegPullUpB Pull_up register _ I/O[15_8] (Bank B) 0000 0000
const REG_PULL_UP_A = 0x07	//	RegPullUpA Pull_up register _ I/O[7_0] (Bank A) 0000 0000
const REG_PULL_DOWN_B = 0x08	//	RegPullDownB Pull_down register _ I/O[15_8] (Bank B) 0000 0000
const REG_PULL_DOWN_A = 0x09	//	RegPullDownA Pull_down register _ I/O[7_0] (Bank A) 0000 0000
const REG_OPEN_DRAIN_B = 0x0A	//	RegOpenDrainB Open drain register _ I/O[15_8] (Bank B) 0000 0000
const REG_OPEN_DRAIN_A = 0x0B	//	RegOpenDrainA Open drain register _ I/O[7_0] (Bank A) 0000 0000
const REG_POLARITY_B = 0x0C	//	RegPolarityB Polarity register _ I/O[15_8] (Bank B) 0000 0000
const REG_POLARITY_A = 0x0D	//	RegPolarityA Polarity register _ I/O[7_0] (Bank A) 0000 0000
const REG_DIR_B = 0x0E	//	RegDirB Direction register _ I/O[15_8] (Bank B) 1111 1111
const REG_DIR_A = 0x0F	//	RegDirA Direction register _ I/O[7_0] (Bank A) 1111 1111
const REG_DATA_B = 0x10	//	RegDataB Data register _ I/O[15_8] (Bank B) 1111 1111*
const REG_DATA_A = 0x11	//	RegDataA Data register _ I/O[7_0] (Bank A) 1111 1111*
const REG_INTERRUPT_MASK_B = 0x12	//	RegInterruptMaskB Interrupt mask register _ I/O[15_8] (Bank B) 1111 1111
const REG_INTERRUPT_MASK_A = 0x13	//	RegInterruptMaskA Interrupt mask register _ I/O[7_0] (Bank A) 1111 1111
const REG_SENSE_HIGH_B = 0x14	//	RegSenseHighB Sense register for I/O[15:12] 0000 0000
const REG_SENSE_LOW_B = 0x15	//	RegSenseLowB Sense register for I/O[11:8] 0000 0000
const REG_SENSE_HIGH_A = 0x16	//	RegSenseHighA Sense register for I/O[7:4] 0000 0000
const REG_SENSE_LOW_A = 0x17	//	RegSenseLowA Sense register for I/O[3:0] 0000 0000
const REG_INTERRUPT_SOURCE_B = 0x18	//	RegInterruptSourceB Interrupt source register _ I/O[15_8] (Bank B) 0000 0000
const REG_INTERRUPT_SOURCE_A = 0x19	//	RegInterruptSourceA Interrupt source register _ I/O[7_0] (Bank A) 0000 0000
const REG_EVENT_STATUS_B = 0x1A	//	RegEventStatusB Event status register _ I/O[15_8] (Bank B) 0000 0000
const REG_EVENT_STATUS_A = 0x1B	//	RegEventStatusA Event status register _ I/O[7_0] (Bank A) 0000 0000
const REG_LEVEL_SHIFTER_1 = 0x1C	//	RegLevelShifter1 Level shifter register 0000 0000
const REG_LEVEL_SHIFTER_2 = 0x1D	//	RegLevelShifter2 Level shifter register 0000 0000
const REG_CLOCK = 0x1E	//	RegClock Clock management register 0000 0000
const REG_MISC = 0x1F	//	RegMisc Miscellaneous device settings register 0000 0000
const REG_LED_DRIVER_ENABLE_B = 0x20	//	RegLEDDriverEnableB LED driver enable register _ I/O[15_8] (Bank B) 0000 0000
const REG_LED_DRIVER_ENABLE_A = 0x21	//	RegLEDDriverEnableA LED driver enable register _ I/O[7_0] (Bank A) 0000 0000
// Debounce and Keypad Engine		
const REG_DEBOUNCE_CONFIG = 0x22	//	RegDebounceConfig Debounce configuration register 0000 0000
const REG_DEBOUNCE_ENABLE_B = 0x23	//	RegDebounceEnableB Debounce enable register _ I/O[15_8] (Bank B) 0000 0000
const REG_DEBOUNCE_ENABLE_A = 0x24	//	RegDebounceEnableA Debounce enable register _ I/O[7_0] (Bank A) 0000 0000
const REG_KEY_CONFIG_1 = 0x25	//	RegKeyConfig1 Key scan configuration register 0000 0000
const REG_KEY_CONFIG_2 = 0x26	//	RegKeyConfig2 Key scan configuration register 0000 0000
const REG_KEY_DATA_1 = 0x27	//	RegKeyData1 Key value (column) 1111 1111
const REG_KEY_DATA_2 = 0x28	//	RegKeyData2 Key value (row) 1111 1111
// LED Driver (PWM, blinking, breathing)		
const REG_T_ON_0 = 0x29	//	RegTOn0 ON time register for I/O[0] 0000 0000
const REG_I_ON_0 = 0x2A	//	RegIOn0 ON intensity register for I/O[0] 1111 1111
const REG_OFF_0 = 0x2B	//	RegOff0 OFF time/intensity register for I/O[0] 0000 0000
const REG_T_ON_1 = 0x2C	//	RegTOn1 ON time register for I/O[1] 0000 0000
const REG_I_ON_1 = 0x2D	//	RegIOn1 ON intensity register for I/O[1] 1111 1111
const REG_OFF_1 = 0x2E	//	RegOff1 OFF time/intensity register for I/O[1] 0000 0000
const REG_T_ON_2 = 0x2F	//	RegTOn2 ON time register for I/O[2] 0000 0000
const REG_I_ON_2 = 0x30	//	RegIOn2 ON intensity register for I/O[2] 1111 1111
const REG_OFF_2 = 0x31	//	RegOff2 OFF time/intensity register for I/O[2] 0000 0000
const REG_T_ON_3 = 0x32	//	RegTOn3 ON time register for I/O[3] 0000 0000
const REG_I_ON_3 = 0x33	//	RegIOn3 ON intensity register for I/O[3] 1111 1111
const REG_OFF_3 = 0x34	//	RegOff3 OFF time/intensity register for I/O[3] 0000 0000
const REG_T_ON_4 = 0x35	//	RegTOn4 ON time register for I/O[4] 0000 0000
const REG_I_ON_4 = 0x36	//	RegIOn4 ON intensity register for I/O[4] 1111 1111
const REG_OFF_4 = 0x37	//	RegOff4 OFF time/intensity register for I/O[4] 0000 0000
const REG_T_RISE_4 = 0x38	//	RegTRise4 Fade in register for I/O[4] 0000 0000
const REG_T_FALL_4 = 0x39	//	RegTFall4 Fade out register for I/O[4] 0000 0000
const REG_T_ON_5 = 0x3A	//	RegTOn5 ON time register for I/O[5] 0000 0000
const REG_I_ON_5 = 0x3B	//	RegIOn5 ON intensity register for I/O[5] 1111 1111
const REG_OFF_5 = 0x3C	//	RegOff5 OFF time/intensity register for I/O[5] 0000 0000
const REG_T_RISE_5 = 0x3D	//	RegTRise5 Fade in register for I/O[5] 0000 0000
const REG_T_FALL_5 = 0x3E	//	RegTFall5 Fade out register for I/O[5] 0000 0000
const REG_T_ON_6 = 0x3F	//	RegTOn6 ON time register for I/O[6] 0000 0000
const REG_I_ON_6 = 0x40	//	RegIOn6 ON intensity register for I/O[6] 1111 1111
const REG_OFF_6 = 0x41	//	RegOff6 OFF time/intensity register for I/O[6] 0000 0000
const REG_T_RISE_6 = 0x42	//	RegTRise6 Fade in register for I/O[6] 0000 0000
const REG_T_FALL_6 = 0x43	//	RegTFall6 Fade out register for I/O[6] 0000 0000
const REG_T_ON_7 = 0x44	//	RegTOn7 ON time register for I/O[7] 0000 0000
const REG_I_ON_7 = 0x45	//	RegIOn7 ON intensity register for I/O[7] 1111 1111
const REG_OFF_7 = 0x46	//	RegOff7 OFF time/intensity register for I/O[7] 0000 0000
const REG_T_RISE_7 = 0x47	//	RegTRise7 Fade in register for I/O[7] 0000 0000
const REG_T_FALL_7 = 0x48	//	RegTFall7 Fade out register for I/O[7] 0000 0000
const REG_T_ON_8 = 0x49	//	RegTOn8 ON time register for I/O[8] 0000 0000
const REG_I_ON_8 = 0x4A	//	RegIOn8 ON intensity register for I/O[8] 1111 1111
const REG_OFF_8 = 0x4B	//	RegOff8 OFF time/intensity register for I/O[8] 0000 0000
const REG_T_ON_9 = 0x4C	//	RegTOn9 ON time register for I/O[9] 0000 0000
const REG_I_ON_9 = 0x4D	//	RegIOn9 ON intensity register for I/O[9] 1111 1111
const REG_OFF_9 = 0x4E	//	RegOff9 OFF time/intensity register for I/O[9] 0000 0000
const REG_T_ON_10 = 0x4F	//	RegTOn10 ON time register for I/O[10] 0000 0000
const REG_I_ON_10 = 0x50	//	RegIOn10 ON intensity register for I/O[10] 1111 1111
const REG_OFF_10 = 0x51	//	RegOff10 OFF time/intensity register for I/O[10] 0000 0000
const REG_T_ON_11 = 0x52	//	RegTOn11 ON time register for I/O[11] 0000 0000
const REG_I_ON_11 = 0x53	//	RegIOn11 ON intensity register for I/O[11] 1111 1111
const REG_OFF_11 = 0x54	//	RegOff11 OFF time/intensity register for I/O[11] 0000 0000
const REG_T_ON_12 = 0x55	//	RegTOn12 ON time register for I/O[12] 0000 0000
const REG_I_ON_12 = 0x56	//	RegIOn12 ON intensity register for I/O[12] 1111 1111
const REG_OFF_12 = 0x57	//	RegOff12 OFF time/intensity register for I/O[12] 0000 0000
const REG_T_RISE_12 = 0x58	//	RegTRise12 Fade in register for I/O[12] 0000 0000
const REG_T_FALL_12 = 0x59	//	RegTFall12 Fade out register for I/O[12] 0000 0000
const REG_T_ON_13 = 0x5A	//	RegTOn13 ON time register for I/O[13] 0000 0000
const REG_I_ON_13 = 0x5B	//	RegIOn13 ON intensity register for I/O[13] 1111 1111
const REG_OFF_13 = 0x5C	//	RegOff13 OFF time/intensity register for I/O[13] 0000 0000
const REG_T_RISE_13 = 0x5D	//	RegTRise13 Fade in register for I/O[13] 0000 0000
const REG_T_FALL_13 = 0x5E	//	RegTFall13 Fade out register for I/O[13] 0000 0000
const REG_T_ON_14 = 0x5F	//	RegTOn14 ON time register for I/O[14] 0000 0000
const REG_I_ON_14 = 0x60	//	RegIOn14 ON intensity register for I/O[14] 1111 1111
const REG_OFF_14 = 0x61	//	RegOff14 OFF time/intensity register for I/O[14] 0000 0000
const REG_T_RISE_14 = 0x62	//	RegTRise14 Fade in register for I/O[14] 0000 0000
const REG_T_FALL_14 = 0x63	//	RegTFall14 Fade out register for I/O[14] 0000 0000
const REG_T_ON_15 = 0x64	//	RegTOn15 ON time register for I/O[15] 0000 0000
const REG_I_ON_15 = 0x65	//	RegIOn15 ON intensity register for I/O[15] 1111 1111
const REG_OFF_15 = 0x66	//	RegOff15 OFF time/intensity register for I/O[15] 0000 0000
const REG_T_RISE_15 = 0x67	//	RegTRise15 Fade in register for I/O[15] 0000 0000
const REG_T_FALL_15 = 0x68	//	RegTFall15 Fade out register for I/O[15] 0000 0000
// 	Miscellaneous		
const REG_HIGH_INPUT_B = 0x69	//	RegHighInputB High input enable register _ I/O[15_8] (Bank B) 0000 0000
const REG_HIGH_INPUT_A = 0x6A	//	RegHighInputA High input enable register _ I/O[7_0] (Bank A) 0000 0000
//  Software Reset		
const REG_RESET = 0x7D	//	RegReset Software reset register 0000 0000
const REG_TEST_1 = 0x7E	//	RegTest1 Test register 0000 0000
const REG_TEST_2 = 0x7F	//	RegTest2 Test register 0000 0000

const SX1509_I2C_ADDR = 0x3E
const MAX11608_I2C_ADDR = 0b0110011
const SetupByte = 0b10100000
const ConfigByte = 0b00001111

const COUNTER_CLOCKWISE = false
const CLOCKWISE = true


/**
 * Initialization on Start
 */

//Setup MAX11608
pins.i2cWriteNumber(MAX11608_I2C_ADDR, SetupByte, NumberFormat.UInt8BE);
pins.i2cWriteNumber(MAX11608_I2C_ADDR, ConfigByte, NumberFormat.UInt8BE);


//Setup SX1509B
setreg(SX1509_I2C_ADDR, REG_RESET, 0x12);
setreg(SX1509_I2C_ADDR, REG_RESET, 0x34);

// setreg(SX1509_I2C_ADDR, REG_PULL_DOWN_A, 0xFF);    // Enable pull-down (RegPullUp) 
setreg(SX1509_I2C_ADDR, REG_DIR_A, 0xFF);   // Set direction to input (RegDir)

setreg(SX1509_I2C_ADDR, REG_INPUT_DISABLE_B, 0xFF);    // Disable input buffer (RegInputDisable) 
setreg(SX1509_I2C_ADDR, REG_PULL_UP_B, 0x00);    // Disable pull-up (RegPullUp) 
setreg(SX1509_I2C_ADDR, REG_DIR_B, 0x00);   // Set direction to output (RegDir)
setreg(SX1509_I2C_ADDR, REG_CLOCK, 0x40);    // Enable oscillator (RegClock)
setreg(SX1509_I2C_ADDR, REG_MISC, 0x70);    // Configure LED driver clock and mode if relevant (RegMisc)
setreg(SX1509_I2C_ADDR, REG_LED_DRIVER_ENABLE_B, 0xFF);    // Enable LED driver operation (RegLEDDriverEnable)
setreg(SX1509_I2C_ADDR, REG_OPEN_DRAIN_B, 0x00);
setreg(SX1509_I2C_ADDR, REG_POLARITY_B, 0xFF);  //Invert Polarity
setreg(SX1509_I2C_ADDR, REG_DATA_B, 0xAA);
// setreg(SX1509_I2C_ADDR, REG_I_ON_9, 255);
// setreg(SX1509_I2C_ADDR, REG_I_ON_11, 255);
// setreg(SX1509_I2C_ADDR, REG_I_ON_13, 255);
// setreg(SX1509_I2C_ADDR, REG_I_ON_15, 255);


//Enable Ext Speaker
pins.setAudioPin(AnalogPin.P0);
music.setSilenceLevel(0);

//Pull all pins down
for (let index = 0; index <= 7; index++) {
    setDigitalSensorDir(index + 1, 1);
}

serial.redirectToUSB();


/**
 * Functions to operate Output timers.
 */
let outputsValue = [0, 0, 0, 0]
let outputsState = [true, true, true, true]
let outputsDuration = [0, 0, 0, 0]

declare const EVENTID_OUTPUT_1_DELAY_OFF = 5000
declare const EVENTID_OUTPUT_2_DELAY_OFF = 5001
declare const EVENTID_OUTPUT_3_DELAY_OFF = 5002
declare const EVENTID_OUTPUT_4_DELAY_OFF = 5003

control.onEvent(EVENTID_OUTPUT_1_DELAY_OFF, 10, function () {
    sparkbitO.motorWrite(1, outputsState[0], outputsValue[0]);
    basic.pause(outputsDuration[0]);
    sparkbitO.motorWrite(1, outputsState[0], 0);
    outputsValue[0] = 0;
    outputsDuration[0] = 0;
})
control.onEvent(EVENTID_OUTPUT_2_DELAY_OFF, 10, function () {
    sparkbitO.motorWrite(2, outputsState[1], outputsValue[1]);
    basic.pause(outputsDuration[1]);
    sparkbitO.motorWrite(2, outputsState[1], 0);
    outputsValue[1] = 0;
    outputsDuration[1] = 0;
})
control.onEvent(EVENTID_OUTPUT_3_DELAY_OFF, 10, function () {
    sparkbitO.motorWrite(3, outputsState[2], outputsValue[2]);
    basic.pause(outputsDuration[2]);
    sparkbitO.motorWrite(3, outputsState[2], 0);
    outputsValue[2] = 0;
    outputsDuration[2] = 0;
})
control.onEvent(EVENTID_OUTPUT_4_DELAY_OFF, 10, function () {
    sparkbitO.motorWrite(4, outputsState[3], outputsValue[3]);
    basic.pause(outputsDuration[3]);
    sparkbitO.motorWrite(4, outputsState[3], 0);
    outputsValue[3] = 0;
    outputsDuration[3] = 0;
})


/**
 * Internal functions
 */

function setreg(adr: number, reg: number, dat: number): void {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = dat;
    pins.i2cWriteBuffer(adr, buf);
}
function getreg(adr: number, reg: number): number {
    pins.i2cWriteNumber(adr, reg, NumberFormat.UInt8BE, true);
    return pins.i2cReadNumber(adr, NumberFormat.UInt8BE);
}
function getUInt16BE(adr: number, reg: number): number {
    pins.i2cWriteNumber(adr, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(adr, NumberFormat.UInt16BE);
}
function getInt16BE(adr: number, reg: number): number {
    pins.i2cWriteNumber(adr, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(adr, NumberFormat.Int16BE);
}

function setDigitalSensorDir(sensor: number, sensDir: number): void {
    if (sensor < 1) sensor = 1;
    if (sensor > 8) sensor = 8;
    switch (sensor) { //reverses sensor ports 1-4 to match schematics. 5-8 are fine.
        case 1:
            sensor = 8;
            break;
        case 2:
            sensor = 7;
            break;
        case 3:
            sensor = 6;
            break;
        case 4:
            sensor = 5;
            break;
        case 5:
            sensor = 1;
            break;
        case 6:
            sensor = 2;
            break;
        case 7:
            sensor = 3;
            break;
        case 8:
            sensor = 4;
            break;
    }
    let dirBit = 1 << (sensor - 1);
    let clearBit = ~dirBit;

    let regPullDada = getreg(SX1509_I2C_ADDR, REG_PULL_DOWN_A);
    let regDirDada = getreg(SX1509_I2C_ADDR, REG_DIR_A);

    // Configures direction for each IO.
    // 0 : IO is configured as an output
    // 1 : IO is configured as an input 

    if (sensDir) {   //set to Input
        regPullDada |= dirBit;   //set to 1 enable PullDown
        regDirDada |= dirBit;    //set to 1 set to Input
    }
    else {   //set to Output
        regPullDada &= clearBit; //set to 0 disable PullDown
        regDirDada &= clearBit;  //set to 0 set to Output
    }
    setreg(SX1509_I2C_ADDR, REG_PULL_DOWN_A, regPullDada);    // Set pull-down (RegPullUp) 
    setreg(SX1509_I2C_ADDR, REG_DIR_A, regDirDada);   // Set direction (RegDir)
}

function readDigitalSensorBool(sensor: number): boolean {
    if (sensor < 1) sensor = 1;
    if (sensor > 8) sensor = 8;
    switch (sensor) { //reverses sensor ports 1-4 to match schematics. 5-8 are fine.
        case 1:
            sensor = 8;
            break;
        case 2:
            sensor = 7;
            break;
        case 3:
            sensor = 6;
            break;
        case 4:
            sensor = 5;
            break;
        case 5:
            sensor = 1;
            break;
        case 6:
            sensor = 2;
            break;
        case 7:
            sensor = 3;
            break;
        case 8:
            sensor = 4;
            break;
    }
    let regDada = getreg(SX1509_I2C_ADDR, REG_DATA_A);
    regDada = regDada >> (sensor - 1);
    regDada &= 1;

    if (regDada == 1) return true;
    else return false;
}

function readDigitalSensorNumb(sensor: number): number {
    if (readDigitalSensorBool(sensor)) return 1023;
    else return 0;
}

function writeDigitalSensor(sensor: number, writeVal: number): void {
    if (sensor < 1) sensor = 1;
    if (sensor > 8) sensor = 8;
    switch (sensor) { //reverses sensor ports 1-4 to match schematics. 5-8 are fine.
        case 1:
            sensor = 8;
            break;
        case 2:
            sensor = 7;
            break;
        case 3:
            sensor = 6;
            break;
        case 4:
            sensor = 5;
            break;
        case 5:
            sensor = 1;
            break;
        case 6:
            sensor = 2;
            break;
        case 7:
            sensor = 3;
            break;
        case 8:
            sensor = 4;
            break;
    }
    let dirBit = 1 << (sensor - 1);
    let clearBit = ~dirBit;

    let regDada = getreg(SX1509_I2C_ADDR, REG_DATA_A);

    if (writeVal) regDada |= dirBit;
    else regDada &= clearBit;

    setreg(SX1509_I2C_ADDR, REG_DATA_A, regDada);   //set pins
}

function sparkbitLogicCompare(operator: SparkbitLogic, val1: number, val2: number): boolean {
    switch (operator) {
        case SparkbitLogic.EQ: if (val1 == val2) { return (true); }
        else { return (false); }
        case SparkbitLogic.NEQ: if (val1 != val2) { return (true); }
        else { return (false); }
        case SparkbitLogic.LT: if (val1 < val2) { return (true); }
        else { return (false); }
        case SparkbitLogic.LTE: if (val1 <= val2) { return (true); }
        else { return (false); }
        case SparkbitLogic.GT: if (val1 > val2) { return (true); }
        else { return (false); }
        case SparkbitLogic.GTE: if (val1 >= val2) { return (true); }
        else { return (false); }
        default: return (false);
    }
}
