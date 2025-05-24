import React, { memo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Screen from "../../../shared/components/screen/Screen";
import { URL_AREA, URL_REPORT } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";
import { AreaPoint } from "../../../shared/types/AreaPointType";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import AreaCard from "../../../shared/components/card/AreaCard";
import styles from "../styles/SearchArea.module.css";
import Search from "antd/es/input/Search";
import { Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { useLoading } from "../../../shared/components/loadingProvider/LoadingProvider";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { NotificationEnum } from "../../../shared/types/NotificationType";
import FirstScreen from "../../firstScreen";

const SearchArea: React.FC = () => {
  const { request } = useRequests();
  const { isLoading, setLoading } = useLoading();
  const { setNotification } = useGlobalReducer();
  const [areas, setAreas] = useState<AreaPoint[]>([]);
  const [markedArea, setMarkedArea] = useState<AreaPoint>();
  const [adjustedAreas, setAdjustedAreas] = useState<AreaPoint[]>([]);

  async function handleSearch(name: string) {
    if (name) {
      await request(
        `${URL_AREA}/search?name=${name}`,
        MethodsEnum.GET,
        setAreas
      );
    }
  }

  async function getReport() {
    setLoading(true);
    try {
      await request(
        `${URL_REPORT}/${markedArea?.area_id}`, 
        MethodsEnum.GET, 
        saveBlobFile, 
        undefined,
        'blob'
      );
    }
    catch(error) {
      setNotification(String(error), NotificationEnum.ERROR);
    }
    finally {
      setLoading(false);
    }
  }

  function saveBlobFile(blobFile: any) {
    const url = window.URL.createObjectURL(blobFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (areas.length > 0) {
      setAdjustedAreas(adjustCoordinates(areas));
    }
  }, [areas]);

  return (
    <Screen>
      {isLoading && <FirstScreen />}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
          <Search placeholder="Pesquisar (cidade, empresa ou área)" onSearch={e => handleSearch(e)} enterButton/>
            {markedArea ? (
                <>
                    <AreaCard area={markedArea} />
                    <div className={styles.buttonWrapper}>
                      <Button
                          type="primary"
                          size="middle"
                          icon={<FilePdfOutlined />}
                          onClick={() => getReport()}
                          >
                          Salvar
                      </Button>
                    </div>
                </>
            ) : (
                <p>Selecione uma área no mapa para ver os detalhes</p>
            )}
          </div>

          <div className={styles.mapWrapper}>
            <MapContainer
              center={[-14.235, -51.9253]}
              zoom={5}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {adjustedAreas.map((area, index) => (
                <Marker
                  position={area.coordinates}
                  key={index}
                  eventHandlers={{ click: () => setMarkedArea(area) }}
                >
                  <Popup>
                    <strong>{area.company_name}</strong>
                    <br />
                    {area.city} / {area.uf}
                    <br />
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default memo(SearchArea);

const adjustCoordinates = (areas: any[]) => {
  const coordMap = new Map<string, number>();

  return areas.map((area) => {
    const key = `${area.coordinates[0]},${area.coordinates[1]}`;
    const count = coordMap.get(key) || 0;
    coordMap.set(key, count + 1);

    // Deslocamento do ponto
    const offset = () => (Math.random() - 0.5) * 0.2;

    return {
      ...area,
      coordinates: [
        area.coordinates[0] + offset(),
        area.coordinates[1] + offset(),
      ],
    };
  });
};
