// PushNotification.js

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import ExitApp from '../buttons/exitapp';

export default function PushNotification() {
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      setNotification(notification);
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName);
      // Handle the notification
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      const navigateTo = response.notification.request.content.data.navigateTo;
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);

      if (navigateTo === 'AuthPage') {
        // Display the approval pop-up window
        setShowApprovalPopup(true);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function handleYesButtonClick() {
    // Navigate to AuthPage
    navigation.navigate('AuthPage');
    // Close the pop-up window
    setShowApprovalPopup(false);
  }

  function handleNoButtonClick() {
    // Close the pop-up 
    ExitApp();
    setShowApprovalPopup(false);
  }
  

  return (
    <View>
      <Modal isVisible={showApprovalPopup}>
        <View style={styles.modalContent}>
          <Text>Someone try to login to your IBMI account </Text>
          <Text> Do you want to approve this login request?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNoButtonClick}>
            
                 <MaterialIcons name="cancel" size={40} color="red" />
        
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleYesButtonClick}>
                   <MaterialIcons name="check-circle" size={40} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 20,
  },
  button: {
    marginHorizontal: 45, // Add horizontal spacing between buttons
  },
});