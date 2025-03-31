import React, { memo } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  background: 'rgba(255, 255, 255, 0.8)',
  zIndex: 1000
};

const spinStyle = {
  fontSize: '30px',
  color: 'green'
};

const FirstScreen: React.FC = () => {

  return (
    <div style={containerStyle}>
      <LoadingOutlined title="...Carregando" style={spinStyle}/>
      {/* <img title="...Carregando" src={loading} style={spinStyle}/> */}
    </div>
  );
};

export default memo(FirstScreen);