import React, { useEffect, useState } from "react";
import { ConfigProvider, DatePicker } from "antd";
import { ConfigProvider, DatePicker, TableColumnsType } from "antd";
import ptBR from 'antd/es/locale/pt_BR';
import "dayjs/locale/pt-br";

import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import FirstScreen from "../../firstScreen";
import ChartsContainer from "../../../shared/components/charts/ChartsContainer";
import Select from "../../../shared/components/inputs/select/Select";
import { StyledTableContainer, StyledTable } from '../styles/Table.style';
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_AREA_INFORMATION, URL_AREA_INFORMATION_TREE, URL_AREA } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { CO2Type } from "../../../shared/types/Co2Type";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { AreaInformationTreeType } from "../../../shared/types/AreaInformationTreeType";
import { AreaListType } from "../../../shared/types/AreaListType";
import { AreaType } from "../../../shared/types/AreaType";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";
import { TreeHealth } from "../../../shared/types/treeHealth";
import { SurvivalRateBySoil } from "../../../shared/types/SurvivalRateBySoil";
import { Serie } from "../../../shared/types/ReforestedByUf";
import { SoilType } from "../../../shared/types/SoilType";
import { brazilStates } from "../../../shared/constants/brazilStates";
import { MarginTitle } from "../../../shared/components/styles/marginTitle.styled";
import { GridContainerVertical } from "../../../shared/components/styles/gridContainer.style";


