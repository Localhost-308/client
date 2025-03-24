import React, { lazy, useRef, useEffect, useState } from "react";
import { Select } from 'antd';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import { AreaInformationType } from "../../../shared/types/AreaInformationType";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { useRequests } from '../../../shared/hooks/useRequests';
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { URL_AREA_INFORMATION } from '../../../shared/constants/urls';
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
const Screen = lazy(() => import("../../../shared/components/screen/Screen"));

const Dashboard: React.FC = () => {
    const { request } = useRequests();
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();
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
        const fetchData = async () => {
          setLoading(true);
          try {
            await request(`${URL_AREA_INFORMATION}/tree`, MethodsEnum.GET, setArea);
          } catch (error) {
            setNotification(String(error), NotificationEnum.ERROR);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
        
        const handleResize = () => {
        };
        
        window.addEventListener('resize', handleResize);
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
    useEffect(() => {
        
        const chartDom = chartSurvival.current; 
        if (chartDom) {
            const myChart = echarts.init(chartDom);

            const measurementDates = area.map((item) => item.measurement_date.toString());
            const survivalRate = area.map((item => item.survival_rate)); 

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
                    data: measurementDates,
                    axisTick: { alignWithLabel: true },
                }],
                yAxis: [{ type: 'value' }],
                series: [
                    {
                        name: 'Nativa',
                        type: 'bar',
                        barWidth: '40%',
                        data: survivalRate, 
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