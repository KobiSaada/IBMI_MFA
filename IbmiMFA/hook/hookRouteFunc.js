

import { SERVER, PORT } from "@env"


const sendApprovalToServer = async () => {
  serverEndpoint = `${process.env.SERVER}:${process.env.PORT}/receive-approval`;

  try {
    const response = await fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ approval: true }),
    });

    if (response.ok) {
      console.log('Approval sent to the server successfully');
    } else {
      console.error('Failed to send approval to the server');
    }
  } catch (error) {
    console.error('Error sending approval to the server:', error);
  }
};

export default sendApprovalToServer;
