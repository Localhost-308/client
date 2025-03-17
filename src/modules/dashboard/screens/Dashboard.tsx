import React, { lazy } from "react";

const Screen = lazy(() => import("../../../shared/components/screen/Screen"));

const Dashboard: React.FC = () => {
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


    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Requisições Pendentes para Aprovação'
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
        </Screen> 
    )
}

export default Dashboard;