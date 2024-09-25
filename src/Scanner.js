// import React,{useState} from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import AsyncStorage from '@react-native-async-storage/async-storage';   
// export default function  Scanner() {
//     const [isScanning, setIsScanning] = React.useState(false);
//     const [passNo, setPassNo] = React.useState('');
//     const [truckNo, setTruckNo] = React.useState('');
//     const [scannedData, setScannedData] = React.useState('');
//     const [history, setHistory] = useState('');
//     const onSuccess = (e) => {
//         const scannedData = e.data; 
//         setScannedData(scannedData);
//         const scannedParts = scannedData.split('|'); 
//         setHistory(scannedParts)
//         if (scannedParts.length >= 4) { 
//             const scannedPassNo = scannedParts[0] || '';  
//             const scannedTruckNo = scannedParts[5] || ''; 
//             setPassNo(scannedPassNo);
//             setTruckNo(scannedTruckNo);
//         } else {
//             Alert.alert('Error', 'Invalid QR code format');
//         }
    
//         setIsScanning(false);
//     };
    
    
    
//     console.log(scannedData,"scannn",passNo,truckNo)

//     const handleInOut = (action) => {
//         if (passNo && truckNo) {
//             const data = {
//                 scannedData,
//                 action, 
//                 timestamp: new Date().toISOString(),
//             };
//             saveToHistory(data); 
//             setPassNo('');
//             setTruckNo('');
//             setScannedData('');
//         } else {
//             Alert.alert('Error', 'PassNo or TruckNo cannot be empty.');
//         }
//     };
    

//     // const saveToHistory = async (data) => {
//     //     try {
//     //         const existingHistory = await AsyncStorage.getItem('scanHistory');
//     //         let updatedHistory = existingHistory ? JSON.parse(existingHistory) : [];
//     //         updatedHistory.push(data);
//     //         await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
//     //     } catch (e) {
//     //         console.error('Failed to save data to history', e);
//     //     }
//     // };

//     const saveToHistory = async (data) => {
//         try {
//             const existingHistory = await AsyncStorage.getItem('scanHistory');
//             let updatedHistory = [];
    
//             if (existingHistory !== null) {
//                 updatedHistory = JSON.parse(existingHistory);
//             }
    
//             if (Array.isArray(updatedHistory)) {
//                 updatedHistory.push(data); // Proceed only if it's an array
//             } else {
//                 // If for some reason existingHistory is not an array, reinitialize it
//                 updatedHistory = [data];
//             }
    
//             await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
//         } catch (e) {
//             console.error('Failed to save data to history', e);
//         }
//     };
    
//     return (
//         <View style={styles.container}>
//             <View style={{ height: 60, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row", paddingHorizontal: 15, width: '100%' }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image source={require('./logo.png')} resizeMode='contain' style={{ width: 40, height: 40 }} />
//                     <Text style={styles.logo}>Tranzol</Text>
//                 </View>
//                 <TouchableOpacity style={{ width: '30%', justifyContent: 'flex-end', flexDirection: 'row' }}>
//                     <Image source={require('./logout.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />
//                 </TouchableOpacity>
//             </View>

//             <Text style={{ marginVertical: 25, textAlign: 'center', fontSize: 25, fontWeight: '600', color: '#006A71' }}>Scanner</Text>

//             <View style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
//                 {isScanning ? (

//                     <QRCodeScanner
//                         onRead={onSuccess}
//                         cameraStyle={styles.camera}
//                         flashMode={RNCamera.Constants.FlashMode.off}
//                     />
//                 ) : (
//                     <>
//                         {scannedData ? (
//                             <View style={styles.scanButton}>
//                                 <Text style={[styles.scanText, { fontSize: 12, fontWeight: '400' }]}>{scannedData}</Text>
//                             </View>
//                         ) : (
//                             <TouchableOpacity style={styles.scanButton} onPress={() => setIsScanning(true)}>
//                                 <Text style={styles.scanText}>SCAN HERE</Text>
//                             </TouchableOpacity>
//                         )}
//                     </>
//                 )}
//             </View>
//             <View style={styles.innerContainer}>
   
//            <TextInput
//            style={styles.input}
//            placeholder={ history ?history[0]:"Enter PassNo"}
//            value={passNo}
//            onChangeText={setPassNo}
//            keyboardType="default"
//        />
//        <TextInput
//            style={styles.input}
//            placeholder="Enter TruckNo"
  
//            value={truckNo}
//            onChangeText={setTruckNo}
//            keyboardType="default"
//        />
       
//             </View>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.actionButton} onPress={() => handleInOut('IN')}>
//                     <Text style={styles.actionText}>IN</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.actionButton} onPress={() => handleInOut('OUT')}>
//                     <Text style={styles.actionText}>OUT</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//         // justifyContent:'center'
//     },
//     innerContainer: {
//         alignItems: 'center',
//         marginTop: 20
//     },
//     logo: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#006A71',
//         // marginBottom: 20,
//     },
//     scanButton: {
//         width: 220,
//         height: 250,
//         backgroundColor: '#006A71',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,

//         alignSelf: 'center'
//     },
//     scanText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     camera: {
//         width: 190,
//         height: 160,
//         alignSelf: 'center',
//     },
//     input: {
//         width: '80%',
//         padding: 10,
//         borderColor: '#006A71',
//         borderWidth: 1,
//         borderRadius: 10,
//         marginVertical: 10,
//         color:'#000'
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginTop: 20,
//         justifyContent: 'space-around',
//         alignItems: 'center'
//     },
//     actionButton: {
//         backgroundColor: '#006A71',
//         width: 130,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: "center",
//         borderRadius: 10
//     },
//     actionText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     button: {
//         padding: 16,
//         backgroundColor: '#006A71',
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     centerText: {
//         textAlign: 'center',
//         padding: 16,
//         fontSize: 18,
//     },
// });








import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Scanner = () => {
  return (
    <View>
      <Text>Scanner</Text>
    </View>
  )
}

export default Scanner

const styles = StyleSheet.create({})