const Dashboard: React.FC = () => {
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();

    const [chartReforestedByUfType, setReforestedByUfType] = useState<'soil_type' | 'planting_techniques'>('soil_type');

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [co2, setCO2Info] = useState<CO2Type[]>([]);
    const [tree, setTreeInfo] = useState<AreaInformationTreeType[]>([]);
    const [survivalBySoil, setSurvivalBySoil] = useState<SurvivalRateBySoil[]>([]);
    const [treeHealth, setTreeHealth] = useState<TreeHealth | null>(null);
    const [soil, setSoilInfo] = useState<SoilType[]>([]);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [areaNames, setAreasNames] = useState<AreaListType[]>([]);
    const [reflorested, setAreaInfo] = useState<AreaType[]>([]);
    const [reforestedByUf, setReforestedByUf] = useState<any>([]);
    const [ selectedUf, setSelectedUf ] = useState<string | null>(null);
    const [ selectedYear, setSelectedYear ] = useState<string | null>(null);
    const [ fundings, setFundings ] = useState<FundingData | null>(null);

    const { RangePicker } = DatePicker;

    // CHARTS
    const [allChartsOptions, setAllChartsOptions] = useState<{ options: any; title: string; fraction: number }[]>([]);
    const [chartCO2Options, setChartCO2Options] = useState({});
    const [chartSurvivalOptions, setChartSurvivalOptions] = useState({});
    const [chartSurvivalBySoilOptions, setChartSurvivalBySoilOptions] = useState({});
    const [treeHealthOptions, setTreeHealthOptions] = useState({});
    const [chartReflorestedOptions, setChartReflorestedOptions] = useState({});
    const [chartReforestedByUfOptions, setChartReforestedByUfOptions] = useState({});
    const [chartSoilOptions, setChartSoilOptions] = useState({});    
    const [ chartFundingOptions , setChartFundingOptions ] = useState({});
    
    // EVENTS
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    request(`${URL_AREA_INFORMATION_TREE}`, MethodsEnum.GET, setTreeInfo),
                    request(`${URL_AREA}/list`, MethodsEnum.GET, setAreasNames),
                    request(`${URL_AREA_INFORMATION}/average-tree-survival`, MethodsEnum.GET, setSurvivalBySoil),
                    request(`${URL_AREA_INFORMATION}/tree-health`, MethodsEnum.GET, setTreeHealth),
                    request(`${URL_AREA}/reflorested-area`, MethodsEnum.GET, setAreaInfo),
                    request(`${URL_AREA_INFORMATION}/reforested-area-summary`, MethodsEnum.GET, setReforestedByUf),
                    request(`${URL_AREA_INFORMATION}/soil`, MethodsEnum.GET, setSoilInfo),
                    request(`${URL_AREA_INFORMATION}/funding_by_uf_year`, MethodsEnum.GET, setFundings),
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
        if (Object.keys(chartCO2Options).length > 0) arrayCharts.push({ options: chartCO2Options, title: "Emissões de CO2", fraction: 1 });
        if (Object.keys(chartSurvivalOptions).length > 0) arrayCharts.push({ options: chartSurvivalOptions, title: "Taxa de Sobrevivência", fraction: 2 });
        if (Object.keys(chartSurvivalBySoilOptions).length > 0) arrayCharts.push({ options: chartSurvivalBySoilOptions, title: "Taxa de Sobrevivência por Solo", fraction: 1 });
        if (Object.keys(treeHealthOptions).length > 0) arrayCharts.push({ options: treeHealthOptions, title: "Saúde das árvores", fraction: 1 });
        if (Object.keys(chartReflorestedOptions).length > 0) arrayCharts.push({ options: chartReflorestedOptions, title: "Comparativo: Área Inicial e Recuperada", fraction: 2 });
        if (Object.keys(chartReforestedByUfOptions).length > 0) arrayCharts.push({ options: chartReforestedByUfOptions, title: "Área Reflorestada - Tipo de solo/Técnica de plantio", fraction: 1 });
        if (Object.keys(chartSoilOptions).length > 0) arrayCharts.push({ options: chartSoilOptions, title: "Índice de Fertilidade do Solo", fraction: 2 });
        if (Object.keys(chartFundingOptions).length > 0) arrayCharts.push({ options: chartFundingOptions, title: "Fontes de Financiamento", fraction: 1});
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
            chartSurvivalOptions,
            chartSurvivalBySoilOptions,
            treeHealthOptions,
            chartReflorestedOptions,
            chartReforestedByUfOptions,
            chartFundingOptions
        ]);

    useEffect(() => {
        if (co2.length > 0) {
            const orderedCO2 = [...co2].sort(
                (a, b) => new Date(a.measurement_date).getTime() - new Date(b.measurement_date).getTime()
            );
            const dates = orderedCO2.map((oc) => oc.measurement_date);
            const co2Ordered = orderedCO2.map((oc) => oc.total_avoided_co2)
            setChartCO2Options({
                xAxis: {
                    type: 'category',
                    data: dates,
                    name: 'Data',
                    nameLocation: 'middle',
                    nameGap: 25,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 12
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Emissões de CO2 (ton)',
                    nameLocation: 'middle',
                    nameGap: 45,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 12
                    }
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

    useEffect(() => {
        const soilNames: string[] = Object.keys(survivalBySoil).map(name => name.toUpperCase());
        const soilRates: number[] = Object.values(survivalBySoil).map(value => Number(value) | 0);

        setChartSurvivalBySoilOptions({
            xAxis: {
                type: 'category',
                data: soilNames
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: soilRates,
                    type: 'bar'
                }
            ]
        });
    }, [survivalBySoil]);

    useEffect(() => {
        if (!treeHealth) return;
        const comPragas: any[] = []
        const morrendo: any[] = []
        const saudaveis: any[] = []

        for (const [technic, healtValues] of Object.entries(treeHealth)) {
            comPragas.push(technic, healtValues.comPragas);
            morrendo.push(technic, healtValues.morrendo);
            saudaveis.push(technic, healtValues.saudaveis);
        }

        setTreeHealthOptions({
            legend: {},
            tooltip: {},
            xAxis: { type: 'category' },
            yAxis: { type: 'value' },
            series: [
                { type: 'bar', name: 'Com Pragas', data: comPragas },
                { type: 'bar', name: 'Morrendo', data: morrendo },
                { type: 'bar', name: 'Saudáveis', data: saudaveis }
            ]
        });
    }, [treeHealth]);

    useEffect(() => {
        if (reflorested.length > 0) {
            const initialArea = reflorested.map((rf) => rf.initial_planted_area_hectares);
            const reflorestedArea = reflorested.map((rf) => rf.reflorested_area_hectares);

            setChartReflorestedOptions({
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
                legend: {
                    data: ['Area Inicial', 'Area Recuperada'],
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    data: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [
                    {
                        name: 'Área Inicial',
                        type: 'bar',
                        stack: 'Nativa',
                        barWidth: '50%',
                        data: initialArea,
                        itemStyle: {
                            color: '#03A64A',
                        },
                    },
                    {
                        name: 'Área Recuperada',
                        type: 'bar',
                        stack: 'Nativa',
                        barWidth: '50%',
                        data: reflorestedArea,
                        itemStyle: {
                            color: '#025940',
                        },
                    },
                ]
            });
        }
    }, [reflorested]);

    useEffect(() => {
        if (!reforestedByUf) return;

        const summary: any[] = Object.values(reforestedByUf).sort(
            (a: any, b: any) => a[chartReforestedByUfType].total - b[chartReforestedByUfType].total
        );

        const ufs: string[] = Object.keys(reforestedByUf);
        let categoryNames = summary.map((uf) => Object.keys(uf[chartReforestedByUfType])).flat();
        categoryNames = [...new Set(categoryNames)].filter(name => name !== "total");

        const seriesData: Serie[] = [];

        categoryNames.forEach(categoryName => {
            seriesData.push({
                name: categoryName.toUpperCase(),
                type: 'bar',
                stack: 'total',
                label: { show: false },
                emphasis: { focus: 'series' },
                data: summary.map((uf: any) => uf[chartReforestedByUfType][categoryName] || 0)
            });
        });

        setChartReforestedByUfOptions({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: {},
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            height: 300,
            xAxis: { type: 'value' },
            yAxis: { type: 'category', data: ufs.map((uf) => uf.toUpperCase()) },
            dataZoom: [{ type: 'slider', yAxisIndex: 0, start: 50, end: 0, show: true }],
            series: seriesData,
            graphic: [
                {
                    type: 'group',
                    left: 'center',
                    top: 30,
                    children: [
                        {
                            type: 'rect',
                            left: 'center',
                            top: 'middle',
                            shape: { width: 200, height: 20, r: 5 },
                            style: { fill: '#007BFF' },
                            onclick: () => setReforestedByUfType(prev => prev === 'soil_type' ? 'planting_techniques' : 'soil_type')
                        },
                        {
                            type: 'text',
                            left: 'center',
                            top: 'middle',
                            style: {
                                text: `${chartReforestedByUfType === 'soil_type' ? 'Tipo de Solo' : 'Técnica de Plantio'}`,
                                fill: '#FFF',
                                font: 'bold 12px Arial',
                                textAlign: 'center',
                                textVerticalAlign: 'middle'
                            },
                            onclick: () => setReforestedByUfType(prev => prev === 'soil_type' ? 'planting_techniques' : 'soil_type')
                        },
                    ]
                }
            ]
        });
    }, [reforestedByUf, chartReforestedByUfType]);

    useEffect(() => {
        if (soil.length > 0) {
            const measurementDates = Array.from(new Set(soil.map((so) => so.measurement_date)));
            const fertilizations = Array.from(new Set(soil.map((so) => so.fertilization)));
            const groupedData = measurementDates.map((date) => {
                return fertilizations.map((fertilization) => {
                    const soilEntry = soil.find((so) => so.measurement_date === date && so.fertilization === fertilization);
                    return soilEntry ? soilEntry.avg_soil_fertility_index_percent : 0;
                });
            });

            setChartSoilOptions({
                tooltip: {
                    trigger: 'item',
                    axisPointer: { type: 'shadow' },
                    formatter: function (params: { name: any; value: any; seriesName: any; }) {
                        const { name, value, seriesName } = params;
                        return `${seriesName}: <br> Data: ${name} <br> Fertilidade: ${value}%`;
                    },
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
                    data: measurementDates,
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{ type: 'value' }],
                legend: {
                    data: fertilizations,
                    top: '5%',
                    left: 'center',
                },
                series: fertilizations.map((fertilization, index) => ({
                    name: fertilization,
                    type: 'bar',
                    barWidth: '40%',
                    data: groupedData.map((group) => group[index]),
                    itemStyle: {
                        color: '#025940',
                        borderRadius: [8, 8, 0, 0]
                    },
                })),
            });
        }
    }, [soil]);


    useEffect(() => {
        if (fundings) {
            const seriesData = Object.entries(fundings.funding_sources).map(
                ([source, details]) => ({
                  value: details.percent,
                  name: source.toUpperCase()
                })
              );
            setChartFundingOptions({
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  top: '5%',
                  left: 'center'
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 15,
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: seriesData
                  }
                ]
              });
        }
    }, [fundings]);
 
    // TABLE
    const columns: TableColumnsType<AreaType> = [
        {
            title: 'Área',
            dataIndex: 'area_name',
            key: 'area_name',
            width: '20%',
        },
        {
            title: 'Cidade',
            dataIndex: 'city',
            key: 'city',
            width: '20%',
        },
        {
            title: 'Área Inicial',
            dataIndex: 'initial_planted_area_hectares',
            key: 'initial_planted_area_hectares',
            width: '12,5%',
            sorter: (a: AreaType, b: AreaType) => a.initial_planted_area_hectares - b.initial_planted_area_hectares,
        },
        {
            title: 'Área Reflorestada',
            dataIndex: 'reflorested_area_hectares',
            key: 'reflorested_area_hectares',
            width: '12,5%',
            sorter: (a: AreaType, b: AreaType) => a.reflorested_area_hectares - b.reflorested_area_hectares,
        },
        {
            title: 'Área Total',
            dataIndex: 'total_area_hectares',
            key: 'total_area_hectares',
            width: '12,5%',
            sorter: (a: AreaType, b: AreaType) => a.total_area_hectares - b.total_area_hectares,
        },
        {
            title: 'Área Plantada e Reflorestada',
            dataIndex: 'total_reflorested_and_planted',
            key: 'total_reflorested_and_planted',
            width: '12,5%',
            sorter: (a: AreaType, b: AreaType) => a.total_reflorested_and_planted- b.total_reflorested_and_planted,
        },
        {
            title: 'UF',
            dataIndex: 'uf',
            key: 'uf',
            width: '10%',
        }
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
            setLoading(true)
            await Promise.all([
                request(`${URL_AREA_INFORMATION}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setCO2Info),
                request(`${URL_AREA_INFORMATION_TREE}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setTreeInfo),
                request(`${URL_AREA_INFORMATION}/soil?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setSoilInfo),
                request(`${URL_AREA_INFORMATION}/funding_by_uf_year?uf=${selectedUf}&year=${selectedYear}`, MethodsEnum.GET, setFundings)
            ]).finally(() => setLoading(false))
        } else {
            setNotification('Definir Data Inicial e Final!', NotificationEnum.WARNING)
        }
    }

    const handleSelectChange = async (areaId: number) => {
        try {
            await Promise.all([
                request(`${URL_AREA_INFORMATION_TREE}?area_id=${areaId}`, MethodsEnum.GET, setTreeInfo),
                request(`${URL_AREA}/reflorested-area?area_id=${areaId}`, MethodsEnum.GET, setAreaInfo),
                request(`${URL_AREA_INFORMATION}/soil-area?area_id=${areaId}`, MethodsEnum.GET, setSoilInfo)
            ]);
        } catch (error) {
            setNotification(String(error), NotificationEnum.ERROR);
        } finally {
            setLoading(false);
        }
    }

    const handleDefineDatesFilter = (event: any) => {
        let currentStartDate: string = `${event[0].$y}-${event[0].$M + 1}-${event[0].$D}`;
        let currentEndDate: string = `${event[1].$y}-${event[1].$M + 1}-${event[1].$D}`;
        setStartDate(currentStartDate);
        setEndDate(currentEndDate);
    }

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen />}
            <BoxButtons>
                <RangePicker format="DD/MM/YYYY" onChange={(event) => handleDefineDatesFilter(event)} style={{margin: '0 1em 0 0'}}/>
                <Select value={selectedArea}
                    onChange={(event) => handleSelectChange(event)}
                    style={{ width: 200, margin: '1em' }}
                    options={areaNames.map((a) => ({ value: a.id, label: a.area_name }))}
                    placeholder="Selecione uma área"/>
            </BoxButtons>
            <GridContainerVertical>
                <MarginTitle>
                    Funding Resources Chart
                </MarginTitle>

                <Select 
                    value={selectedUf}
                    onChange={(uf) => setSelectedUf(uf)}
                    style={{ width: 200, margin: '1em' }}
                    options={brazilStates.map((uf) => ({value: uf.value, label: uf.label}))}
                    placeholder="State"
                    />
                <Select 
                    value={selectedYear}
                    onChange={(year) => setSelectedYear(year)}
                    style={{ width: 200, margin: '1em' }}
                    options={Array.from({ length: 2025 - 2020 + 1 }, (_, i) => {
                        const year = 2020 + i;
                        return { value: year, label: year.toString() };
                    })}
                    placeholder="ANO"
                    />
            </GridContainerVertical>
            <Button id="filter" text="Aplicar Filtros" type="button" onClick={() => handleFilter()} />
            <h2>Áreas Reflorestadas</h2>
                    <StyledTable
                        columns={columns}
                        dataSource={reflorested}  
                        rowKey="area_name" 
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000, y: 500 }} 
                    />
            {allChartsOptions.length > 0 && <ChartsContainer charts={allChartsOptions} />}
            
        </Screen>
    )
}

export default Dashboard;