import React, { lazy, useRef, useEffect, useState } from "react";
 import { Select } from 'antd';
 import * as echarts from 'echarts';
 import { EChartOption } from 'echarts';
import { AreaInformationType } from "../../../shared/types/AreaInformationType";
const Screen = lazy(() => import("../../../shared/components/screen/Screen"));

const Dashboard: React.FC = () => {
    const chartSurvival = useRef<HTMLDivElement>(null); 
    const [area, setArea] = useState<AreaInformationType[]>([]);
  
    const handleArea = (value: string) => {
        console.log(`selected ${value}`);
    };

    // const navigate = useNavigate();
    // const { request } = useRequests();
    // const { isLoading, setLoading } = useLoading();
    // const [ pagination, setPagination ] = useState<TablePaginationConfig>({
    //     current: 1,
    //     pageSize: 5,
    //     total: 0,
    // });

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
        /*try {
            request(`${URL_AREA}/tree`, MethodsEnum.GET, setArea);*/
            
        const chartDom = chartSurvival.current; 
        if (chartDom) {
            const myChart = echarts.init(chartDom);

            //const  = dataToUse.map((area: AreaType) => area.areaTitle);
            
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
                xAxis: [{
                    type: 'category',
                    //data: measurementDate;
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{ type: 'value' }],
                series: [
                    {
                        name: 'Nativa',
                        type: 'bar',
                        barWidth: '40%',
                        //data: survivalRate, 
                        itemStyle: {
                            color: '#007BFF',
                            borderRadius: [8, 8, 0, 0]
                        },
                    },
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
                 onChange={handleArea}
                 style={{ width: 120 }}
             />
            <div ref={chartSurvival} style={{ height: '400px', marginBottom: '10px' }}></div>
        </Screen> 
    )
}

export default Dashboard;