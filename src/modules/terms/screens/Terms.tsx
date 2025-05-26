import { lazy, useEffect, useState } from "react";
import { Table, Drawer, Input, Button } from "antd";
import { ColumnsType } from "antd/es/table/interface";

import FirstScreen from "../../firstScreen";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_TERMS } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { TermsType } from "../../../shared/types/TermsType";
import { BoxButtons } from "../../../shared/components/styles/boxButtons.style";

const Screen = lazy(() => import('../../../shared/components/screen/Screen'));

const Terms = () => {
    const { request } = useRequests();
    const { isLoading, setLoading } = useLoading();
    const [termsAndConditions, setTermsAndConditions] = useState<TermsType[]>([]);
    const [selectedTerms, setSelectedTerms] = useState<TermsType | null>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        setLoading(true);
        request(URL_TERMS, MethodsEnum.GET, setTermsAndConditions)
            .then(() => setLoading(false));
    }, []);

    // Colunas da tabela
    const columns: ColumnsType<TermsType> = [
        {
            title: 'Versão',
            dataIndex: 'version',
            key: 'version',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Texto',
            dataIndex: 'text',
            key: 'text',
            ellipsis: true,
            render: (text) => <p>{`${text}`}</p>,
        },
        {
            title: 'Visualizar',
            key: 'view',
            render: (_, item) => (
                <a onClick={() => {
                    setSelectedTerms(item);
                    setDrawerVisible(true);
                }}>
                    Ver Termos
                </a>
            ),
        },
        {
            title: 'Mandatório',
            dataIndex: 'mandatory',
            key: 'mandatory',
            render: (_, item) => {
                if (item.mandatory) return <b style={{ color: 'green' }}>{`Obrigatório`}</b>;
                return <b style={{ color: 'red' }}>{`Não Obrigatório`}</b>;
            },
        },
        {
            title: 'Editar',
            key: 'actions',
            render: (_, item) => (
                <a onClick={() => handleEdit(item)} style={{ color: 'blue' }}>Editar</a>
            ),
        }
    ];

    // Breadcrumb
    const listBreadcrumb = [
        {
            name: 'Dashboard',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Lista de Termos e Condições'
        }
    ];

    // UTILS
    const handleEdit = (terms: TermsType) => {
        setSelectedTerms(terms);
        setEditedText(terms.text);
        setIsEditing(true);
        setDrawerVisible(true);
    };

    const handleSave = () => {
        if (!selectedTerms) return;
      
        const updatedTerms = {
          ...selectedTerms,
          text: editedText
        };
      
        setLoading(true);
        request(`${URL_TERMS}/${selectedTerms.id}`, MethodsEnum.PUT, undefined, updatedTerms)
          .then(() => {
            setTermsAndConditions((prev) =>
              prev.map((term) =>
                term.id === updatedTerms.id ? updatedTerms : term
              )
            );
            setDrawerVisible(false);
            setIsEditing(false);
          })
          .finally(() => setLoading(false));
      };

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen />}
            <BoxButtons>
                <h1>Termos e Condições</h1>
            </BoxButtons>

            <Table columns={columns}
                dataSource={termsAndConditions}
                rowKey={(obj) => obj.id} />

            <Drawer
                title={isEditing
                    ? `Editar Termos - Versão ${selectedTerms?.version}`
                    : `Termos de Uso - Versão ${selectedTerms?.version}`}
                placement="right"
                onClose={() => {
                    setDrawerVisible(false);
                    setIsEditing(false);
                }}
                open={drawerVisible}
                width={720}
                footer={
                    isEditing && (
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={() => setIsEditing(false)} style={{ marginRight: 8 }}>
                                Cancelar
                            </Button>
                            <Button type="primary" onClick={handleSave}>
                                Salvar
                            </Button>
                        </div>
                    )
                }
            >
                {isEditing ? (
                    <Input.TextArea
                        rows={20}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    <div style={{ whiteSpace: 'pre-line' }}>{selectedTerms?.text}</div>
                )}
            </Drawer>
        </Screen>
    );
};

export default Terms;