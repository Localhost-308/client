

import Screen from "../../../shared/components/screen/Screen";
import InputFileUpload from "../../../shared/components/inputs/inputFileUpload/InputFileUpload";
import FirstScreen from "../../firstScreen";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { LimitedContainer } from "../../../shared/components/styles/limited.styled";
import { DashboardRoutesEnum } from "../../dashboard/routes";
import { useImportFileData } from "../hooks/useImportFileRequest";
import Select from "../../../shared/components/inputs/select/Select";
import Button from "../../../shared/components/buttons/button/Button";

const TYPE_DATA_OPTIONS: any[] = [
    {value: 'csv_sql', label: 'Dados de Plantação'},
    {value: 'csv_nosql', label: 'Dados de Logs'},
    {value: 'csv_inmet', label: 'Previsão do Tempo'}
]

const ImportCSV = () => {
    const { isLoading, setLoading } = useLoading();
    const { errors,
            importFile, 
            onChange,
            handleImport,
            setImportFile } = useImportFileData();
    
    // BREADCRUMB
    const listBreadcrumb = [
        {
            name: 'Dashboard',
            navigateTo: DashboardRoutesEnum.DASHBOARD
        },
        {
            name: 'Importar Dados'
        },
    ]

    // UTILS
    const handleSelectChange = (value: string) => {
        setImportFile({
            ...importFile,
            ['typeData']: value
        })
    }

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            {isLoading && <FirstScreen/>}
            <h2>Importar Dados CSV</h2>
            <LimitedContainer width={400}>
                <Select value={importFile.typeData}
                    onChange={(event) => handleSelectChange(event)}
                    style={{ width: 200, margin: '1em' }}
                    options={TYPE_DATA_OPTIONS.map((a) => ({ value: a.value, label: a.label }))}
                    label="Selecione o Tipo de Dado"/>
                {errors.typeData && <p style={{color: 'red', fontWeight: 500}}>{String(errors.typeData)}</p>}
            </LimitedContainer>
            <form style={{marginTop: '1em'}} 
                onSubmit={(event) => handleImport(event, setLoading)}>
                <LimitedContainer width={400}>
                    <InputFileUpload onChange={onChange} 
                        label="Dados - CSV *"
                        accept=".csv"/>
                    {errors.csv && <p style={{color: 'red', fontWeight: 500}}>{String(errors.csv)}</p>}
                    <LimitedContainer width={200} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Button text="Importar" type="submit" id="insert"/>
                    </LimitedContainer>
                </LimitedContainer>
            </form>
        </Screen> 
    )
}

export default ImportCSV;