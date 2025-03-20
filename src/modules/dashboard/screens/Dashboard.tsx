import React, { lazy, useRef, useState, useEffect } from "react";
import { Select } from 'antd';
import ReactDOM from 'react-dom';
import Column from "antd/es/table/Column";
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

const Screen = lazy(() => import("../../../shared/components/screen/Screen"));

const Dashboard: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);    
    // const navigate = useNavigate();
    // const { request } = useRequests();
    // const { isLoading, setLoading } = useLoading();
    // const [ pagination, setPagination ] = useState<TablePaginationConfig>({
    //     current: 1,
    //     pageSize: 5,
    //     total: 0,
    // });

    const handleTree = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleUf = (value: string) => {
        console.log(`selected ${value}`);
    };

    const ufs = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
        'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    // useEffect(() => {
    //     if(pagination.current) fetchData(pagination.current);
    // }, [pagination.current])

    // PAGINATION
    // const handleTableChange = (newPagination: TablePaginationConfig) => {
    //     setLoading(true);
    //     if(newPagination) setPagination({...pagination, ...newPagination});
    // };

    // const fetchData = async (page: number) => {
    //     setLoading(true);
    //     try {
    //         request(`${URL_AUCTION}?status=2&page=${page}`, MethodsEnum.GET, setAuctions)
    //         .then((data: any) => {
    //             setPagination({
    //                 ...pagination,
    //                 current: data.current_page,
    //                 pageSize: data.per_page,
    //                 total: data.total,
    //             });
    //         })
    //     } catch (error) {
    //       console.error('Erro ao buscar dados:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    // };
 
    useEffect(() => {
        const chartDom = chartRef.current; 
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            
            const option: EChartOption = {
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
                    data: ['Nativa', 'Exótica', 'Misturada'], 
                },
                xAxis: [{
                    type: 'category',
                    data: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'], 
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{ type: 'value' }],
                series: [
                    {
                        name: 'Nativa',
                        type: 'bar',
                        barWidth: '20%',
                        data: [50, 80, 60, 90, 70], 
                        itemStyle: {
                            color: '#007BFF',
                            borderRadius: [8, 8, 0, 0]
                        },
                    },
                    {
                        name: 'Exótica',
                        type: 'bar',
                        barWidth: '20%',
                        data: [55, 85, 65, 95, 75], 
                        itemStyle: {
                            color: '#FF5733',
                            borderRadius: [8, 8, 0, 0]
                        },
                    },
                    {
                        name: 'Misturada',
                        type: 'bar',
                        barWidth: '20%',
                        data: [60, 90, 70, 100, 80], 
                        itemStyle: {
                            color: '#28A745',
                            borderRadius: [8, 8, 0, 0]
                        },
                    }
                ]
            };
            
            myChart.setOption(option);
            
            return () => {
                myChart.dispose();
            };
        }
    }, []); 
      
    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Dashboard'
        }
    ]

    // TABLE
    // const columns: TableProps<AuctionMinimalType>['columns'] = [
    //     {
    //         title: 'ID',
    //         dataIndex: 'id',
    //         key: 'id',
    //         align: 'center',
    //         sorter: (a,b) => a.id - b.id,
    //         render: (text) => <p>{text}</p>,
    //     },
    //     {
    //         title: 'Código',
    //         dataIndex: 'number',
    //         key: 'number',
    //         align: 'center',
    //         render: (text) => <p>{text}</p>,
    //     },
    //     {
    //         title: 'Encerrado em',
    //         dataIndex: 'expires_on',
    //         key: 'expires_on',
    //         align: 'center',
    //         render: (_,text) => <p>{formatDate(text.expires_on)}</p>,
    //     },
    //     {
    //         title: 'Aprovar',
    //         key: 'approve',
    //         align: 'center',
    //         render: (_,text) => <Button type="button" text="Dashboard" id="approve_btn" onClick={() => handleApprove(text.id)}/>,
    //     }
    // ];
    
    // APPROVE
    // const handleApprove = async (auctionId: number) => {
    //     setItemStorage(AUCTION_ID, String(auctionId));
    //     navigate(DashboardRoutesEnum.DASHBOARD_APROVE);
    // }
    
    return(
        <Screen listBreadcrumb={listBreadcrumb}>
            {/* {isLoading && <FirstScreen/>} */}
            <h2>Dashboard</h2>
            <Select
                placeholder={"Selecione"}
                style={{ width: 120, marginRight: 10 }}
                onChange={handleTree}
                options={[
                    { value: 'nativa', label: 'nativa' },
                    { value: 'exotica', label: 'exótica' },
                    { value: 'misturada', label: 'misturada' },
                 ]}
            />
            <Select
                placeholder={"Selecione"}
                onChange={handleUf}
                style={{ width: 120 }}
                options={ufs.map((uf) => ({ value: uf }))}
            />
             <div ref={chartRef} style={{ height: '400px', marginBottom: '10px' }}></div>
        </Screen> 
    )
}

export default Dashboard;