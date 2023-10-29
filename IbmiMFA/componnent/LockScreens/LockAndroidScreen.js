import React, { useState, useEffect } from 'react';
import { View, TextInput,Text, Image, TouchableOpacity, StatusBar, StyleSheet ,Platform ,Button  ,Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';


import sendApprovalToServer from '../../hook/hookRouteFunc';
import styles from './LockAndroidScrenn.style';

const LockScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isPinCodeMode, setIsPinCodeMode] = useState(false);
  const navigation = useNavigation();

  const authenticateWithDevicePIN = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with your device PIN',
        disableDeviceFallback: true, 
        cancelLabel: 'Cancel',// For Android, only allow PIN authentication.
      });

      if (success) {
        // Authentication successful
        console.log('Authentication successful');
        // Place your code here to grant access to the app.
      } else {
        // Authentication failed
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error in authentication:', error);
    }
  };

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const fallBackToDefaultAuth = () => {
    // Implement your fallback authentication method here
    Alert.alert('Fallback Authentication', 'Fallback method goes here');
  };

  const unlockScreen = async () => {
 
      // Unlock the screen or navigate to the main content
      Alert.alert( 'Authentication successful',
      'You are now unlocked.');
      await sendApprovalToServer();

      
      navigation.navigate('SplashScreen' );
      
        
      };
  
 
  


  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert(
        'Biometric record not found',
        'Please verify your identity with your PIN code',
        [{ text: 'OK', onPress: fallBackToDefaultAuth }]
      );
    } else {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Please authenticate',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });

      if (biometricAuth.success) {
        unlockScreen();
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed.');
      }
    }
  };

  return (
    <View style={styles.container}>

   
   <Text style={isBiometricSupported ? styles.appButtonText : styles.appButtonText}>  {isBiometricSupported
    ? 'Your device is compatible with Biometrics'
    : 'Face or Fingerprint scanner is available on this device'}
</Text>
      <View style={styles.buttonContainer}>
  <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={() => {
            handleBiometricAuth();
        }}
      >
        <Text style={styles.appButtonText}>
          Unlock with Biometrics
        </Text>
       
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.appButtonContainer}
  onPress={authenticateWithDevicePIN}
>
  <Text style={styles.appButtonText}>Authenticate with Device PIN</Text>
</TouchableOpacity>
     
       </View>
       <StatusBar style="auto" />
    </View>
  );
};

    
  

export default LockScreen;
