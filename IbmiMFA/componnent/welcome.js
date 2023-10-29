import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Welcome = ({ name }) => {
  return (
    <View>
      <Text >Welcome, {name}!</Text>
    </View>
  );
};


export default Welcome;