import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import './TreeCountCard.css';

const { Title } = Typography;

interface TreeCountCardProps {
  count: number;
}

const TreeCountCard: React.FC<TreeCountCardProps> = ({ count }) => {
  return (
    <Card className="tree-count-card" hoverable>
      <div className="card-content">
        <EnvironmentOutlined className="tree-icon" />
        
        <Statistic
          title="Quantidade de Árvores Plantadas"
          value={count > 0 ? (count/1000000).toFixed(1) : 0}
          valueStyle={{ color: '#52c41a', fontSize: '23px' }}
          prefix={<span style={{ fontSize: '17px' }}>🌱</span>}
          suffix={
            <span style={{ fontSize: '16px', color: '#52c41a' }}>
              {count > 1 ? 'Mi Árvores' : 'Mi Árvore'}
            </span>
          }
        />
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${Math.min(100, count / 1000 * 100)}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default TreeCountCard;