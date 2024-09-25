import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigators from './src/TabNavigators';
import Login from './src/Login';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={Login}  
        options={{ headerShown: false }} 
      
      /> */}
      <Stack.Screen
        name="TabNavigators"
        component={TabNavigators}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App






// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Ebneeds from './Ebneeds'

// const App = () => {
//   return (
// <Ebneeds />
//   )
// }

// export default App

const styles = StyleSheet.create({})