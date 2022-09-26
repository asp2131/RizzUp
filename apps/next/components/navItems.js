import React from "react";
import Image from 'next/image';

const navItems = ({ Icon, title }) => {

    return Icon ? (
      <>
        <div className="icon-container group">
          <Icon color={"black"} className="icon" />
          <p className="icon-title">{title}</p>
        </div>
      </>
    ) : (
      <>
        <div className="icon-container group">
        {/* <GifLoader
                loading={true}
                imageSrc="https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1663869205/logovid_ztnse3.gif"
                imageStyle={{width: "20%", height: "20%",}}
                // overlayBackground="#5634CB"
            /> */}
        <Image alt=""  width={100} height={100}  src = "https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1663870005/whitelogovid-unscreen_qkox7q.gif" />
          {/* <Image alt="logo" width={400} height={100} src={"https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1663868386/text-1663868379367_qsdaq4.png"} /> */}
        </div>
      </>
    );
  };
  
  export default navItems;
  