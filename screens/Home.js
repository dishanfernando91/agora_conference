import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');

  const createConference = () => navigation.navigate('Conference', { channel: uuid() });
  const joinConference = () => navigation.navigate('Conference', { channel: joinChannel });
  const createLive = () => navigation.navigate('Live', { type: 'create', channel: uuid() });
  const joinLive = () => navigation.navigate('Live', { type: 'join', channel: joinChannel });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Conference Demo</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createConference}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.joinContainer}>
        <TextInput
          value={joinConference}
          onChangeText={setJoinChannel}
          placeholder="Enter Conference Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinConference}
          style={[
            styles.button,
            { backgroundColor: joinChannel === '' ? '#555555' : '#78b0ff' },
          ]}
          disabled={joinChannel === ''}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

      <View style={{ borderWidth: 1, borderColor: 'grey', width: 360, margin: 20}}></View>

      <View>
      <Text style={styles.title}>Livestream Demo</Text>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.joinContainer}>
        <TextInput
          value={joinChannel}
          onChangeText={setJoinChannel}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinLive}
          disabled={joinChannel === ''}
          style={[
            styles.button,
            { backgroundColor: joinChannel === '' ? '#555555' : '#78b0ff' },
          ]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: '#333',
  },
  createContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 50,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 0,
    borderColor: '#22222255',
  },
  joinChannelInput: {
    backgroundColor: '#cccccc77',
    width: 300,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    textAlign: 'center',
  },
  button: {
    width: 300,
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78b0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});