import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuAntd from 'antd/es/menu/index';
import type { MenuProps } from 'antd/es/menu';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

import styles from "./Menu.module.css";
import logo from '../../../../public/kersys.png';
import icon from '../../../../public/kersys.png';
import { ContainerLogoName, ContainerMenu } from "./menu.style";
import { UserRoutesEnum } from '../../../modules/user/routes';
import { DashboardRoutesEnum } from '../../../modules/dashboard/routes';
import { useWindowSize } from '../../hooks/useWindowSize';


type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (Number(width) <= 768) setCollapsed(true);
    else setCollapsed(false);
  }, [width]);

  const items: MenuItem[] = [
    {
      key: 'dashboard_key',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate(DashboardRoutesEnum.DASHBOARD)
    },
    {
      key: 'users_key',
      icon: <UserOutlined />,
      label: 'Usuários',
      children: [
        { key: 'user_consult', label: 'Consultar', onClick: () => navigate(UserRoutesEnum.USER) },
        { key: 'user_insert', label: 'Cadastrar', onClick: () => navigate(UserRoutesEnum.USER_INSERT) },
      ],
    }
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        {width < 768 ?
          <img src={icon} style={{ width: '50px', height: '50px', margin: '15px 23px' }} /> :
          <img src={logo} style={{ width: '170px', margin: '0px 16px' }} />}
      </ContainerLogoName>
      <MenuAntd onClick={onClick}
        className={styles.custom_menu}
        selectedKeys={[current]}
        mode="vertical"
        inlineCollapsed={collapsed}
        items={items} />
    </ContainerMenu>
  );
}

export default memo(Menu);