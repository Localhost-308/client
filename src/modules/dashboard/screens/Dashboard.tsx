import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactECharts from 'echarts-for-react';
import { DatePicker, Modal, Table, TableColumnsType } from "antd";
import "dayjs/locale/pt-br";

import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import FirstScreen from "../../firstScreen";
import Select from "../../../shared/components/inputs/select/Select";
import ChartContainer from "../../../shared/components/charts/ChartContainer";
import ChartGridItem from "../../../shared/components/charts/ChartGridItem";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_AREA_INFORMATION, URL_AREA_INFORMATION_TREE, URL_AREA, URL_THREATS, URL_USER } from "../../../shared/constants/urls";
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
import { PlantedSpecieType } from "../../../shared/types/PlantedSpecieType";
import { PlantingTechniqueType } from "../../../shared/types/PlantingTechniqueType";
import { brazilStates } from "../../../shared/constants/brazilStates";
import { MarginTitle } from "../../../shared/components/styles/marginTitle.styled";
import { GridContainerVertical } from "../../../shared/components/styles/gridContainer.style";
import { formatNumberWithThousandSeparator, formatToMillion } from "../../../shared/functions/utils/number";
import TreeCountCard from "../../../shared/components/card/TreeCountCard";
import DeforestationCard from "../../../shared/components/card/DeforestationCard";
import { DeforestationDataType } from "../../../shared/types/DeforestationDataType";
import { TermsType } from "../../../shared/types/TermsType";
import { LoginRoutesEnum } from "../../login/routes";
import TextArea from "antd/es/input/TextArea";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
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
    const [planted, setPlantedInfo] = useState<PlantedSpecieType[]>([]);
    const [planting, setPlantingInfo] = useState<PlantingTechniqueType[]>([]);
    const [selectedArea, setSelectedArea] = useState<string>();
    const [areaNames, setAreasNames] = useState<AreaListType[]>([]);
    const [reflorested, setAreaInfo] = useState<AreaType[]>([]);
    const [reforestedByUf, setReforestedByUf] = useState<any>([]);
    const [selectedUf, setSelectedUf] = useState<string>();
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [fundings, setFundings] = useState<FundingData | null>(null);
    const [speciesTrees, setSpeciesTrees] = useState<string[]>([]);
    const [specieTreeSelected, setSpecieTreeSelected] = useState<string>();
    const [totalPlantedTrees, setTotalPlantedtrees] = useState<{'total_planted_trees': number}>({'total_planted_trees': 0});
    const [deforestationData, setDeforestationData] = useState<DeforestationDataType>()

    const { RangePicker } = DatePicker;

    // CHARTS
    const [chartCO2Options, setChartCO2Options] = useState({});
    const [chartSurvivalOptions, setChartSurvivalOptions] = useState({});
    const [chartSurvivalBySoilOptions, setChartSurvivalBySoilOptions] = useState({});
    const [treeHealthOptions, setTreeHealthOptions] = useState({});
    const [chartReforestedByUfOptions, setChartReforestedByUfOptions] = useState({});
    const [chartPlantedOptions, setChartPlantedOptions] = useState({});
    const [chartSoilOptions, setChartSoilOptions] = useState({});
    const [chartFundingOptions, setChartFundingOptions] = useState({});

    // TERMS
    const [terms, setTerms] = useState<TermsType>();

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
                    request(`${URL_AREA_INFORMATION}/reforested-area-summary`, MethodsEnum.GET, setReforestedByUf),
                    request(`${URL_AREA_INFORMATION}/soil`, MethodsEnum.GET, setSoilInfo),
                    request(`${URL_AREA}/planted-species`, MethodsEnum.GET, setPlantedInfo),
                    request(`${URL_AREA}/planting-techniques`, MethodsEnum.GET, setPlantingInfo),
                    request(`${URL_AREA_INFORMATION}/funding_by_uf_year`, MethodsEnum.GET, setFundings),
                    request(`${URL_AREA_INFORMATION}/species-trees/list`, MethodsEnum.GET, setSpeciesTrees),
                    request(`${URL_AREA_INFORMATION}/total-planted-trees`, MethodsEnum.GET, setTotalPlantedtrees)
                ]);
            } catch (error) {
                setNotification(String(error), NotificationEnum.ERROR);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        request(`${URL_USER}/accept-last-version`, MethodsEnum.GET).then((data:any) => {
            if(data && data.id){
                setTerms(data);
            }
        })
    }, []);

    useEffect(() => {
        if(terms){
            showModal();
        }
    }, [terms])

    useEffect(() => {
        if (co2.length > 0) {
            const orderedCO2 = [...co2].sort(
                (a, b) => new Date(a.measurement_date).getTime() - new Date(b.measurement_date).getTime()
            );
            const dates = orderedCO2.map((oc) => oc.measurement_date);
            const co2Ordered = orderedCO2.map((oc) => oc.total_avoided_co2)
            setChartCO2Options({
                title: {
                    text: `Emissões de CO2 (toneladas)`,
                    left: 'center'
                },
                grid: {
                    left: '5%',
                    right: '4%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true
                },
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
                    axisLabel: {
                        formatter: (value: number) => `${formatNumberWithThousandSeparator((value/1000).toFixed(0))} ton`
                    },
                    nameGap: 75,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 12
                    },
                    min: 49000000
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
        if (tree.length === 0 || tree === undefined || tree === null) return;
        const measurementDate = tree.map((tr) => tr.measurement_date);
        const survivalRate = tree.map((tr) => parseFloat((tr.survival_rate * 100).toFixed(2)));

        setChartSurvivalOptions({
            title: {
                text: 'Percentual de Sobrevivência das Arvores Plantadas',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params: any) => {
                    const date = params[0].axisValue;
                    const value = params[0].data;
                    return `${date}<br/>Sobrevivência: ${value.toFixed(2)}%`;
                }
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
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                },
                max: 90,
                min: 88
            }],
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
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => {
                            return `${params.data.toFixed(2)}%`;
                        }
                    }
                },
            ]
        });
    }, [tree]);

    useEffect(() => {
        const soilNames: string[] = Object.keys(survivalBySoil).map(name => name.toUpperCase());
        const soilRates: number[] = Object.values(survivalBySoil).map(value => Number(value));

        setChartSurvivalBySoilOptions({
            title: {
                text: 'Taxa de Sobrevivência das Arvores Baseada no Solo',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: soilNames
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                },
                max: 79.5,
                min: 78.5
            },
            series: [
                {
                    data: soilRates,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => {
                            return `${Number(params.data).toFixed(2)}%`;
                        }
                    }
                }
            ]
        });
    }, [survivalBySoil]);

    useEffect(() => {
        if (!treeHealth) return;
        const techniques = Object.keys(treeHealth);
        const withPlague = techniques.map(tech => treeHealth[tech].comPragas);
        const dying = techniques.map(tech => treeHealth[tech].morrendo);
        const healthy = techniques.map(tech => treeHealth[tech].saudaveis);

        setTreeHealthOptions({
            title:{
                text: 'Saúde das Árvores Baseada na Técnica de Plantio',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: techniques,
                axisLabel: {
                    fontWeight: 'bold'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: (value: number) => formatToMillion(value)
                }
            },
            legend: {
                data: ['Com Pragas', 'Morrendo', 'Saudáveis'],
                bottom: 0,
                textStyle: {
                    fontSize: 12
                }
            },
            series: [
                {
                    name: 'Com Pragas',
                    type: 'bar',
                    data: withPlague,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => formatToMillion(params.value)
                    },
                    itemStyle: { color: '#FF6B6B' }
                },
                {
                    name: 'Morrendo',
                    type: 'bar',
                    data: dying,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => formatToMillion(params.value)
                    },
                    itemStyle: { color: '#FFA500' }
                },
                {
                    name: 'Saudáveis',
                    type: 'bar',
                    data: healthy,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => formatToMillion(params.value)
                    },
                    itemStyle: { color: '#4CAF50' }
                }
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params: any) => {
                    let tooltip = `<strong>${params[0].name}</strong><br/>`;
                    params.forEach((param: any) => {
                        tooltip += `${param.seriesName}: ${formatToMillion(param.value)}<br/>`;
                    });
                    return tooltip;
                }
            }
        });
    }, [treeHealth]);

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
            title: {
                text: 'Área Reflorestada - Tipo de solo/Técnica de plantio',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {top: 55},
            grid: { left: '3%', right: '4%', bottom: '3%', top: '30%',containLabel: true },
            height: 300,
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: (value: number) => formatToMillion(value)
                }
            },
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
            const measurementDates = Array.from(new Set(soil.map(item => item.measurement_date))).sort();

            const fertilizations = Array.from(new Set(soil.map(item => item.fertilization)));

            const seriesData = fertilizations.map(fert => {
                return {
                    name: fert,
                    type: 'line',
                    data: measurementDates.map(date => {
                        const entry = soil.find(d => d.measurement_date === date && d.fertilization === fert);
                        return entry ? entry.avg_soil_fertility_index_percent : null;
                    }),
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: {
                        width: 3
                    }
                };
            });
            setChartSoilOptions({
                title: {
                    text: 'Fertilidade do Solo por Tipo de Fertilização',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params: any[]) => {
                        let result = `<b>${params[0].axisValue}</b>`;
                        params.forEach(param => {
                            result += `<br/>${param.marker} ${param.seriesName}: ${param.value}%`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: fertilizations,
                    bottom: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: measurementDates,
                    axisLabel: {
                        rotate: 45
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    name: 'Fertilidade (%)',
                    min: 45,
                    max: 55
                },
                series: seriesData,
                color: ['#4E79A7', '#F28E2B', '#E15759'],
                emphasis: {
                    focus: 'series'
                }
            })
        }
    }, [soil]);

    useEffect(() => {
        if (planted.length > 0) {
            const formatNumber = (num: number) => {
                if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
                if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
                return num.toString();
            };
            setChartPlantedOptions({
                title: {
                    text: 'Total de Espécies Plantadas',
                    left: 'center'
                },
                tooltip: {
                  trigger: 'item',
                  formatter: (params: any) => {
                    return `${params.name}: <b>${params.value.toLocaleString()}</b> árvores`;
                  }
                },
                xAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: (value: number) => formatNumber(value)
                  }
                },
                yAxis: {
                  type: 'category',
                  data: planted.map(item => item.planted_species)
                },
                series: [{
                  name: 'Árvores Plantadas',
                  type: 'bar',
                  data: planted.map(item => ({
                    value: item.number_of_trees_planted,
                    name: item.planted_species,
                    itemStyle: {
                      color: {
                        'Espécies Exóticas': '#FF9F43',
                        'Espécies Misturadas': '#28C76F',
                        'Espécies Nativas': '#7367F0'
                      }[item.planted_species]
                    }
                  })),
                  label: {
                    show: true,
                    position: 'right',
                    formatter: (params: any) => formatNumber(params.value)
                  }
                }],
                grid: {
                  left: '20%',
                  right: '10%',
                  top: '20%',
                  containLabel: true
                }
              })
        }
    }, [planted]);

    useEffect(() => {
        if (fundings) {
            const seriesData = Object.entries(fundings.funding_sources).map(
                ([source, details]) => ({
                    value: details.percent,
                    name: source.toUpperCase()
                })
            );
            setChartFundingOptions({
                title: {
                    text: 'Fontes de Financiamento',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 10,
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
            sorter: (a: AreaType, b: AreaType) => a.total_reflorested_and_planted - b.total_reflorested_and_planted,
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
        try{
            setLoading(true)
            if (startDate && endDate) {
                await Promise.all([
                    request(`${URL_AREA_INFORMATION}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setCO2Info),
                    request(`${URL_AREA_INFORMATION_TREE}?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setTreeInfo),
                    request(`${URL_AREA_INFORMATION}/soil?start_date=${startDate}&end_date=${endDate}`, MethodsEnum.GET, setSoilInfo),
                    request(`${URL_AREA_INFORMATION}/funding_by_uf_year?uf=${selectedUf}&year=${selectedYear}`, MethodsEnum.GET, setFundings)
                ])
            }
            if(selectedUf){
                await Promise.all([
                    request(`${URL_AREA_INFORMATION}/funding_by_uf_year?uf=${selectedUf}&year=${selectedYear}`, MethodsEnum.GET, setFundings),
                    request(`${URL_THREATS}?uf=${selectedUf}`, MethodsEnum.GET, setDeforestationData)
                ])
            }
            if(specieTreeSelected){
                await Promise.all([
                    request(`${URL_AREA_INFORMATION}/total-planted-trees?species=${specieTreeSelected}`, MethodsEnum.GET, setTotalPlantedtrees)
                ])
            }
        }finally{
            setLoading(false)
        }
    }

    const handleSelectChange = async (areaId: number) => {
        try {
            await Promise.all([
                request(`${URL_AREA_INFORMATION_TREE}?area_id=${areaId}`, MethodsEnum.GET, setTreeInfo),
                request(`${URL_AREA}/reflorested-area?area_id=${areaId}`, MethodsEnum.GET, setAreaInfo),
                request(`${URL_AREA}/planting-techniques?area_id=${areaId}`, MethodsEnum.GET, setPlantingInfo)
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

    const handleDefineSpecieTree = (value: string) => {
        setSpecieTreeSelected(value)
    }

    // MODAL
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    }

    const hideModal = () => {
        setOpen(false);
        navigate(LoginRoutesEnum.LOGIN);
    }

    const approveTerms = () => {
        setLoading(true);
        request(`${URL_USER}/terms-and-conditions/accept`, MethodsEnum.POST)
        .then(() => {

            setNotification('Termo Aprovado com Sucesso!', NotificationEnum.SUCCESS)
        })
        .finally(() => {
            setLoading(false);
            setOpen(false);
        });
    }

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen />}
            <h1>Dashboard Geral</h1>
            <h3>Filtros</h3>
            <BoxButtons>
                <RangePicker format="DD/MM/YYYY" onChange={(event) => handleDefineDatesFilter(event)} style={{ margin: '0 1em 0 0' }} />
                <Select value={selectedArea}
                    onChange={(event) => handleSelectChange(event)}
                    style={{ width: 200, margin: '1em' }}
                    options={areaNames.map((a) => ({ value: a.id, label: a.area_name }))}
                    placeholder="Selecione uma área" />
            </BoxButtons>
            <GridContainerVertical>
                <MarginTitle>
                    Demais Filtros
                </MarginTitle>

                <Select value={selectedUf}
                    onChange={(uf) => setSelectedUf(uf)}
                    style={{ width: 200, margin: '1em' }}
                    options={brazilStates.map((uf) => ({ value: uf.value, label: uf.label }))}
                    placeholder="Estado" />
                <Select value={specieTreeSelected}
                    onChange={(st) => handleDefineSpecieTree(st)}
                    style={{ width: 200, margin: '1em' }}
                    options={speciesTrees.map((st) => ({ value: st, label: st }))}
                    placeholder="Espécie de Arvore" />
                {/* <Select value={selectedYear}
                    onChange={(year) => setSelectedYear(year)}
                    style={{ width: 200, margin: '1em' }}
                    options={Array.from({ length: 2025 - 2020 + 1 }, (_, i) => {
                        const year = 2020 + i;
                        return { value: year, label: year.toString() };
                    })}
                    placeholder="Ano" /> */}
            </GridContainerVertical>
            <Button id="filter" text="Aplicar Filtros" type="button" onClick={() => handleFilter()} />
            {reflorested.length > 0 && (
                <>
                    <h2>Áreas Reflorestadas</h2>
                    <Table columns={columns}
                        dataSource={reflorested}
                        rowKey="area_name"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000, y: 500 }} />
                </>
            )}
            <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '20px',
                    padding: '20px',
                    width: '100%' }}>
                {deforestationData && <DeforestationCard data={deforestationData} />}
                <TreeCountCard count={totalPlantedTrees.total_planted_trees} />
            </div>

            <ChartContainer gridTemplateColumns="repeat(5, 1fr)" gridTemplateRows="repeat(auto-fit, minmax(300px, 1fr))">
                
                {chartFundingOptions && (
                    <ChartGridItem columnSpan={2}>
                        <ReactECharts option={chartFundingOptions} />
                    </ChartGridItem>
                )}
                {chartSoilOptions && (
                    <ChartGridItem columnSpan={3}> 
                        <ReactECharts option={chartSoilOptions} />
                    </ChartGridItem>
                )}
                {chartSurvivalOptions && (
                    <ChartGridItem columnSpan={3}>
                        <ReactECharts option={chartSurvivalOptions} />
                    </ChartGridItem>
                )}
                {chartSurvivalBySoilOptions && (
                    <ChartGridItem columnSpan={2}>
                        <ReactECharts option={chartSurvivalBySoilOptions} />
                    </ChartGridItem>
                )}
                {chartReforestedByUfOptions && (
                    <ChartGridItem columnSpan={3}>
                        <ReactECharts option={chartReforestedByUfOptions} />
                    </ChartGridItem>
                )}
                {chartPlantedOptions && (
                    <ChartGridItem columnSpan={2}>
                        <ReactECharts option={chartPlantedOptions} />
                    </ChartGridItem>
                )}
                {treeHealth !== undefined && (
                    <ChartGridItem columnSpan={3}>
                        <ReactECharts option={treeHealthOptions} />
                    </ChartGridItem>
                )}

                
                {co2.length > 0 && (
                    <ChartGridItem columnSpan={2}>
                        <ReactECharts option={chartCO2Options} />
                    </ChartGridItem>
                )}
            </ChartContainer>
            <Modal title={`Termos e Condições ${terms ? "versão " + terms?.version : ''}`}
                open={open}
                onOk={() => {
                    approveTerms();
                }}
                onCancel={hideModal}
                okText="Sim"
                cancelText="Cancelar">
                {terms && <TextArea value={terms.text}/>}
            </Modal>
        </Screen>
    )
}

export default Dashboard;