import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import registerForPushNotificationsAsync from '../componnent/pushnotification/regpush';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Layout from '../componnent/HomeHeader/layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal'; // Import the modal componentå
import PhoneNumber from 'libphonenumber-js';
import PhoneInput from 'react-native-phone-number-input';
import * as Localization from 'expo-localization';

const SignIn = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef();
  const userLocale = Localization.locale;
  const countryCode = userLocale.split('-')[1];
  const [initialCountry, setInitialCountry] = useState(countryCode); // Initialize with an empty string




  const validatePhoneNumber = (phoneNumber, countryCode) => {
    try {
      const number = PhoneNumber(phoneNumber, countryCode);
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '');


      if (number.isValid()&&numericPhoneNumber.length === 9) {
        return true; // Phone number is valid.
      } else {
        return false; // Phone number is not valid.
      }
    } catch (e) {
      // Handle parsing errors, such as an invalid phone number.
      return false;
    }r
  };
  function isValidName(name) {
    // Define a regular expression to match names with alphabetic characters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
  
    // Test the name against the regular expression
    return nameRegex.test(name);
  }
  const handleSignIn = async () => {
    try {
      const countryCode = phoneInput.current.getCountryCode();
      if (!validatePhoneNumber(phoneNumber, countryCode) || !isValidName(name)) {
        console.error('Phone number or name is invalid');
        // Handle the error, display a message to the user, etc.
        return;
      }
  
      const tokenData = await registerForPushNotificationsAsync(phoneNumber, name);
      console.log(tokenData,"h");
      setExpoPushToken(tokenData.expoPushToken);
  
      // Store the token and user data
      const dataString = JSON.stringify(tokenData);
      await AsyncStorage.setItem('userData', dataString);
      
      setIsSuccessModalVisible(true);
      setTimeout(() => {
        setIsSuccessModalVisible(false);
        navigation.navigate('Home', tokenData); // Navigate to the Home screen with data
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here, show an error message to the user, etc.
    }
  };

  useEffect(() => {
    // Cleanup the modal when component unmounts
    return () => setIsSuccessModalVisible(false);
  }, []);


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Layout/>
    <Modal isVisible={isSuccessModalVisible}>
      <View style={styles.successModal}>
        <Text style={styles.successText}>Sign In Successful!</Text>
      </View>
    </Modal>
    <Text style={styles.title}>Sign In</Text>
    <View style={styles.inputContainer}>
      <MaterialIcons name="person" size={24} color="orange" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Enter Youre Name"
        value={name}
        onChangeText={setName}
      />
    </View>
         <View style={styles.phoneInputContainer}>
        <MaterialIcons name="phone" size={24} color="orange" style={styles.icon} />
        <PhoneInput
        // defaultvalue ={PhoneNumber}
         initialCountry= {initialCountry}
         ref={phoneInput}
         containerStyle={styles.phoneInput} // Style for the entire PhoneInput container
         textContainerStyle={styles.phoneInputTextContainer} // Style for the text input container
         textStyle={styles.phoneInputText} // Style for the text input
         codeTextStyle={styles.phoneInputCodeText} // Style for the country code text
         flagButtonStyle={styles.phoneInputFlagButton} // Style for the flag button
         codeContainerStyle={styles.phoneInputCodeContainer} // Style for the country code container
         countryPickerButtonStyle={styles.phoneInputCountryPickerButton} // Style for the country picker button
         placeholder="Enter Your Phone Number"
       
         phone={phoneNumber}
         onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 480,
    top: 210,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 0,
    top: -68,
    right: 18,
    width:416,
  },

  icon: {
    marginRight: 10,
    width: 50,
    height: 50,
    left: 340,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    height: 54,

    borderColor: 'rgb(250, 100, 0)',
    borderWidth: 4,
    paddingLeft: 40,
    textAlignVertical: 'center',
    marginBottom: 22,
    right: 12,
    paddingRight: 50,
    fontWeight: 'bold',
    
  },

  button: {
    backgroundColor: 'rgb(250, 100, 0)',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
    height: 50,
    width: 270,
    marginBottom: 0,
    top: -60,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,

    borderColor: 'rgb(250, 100, 0)',
    borderRadius: 5,
    height: 54,
    marginBottom: 20,
    top: -70,
    paddinHorizontal: 0,
    
 
    left:0,
    marginRight:0,
  },
  phoneInputTextContainer: {
    flex: 1,
    right:101,
    marginRight:0,
  
  
  },
  phoneInputText: {
    fontSize: 16,
  
  },
  phoneInputCodeText: {
    fontSize: 15,
     left:235,
     marginRight:0,
   
    
  fontWeight: 'bold',
  top:-4,
  
  },
  phoneInputFlagButton: {
    marginRight: -24,
    marginLeft: 0,
    

    
    top:0,
  },
  phoneInputCodeContainer: {
    borderRightWidth: 1,
    borderColor: 'gray',
    paddingRight: 10,
    marginRight: 10,
    
  },
  phoneInputCountryPickerButton: {
    padding:7,
    right:-222,
    marginLeft:-7,
  },
});





export default SignIn;