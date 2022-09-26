import React, { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import dynamic from 'next/dynamic'
const AgoraUIKitDynamic = dynamic(() => import('agora-react-uikit'), {
    ssr: false
  });

const App = () => {
    const [videoCall, setVideoCall] = useState(true);
    const rtcProps = {
        appId: '6b5cfdcaa9ad4a1c819f627b8782ec45',
        channel: 'test', // your agora channel,
        token: '007eJxTYHDlz/numnz9sXN+2cmHH7gO29c/lNy/5zjj6gtXv/9+diZGgcEsyTQ5LSU5MdEyMcUk0TDZwtAyzczIPMnC3MIoNdnEdKqAYbJIklFyyklxBkYoBPFZGEpSi0sYGABTwSLo' // use null or skip if using app in testing mode
    };
    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <div style={{ flex: "none", display: 'flex', width: '100vw', height: '100vh', justifyContent: "center", alignContent: "center" }}>
            <AgoraUIKitDynamic rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
    );
};


export default App;