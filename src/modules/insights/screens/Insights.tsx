import { useEffect, useState } from "react";

import Screen from "../../../shared/components/screen/Screen";
import Select from "../../../shared/components/inputs/select/Select";
import FirstScreen from "../../firstScreen";
import Button from "../../../shared/components/buttons/button/Button";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ListAttrType } from "../../../shared/types/ListAttrType";
import { URL_MACHINE_LEARN } from "../../../shared/constants/urls";
import { PredictTreeHealth } from "../../../shared/dto/PredictTreeHealth.dto";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import PredictionStatus from "../../../shared/components/predict/PredictionStatus";
import { ContainerRowResponsive } from "../../../shared/components/styles/containerRowResponsive.style";
import { BestPracticesTable } from "../../../shared/components/predict/BestPraticesTable";
import InsightsDashboard from "../../../shared/components/predict/Practiceinsight";

const Insights = () => {
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();
    const [ listAttr, setListAttr ] = useState<ListAttrType>();

    const [predictTreeHealth, setPredictTreeHealth] = useState<PredictTreeHealth>({
            environmental_threats: '',
            fertilization: '',
            irrigation: '',
            pest_management: '',
            stage_indicator: '',
            water_quality_indicators: '',
            water_sources: '',
    });
    const [predict, setPredict] = useState<{prediction: "Saudáveis" | "Com Pragas" | "Morrendo"}>();
    const [bestPractices, setBestPractices] = useState<{
		antecedents: string,
		confidence: number,
		consequents: {
			pest_management: string
		},
		lift: number,
		support: number
	}[]>();

    // EVENTS
    useEffect(() => {
        setLoading(true);
        request(`${URL_MACHINE_LEARN}/list`, MethodsEnum.GET, setListAttr).finally(() => setLoading(false));
        request(`${URL_MACHINE_LEARN}/association-rules`, MethodsEnum.GET, setBestPractices);
    }, [])

    // useEffect(() => {
    //     if(bestPractices) compileInsights(bestPractices)
    // }, [bestPractices])
    
    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Dashboard',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Insights IA'
        },
    ]

    // UTILS
    // PREDICT
    const handlePredict = async (e: React.FormEvent, setLoading: any) => {
        e.preventDefault();
        setLoading(true);
        connectionAPIPost(`${URL_MACHINE_LEARN}/predict-tree-health`, predictTreeHealth)
        .then((data: any) => {
            setPredict(data);
            setLoading(false);
            setNotification('Previsão feita com Sucesso', NotificationEnum.SUCCESS);
        })
        .catch((error: Error) => {
            setLoading(false);
            setNotification(error.message, NotificationEnum.ERROR);
        });
    }

    // SELECT EVENT
    const handleSelectChange = (value: string, attr: string) => {
        setPredictTreeHealth({
            ...predictTreeHealth,
            [attr]: value
        })
    }

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen/>}
            <h2>Insights IA</h2>
            <ContainerRowResponsive $maxwidth="1000px">
            {listAttr && <form style={{marginTop: '1em'}} 
                    onSubmit={(event) => handlePredict(event, setLoading)}>
                    <LimitedContainer width={400}>
                        <Select value={predictTreeHealth.environmental_threats}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'environmental_threats')}
                            options={listAttr.environmental_threats.map((a) => ({ value: a, label: a }))}
                            label="Ambiente de Plantio"/>
                        {/* {errors.typeData && <p style={{color: 'red', fontWeight: 500}}>{String(errors.typeData)}</p>} */}
                        <Select value={predictTreeHealth.fertilization}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'fertilization')}
                            options={listAttr.fertilization.map((a) => ({ value: a, label: a }))}
                            label="Fertilização"/>
                        <Select value={predictTreeHealth.irrigation}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'irrigation')}
                            options={listAttr.irrigation.map((a) => ({ value: a, label: a }))}
                            label="Irrigação"/>
                        <Select value={predictTreeHealth.pest_management}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'pest_management')}
                            options={listAttr.pest_management.map((a) => ({ value: a, label: a }))}
                            label="Gestão de Pragas"/>
                        <Select value={predictTreeHealth.stage_indicator}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'stage_indicator')}
                            options={listAttr.stage_indicator.map((a) => ({ value: a, label: a }))}
                            label="Indicador de Estado da Área"/>
                        <Select value={predictTreeHealth.water_quality_indicators}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'water_quality_indicators')}
                            options={listAttr.water_quality_indicators.map((a) => ({ value: a, label: a }))}
                            label="Qualidade da Água"/>
                        <Select value={predictTreeHealth.water_sources}
                            margin="1em 0 0 0"
                            onChange={(event) => handleSelectChange(event, 'water_sources')}
                            options={listAttr.water_sources.map((a) => ({ value: a, label: a }))}
                            label="Fonte de Água"/>
                        <LimitedContainer width={200} style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Button text="Prever" type="submit" id="insert"/>
                        </LimitedContainer>
                    </LimitedContainer>
                </form>}
            {predict && <PredictionStatus status={predict.prediction} />}
            </ContainerRowResponsive>
            {bestPractices && <InsightsDashboard data={bestPractices} />}
            {bestPractices && <BestPracticesTable data={bestPractices} />}
        </Screen> 
    )
}

export default Insights;