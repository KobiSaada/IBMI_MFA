const { CommandCall, Connection } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');
const { IBMI_HOST, IBMI_USER_NAME, IBMI_PASS } = process.env;

const library = 'QTEMP';
const dataQueue = 'MYTEMPDTAQ';

try {
  const connection = new Connection({
    transport: 'ssh',
    transportOptions: { host: IBMI_HOST, username: IBMI_USER_NAME, password: IBMI_PASS },
  });

  // Construct the CL command to receive data from the data queue
  const clCommand = `RCVDTAQ DTAQ(${library}/${dataQueue}) KEYVAR(&KEY) RMV(*YES)`;

  const command = new CommandCall({ type: 'cl', command: clCommand });

  connection.add(command);

  connection.run((error, xmlOutput) => {
    if (error) {
      console.error('Error executing the command:', error);
    } else {
      console.log('Command executed successfully.');
      const parser = new XMLParser({ ignoreAttributes: false });
      const parsedData = parser.parse(xmlOutput);

      // You can now access the data received from the data queue
      const dataReceived = parsedData.data;
      console.log('Data Received:', dataReceived);

      // Do something with the data...
    }
  });
} catch (connectionError) {
  console.error('Connection error:', connectionError);
}
