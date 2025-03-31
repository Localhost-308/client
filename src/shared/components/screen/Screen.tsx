import Divider from 'antd/es/divider/index';
import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb';

import Header from '../header/Header';
import { ScreenContainer } from './Screen.style';
import { memo } from 'react';

interface ScreenProps {
    children: React.ReactNode;
    listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({children, listBreadcrumb}: ScreenProps) => {

    return (
        <>
            <Header />
            <ScreenContainer>
                { listBreadcrumb && (
                    <>
                        <Breadcrumb listBreadcrumb={listBreadcrumb}/>
                        <Divider/>
                    </>
                
                )}
                {children}
            </ScreenContainer>
        </>
        
    )
}

export default memo(Screen);