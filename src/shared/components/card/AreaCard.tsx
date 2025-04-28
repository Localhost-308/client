import React from 'react';
import { Card } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import './AreaCard.css';
import { AreaPoint } from '../../types/AreaPointType';


interface AreaCardProps {
  area: AreaPoint;
}

const AreaCard: React.FC<AreaCardProps> = ({ area }) => {
  return (
    <Card className="card" hoverable>
      <div className="card-content">
        <div className="header">
            <span className="material-symbols-outlined tree-icon">energy_program_time_used</span>
            <h3>{area.area_name}</h3>
        </div>
        <span>
            <span className="material-symbols-outlined vertical-align">apartment</span>
            <strong>Empresa:</strong> {area.company_name}
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">my_location</span>
            <strong>Local:</strong> {area.city} / {area.uf}
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">nature</span>
            <strong>Árvores Plantadas:</strong> {area.number_of_trees_planted ?? 'N/A'}
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">functions</span>
            <strong>Área Total:</strong> {area.total_area_hectares ?? 'N/A'} ha
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">forest</span>
            <strong>Área Reflorestada:</strong> {area.reflorested_area_hectares ?? 'N/A'} ha
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">favorite</span>
            <strong>Taxa de Sobrevivência:</strong> {area.tree_survival_rate!.toFixed(2) ?? 'N/A'} %
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">health_metrics</span>
            <strong>Saúde das árvores:</strong> {area.tree_health_status ?? 'N/A'}
        </span>
        <span>
            <span className="material-symbols-outlined vertical-align">timeline</span>
            <strong>Estágio:</strong> {area.stage_indicator ?? 'N/A'}
        </span>
      </div>
    </Card>
  );
};

export default AreaCard;