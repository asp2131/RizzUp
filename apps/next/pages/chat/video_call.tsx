// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import dynamic from 'next/dynamic';
import { UserContext } from '../../lib/UserContext';
import axios from 'axios';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('https://ancient-star-8926.fly.dev/');
const AgoraUIKitDynamic = dynamic(() => import('agora-react-uikit'), {
    ssr: false
  });

const App = () => {
    const [user] = useContext(UserContext) 
    const [videoCall, setVideoCall] = useState(false);
    const [emittedOwnRoom, setEmmittedRoom] = useState(false)
    // const rtcProps = {
    //     appId: '6b5cfdcaa9ad4a1c819f627b8782ec45',
    //     channel: 'test', // your agora channel,
    //     token: '007eJxTYHDlz/numnz9sXN+2cmHH7gO29c/lNy/5zjj6gtXv/9+diZGgcEsyTQ5LSU5MdEyMcUk0TDZwtAyzczIPMnC3MIoNdnEdKqAYbJIklFyyklxBkYoBPFZGEpSi0sYGABTwSLo' // use null or skip if using app in testing mode
    // };
    const [rtcProps, setRtcProps] = useState(null);

    useEffect(()=> {
        socket.on('randomRoom', (data) => console.log("existing rooms", data));
        fetchRoom();
        console.log(rtcProps, "rtcProps");
    }, []);

    const fetchToken = async () => {
        if(user.email){
            setEmmittedRoom(true)
            const res = await axios.get(`https://corsmirror.onrender.com/v1/cors?url=https://ancient-star-8926.fly.dev/access_token?channelName=${user.email}`);
            emittedOwnRoom ? null :
            socket.emit('videoChat', {
                id: `${socket.id}${Math.random()}`,
                channel: socket.id, // your agora channel,
                token: res.data.token 
              });
              setRtcProps({
                  appId: '1fd05c667041467aa745f8ea03d17ff3',
                  channel: socket.id, // your agora channel,
                  token: res.data.token 
              })  
          }
    }

    const fetchRoom = async () => {
        const room = await axios.get(`https://corsmirror.onrender.com/v1/cors?url=https://ancient-star-8926.fly.dev/room`);
        console.log(room, "room");
        if(room.data.id.includes("undefined")){
            fetchToken();
            return;
        }
        const {channel} = room.data;
        const res = await axios.get(`https://corsmirror.onrender.com/v1/cors?url=https://ancient-star-8926.fly.dev/access_token?channelName=${channel}`);
            setRtcProps({
                appId: '1fd05c667041467aa745f8ea03d17ff3',
                channel: channel, // your agora channel,
                token: res.data.token 
            })
    }

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };

    return videoCall && rtcProps ? (
        <div style={{ flex: "none", display: 'flex', width: '100vw', height: '100vh', justifyContent: "center", alignContent: "center" }}>
            <AgoraUIKitDynamic rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <div style={{ flex: "none", display: 'flex', width: '100vw', height: '100vh', justifyContent: "center", alignContent: "center" }}>
        <h3 style={{paddingTop: 300}} onClick={() => setVideoCall(true)}>Start Call</h3>
        </div>
    );
};


export default App;