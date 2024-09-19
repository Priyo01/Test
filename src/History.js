import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const focus = useIsFocused();

  const getData = async () => {
    let history = await AsyncStorage.getItem('scanHistory');
    if (history) {
      setHistoryData(JSON.parse(history));
    } else {
      setHistoryData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [focus]);

  const removeItem = async (index) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to remove this entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove", 
          onPress: async () => {
            let updatedHistory = [...historyData];
            updatedHistory.splice(index, 1); 
            setHistoryData(updatedHistory); 
            await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory)); 
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    const dataParts = item.scannedData.split('|');
    const passNo = dataParts[0];
    const truckNo = dataParts[dataParts.length - 1]; 

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
        onPress={()=>removeItem()}
        style={{position:'absolute',top:-2,right: -2,width:50,height:40,flexDirection:'row',justifyContent:'flex-end'}}>
            <EntypoIcon name="circle-with-cross" size={20} color={"#ffff"}/>
        </TouchableOpacity>
        <View>
        <Text style={[styles.text,{fontSize:18,fontWeight:'500'}]}>{passNo}</Text>
        <Text style={styles.text}>{truckNo}</Text>
        </View>
        <Text style={styles.text}>{item.action}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', height: 40, justifyContent: 'center', width: '100%' }}>
        <Text style={{ fontWeight: '500', fontSize: 25, color: '#005B5A' }}>History</Text>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        {historyData.length > 0 ? (
          <FlatList
            data={historyData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontWeight: '500', fontSize: 20, color: '#000' }}>No Data</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#006A71',
    marginVertical: 5,
    flexDirection:'row',
    width:'100%',
    height:80,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:15,
    borderRadius:8
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
