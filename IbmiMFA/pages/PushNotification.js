import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const getExpoPushToken = async () => {
  try {
    const projectId = Constants.manifest.extra.eas.projectId;
    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    console.log(pushTokenData);
  } catch (error) {
    console.error('Failed to get push token:', error);
  }
};

export default function PushNotification() {
  const navigation = useNavigation(); // Get the navigation object correctly

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      getExpoPushToken();

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED');
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED');
        const userName = response.notification.request.content.data.userName;
        const navigateTo = response.notification.request.content.data.navigateTo;
  
        if (navigateTo === 'AuthPage') {
          navigation.navigate('AuthPage');
        }
  
        console.log(userName);
        console.log(response);
      
      });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({

      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification.',
        data: {
          userName: 'kobi',
        },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler(navigation) {
    // Replace with the actual Expo push token of the recipient
    const expoPushToken = 'ExponentPushToken[DWaAHEOItcsPN22EXSSWJv]';

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'RazLeeMFA',
      body: 'you need to auth',
      data: { navigateTo: 'AuthPage' },
    };

    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mfa4.png')}
        style={styles.footerImage}
      />
      <Image
        source={require('../assets/logo1.png')}
        style={styles.smallImage}
      />
      <Image
        source={require('../assets/icon.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.text}>RazLee MFA</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={scheduleNotificationHandler} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Schedule Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sendPushNotificationHandler(navigation)} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Send Push Notification</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '40%',
    height: '20%',
  },
  smallImage: {
    
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 0,
    right: 10,
  },
  text: {
    color: 'black',
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    right: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 250,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'rgb(250, 100, 0)',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginTop: 6,
    alignSelf: "center",
    right: 2,
    height: 50,
    width: 270,
    marginBottom: 30,
    marginTop:15,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  footerImage: {
    position: 'absolute',
    width: '100%',
    height: '11%',
    top: 0,
  },
});
