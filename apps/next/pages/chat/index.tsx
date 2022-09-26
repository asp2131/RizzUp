import dynamic from 'next/dynamic'

const Videocall = dynamic(() => import('./video_call'), { ssr: false });

export default Videocall;