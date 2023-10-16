import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PushNot from './pages/PushNotification';
import AuthPage from './pages/auth';


const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    checkNotification(); // Call the function to check for notifications from your backend
  }, []);

  const checkNotification = async () => {
    // Make an API request to your backend
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT');
      if (response.status === 200) {
        const data = await response.json();
        const shouldSendNotification = data.shouldSendNotification; // Modify to match your backend response structure

        if (shouldSendNotification) {
          PushNot();
        }
      } else {
        console.error('Failed to fetch data from the backend');
      }
    } catch (error) {
      console.error('Error while checking for notifications:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PushNot">
        <Stack.Screen
          name="PushNot"
          component={PushNot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthPage"
          component={AuthPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
