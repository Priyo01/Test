import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './Scanner';
import History from './History';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const TabNavigators = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Scanner') {
                    iconName = 'barcode-scan'; 
                } else if (route.name === 'History') {
                    iconName = 'history';
                }
                

                return (
                    <MaterialCommunityIcons
                        name={iconName}
                        size={size}
                        color={"#fff"}
                    />
                );
            },
            tabBarStyle: {
                backgroundColor: '#005B5A', 
            },

            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff',
        })}
        >
            <Tab.Screen name="Scanner"
                component={Scanner}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="History"
                component={History}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigators

const styles = StyleSheet.create({})