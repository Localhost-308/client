import { memo } from 'react';
import logo from '../../../../public/kersys.png';

interface LogoProps {
    style?: any
}

const Logo = ({ style }: LogoProps) => {
  return <img src={logo} alt="Logo" style={style}/>;
};

export default memo(Logo);