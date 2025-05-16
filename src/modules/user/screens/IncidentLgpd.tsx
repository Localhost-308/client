import { lazy, useEffect, useState } from "react";
import { Input, Checkbox, DatePicker } from "antd";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import { URL_NOTIFY__LGPD_INCIDENT } from "../../../shared/constants/urls";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { Modal } from 'antd';
import FirstScreen from "../../firstScreen";


const Button = lazy(() => import('../../../shared/components/buttons/button/Button'));
const Screen = lazy(() => import('../../../shared/components/screen/Screen'));
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const IncidentLgpd = () => {
    const { setNotification } = useGlobalReducer();
    const { isLoading, setLoading } = useLoading();

    const natureOfDataOptions = ['Dados Pessoais', 'Dados Sensíveis'];
    const [natureOfDataList ,setNatureOfDataList] = useState<string[]>([]);
    const [natureOfData, setNatureOfData] = useState<String>('');

    const [startDate, setStartDate] =  useState<String>();
    const [endDate, setEndDate] = useState<String>();

    const [companyName, setCompanyName] = useState<string>();

    const [message, setMessage] = useState<string>();
    
    const onNatureChange = (list: string[]) => {
        setNatureOfDataList(list);
        setNatureOfData(list.join(', '));
    };
    
    const [modal, contextHolder] = Modal.useModal();
    const modalConfig = {
        title: 'ATENÇÃO',
        content: (
          <>
            <span>
                O controlador ainda deverá comunicar à ANPD por peticionamento eletrônico pelo link abaixo:
                <br />
                <a
                    href="https://www.gov.br/anpd/pt-br/canais_atendimento/peticionamento-eletronico-anpd"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Peticionamento Eletrônico ANPD
                </a>
            </span>
          </>
        ),
      };

    const onPeriodChange = (dates: any, dateStrings: [string, string]) => {
        if (dates) {
          setStartDate(dateStrings[0]);
          setEndDate(dateStrings[1]);
        } else {
          setStartDate('');
          setEndDate('');
        }
      };
    
      const onNotificationChange = (e: any) => {
        setMessage(e.target.value);
      };

      const onCompanyChange = (e: any) => {
        setCompanyName(e.target.value);
      };

      const handleSubmmit = async () => {
        try {
            setLoading(true);
            await connectionAPIPost(URL_NOTIFY__LGPD_INCIDENT, {message: message});
            setNotification("Notificações de Incidentes enviadas", NotificationEnum.SUCCESS);
        } catch (error: any) {
            if (error.message.includes("psycopg2")) {
                setNotification("Falha ao salvar no banco de dados", NotificationEnum.ERROR);
            } else {
                setNotification(error.message, NotificationEnum.ERROR);
            }
        } finally {
            setLoading(false);
            modal.warning(modalConfig);
        }
    }
    useEffect(() => {
        setMessage(
        `
        NOTIFICAÇÃO DE OCORRÊNCIA DE INCIDENTE RELACIONADA A DADOS PESSOAIS

        Conforme o Art. 48 da Lei Nº 13.709, DE 14 DE agosto DE 2018, dirigimos ao presente titular de dados pessoais junto à empresa ${companyName} para informar que houve uma ocorrência de incidente possivelmente relacionada aos seus dados pessoais.
        
        I- NATUREZA DOS DADOS: ${natureOfData}

        II- INFORMAÇÕES SOBRE OS TITULARES ENVOLVIDOS: 
        O incidente afetou todos os titulares de nossa base de dados, entre os períodos de ${startDate} e ${endDate}. 
        Os dados afetados podem incluir: 
            - nome completo, 
            - e-mail, 
            - cargo, 
            - senhas e 
            - nome da empresa do titular.

        III- MEDIDAS TÉCNICAS UTILIZADAS PARA PROTEÇÃO DOS DADOS:
            - Criptografia de dados;
            - Controle de acesso baseado em perfil;
            - Backups periódicos criptografados;
            - Ambientes segregados;
            - Atualizações regulares de sistemas e correções de segurança.
        
        IV- RISCOS RELACIONADOS AO INCIDENTE:
            - Acessos suspeitos à conta e 
            - Uso não autorizados das informações.

        V- MOTIVOS DA DEMORA DESTA NOTIFICAÇÃO:
            - Instabilidade dos serviços devido a própria ocorrência;
            - Diligências preliminares para avaliar a gravidade do incidente e embasar esta notificação.
        
        VI- MEDIDAS QUE FORAM/SERÃO ADOTADAS PARA REVERTER/MITIGAR OS EFEITOS DO PREJUÍZO
            - Revogação de credenciais comprometidas;
            - Isolamento de sistemas afetados;
            - Correção de vulnerabilidades;
            - Reforço de autenticação;
            - Monitoramento de sistemas e logs;
            - Backup e restauração de dados.
        `
        )
    }, [startDate, endDate, natureOfData, companyName])

    // Breadcrumb
    const listBreadcrumb = [
        {
            name: 'Dashboard',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Incidente LGPD'
        }
    ];

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {contextHolder}
            {isLoading && <FirstScreen />}
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <h1>Notificação de incidente de Segurança (LGPD)</h1>   
                <div style={{display: "Flex", flexDirection: "row", gap: 50, width: 1000}}>
                    <div> 
                        <h2>Natureza dos Dados</h2>
                        <CheckboxGroup 
                            options={natureOfDataOptions} 
                            value={natureOfDataList} 
                            onChange={onNatureChange} 
                            />
                    </div>
                    <div>
                        <h2>Período do incidente</h2>
                        <RangePicker 
                            picker="month" 
                            format="MM/YYYY"
                            onChange={onPeriodChange} 
                            />
                    </div>
                    <div>
                        <h2>Identificação do Notificante</h2>
                        <Input 
                            value={companyName}
                            onChange={onCompanyChange}
                            />
                    </div>
                </div>
                <div>
                    <h2>Revise o texto da notificação:</h2>
                    <TextArea 
                        rows={15} 
                        maxLength={2000} 
                        value={message}
                        onChange={onNotificationChange}
                        style={{ width: '1000px' }}
                        variant="filled"
                    />
                </div>
                <Button text='ENVIAR' 
                        type='submit' 
                        id='send' 
                        onClick={() => {handleSubmmit()}}
                />                  
            </div>
        </Screen>
    );
};

export default IncidentLgpd;