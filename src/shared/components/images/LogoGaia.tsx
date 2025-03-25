import { memo } from 'react';
import logo from '../../../../public/LOGO-GAIA.webp';

interface LogoProps {
    style?: any
}

const LogoGaia = ({ style }: LogoProps) => {
  return <img src={logo} alt="GAIA Logo" style={style}/>;
};

export default memo(LogoGaia);