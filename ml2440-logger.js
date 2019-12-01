/* charging modes
00: charging deactivated
01: charging activated
02: mppt mode
03: equalizing mode
04: boost mode
05: float mode
06: current limiting (overpower)   
*/

let readAddress = 0x0100
let offset_SOC = 0
let offset_batteryVoltage = 1
let offset_batteryCurrent = 2
let offset_temperature = 3
let offset_loadVoltage = 4
let offset_loadCurrent = 5
let offset_loadPower = 6
let offset_panelVoltage = 7
let offset_panelCurrent = 8
let offset_panelPower = 9
let offset_loadOnOff = 10
let offset_batteryDaysMinVoltage = 11
let offset_batteryDaysMaxVoltage = 12
let offset_batteryDaysMaxChargeCurrent = 13
let offset_batteryDaysMaxDischargeCurrent = 14
let offset_batteryDaysMaxChargePower= 15
let offset_batteryDaysMaxDischargePower= 16
let offset_batteryDaysChargeAmpHours = 17
let offset_batteryDaysDischargeAmpHours = 18
let offset_daysPower = 19
let offset_daysConsumption = 20
let offset_chargingMode = 32

// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
 
// open connection to a serial port
client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 });
client.setID(1);
 
setInterval(function() {
    client.readHoldingRegisters(readAddress, 33, function(err, data) {
        console.log("SoC = " + data.data[offset_SOC] + "%");
        console.log("Battery Voltage = " + data.data[offset_batteryVoltage]/10 + "V");
        console.log("Battery Current = " + data.data[offset_batteryCurrent]/100 + "A");
        console.log("Controller Temperature = " + ((data.data[offset_temperature] & 65280) % 255) + "C");
        console.log("Load Voltage = " + data.data[offset_loadVoltage]/10 + "V");
        console.log("Load Current = " + data.data[offset_loadCurrent]/100 + "A");
        console.log("Load Power = " + data.data[offset_loadPower]+ "W");
        console.log("Panel Voltage = " + data.data[offset_panelVoltage]/10 + "V");
        console.log("Panel Current = " + data.data[offset_panelCurrent]/100 + "A");
        console.log("Panel Power = " + data.data[offset_panelPower] + "W");
        console.log("Load On/Off = " + data.data[offset_loadOnOff]);
        console.log("Min battery voltage for the Day = " + data.data[offset_batteryDaysMinVoltage]/10 + "V");
        console.log("Max battery voltage for the day = " + data.data[offset_batteryDaysMaxVoltage]/10 + "V");
        console.log("Max battery current for the day = " + data.data[offset_batteryDaysMaxChargeCurrent]/100 + "A");
//        console.log("Max battery discharge current for the day = " + data.data[offset_batteryDaysMaxDischargeCurrent]/100 + "A");
        console.log("Max power power for the day = " + data.data[offset_batteryDaysMaxChargePower] + "W");
//        console.log("Max battery discharge power for the day = " + data.data[offset_batteryDaysMaxDischargePower] + "W");
        console.log("Amp hours generated for the day = " + data.data[offset_batteryDaysChargeAmpHours] + "A/Hr");
//        console.log("Amp hours discharge for the day = " + data.data[offset_batteryDaysDischargeAmpHours] + "AHr");
        console.log("Power produced for the day = " + data.data[offset_daysPower] + "W/hr");
//        console.log("Power consumed for the day = " + data.data[offset_daysConsumption] + "W");
        console.log("Charging mode = " + (data.data[offset_chargingMode] & 255));
	console.log("");
    });
}, 1000);


