
// 0x00AA, 0x009B, 0x0092, 0x0090, 0x008A, 0x0084, 0x007E, 0x0078, 0x006E, 0x0069, 0x6432, 0x0005, 0x003C, 0x003C, 0x001E, 0x0005


// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
 
// open connection to a serial port
client.connectRTU("/dev/ttyUSB0", { baudRate: 9600 }, write);
 
function write() {
    client.setID(1);
 
    // write the values 0, 0xffff to registers starting at address 5
    // on device number 1.
    client.writeRegisters(0xe01f, [12])
        .then(read);
}
 
function read() {
    // read the 16 registers starting at address 0xe005
    // on device number 1.
    client.readHoldingRegisters(0xe005, 16)
        .then(console.log);
}
