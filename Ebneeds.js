import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
// import FastImage from 'react-native-fast-image';
const Ebneeds = () => {
    // const focus = useIsFocused()
    const searchRef = useRef()
    const [getMusicList, setMusicList] = useState([])
    const [getOldMusicList, setOldMusicList] = useState([])
    const [searchText, setSearchText] = useState('')

    const baseUrl = `https://rss.applemarketingtools.com/api/v2/us/music/most-played/100/albums.json`
    const getdata = () => {

        axios({
            method: 'get',
            url: `${baseUrl}`,
        }).then((response) => {
            // console.log(response?.data?.feed?.results?.flat(Infinity),"responseee");
            setMusicList(response?.data?.feed?.results?.flat(Infinity))
            setOldMusicList(response?.data?.feed?.results?.flat(Infinity))

        }).catch((err) => {
            console.log(err, "music list error")
        })

    }
    useEffect(() => {
        getdata()
    }, [searchText])


    const searchdata = (text) => {
        if (text == "") {
            setMusicList(getOldMusicList)
        } else {
            let listShow = getMusicList.filter((item) => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
            })
            setOldMusicList(listShow)
        }
    }


    // console.log(getMusicList, "music lisrrr")
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: 50, width: '89%', justifyContent: 'center', marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    ref={searchRef}
                    placeholder='Enter Music name'
                    onChangeText={(text) => {
                        searchdata(text)
                        setSearchText(text)
                    }}
                    value={searchText}
                    style={{ width: "100%", borderWidth: .5, borderColor: 'grey', height: 45 }} />
                {searchText === '' ? null : <TouchableOpacity
                    onPress={() => {
                        searchRef.current.clear()
                        setSearchText('')
                    }}
                    style={{ position: 'absolute', right: 10, }}>

                    <Image source={require('./cross.png')} resizeMode='contain' style={{ width: 30, height: 30 }} />
                </TouchableOpacity>}

            </View>
            <Text style={{ fontWeight: '600', color: '#000', fontSize: 20, marginHorizontal: 20, marginTop: 15 }}>Top 100 Albums</Text>
            <ScrollView>
                <View style={styles.container}>
                    {
                        getOldMusicList?.map((item) => {
                            return (
                                <View
                                    key={item?.id}
                                    style={styles.MusicBoxContainer}>
                                            {/* <FastImage
        style={{ width: 200, height: 200 }}
        source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    /> */}
                                    <Image source={{ uri: item?.artworkUrl100 }} style={{ width: '100%', height: 150, borderRadius: 6 }} resizeMode='contain' />
                                    <Text style={{ position: 'absolute', bottom: 20, left: 15, color: '#fff', fontWeight: '600', fontSize: 14 }}>{item?.name}</Text>
                                    <Text style={{ position: 'absolute', bottom: 5, left: 15, color: '#fff', fontWeight: '400', fontSize: 12 }}>{item?.artistName}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Ebneeds

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    MusicBoxContainer: {
        width: '45%',
        height: 'auto',
        // backgroundColor: 'red',
        marginBottom: 20,
        borderRadius: 6
    }
})