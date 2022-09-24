import Head from 'next/head';
import Header from './nav'
import ShareRizz from './create';
import React, {useState} from 'react';
import { FloatingAction } from "react-native-floating-action";

const Layout = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return(
  <>
    <Head>
      <title>RizzUp</title>
      <link rel='icon' href='/favicon.ico' />
      <link
          href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap"
          rel="stylesheet"
        />
    </Head>
    <Header />
    <main>
      <div className='container'>{props.children}</div>
      <div className='sticky'>
      <FloatingAction
          overlayColor={"transparent"}
          onPressMain={() => setModalVisible(true)}
        />
      </div>  
    <ShareRizz isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </main>
   
  </>
)};

export default Layout;
