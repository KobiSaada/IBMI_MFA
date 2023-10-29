import React from 'react';
import { View, StyleSheet, Text ,button,TouchableOpacity} from 'react-native';
import UserInfoCard from '../componnent/Cards/UserInfoCard'; // Import the UserInfoCard component
import Layout from '../componnent/HomeHeader/layout';
import PushNotification from '../componnent/pushnotification/handlepush';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExitApp from '../componnent/buttons/exitapp';
import Welcome from '../componnent/welcome';

const Home = ({ navigation, route }) => {
  const { userName, expoPushToken, phoneNumber } = route.params;
  console.log(userName, expoPushToken,phoneNumber);

  return (
    <View style={styles.container}>
     <Layout />
  
    
      <UserInfoCard expoPushToken={expoPushToken} userName={userName} phoneNumber={phoneNumber} />
      
      <Text style={styles.title}>
      Welcome {userName}!
      </Text>
       

   
      {/* //<Welcome name={userName} style={styles.welcome} />  */}

      <PushNotification/>
      <TouchableOpacity style={styles.exitButton} onPress={ExitApp}>
     
        <MaterialIcons name="exit-to-app" size={24} color="white" style={styles.iconInfo} />
        <Text style={styles.exitText}>Exit</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   top:9,

   
  },

  title: {
    color: '#00008B',
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 43,
    marginTop: 340,
    top: -415,
  },
  exitButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -40,
    top: -70,
    right:117,
  },
  exitText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    left:4,
  },
});

export default Home;
