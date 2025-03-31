
import { lazy, Suspense, useCallback } from "react";

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
    const { userInsert,
            setUserInsert,
            errors,
            handleInsert,
            onChange } = useInsertUsers();

    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Requisições Pendentes para Aprovação',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Lista de Usuários',
            navigateTo: UserRoutesEnum.USER
        },
        {
            name: 'Inserir Usuários'
        }
    ]

    // UTILS
    const resetForm = useCallback(() => {
        setUserInsert({
            first_name: "",
            last_name: "",
            email: ""
        });
    }, []);

    return(
        <Suspense>
            {isLoading && <FirstScreen/>}
            <Screen listBreadcrumb={listBreadcrumb}>
                <form onSubmit={(event) => handleInsert(event, setLoading, resetForm)}>
                    <LimitedContainer width={400}>
                        <Input onChange={(event) => onChange(event, 'first_name')} 
                            value={userInsert.first_name} 
                            margin="0px 0px 15px 0px" 
                            label="Primeiro Nome *" 
                            placeholder="Primeiro Nome" 
                            type="text" 
                            id="first_name"/>
                        {errors.first_name && <p style={{color: 'red', fontWeight: 500}}>{errors.first_name}</p>}
                        <Input onChange={(event) => onChange(event, 'last_name')}
                            value={userInsert.last_name} 
                            margin="0px 0px 15px 0px" 
                            label="Ultimo nome *" 
                            placeholder="Ultimo nome" 
                            type="text" 
                            id="last_name" />
                        {errors.last_name && <p style={{color: 'red', fontWeight: 500}}>{errors.last_name}</p>}
                        <Input onChange={(event) => onChange(event, 'email')}
                            value={userInsert.email} 
                            margin="0px 0px 15px 0px" 
                            label="Email *" 
                            placeholder="Email" 
                            type="text" 
                            id="email" />
                        {errors.email && <p style={{color: 'red', fontWeight: 500}}>{errors.email}</p>}
                        {/* <SelectFilter label="Selecionar UF *"
                            margin="0px 0px 15px 0px"
                            onChange={(event) => handleChangeSelect(event,'uf')}
                            defaultValue={'Selecionar'}
                            value={userInsert.uf}
                            options={
                                brazilStates.map((braz) => ({
                                    value: `${braz.value}`,
                                    label: braz.label
                                }))}/>
                        {errors.uf && <p style={{color: 'red', fontWeight: 500}}>{errors.uf}</p>} */}
                        <LimitedContainer width={200} style={{alignItems: 'center', justifyContent: 'center', margin:"0px 0px 15px 0px"}}>
                            <Button text="Cadastrar" type="submit" id="insert"/>
                        </LimitedContainer>
                        <small><b>Observação:</b> Para definir a senha, será preciso ir na tela de login e clicar em <b>RECUPERAR SENHA</b>, e informar o email cadastrado.</small>
                    </LimitedContainer>
                </form>
            </Screen> 
        </Suspense>
    )
}

export default UserInsert;