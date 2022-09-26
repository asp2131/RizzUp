import React from 'react';
import dynamic from 'next/dynamic'

const Videocall = dynamic(() => import('./video_call'), { ssr: false });


const Video = () => {
    React.useEffect(() => {
        // window is accessible here.
      }, []);
      return (
        (typeof window !== 'undefined') &&
        <>
        <Videocall/>
        </>      
     );

  }
  
export default Video;