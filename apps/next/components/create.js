import React, {useMemo} from "react";
import Modal from "react-native-modal";
import ShareRizz from "./shareRizz"
import { Text, View} from 'dripsy';
import { Button, TextInput } from 'react-native';
import { MotiPressable } from 'moti/interactions';

export default function Create({isModalVisible, setModalVisible}){


    return  (
        <div style={{backgroundColor: "#f1c40f"}}>
        <Modal onBackdropPress={()=>setModalVisible(false)} style={{backgroundColor: 'transparent', padding: 10,}} isVisible={isModalVisible}>
        <ShareRizz isModalVisible={isModalVisible}  setModalVisible={setModalVisible}/>
        {/* <View>
          <Text style={{color: "white"}}>Hello!</Text>
          <TextInput placeholder="Type here..." style={{borderColor: "white", borderWidth: 10, backgroundColor: "white"}}></TextInput>
          <MotiPressable
          animate={useMemo(
            () => ({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            },
            []
          )}
          onPress={()=>console.log("helo world")} containerStyle={{ justifyContent: 'center', alignItems: "center" }} >
          <Text
            selectable={false}
            sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
          >
            Share Rizz
          </Text>
        </MotiPressable>
        </View> */}
      </Modal>
        </div>
    )
} 