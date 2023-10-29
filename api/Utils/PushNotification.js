const { Expo } = require('expo-server-sdk');
const dotenv =require("dotenv");
dotenv.config();



const sendPushNotifications = async (pushTokens) => {


  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  // Create the messages that you want to send to clients
  
  const messages = [];
  for (let pushToken of pushTokens) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      title: 'RazLeeMFA 🔓',
      body: 'Someone tried to log in to your account. You need to approve this by auth',
      data: {
        navigateTo: 'AuthPage',
       // action: 'user_approval', // Add custom action data
      },
    });
  }


  // The Expo push notification service accepts batches of notifications
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  try {
    // Send the chunks to the Expo push notification service
    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately.
      // The error codes are listed in the Expo documentation.
    }
  } catch (error) {
    console.error(error);
  }




  // Retrieve receipts for each notification
  const receiptIds = tickets
    .filter((ticket) => ticket.id)
    .map((ticket) => ticket.id);

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  // Retrieve the receipts from the Expo service
  for (let chunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);

      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details && details.error) {
            // The error codes are listed in the Expo documentation.
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
module.exports = { sendPushNotifications };
