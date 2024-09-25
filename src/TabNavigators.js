import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './Scanner';
import History from './History';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign'
import Home from './Home';
import Prev from './Rvs/Prev';
import Next from './Rvs/Next';
const TabNavigators = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
        initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Prev') {
                        iconName = 'banckward';
                    } else if (route.name === 'Next') {
                        iconName = 'forward';
                    }
                    else if (route.name === 'Home') {
                        iconName = 'home';
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
            <Tab.Screen name="Prev"
                component={Prev}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen name="Next"
                component={Next}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigators

const styles = StyleSheet.create({})