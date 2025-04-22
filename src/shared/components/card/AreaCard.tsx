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
    <Card className="tree-count-card" hoverable>
      <div className="card-content">
        <EnvironmentOutlined className="tree-icon" />
        <h3>{area.area_name}</h3>
        <span><strong>Empresa:</strong> {area.company_name}</span>
        <span><strong>Local:</strong> {area.city} / {area.uf}</span>
        <span><strong>Árvores Plantadas:</strong> {area.number_of_trees_planted ?? 'N/A'}</span>
        <span><strong>Área Total:</strong> {area.total_area_hectares ?? 'N/A'} ha</span>
        <span><strong>Área Reflorestada:</strong> {area.reflorested_area_hectares ?? 'N/A'} ha</span>
        <span><strong>Taxa de Sobrevivência:</strong> {area.tree_survival_rate!.toFixed(2) ?? 'N/A'} %</span>
        <span><strong>Saúde das árvores:</strong> {area.tree_health_status ?? 'N/A'}</span>
        <span><strong>Estágio:</strong> {area.stage_indicator ?? 'N/A'}</span>
      </div>
    </Card>
  );
};

export default AreaCard;