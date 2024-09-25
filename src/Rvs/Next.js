


import React, { useState, useEffect } from 'react';
import { 
    ImageBackground, 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Button, 
    FlatList, 
    ActivityIndicator,
    ScrollView,
    Image // Import Image
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Next = () => {
    const apiKey = '193f3199e1bf4a75bcd102640242509';
    const [weatherData, setWeatherData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [nextDayWeather, setNextDayWeather] = useState(null); // New state for next day's weather
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('Jaipur'); // Default city
    const [isOffline, setIsOffline] = useState(false);

    // Fetch historical weather data for the last 7 days
    const fetchHistoricalWeather = async (cityName) => {
        let last7DaysData = [];
        const currentDate = new Date();

        // Fetch weather data for the last 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];  // Format date as YYYY-MM-DD

            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityName}&dt=${formattedDate}`
                );
                last7DaysData.push(response.data.forecast.forecastday[0]);
            } catch (error) {
                console.error('Error fetching historical weather data:', error);
            }
        }

        setHistoricalData(last7DaysData);
        await AsyncStorage.setItem('historicalWeather', JSON.stringify(last7DaysData));
        setLoading(false);
    };

    // Fetch next day's weather
    const fetchNextDayWeather = async (cityName) => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=2`
            );
            return response.data.forecast.forecastday[1]; // Get the next day's forecast
        } catch (error) {
            console.error('Error fetching next day weather:', error);
        }
    };


    const fetchWeather = async (cityName) => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
            );
            setWeatherData(response.data.current);
            await AsyncStorage.setItem('currentWeather', JSON.stringify(response.data.current));
            fetchHistoricalWeather(cityName);
            const nextDayWeather = await fetchNextDayWeather(cityName);
            setNextDayWeather(nextDayWeather); // Update state to store the next day's weather
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    };

    // Check network connectivity
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        // Load cached data if offline
        if (isOffline) {
            loadCachedData();
        } else {
            fetchWeather(city);
        }

        return () => {
            unsubscribe();
        };
    }, [isOffline, city]);

    // Load cached weather data
    const loadCachedData = async () => {
        try {
            const cachedCurrentWeather = await AsyncStorage.getItem('currentWeather');
            const cachedHistoricalWeather = await AsyncStorage.getItem('historicalWeather');

            if (cachedCurrentWeather) {
                setWeatherData(JSON.parse(cachedCurrentWeather));
            }
            if (cachedHistoricalWeather) {
                setHistoricalData(JSON.parse(cachedHistoricalWeather));
            }

            setLoading(false);
        } catch (error) {
            console.error("Error loading cached data:", error);
        }
    };

    // Loading state
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Main UI with weather data
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/weatherBack.png')}
                style={styles.background}
                resizeMode='cover'
            >
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    {/* City Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter City Name"
                            value={city}
                            onChangeText={setCity}
                        />
                        <Button title="Get Weather" onPress={() => fetchWeather(city)} color="#7D5FFF" />
                    </View>

                    {/* Current Weather Data */}
                    {weatherData && (
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Temperature: {weatherData.temp_c} °C</Text>
                            <Text style={styles.infoText}>Humidity: {weatherData.humidity}%</Text>
                            <Text style={styles.infoText}>Wind: {weatherData.wind_kph} kph {weatherData.wind_dir}</Text>
                        </View>
                    )}

                    {/* Next Day Weather Data */}
                    {nextDayWeather && (
                        <View style={styles.nextDayContainer}>
                            <Text style={styles.nextDayTitle}>Next Day Forecast</Text>
                            <Text style={styles.nextDayText}>Date: {nextDayWeather.date}</Text>
                            <Text style={styles.nextDayText}>Max Temp: {nextDayWeather.day.maxtemp_c} °C</Text>
                            <Text style={styles.nextDayText}>Min Temp: {nextDayWeather.day.mintemp_c} °C</Text>
                            <Text style={styles.nextDayText}>Condition: {nextDayWeather.day.condition.text}</Text>
                            <Image 
                                source={{ uri: `//cdn.weatherapi.com/weather/64x64/day/${nextDayWeather.day.condition.code}.png` }} 
                                style={styles.nextDayIcon} 
                            />
                        </View>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default Next;




    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        background: {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#352163',
        },
        loadingText: {
            fontSize: 18,
            color: '#fff',
            marginTop: 10,
        },
        scrollViewContainer: {
            flexGrow: 1, // Allow the content to grow and provide scrolling
            padding: 10,
        },
        inputContainer: {
            padding: 10,
            marginHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#7D5FFF',
        },
        input: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            fontSize: 16,
        },
        infoContainer: {
            marginVertical: 20,
            alignItems: 'center',
            backgroundColor: '#523D7F',
            padding: 20,
            borderRadius: 10,
        },
        infoText: {
            color: '#F5F5F5',
            fontSize: 17,
            fontWeight: '600',
        },
        historicalContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            padding: 15,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 10,
        },
        historicalTitle: {
            color: '#F5F5F5',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        historicalItem: {
            marginVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#7D5FFF',
            paddingBottom: 5,
            width: '100%',
        },
        historicalDate: {
            color: '#F5F5F5',
            fontWeight: '600',
        },
        historicalText: {
            color: '#F5F5F5',
        },

    nextDayContainer: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: '#523D7F',
        padding: 20,
        borderRadius: 10,
    },
    nextDayTitle: {
        color: '#F5F5F5',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nextDayText: {
        color: '#F5F5F5',
        fontSize: 16,
    },
    nextDayIcon: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
});
