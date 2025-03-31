import React from 'react';
import { Card, Statistic, Typography, Progress, Row, Col } from 'antd';
import { FireOutlined, WarningOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';
import './DeforestationCard.css';
import { DeforestationDataType } from '../../types/DeforestationDataType';

const { Title, Text } = Typography;

interface DeforestationCardProps {
  data: DeforestationDataType;
}

const DeforestationCard: React.FC<DeforestationCardProps> = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  const categories = [
    {
      key: "Desmatamento Ilegal",
      icon: <StopOutlined />,
      color: '#ff4d4f'
    },
    {
      key: "Incêndios",
      icon: <FireOutlined />,
      color: '#fa8c16'
    },
    {
      key: "Invasões",
      icon: <WarningOutlined />,
      color: '#faad14'
    },
    {
      key: "Nenhuma",
      icon: <CheckOutlined />,
      color: '#52c41a'
    }
  ];

  return (
    <Card className="deforestation-card" hoverable>
      <Title level={4} className="card-title">
        Áreas Desmatadas (m²)
      </Title>
      
      <Statistic
        value={total}
        valueStyle={{ color: '#ff4d4f', fontSize: '36px' }}
        prefix={<Text strong>Total:</Text>}
        suffix="m²"
        className="total-statistic"
      />
      
      <div className="divider" />
      
      {categories.map((category) => (
        <Row key={category.key} className="category-row" gutter={16}>
          <Col span={8}>
            <div className="category-info">
              {category.icon}
              <Text strong style={{ marginLeft: 8 }}>{category.key}</Text>
            </div>
          </Col>
          <Col span={10}>
            <Progress
              percent={Math.round((data[category.key as keyof DeforestationDataType] / total) * 100)}
              strokeColor={category.color}
              showInfo={false}
            />
          </Col>
          <Col span={6}>
            <Text strong style={{ color: category.color }}>
              {data[category.key as keyof DeforestationDataType]} m²
            </Text>
          </Col>
        </Row>
      ))}
      
      <div className="footer-note">
        <Text type="secondary">Dados atualizados em {new Date().toLocaleDateString()}</Text>
      </div>
    </Card>
  );
};

export default DeforestationCard;