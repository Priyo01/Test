






// import { Image, ImageBackground, StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';

// const Home = () => {
//     const apiKey = '193f3199e1bf4a75bcd102640242509';
//     const [weatherData, setWeatherData] = useState(null);
//     const [cityName, setCityName] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [locationError, setLocationError] = useState(null);

//     async function requestLocationPermission() {
//         try {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     title: "Location Access Required",
//                     message: "This app needs to access your location.",
//                 },
//             );
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 console.log("Location permission granted");
//             } else {
//                 console.log("Location permission denied");
//             }
//         } catch (err) {
//             console.warn(err);
//         }
//     }

//     const fetchWeather = async (latitude, longitude) => {
//         try {
//             const response = await axios.get(
//                 `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
//             );
//             console.log(response.data?.current, "responseee");
//             setWeatherData(response.data?.current);
//             setCityName(response.data?.location?.name || 'City Not Found'); // Extracting the city name
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching weather data:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const getLocation = async () => {
//             if (Platform.OS === 'android') {
//                 await requestLocationPermission();
//             }

//             Geolocation.getCurrentPosition(
//                 (position) => {
//                     console.log(position, "ositt");
//                     const { latitude, longitude } = position.coords;
//                     fetchWeather(latitude, longitude);
//                 },
//                 (error) => {
//                     console.log(error.code, error.message);
//                     setLocationError("Unable to retrieve location");
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//             );
//         };

//         getLocation();
//     }, []);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text style={styles.loadingText}>Loading...</Text>
//             </View>
//         );
//     }

//     if (locationError) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{locationError}</Text>
//             </View>
//         );
//     }

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#fff" />
//                 <Text style={styles.loadingText}>Loading...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: '#352163' }}>
//             <ImageBackground
//                 source={require('./Rvs/assets/weatherBack.png')}
//                 style={{ height: '100%', width: '100%' }}
//                 resizeMode='cover'
//             >
//                 <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: '#F5F5F5', fontSize: 20, fontWeight: '600' }}>
//                         {cityName || 'City Not Found'}  {/* Default text if cityName is empty */}
//                     </Text>
//                 </View>
//                 <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: '#F5F5F5', fontSize: 17, fontWeight: '600' }}>
//                         {weatherData?.condition?.text || 'Weather data not available'}  {/* Default text if weather condition is empty */}
//                     </Text>
//                 </View>
//                 <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
//                     {/* <Image source={{ uri: `https:${weatherData?.condition.icon}` }}
//                         style={{ width: 100, height: 150 }}
//                         resizeMode='contain'
//                     /> */}

// <Image source={{ uri: 'https://cdn.weatherapi.com/weather/64x64/day/113.png' }} 
//     style={{ width: 100, height: 150 }} 
//     // resizeMode='contain' 
// />
//                 </View>
//                 <View style={{ width: '25%', alignSelf: 'center' }}>
//                     <Text style={{ color: '#F5F5F5', fontSize: 40, fontWeight: '600' }}>{weatherData?.temp_c}</Text>
//                     <View style={{ position: 'absolute', top: 0, right: -5, zIndex: 999 }}>
//                         <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>oC</Text>
//                     </View>
//                 </View>
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.infoText}>Feels Like: {weatherData?.feelslike_c} °C</Text>
//                     <Text style={styles.infoText}>Humidity: {weatherData?.humidity}%</Text>
//                     <Text style={styles.infoText}>Wind: {weatherData?.wind_kph} kph {weatherData?.wind_dir}</Text>
//                     <Text style={styles.infoText}>Pressure: {weatherData?.pressure_mb} mb</Text>
//                     <Text style={styles.infoText}>UV Index: {weatherData?.uv}</Text>
//                     <Text style={styles.infoText}>Visibility: {weatherData?.vis_km} km</Text>
//                     <Text style={styles.infoText}>Heat Index: {weatherData?.heatindex_c} °C</Text>
//                 </View>
//             </ImageBackground>
//             <Text>Home</Text>
//         </View>
//     );
// }

// export default Home;

// const styles = StyleSheet.create({
//     infoContainer: {
//         marginTop: 20,
//         paddingHorizontal: 20,
//     },
//     infoText: {
//         color: '#F5F5F5',
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loadingText: {
//         color: '#F5F5F5',
//         fontSize: 20,
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorText: {
//         color: '#F5F5F5',
//         fontSize: 18,
//     },
// });





import { Image, ImageBackground, StyleSheet, Text, View, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios'; 

const Home = () => {
    const apiKey = '193f3199e1bf4a75bcd102640242509';
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Access Required",
                    message: "This app needs to access your location.",
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission granted");
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const fetchWeather = async (latitude, longitude) => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
            );
            console.log(response.data?.current, "responseee");
            setWeatherData(response.data?.current);
            setCityName(response.data?.location?.name || 'City Not Found');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLocationError("Unable to retrieve weather data");
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        const getLocation = async () => {
            if (Platform.OS === 'android') {
                await requestLocationPermission();
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position, "ositt");
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.log(error.code, error.message);
                    setLocationError("Unable to retrieve location");
                    setLoading(false); // Set loading to false if there's an error
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        getLocation();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (locationError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{locationError}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#352163' }}>
            <ImageBackground
                source={require('./Rvs/assets/weatherBack.png')}
                style={{ height: '100%', width: '100%' }}
                resizeMode='cover'
            >
                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#F5F5F5', fontSize: 20, fontWeight: '600' }}>
                        {cityName || 'City Not Found'}
                    </Text>
                </View>
                <View style={{ width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#F5F5F5', fontSize: 17, fontWeight: '600' }}>
                        {weatherData?.condition?.text || 'Weather data not available'}
                    </Text>
                </View>
                <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: `https:${weatherData?.condition.icon}` }} 
                        style={{ width: 100, height: 150 }} 
                        resizeMode='contain' 
                    />
                </View>
                <View style={{ width: '25%', alignSelf: 'center' }}>
                    <Text style={{ color: '#F5F5F5', fontSize: 40, fontWeight: '600' }}>{weatherData?.temp_c}</Text>
                    <View style={{ position: 'absolute', top: 0, right: -5, zIndex: 999 }}>
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>°C</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Feels Like: {weatherData?.feelslike_c} °C</Text>
                    <Text style={styles.infoText}>Humidity: {weatherData?.humidity}%</Text>
                    <Text style={styles.infoText}>Wind: {weatherData?.wind_kph} kph {weatherData?.wind_dir}</Text>
                    <Text style={styles.infoText}>Pressure: {weatherData?.pressure_mb} mb</Text>
                    <Text style={styles.infoText}>UV Index: {weatherData?.uv}</Text>
                    <Text style={styles.infoText}>Visibility: {weatherData?.vis_km} km</Text>
                    <Text style={styles.infoText}>Heat Index: {weatherData?.heatindex_c} °C</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    infoContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    infoText: {
        color: '#F5F5F5',
        fontSize: 16,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#352163', // Ensure background is visible
    },
    loadingText: {
        color: '#F5F5F5',
        fontSize: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#F5F5F5',
        fontSize: 18,
    },
});
