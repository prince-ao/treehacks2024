import { View, Text, TextInput, Image, ImageBackground, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
// import style from '../theme/style';
// import themeContext from '../theme/themeContex';
// import { Colors } from '../theme/color';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function On2() {
    const navigation = useNavigation();
    // const theme = useContext(themeContext);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                    <Image source={require('../../assets/images/Logo.png')} style={{ width: width, height: height / 2.5, alignSelf: 'center', resizeMode: 'stretch' }} />
                </View>
                <Text style={[{ textAlign: 'center', color: "#000000", marginVertical: 20, marginHorizontal: 20, marginTop: 50, fontSize:24}]}>Design Templates are Simple and Easy</Text>
                <View style={{
                    paddingHorizontal: 20,
                    paddingTop: 25,
                }}>

                    <View style={{ paddingTop: 15 }}>
                        <Text style={{ color: "#00000040", textAlign: 'center', fontSize:14 }}>Create a unique emotional story that describes better than words</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                        <View style={{borderColor: "#E0E0E0", borderWidth:1, padding:4, borderRadius:20, backgroundColor:"#E0E0E0", marginHorizontal: 5}}></View>
                        <View style={{ borderColor: "#0077FF", borderWidth: 1, paddingHorizontal: 12, borderRadius: 10, backgroundColor: "#0077FF", paddingVertical: 4 }}></View>

                    </View>

                    <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: "green",
                  borderRadius: 30,
                  paddingVertical: 20,
                  alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 20
                }}
              >
                <Text className="text-lg">Next</Text>
              </TouchableOpacity>
            </View>

                    
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}