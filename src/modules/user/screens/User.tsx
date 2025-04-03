import { lazy, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table/interface";
import { Table } from "antd";

import Select from "antd/es/select/index";
import Input from "antd/es/input/index";
import FirstScreen from "../../firstScreen";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_USER } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { formatDate, formatDateTime } from "../../../shared/functions/utils/date";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { UserType } from "../../../shared/types/UserType";

const Screen = lazy(() => import('../../../shared/components/screen/Screen'));

const columns: ColumnsType<UserType> = [
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (_,user) => <p>{`${user.first_name} ${user.last_name}`}</p>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <p>{text}</p>,
    },
    {
        title: 'Criado em',
        dataIndex: 'created_on',
        key: 'created_on',
        render: (_,user) => <p>{formatDateTime(user.created_on)}</p>,
    }
];

const User = () => {
    const { request } = useRequests();
    const { isLoading, setLoading } = useLoading();
    const [ users, setUsers ] = useState<UserType[]>([]);

    // EVENTS
    useEffect(() => {
        setLoading(true);
        request(URL_USER, MethodsEnum.GET, setUsers)
        .then(() => setLoading(false));
    }, []);

    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Requisições Pendentes para Aprovação',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Lista de Usuários'
        }
    ]

    // Search ANTD
    const { Option } = Select;
    const { Search } = Input;
    const [ search, setSearch ] = useState<string>('');
    const [ filterColumn, setFilterColumn ] = useState<string>('name');
    const itemsFiltered = search.length > 0 ? users.filter((obj) => {
        const fieldValue = (obj as any)[filterColumn];
        if (filterColumn === 'created_on'){
            return formatDate(fieldValue).includes(search);
        }
        if (filterColumn === 'name'){
            return `${obj.first_name} ${obj.last_name}`.toLowerCase().includes(search.toLowerCase());
        }
        if (filterColumn === 'uf'){
            return fieldValue.toLowerCase().includes(search.toLowerCase());
        }
        if (filterColumn === 'email') {
            return fieldValue.includes(search);
        }
        return users
    }) : users

    return(
        <Screen listBreadcrumb={listBreadcrumb}> 
            {isLoading && <FirstScreen/>}
            <BoxButtons>
                <LimitedContainer width={240}>
                    <Select defaultValue="name" onChange={e => setFilterColumn(e)} style={{ width: 180, marginBottom: '8px' }}>
                        <Option value="name">Nome</Option>
                        <Option value="email">Email</Option>
                        <Option value="uf">UF</Option>
                        <Option value="created_on">Criado em</Option>
                    </Select>
                    <Search placeholder="Pesquisar" onSearch={e => setSearch(e)} enterButton/>
                </LimitedContainer>
            </BoxButtons>
            <Table columns={columns} 
                dataSource={itemsFiltered} 
                rowKey={(obj) => obj.id} 
                scroll={{y:550, x:1000}}/>
        </Screen>
    )
}

export default User;