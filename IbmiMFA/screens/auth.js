import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../componnent/HomeHeader/layout';


import LockScreen from '../componnent/LockScreens/LockAndroidScreen'; // Import the LockScreen component

const AuthPage = () => {
  return (
    <View>
      <Layout/>
      <LockScreen />
      {/* Implement your authentication logic here */}
    </View>
  );
};

export default AuthPage;