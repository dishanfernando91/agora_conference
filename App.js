import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './screens/Home';
import Conference from './screens/Conference';
import Live from './screens/Live'

const Stack = createStackNavigator();

export default function App() {
  const options = { headerShown: true };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={options}/>
        <Stack.Screen name="Conference" component={Conference} options={options} />
        <Stack.Screen name="Live" component={Live} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});