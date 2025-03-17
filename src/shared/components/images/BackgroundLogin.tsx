import { memo } from 'react';
import logo from '../../../../public/kersys.png';
import styles from '../../../modules/login/styles/LoginScreen.module.css';

interface LogoProps {
    style?: any
}

const BackgroundLogin = ({ style }: LogoProps) => {
  return <img src={logo} className={styles.background_image} alt="Background Login" style={style}/>;
};

export default memo(BackgroundLogin);