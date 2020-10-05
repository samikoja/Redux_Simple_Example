import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import BottonTab from './BottonTabs';
import Cart from '../screens/cart/Cart';

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottonTab} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
