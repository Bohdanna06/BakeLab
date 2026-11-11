import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import CategoryScreen from '../screens/CategoryScreen';
import CakesListScreen from '../screens/CakesListScreen';
import DessertDetailScreen from '../screens/DessertDetailScreen';
import FavoritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../styles/colors';
import styles from '../styles/navigationStyles';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmptyScreen() { return <View style={{ flex: 1, backgroundColor: COLORS.background }} />; }

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.black,
          borderTopWidth: 0,
          height: 65,
          position: 'absolute',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={CakesListScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} /> }} 
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoryScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="grid" size={22} color={color} /> }} 
      />
      
      {/* Центральна випукла кнопка "+" */}
      <Tab.Screen 
        name="AddTab" 
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.floatingPlus}>
              <Ionicons name="add" size={28} color="#FFF" />
            </View>
          ),
        }} 
      />

      <Tab.Screen 
        name="FavTab" 
        component={FavoritesScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="heart" size={22} color={color} /> }} 
      />

    
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={22} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="CakesList" component={CakesListScreen} />
      <Stack.Screen name="DessertDetail" component={DessertDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} /> 
    </Stack.Navigator>
  );
}