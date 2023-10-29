import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const UserInfoCard = ({ expoPushToken, userName, phoneNumber }) => {
  return (
    <View style={styles.card}>
         <MaterialIcons name="info" size={24} color="black" style={styles.iconInfo} />
         <MaterialIcons name="account-circle" size={60} color="black" style={styles.iconUser} />
      <Text style={styles.cardTitle}>User Information :</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Expo Push Token:</Text>
        <Text style={styles.infoText}>{expoPushToken}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoText}>{userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone Number:</Text>
        <Text style={styles.infoText}>{phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor:'white',
    borderRadius: 10,
    padding: 20,
    marginBottom:0,
    justifyContent: 'center',
    elevation: 3,
    width:290,
    height:300,
    top:340,
    borderColor: 'black', // Add a black border
    borderWidth: 2, // Specify the border width

  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    top:-20,
  },
  infoContainer: {
    flexDirection: 'col',
    marginBottom: 20,
    top:-10,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoText: {
    marginLeft: 10,
  },
  iconInfo: {
    marginRight: 0,
    top: 20,
    color: 'black', // Set the icon color to black
  },
  iconUser: {
    right: 200,
    top:-10,
    color: 'black', // Set the icon color to black
  },
});

export default UserInfoCard;
