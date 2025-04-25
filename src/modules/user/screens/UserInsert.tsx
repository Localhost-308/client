import { lazy, Suspense, useCallback } from "react";
import { Select } from "antd";

import FirstScreen from "../../firstScreen";
import { useInsertUsers } from "../hooks/useInsertUsers";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { UserRoutesEnum } from "../routes";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { DashboardRoutesEnum } from "../../dashboard/routes";

const Input = lazy(() => import("../../../shared/components/inputs/input/Input"));
const Screen = lazy(() => import("../../../shared/components/screen/Screen"));
const Button = lazy(() => import("../../../shared/components/buttons/button/Button"));

const UserInsert = () => {
    const { isLoading, setLoading } = useLoading();
    const {
        userInsert,
        setUserInsert,
        errors,
        handleInsert,
        onChange
    } = useInsertUsers();

    const listBreadcrumb = [
        { name: 'Requisições Pendentes para Aprovação', navigateTo: DashboardRoutesEnum.DASHBOARD },
        { name: 'Lista de Usuários', navigateTo: UserRoutesEnum.USER },
        { name: 'Inserir Usuários' }
    ];

    const resetForm = useCallback(() => {
        setUserInsert({
            first_name: "",
            last_name: "",
            email: "",
            role: ""
        });
    }, [setUserInsert]);

    const roleOptions = [
        { label: 'ADMIN', value: 'ADMIN' },
        { label: 'GESTOR', value: 'GESTOR_AREA' }
    ];

    return (
        <Suspense>
            {isLoading && <FirstScreen />}
            <Screen listBreadcrumb={listBreadcrumb}>
                <form onSubmit={(event) => handleInsert(event, setLoading, resetForm)}>
                    <LimitedContainer width={600}>

                        <div style={{ display: 'flex', gap: 100, marginTop: 50, marginBottom: 70 }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                onChange={(event) => onChange(event, 'first_name')}
                                value={userInsert.first_name}
                                label="Nome *"
                                placeholder="Ex: João"
                                type="text"
                                id="first_name"
                                style={{ width: '100%', height: '40px', fontSize: '14px' }}  
                            />
                            {errors.first_name && <p style={{ color: 'red', fontWeight: 500 }}>{errors.first_name}</p>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <Input
                                onChange={(event) => onChange(event, 'last_name')}
                                value={userInsert.last_name}
                                label="Sobrenome *"
                                placeholder="Ex: Silva"
                                type="text"
                                id="last_name"
                                style={{ width: '100%', height: '40px', fontSize: '14px' }} 
                            />
                            {errors.last_name && <p style={{ color: 'red', fontWeight: 500 }}>{errors.last_name}</p>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 100, marginBottom: 70 }}>
                        <div style={{ flex: 1 }}>
                            <Input
                                onChange={(event) => onChange(event, 'email')}
                                value={userInsert.email}
                                label="Email *"
                                placeholder="Ex: joao@gmail.com.br"
                                type="text"
                                id="email"
                                style={{ width: '100%', height: '40px', fontSize: '14px' }} 
                            />
                            {errors.email && <p style={{ color: 'red', fontWeight: 500 }}>{errors.email}</p>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 4, fontWeight: 500, fontSize: '18px', marginLeft: '10px' }}>Cargo *</div>
                            <Select
                                style={{ width: 310, height: '44px', fontSize: '14px' }}  
                                value={userInsert.role}
                                onChange={(value) => setUserInsert(prev => ({ ...prev, role: value }))}
                                options={roleOptions}
                            />
                            {errors.role && <p style={{ color: 'red', fontWeight: 500 }}>{errors.role}</p>}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <LimitedContainer width={200} style={{ position: 'absolute', bottom: 50, right: 50 }}>
                            <Button text="Cadastrar" type="submit" id="insert" color="green" />
                        </LimitedContainer>
                    </div>
                    </LimitedContainer>
                </form>
            </Screen>
        </Suspense>
    );
};

export default UserInsert;