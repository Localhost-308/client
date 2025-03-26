
import React, { useEffect, useState } from "react";
import InputDateAntd, { dateAntd } from "../../../shared/components/inputs/inputDateAntd/InputDateAntd";

import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import FirstScreen from "../../firstScreen";
import ChartsContainer from "../../../shared/components/charts/ChartsContainer";
import Select from "../../../shared/components/inputs/select/Select";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_AREA_INFORMATION, URL_AREA_INFORMATION_TREE, URL_AREA } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { CO2Type } from "../../../shared/types/Co2Type";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { AreaInformationTreeType } from "../../../shared/types/AreaInformationTreeType";
import { AreaListType } from "../../../shared/types/AreaListType";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";

const Dashboard: React.FC = () => {
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();
    const [ startDate, setStartDate ] = useState<string>('');
    const [ endDate, setEndDate ] = useState<string>('');
    const [ co2, setCO2Info ] = useState<CO2Type[]>([]);
    const [ tree, setTreeInfo ] = useState<AreaInformationTreeType[]>([]);
    const [ selectedArea, setSelectedArea ] = useState<string | null>(null);
    const [ areaNames, setAreasNames ] = useState<AreaListType[]>([])

    // CHARTS
    const [ allChartsOptions, setAllChartsOptions ] = useState<{options:any;title:string;fraction:number}[]>([]);
    const [ chartCO2Options, setChartCO2Options ] = useState({});
    const [ chartSurvivalOptions, setChartSurvivalOptions ] = useState({});

    
    // EVENTS
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            await Promise.all([
                request(`${URL_AREA_INFORMATION_TREE}`, MethodsEnum.GET, setTreeInfo),
                request(`${URL_AREA}/list`, MethodsEnum.GET, setAreasNames)
            ]);
          } catch (error) {
            setNotification(String(error), NotificationEnum.ERROR);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const arrayCharts: any[] = []
        if (Object.keys(chartCO2Options).length > 0) arrayCharts.push({ options: chartCO2Options, title: "Emissões de CO2", fraction: 1});
        if (Object.keys(chartSurvivalOptions).length > 0) arrayCharts.push({ options: chartSurvivalOptions, title: "Taxa de Sobrevivência", fraction: 2});
        if (arrayCharts.length > 0){
            setAllChartsOptions([]);
            arrayCharts.forEach((chart) => {
                setAllChartsOptions((prevData) => [
                    ...prevData,
                    chart
                ]);
            })
        }
    }, 
    [
        chartCO2Options, 
        chartSurvivalOptions
    ]);

    useEffect(() => {
        if(co2.length > 0) {
            const orderedCO2 = [...co2].sort(
                (a,b) => new Date(a.measurement_date).getTime() - new Date(b.measurement_date).getTime()
            );
            const dates = orderedCO2.map((oc) => oc.measurement_date);
            const co2Ordered = orderedCO2.map((oc) => oc.total_avoided_co2)
            setChartCO2Options({
                xAxis: {
                    type: 'category',
                    data: dates
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: co2Ordered,
                    type: 'line',
                    smooth: true
                    }
                ]
            });
        };
    }, [co2]);

    useEffect(() => { 
        if (Array.isArray(tree) && tree.length > 0) {
            const measurementDate = tree.map((tr) => tr.measurement_date);
            const survivalRate = tree.map((tr) => {
                return Math.round(tr.survival_rate * 100); 
            }); 

            setChartSurvivalOptions({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: measurementDate,
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{ type: 'value' }],
                series: [
                    {
                        name: 'Sobrevivência',
                        type: 'bar',
                        barWidth: '40%',
                        data: survivalRate, 
                        itemStyle: {
                            color: '#007BFF',
                            borderRadius: [8, 8, 0, 0]
                        },
                    },
                ]
            });
        }
    }, [tree]);
    
    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Dashboard'
        }
    ]
    
    // UTILS
    const handleFilter = async () => {
        if(startDate && endDate){
            setLoading(true)
            await Promise.all([
                request(`${URL_AREA_INFORMATION}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setCO2Info),
                request(`${URL_AREA_INFORMATION_TREE}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setTreeInfo)
            ]).finally(() => setLoading(false))
        }else{
            setNotification('Definir Data Inicial e Final!', NotificationEnum.WARNING)
        }
    }

    const handleSelectChange = async (areaId: number) => {
        try {
            await Promise.all([
                request(`${URL_AREA_INFORMATION_TREE}?area_id=${areaId}`, MethodsEnum.GET, setTreeInfo)
            ]);
          } catch (error) {
            setNotification(String(error), NotificationEnum.ERROR);
          } finally {
            setLoading(false);
          }
    }

    return(
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen/>} 
            <BoxButtons>
                <LimitedContainer width={350}>
                    <InputDateAntd onChange={(event: dateAntd) => {setStartDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="31/12/2025"
                        margin="0px 0px 15px 0px" 
                        placeholder="Data inicial"
                        id="start_date" />
                </LimitedContainer>
                <LimitedContainer width={350}>
                    <InputDateAntd onChange={(event: dateAntd) => {setEndDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="01/01/2040"
                        margin="0px 0px 15px 0px" 
                        placeholder="Data final"
                        id="end_date" />
                </LimitedContainer>
                <LimitedContainer width={350}>
                    <Select 
                        value={selectedArea}
                        onChange={(event) => handleSelectChange(event)}
                        style={{ width: 200, margin: '1em' }}
                        options={areaNames.map((a) => ({value: a.id, label: a.area_name}))}
                        placeholder="Selecione uma área"
                    />

                </LimitedContainer>
            </BoxButtons>
            <Button id="filter" text="Filtrar" type="button" onClick={() => handleFilter()}/>
            <ChartsContainer charts={allChartsOptions} />

        </Screen> 
    )
}

export default Dashboard;