import { SERVER, PORT } from "@env"

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import * as Device from 'expo-device';

async function registerForPushNotificationsAsync(userPhoneNumber, userName) {
  try {
    const projectId = Constants.expoConfig.extra.eas.projectId;
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Failed to get push token for push notification!');
      }

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(token);

      try {
        const data = {
          userName: userName,
          expoPushToken: token,
          phoneNumber: userPhoneNumber,
        };

        await saveTokenUserInfo(token, userPhoneNumber, userName);

        console.log(data, 'my data');
        return data; // Only return data if registration and API call are successful
      } catch (apiError) {
        throw apiError; // Throw the API error, do not return data
      }
    } else {
      throw new Error('Must use a physical device for Push Notifications');
    }
  } catch (error) {
    throw error; // Throw the error, do not return data
  }
}

async function saveTokenUserInfo(token, userPhoneNumber, userName) {
  console.log("Saving token",process.env.SERVER);
  const url = `${process.env.SERVER}:${process.env.PORT}/saveTokenUserInfo`;
  const data = {
    token: token,
    phoneNumber: userPhoneNumber,
    name: userName,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      console.log('Token and user info saved successfully.');
      return; // Successful, no need to return data
    } else if (response.status === 400) {
      // Handle the case where the user already exists on the server
      console.error('User with this phone number already exists.');
      throw new Error('User with this phone number already exists.');
      // You can take appropriate action here, e.g., display an error message to the user.
    } else {
      console.error('Failed to save token and user info.');
      throw new Error('Failed to save token and user info.');
      // Handle other status codes as needed
    }
  } catch (error) {
    console.error('Error1 saving token and user info:', error);
    throw error; // Rethrow the error
  }
}
export default registerForPushNotificationsAsync;