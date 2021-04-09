import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Share,
  TouchableOpacity,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
} from 'react-native-agora';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function Live(props) {
  const isBroadcaster = props.route.params.type === 'create';

  const onShare = async () => {
    try {
      const result = await Share.share({ message: props.route.params.channel });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {

        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [joined, setJoined] = useState(false);
  const [broadcasterVideoState, setBroadcasterVideoState] = useState(
    VideoRemoteState.Decoding,
  );
  const AgoraEngine = useRef();
  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      '7a6b1145afbf43f5b8055a66892a96cd',
    );
    AgoraEngine.current.enableAudio();
    AgoraEngine.current.setChannelProfile(ChannelProfile.Communication);
    // if (isBroadcaster)
    //   AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    // AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
    //   if (uid === 1) setBroadcasterVideoState(state);
    // });

    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoined(true);
      },
    );
  };

//   const onSwitchCamera = () => AgoraEngine.current.switchCamera();

  useEffect(() => {
    const uid = isBroadcaster ? 1 : 0;
    init().then(() =>
      AgoraEngine.current.joinChannel(
        null,
        props.route.params.channel,
        null,
        uid,
      ),
    );
    return () => {
      AgoraEngine.current.destroy();
    };
  }, []);

  const renderHost = () =>
    broadcasterVideoState === VideoRemoteState.Decoding ? (
      <RtcRemoteView.SurfaceView
        uid={1}
        style={styles.fullscreen}
        channelId={props.route.params.channel}
      />
    ) : (
      <View style={styles.broadcasterVideoStateMessage}>
        <Text style={styles.broadcasterVideoStateMessageText}>
          {videoStateMessage(broadcasterVideoState)}
        </Text>
      </View>
    );

  const renderLocal = () => (
    <RtcLocalView.SurfaceView
      style={styles.fullscreen}
      channelId={props.route.params.channel}
    />
  );

  return (
    <View style={styles.container}>
      {!joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#222"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
        </>
      ) : (
        <>
          {isBroadcaster ? renderLocal() : renderHost()}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onShare}>
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} disabled>
              <Text style={styles.buttonText}>Switch Camera</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: 150,
    backgroundColor: '#fff',
    marginBottom: 50,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
  },
  broadcasterVideoStateMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  broadcasterVideoStateMessageText: {
    color: '#fff',
    fontSize: 20,
  },
});