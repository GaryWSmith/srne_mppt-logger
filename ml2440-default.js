
// This sets the MPPT to the ideal values for the Lead crystal

// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
 
// open connection to a serial port
client.connectRTU("/dev/ttyUSB0", { baudRate: 9600 }, write);

function write() {
    client.setID(1);
 
    // write the default values for the Lead Crystal baterries to registers starting at address 0xe005
    // on device number 1.

    client.writeRegisters(0xe005, [160 , 155, 148, 148, 140, 135, 126, 120, 110, 110, 25650, 5, 60, 180, 30, 3])
        .then(read);
}

function read() {
    // read the 16 registers starting at address 0xe005
    // on device number 1.
    client.readHoldingRegisters(0xe005, 16)
        .then(console.log);
}
