


import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const Login = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const HandleLogin = () => {
        if (username === "test" && password === "123") {
            console.log("login")
            navigation.navigate("TabNavigators")

        } else {
            console.log("notvalid")
        }
    }


    return (
        <View style={styles.container}>
            {/* <View style={styles.slashShape} /> */}
            <Text style={styles.title}>Proceed With Your</Text>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.TextStyle}>Enter Username</Text>

            <View style={styles.inputContainer}>
                {/* <Icon name="user" size={20} color="#7A8D9C" /> */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter Username"
                    placeholderTextColor="#7A8D9C"
                    value={username}
                    onChangeText={setUsername}

                />
            </View>

            <Text style={styles.TextStyle}>Enter Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor="#7A8D9C"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    {/* <Icon name={secureTextEntry ? "eye-slash" : "eye"} size={20} color="#7A8D9C" /> */}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => HandleLogin()}
                style={styles.loginButton}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#005B5A',
        backgroundColor: '#fff',
        // paddingHorizontal: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: '#5A7D8A',
        textAlign: 'center',
        marginBottom: 10,
    },
    TextStyle: {
        color: "#005B5A",
        fontWeight: "600",
        marginHorizontal: 15,
        marginBottom: 5
    },
    loginText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#005B5A',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#7A8D9C',
        marginBottom: 20,
        // paddingBottom: 10,
        marginHorizontal: 10
    },
    input: {
        flex: 1,
        fontSize: 12,
        color: '#000',
        textTransform: 'lowercase'
    },
    loginButton: {
        backgroundColor: '#005B5A',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 30,
        marginHorizontal: 10
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    slashShape: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: '#005B5A',
        transform: [{ skewY: '-25deg' }],
        zIndex: -1,
    },
});

export default Login;
