import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

// Bottom screen imports
import HomeTab from './screen/BottomTabs/HomeTab';
import SecondTab from './screen/BottomTabs/SecondTab';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <BottomTab.Navigator initialRouteName="HomeTab">
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarLabel: 'HomeTab',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="SecondTab"
        component={SecondTab}
        options={{
          headerShown: false,
          tabBarLabel: 'SecondTab',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
