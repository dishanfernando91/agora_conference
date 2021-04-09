import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AgoraUIKit from "agora-rn-uikit";

export default function Conference({ route }) {
  const navigation = useNavigation();

  // return caller to home when hanging up
  const callbacks = {
    EndCall: () => navigation.goBack(),
  };

  const rtcProps = {
    appId: "7a6b1145afbf43f5b8055a66892a96cd",
    channel: route.params.channel
  }

  const onShare = async () => {
    try {
      await Share.share({ message: props.route.params.channel });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={navigation.goBack()}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    right: 0,
    width: 80,
    height: 40,
    margin: 25,
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#78b0ff",
  },
  shareButtonText: {
    fontSize: 16,
  },
});