import React, { useEffect, useState } from "react";
import InputDateAntd, { dateAntd } from "../../../shared/components/inputs/inputDateAntd/InputDateAntd";

import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_AREA_INFORMATION } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";


const Dashboard: React.FC = () => {
    // const navigate = useNavigate();
    const { request } = useRequests();
    const {setNotification} = useGlobalReducer();
    // const { isLoading, setLoading } = useLoading();
    const [ startDate, setStartDate ] = useState<string>('');
    const [ endDate, setEndDate ] = useState<string>('');
    const [ info, setInfo ] = useState();

    useEffect(() => {
        console.log(info)
    }, [info])

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
    
    // UTILS
    const handleFilter = () => {
        if(startDate && endDate){
            request(
                `${URL_AREA_INFORMATION}?start_date=${startDate}&end_date=${endDate}`, 
                MethodsEnum.GET,
                setInfo
            )
        }else{
            setNotification('Definir Data Inicial e Final!', NotificationEnum.WARNING)
        }
    }

    return(
        <Screen listBreadcrumb={listBreadcrumb}>
            {/* {isLoading && <FirstScreen/>} */}
            <h2>Filtro do Período</h2>
            <BoxButtons>
                <LimitedContainer width={350}>
                    <InputDateAntd onChange={(event: dateAntd) => {setStartDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="31/12/2025"
                        margin="0px 0px 15px 0px" 
                        label="Data Inicial"
                        id="start_date" />
                    <InputDateAntd onChange={(event: dateAntd) => {setEndDate(`${event.$y}-${event.$M + 1}-${event.$D}`)}}
                        maxDate="01/01/2040"
                        margin="0px 0px 15px 0px" 
                        label="Data Final"
                        id="end_date" />
                    <Button id="filter" text="Filtrar" type="button" onClick={() => handleFilter()}/>
                </LimitedContainer>
            </BoxButtons>
        </Screen> 
    )
}

export default Dashboard;