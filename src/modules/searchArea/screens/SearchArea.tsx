import React, { memo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Screen from "../../../shared/components/screen/Screen";
import Button from "../../../shared/components/buttons/button/Button";
import Input from "../../../shared/components/inputs/input/Input";
import { URL_AREA } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";
import { AreaPoint } from "../../../shared/types/AreaPointType";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import AreaCard from "../../../shared/components/card/AreaCard";
import styles from "../styles/SearchArea.module.css";

const SearchArea: React.FC = () => {
  const { request } = useRequests();
  const [searchName, setSearchName] = useState<string>();
  const [areas, setAreas] = useState<AreaPoint[]>([]);
  const [markedArea, setMarkedArea] = useState<AreaPoint>();
  const [adjustedAreas, setAdjustedAreas] = useState<AreaPoint[]>([]);
  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  async function handleSearch() {
    if (searchName) {
      await request(
        `${URL_AREA}/search?name=${searchName}`,
        MethodsEnum.GET,
        setAreas
      );
    }
  }

  useEffect(() => {
    if (areas.length > 0) {
      setAdjustedAreas(adjustCoordinates(areas));
    }
  }, [areas]);

  return (
    <Screen>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <Input
            id="input"
            type="text"
            label="Área / Empresa / Cidade"
            value={searchName}
            onChange={handleSearchName}
          />
          <Button
            id="button"
            text="Buscar"
            type="button"
            onClick={() => handleSearch()}
          />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            {markedArea ? (
              <AreaCard area={markedArea} />
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
