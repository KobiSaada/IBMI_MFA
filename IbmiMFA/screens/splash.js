import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import icons from "../constants/icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.clear()
  .then(() => {
    console.log('All items deleted from AsyncStorage.');
  })
  .catch((error) => {
    console.error('Error clearing AsyncStorage:', error);
  });
      // Check if user_id is set or not
      // If not, send to Sign In page
      // If user_id is available, send to Home page
      AsyncStorage.getItem('userData').then((value) => {
        if (value === null) {
          navigation.replace('SignIn');
        } else {
          const data = JSON.parse(value);
   

          navigation.replace('Home',data);
          
        }
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={icons.mfa2}
        style={{ width: '100%',height:'100%', resizeMode: 'contain', margin: 30,top:60 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
