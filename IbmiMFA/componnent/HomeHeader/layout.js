import React from 'react';
import { View, Text, Image, StatusBar  } from 'react-native';
import  icons from "../../constants/icons";
import styles from './layout.style';


const Layout = () => {
  return (
    <View style={styles.container}>
    <Image


      source={icons.razleeHeader}
      style={styles.footerImage}
    />
    <Image
      source={icons.razleeProfile}
      style={styles.smallImage}
    />
    <Image
     source={icons.lock}
      style={styles.backgroundImage}
    />
    <Text style={styles.text}>RazLee MFA</Text>
    
    <StatusBar style="auto" />
    </View>
  );
};


  export default Layout;