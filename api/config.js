const { CommandCall,Connection ,ProgramCall  } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');
const{IBMI_HOST,IBMI_USER_NAME,IBMI_PASS}=process.env



const library = 'QTEMP'; // The library where the temporary data queue is located
const dataQueue = 'MYTEMPDTAQ'; // The name of the temporary data queue



// Calculate start and end times
const currentDate = new Date();
const endYear = currentDate.getFullYear();
const endMonth = currentDate.getMonth() + 1; // Note: JavaScript months are zero-based
const endDay = currentDate.getDate();
const endHour = 23; // 23:59:59 for the end of the day
const endMinute = 59;
const endSecond = 59;

// Calculate the start date for the previous month
const startYear = endMonth === 1 ? endYear - 1 : endYear;
const startMonth = endMonth === 1 ? 12 : endMonth - 1;
const startDay = 1; // Start of the month
const startHour = 0;
const startMinute = 0;
const startSecond = 0;

// Format the dates as YYYYMMDDHHMMSS
const formatDateTime = (year, month, day, hour, minute, second) => {
  const pad = (value) => String(value).padStart(2, '0');
  return `${year}${pad(month)}${pad(day)}${pad(hour)}${pad(minute)}${pad(second)}`;
};

const startTime = formatDateTime(startYear, startMonth, startDay, startHour, startMinute, startSecond);
const endTime = formatDateTime(endYear, endMonth, endDay, endHour, endMinute, endSecond);

// Construct the QSH command with calculated start and end times
const command = `DSPJRN JRN(QAUDJRN) FILE(QTEMP/QAUDJRN) OUTPUT(*OUTFILE) OUTMBR(*FIRST) ENTRY(*JRNLMSG) FROMTIME(${startTime}) TOTIME(${endTime})`;

const connection = new Connection({
  transport: 'ssh',
  transportOptions: { host: IBMI_HOST, username: IBMI_USER_NAME, password: IBMI_PASS },
});



connection.add(command);

// Set up debugging if needed
connection.debug(true);

connection.run(async (error, xmlOutput) => {
  if (error) {
    // An error occurred during command execution
    console.error('Error executing the command:', error);
  } else {
    // Command executed successfully
    console.log('Command executed successfully.');

    const parser = new XMLParser({ ignoreAttributes: false });
    const parsedData = parser.parse(xmlOutput);

    // Inspect the parsedData object to find the structure of the XML
    // and access the relevant data based on your XML structure

    console.log('Parsed Data:', parsedData);
  }
});c
module.exports=connection;