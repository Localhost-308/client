import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/LoginScreen.module.css';
import FirstScreen from '../../firstScreen';
import styles from '../styles/LoginScreen.module.css';
import { useRequests } from '../../../shared/hooks/useRequests';
import { setItemStorage } from '../../../shared/functions/connection/storageProxy';
import { PERMISSIONS, USER_ID, FIRST_NAME, LAST_NAME } from '../../../shared/constants/authorizationConstants';
import { useLoading } from '../../../shared/components/loadingProvider/LoadingProvider';

const InputAD = lazy(() => import('../../../shared/components/inputs/inputAntd/InputAD'));
const InputPassword = lazy(() => import('../../../shared/components/inputs/inputPasswordAntd/InputPassword'));
const Button = lazy(() => import('../../../shared/components/buttons/button/Button'));
const HorizontalLogo = lazy(() => import('../../../shared/components/images/HorizontalLogo'));
const BackgroundLogin = lazy(() => import('../../../shared/components/images/BackgroundLogin'));

const LoginScreen = () => {
    const navigate = useNavigate();
    const { isLoading, setLoading } = useLoading();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setPassword(event.target.value);
    }

    //  POST REQUEST
    const { authRequest } = useRequests();

    const handleLogin = () => {
        setLoading(true);
        authRequest({ email, password }, navigate)
          .then((authData) => {
            if (authData?.user) {
              const user = authData.user;
              setItemStorage(PERMISSIONS, JSON.stringify({ cargo: user.cargo }));
              setItemStorage(USER_ID, user.id.toString());
              setItemStorage(FIRST_NAME, user.first_name);
              setItemStorage(LAST_NAME, user.last_name);
            }
        })
        .finally(() => setLoading(false));
    };

    return (
        <Suspense>
            <div className={styles.container_login_screen}>
                {isLoading && <FirstScreen/>}
                <div className={styles.container_login}>
                    <div className={styles.div_logo}>
                        <HorizontalLogo style={{width:'320px'}}/>
                        <h1 className={styles.title}>Login</h1>
                        <InputAD label='Email' 
                            margin="0px 0px 16px 0px" 
                            type='email' 
                            id='email' 
                            placeholder='Email' 
                            onChange={handleEmail} 
                            value={email}/>
                        <InputPassword label='Senha' 
                            margin="0px 0px 16px 0px" 
                            type='password' 
                            id='password' 
                            onChange={handlePassword} 
                            value={password}/>
                        <Button text='ENTRAR' 
                            type='submit' 
                            id='login' 
                            onClick={() => handleLogin()}/>
                    </div>
                </div>
                <BackgroundLogin/>
            </div>
        </Suspense>
    )
}

export default LoginScreen;