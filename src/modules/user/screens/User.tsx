import { useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table/interface";
import { Table, Popconfirm, Select, Input } from "antd";

import FirstScreen from "../../firstScreen";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_USER } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { UserType } from "../../../shared/types/UserType";
import { getItemStorage } from "../../../shared/functions/connection/storageProxy";
import { logout } from "../../../shared/functions/connection/auth";

const Screen = lazy(() => import('../../../shared/components/screen/Screen'));

const User = () => {
    const navigate = useNavigate();
    const { request } = useRequests();
    const { isLoading, setLoading } = useLoading();
    const [users, setUsers] = useState<UserType[]>([]);

    // Deletar usuário
    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await request(`${URL_USER}/${id}`, MethodsEnum.DELETE);
            setUsers(prev => prev.filter(user => user.id !== id));

            const loggedUserId = getItemStorage('USER_ID');
            if (loggedUserId && id === Number(loggedUserId)) {
                logout(navigate); 
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        } finally {
            setLoading(false);
        }
    };

    // Colunas da tabela
    const columns: ColumnsType<UserType> = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (_, user) => <p>{`${user.first_name} ${user.last_name}`}</p>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo',
            render: (_, user) => <p>{`${user.cargo}`}</p>,
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, user) => (
                <Popconfirm
                    title="Tem certeza que deseja deletar este usuário?"
                    onConfirm={() => handleDelete(user.id)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <a style={{ color: 'red' }}>Deletar</a>
                </Popconfirm>
            ),
        }
    ];

    // Carrega usuários
    useEffect(() => {
        setLoading(true);
        request(URL_USER, MethodsEnum.GET, setUsers)
            .then(() => setLoading(false));
    }, []);

    // Breadcrumb
    const listBreadcrumb = [
        {
            name: 'Dashboard',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Lista de Usuários'
        }
    ];

    // Filtro
    const { Option } = Select;
    const { Search } = Input;
    const [search, setSearch] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('name');
    const itemsFiltered = search.length > 0 ? users.filter((obj) => {
        const fieldValue = (obj as any)[filterColumn];
        if (filterColumn === 'name') {
            return `${obj.first_name} ${obj.last_name}`.toLowerCase().includes(search.toLowerCase());
        }
        if (filterColumn === 'email') {
            return fieldValue.includes(search);
        }
        if (filterColumn === 'cargo') {
            return fieldValue.toLowerCase().includes(search.toLowerCase());
        }
        return users;
    }) : users;

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen />}
            <BoxButtons>
                <LimitedContainer width={240}>
                    <Select defaultValue="name" onChange={e => setFilterColumn(e)} style={{ width: 180, marginBottom: '8px' }}>
                        <Option value="name">Nome</Option>
                        <Option value="email">Email</Option>
                        <Option value="cargo">Cargo</Option>
                    </Select>
                    <Search placeholder="Pesquisar" onSearch={e => setSearch(e)} enterButton />
                </LimitedContainer>
            </BoxButtons>
            <Table
                columns={columns}
                dataSource={itemsFiltered}
                rowKey={(obj) => obj.id}
                pagination={{
                    pageSize: 10, 
                    showTotal: (total) => `Total: ${total} ${total === 1 ? 'usuário' : 'usuários'}`,
                }}
            />
        </Screen>
    );
};

export default User;