import React, { useState } from "react";
import Screen from "../../../shared/components/screen/Screen";
import FirstScreen from "../../firstScreen";
import { useCO2Data } from "./charts/useCO2Data";
import { useExampleChart } from "./charts/useExampleChart";
import ChartsContainer from "../../../shared/components/charts/ChatsContainer";
import InputDateAntd, { dateAntd } from "../../../shared/components/inputs/inputDateAntd/InputDateAntd";
import Button from "../../../shared/components/buttons/button/Button";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { useTreeHealth } from "./charts/useTreeHealth";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_AREA_INFORMATION } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { CO2Type } from "../../../shared/types/Co2Type";
import { TreeHealth } from "../../../shared/types/treeHealth";


const Dashboard: React.FC = () => {
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();
    
    // States para os filtros
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    
    // States a serem passados para os charts
    const [ co2, setCO2Info ] = useState<CO2Type[]>([]);
    const [treeHealth, setTreeHealth] = useState<TreeHealth | null>(null);
    

        // Adicionar novos charts aqui
    const chartCO2Options = useCO2Data(co2);
    const chartExampleOptions = useExampleChart();
    const chartTreeHealth = useTreeHealth(treeHealth);

    const allChartsOptions = [
        { options: chartCO2Options, title: "Emissões de CO2", fraction: 1 },
        { options: chartTreeHealth, title: "Saúde das árvores", fraction: 1 },
        { options: chartExampleOptions, title: "Exemplo", fraction: 1 },
    ];

    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Dashboard'
        }
    ]
    
    // UTILS
    const handleFilter = async () => {
        if (startDate && endDate) {
            setLoading(true);
    
            try {
                await Promise.all([
                    request(`${URL_AREA_INFORMATION}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setCO2Info),
                    request(`${URL_AREA_INFORMATION}/tree-health`, MethodsEnum.GET, setTreeHealth),
                ]);
        
            } catch (error) {
                console.error("Erro nas requisições:", error);
                setNotification('Houve um erro ao carregar as informações!', NotificationEnum.ERROR);
            } finally {
                setLoading(false);
            }
        } else {
            setNotification('Definir Data Inicial e Final!', NotificationEnum.WARNING);
        }
    };

    return(
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen/>}
            <h2>Filtro do Período</h2>
           
                <LimitedContainer width={350}>
                    <InputDateAntd onChange={(event: dateAntd) => {setStartDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="31/12/2025"
                        margin="0px 0px 15px 0px" 
                        label="Data Inicial"
                        id="start_date" />
                </LimitedContainer>
                <LimitedContainer width={350}>
                    <InputDateAntd onChange={(event: dateAntd) => {setEndDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="01/01/2040"
                        margin="0px 0px 15px 0px" 
                        label="Data Final"
                        id="end_date" />
                </LimitedContainer>
                <Button id="filter" text="Filtrar" type="button" onClick={() => handleFilter()}/>
           
            <ChartsContainer charts={allChartsOptions} />  
        </Screen> 
    )
}

export default Dashboard;