import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'antd/es/dropdown/index';
import Drawer from 'antd/es/drawer/index';
import Menu from 'antd/es/menu/index';
import Modal from 'antd/es/modal/index';
import Avatar from 'antd/es/avatar/index';
import Button from 'antd/es/button/button';
import type { MenuProps } from 'antd/es/menu/menu';
import { DashboardOutlined,
    DownOutlined, 
    UserOutlined, 
    MenuOutlined, 
    SearchOutlined, 
    FileExcelOutlined} from '@ant-design/icons';

import logo from '../../../../public/kersys.png';
import icon from '../../../../public/kersys.png';
import { logout } from "../../functions/connection/auth";
import { HeaderContainer } from "./Header.style";
import { getItemStorage } from "../../functions/connection/storageProxy";
import { FIRST_NAME, LAST_NAME } from "../../constants/authorizationConstants";
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { NotificationEnum } from '../../types/NotificationType';
import { DashboardRoutesEnum } from '../../../modules/dashboard/routes';
import { UserRoutesEnum } from '../../../modules/user/routes';
import { ContainerLogoName, NameCompany } from '../menu/menu.style';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ImportCSVRoutesEnum } from '../../../modules/importCSV/routes';

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {setNotification} = useGlobalReducer();

    const showModal = useCallback(() => setOpen(true), []);
    const hideModal = useCallback(() => setOpen(false),[]);

    const allName = `${getItemStorage(FIRST_NAME)} ${getItemStorage(LAST_NAME)}`;
    const userPhoto = '';

    const items: MenuProps['items'] = [
        {
            key: '3',
            label: 'Sair',
            danger: true,
            onClick: showModal,
        },
    ];

    // MENU
    const { width } = useWindowSize();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    const itemsHamburger: MenuItem[] = [
        {
          key: 'dashboard_key',
          icon: <DashboardOutlined />,
          label: 'Dashboard Geral',
          onClick: () => navigate(DashboardRoutesEnum.DASHBOARD)
        },
        {
            key: 'import_key',
            icon: <FileExcelOutlined />,
            label: 'Importar Dados',
            onClick: () => navigate(ImportCSVRoutesEnum.IMPORT_CSV)
          },
        {
            key: 'consult_insert',
            icon: <SearchOutlined />,
            label: 'Consulta / Cadastro',
            children: [
              { 
                key: 'users_key',
                label: 'Usuários',
                children: [
                    { key: 'user_consult', label: 'Consultar', onClick: () => navigate(UserRoutesEnum.USER)},
                    { key: 'user_insert', label: 'Cadastrar', onClick: () => navigate(UserRoutesEnum.USER_INSERT)},
                ], 
              }
            ]
        }
    ];

    return (
        <>
            <Modal title="Atenção"
                open={open}
                onOk={() => {
                    logout(navigate);
                    setNotification('Sessão encerrada!', NotificationEnum.SUCCESS);
                }}
                onCancel={hideModal}
                okText="Sim"
                cancelText="Cancelar">
                <p>Tem certeza que deseja sair?</p>
            </Modal>

            <HeaderContainer>
                <ContainerLogoName>
                {width < 768 ?
                    <img src={icon} style={{ width: '50px', height: '50px', margin: '10px 0 0 0' }} /> :
                    <img src={logo} style={{ width: '100px', margin: '10px 0 0 0' }} />}
                {width > 768 ? <NameCompany style={{marginTop: '8px'}}>Menu</NameCompany> : <></>}
                <Button icon={<MenuOutlined style={{ color: "white" }} />}
                    type="link"
                    style={{ margin: '0px 16px', marginTop: '10px' ,fontSize: '24px', color: 'black' }}
                    onClick={showDrawer} />
                </ContainerLogoName>

                <Dropdown menu={{ items }}>
                <Button type="link"
                    style={width > 768 ? {
                    display: 'flex',
                    alignItems: 'center',
                    margin: '15px 15px 0px 0px',
                    height: '45px',
                    backgroundColor: '#82B04D',
                    color: 'black',
                    fontWeight: 500
                    } : {
                    display: 'flex',
                    alignItems: 'center',
                    margin: '15px 15px 0px 0px',
                    height: '45px',
                    backgroundColor: '#82B04D',
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: 500
                    }}>
                    <Avatar src={userPhoto || undefined}
                        icon={!userPhoto && <UserOutlined />}
                        style={{ marginRight: 8 }}/>
                        {allName} <DownOutlined />
                </Button>
                </Dropdown>
            </HeaderContainer>
            <Drawer title="Menu"
                placement="left"
                onClose={closeDrawer}
                open={drawerVisible}
                width={280}>
                <Menu mode="inline" items={itemsHamburger} />
            </Drawer>
        </>
    );
};

export default memo(Header);
