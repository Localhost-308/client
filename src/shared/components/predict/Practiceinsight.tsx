// interface Rule {
//     antecedents: string[];
//     consequents: { [key: string]: string };
//     confidence: number;
//     lift: number;
//     support: number;
// }

// interface CompiledSummary {
//     mostCommonWaterSource: string;
//     bestIrrigationMethod: string;
//     bestFertilizer: string;
//     averageConfidence: number;
// }

// export function compileInsights(rules: Rule[]): CompiledSummary {
//     const waterSources: Record<string, number> = {};
//     const irrigationMethods: Record<string, number> = {};
//     const fertilizers: Record<string, number> = {};
//     let totalConfidence = 0;

//     rules.forEach(rule => {
//         rule.antecedents.forEach(antecedent => {
//             if (antecedent.includes('Fonte de água:')) {
//                 const source = antecedent.replace('Fonte de água: ', '');
//                 waterSources[source] = (waterSources[source] || 0) + 1;
//             }
//             if (antecedent.includes('Tipo de irrigação:')) {
//                 const method = antecedent.replace('Tipo de irrigação: ', '');
//                 irrigationMethods[method] = (irrigationMethods[method] || 0) + 1;
//             }
//             if (antecedent.includes('Tipo de adubação:')) {
//                 const fertilizer = antecedent.replace('Tipo de adubação: ', '');
//                 fertilizers[fertilizer] = (fertilizers[fertilizer] || 0) + 1;
//             }
//         });

//         totalConfidence += rule.confidence;
//     });

//     const mostCommonWaterSource = Object.entries(waterSources).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
//     const bestIrrigationMethod = Object.entries(irrigationMethods).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
//     const bestFertilizer = Object.entries(fertilizers).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
//     const averageConfidence = totalConfidence / rules.length;

//     return {
//         mostCommonWaterSource,
//         bestIrrigationMethod,
//         bestFertilizer,
//         averageConfidence: +(averageConfidence * 100).toFixed(1),
//     };
// }

import React from 'react';
import { Card, List, Typography, Row, Col, Statistic, Progress } from 'antd';
import styled from 'styled-components';
import { ThunderboltTwoTone, FireTwoTone, BugTwoTone, DropboxOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Tipos para nossos dados
interface AssociationRule {
  antecedents: string;
  confidence: number;
  consequents: {
    [key: string]: string;
  };
  lift: number;
  support: number;
}

interface InsightsProps {
  data: AssociationRule[];
}

const InsightCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-head {
    background-color: #f0f7f0;
    border-radius: 8px 8px 0 0;
  }
`;

const HighlightText = styled(Text)`
  color: #1890ff;
  font-weight: 500;
`;

const getIconForAntecedent = (antecedent: string) => {
  if (antecedent.includes('threats_')) {
    return <FireTwoTone twoToneColor="#ff4d4f" />;
  }
  if (antecedent.includes('sources_')) {
    return <DropboxOutlined style={{ color: '#1890ff' }} />;
  }
  if (antecedent.includes('management_')) {
    return <ThunderboltTwoTone twoToneColor="#52c41a" />;
  }
  return <BugTwoTone twoToneColor="#722ed1" />;
};

const formatAntecedent = (antecedent: string) => {
  return antecedent
    .replace('threats_', 'Ameaça: ')
    .replace('sources_', 'Fonte de Água: ')
    .replace('management_', 'Gestão: ')
    .replace('Nenhuma', 'Nenhuma ameaça')
    .replace('Mineral', 'Fertilizante Mineral')
    .replace('Orgânica', 'Fertilizante Orgânico')
    .replace('Aspersão', 'Irrigação por Aspersão')
    .replace('Gotejamento', 'Irrigação por Gotejamento');
};

const formatConsequent = (consequent: Record<string, string>) => {
  const key = Object.keys(consequent)[0];
  const value = consequent[key];
  
  if (key === 'pest_management') {
    return `Manejo de Pragas: ${value === 'Sim' ? 'Realizado' : 'Não realizado'}`;
  }
  if (key === 'irrigation') {
    return `Tipo de Irrigação: ${value}`;
  }
  return `${key}: ${value}`;
};

const getInsightType = (rule: AssociationRule) => {
  const consequentKey = Object.keys(rule.consequents)[0];
  
  if (consequentKey === 'pest_management') {
    return rule.consequents[consequentKey] === 'Sim' 
      ? 'Prática Recomendada' 
      : 'Atenção Necessária';
  }
  
  return 'Padrão Identificado';
};

const InsightsDashboard: React.FC<InsightsProps> = ({ data }) => {
  // Filtrar e ordenar as regras mais relevantes
  const relevantRules = data
    .filter(rule => rule.lift > 1) // Lift > 1 indica associação relevante
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10); // Pegar as top 10

  // Agrupar por tipo de consequente para análise
  const groupedByConsequent = relevantRules.reduce((acc, rule) => {
    const consequentKey = Object.keys(rule.consequents)[0];
    if (!acc[consequentKey]) {
      acc[consequentKey] = [];
    }
    acc[consequentKey].push(rule);
    return acc;
  }, {} as Record<string, AssociationRule[]>);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Insights Agrícolas
      </Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Regras Identificadas" 
              value={data.length} 
              precision={0}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Regras Relevantes" 
              value={relevantRules.length} 
              precision={0}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Confiança Média" 
              value={(relevantRules.reduce((sum, rule) => sum + rule.confidence, 0) / relevantRules.length)} 
              precision={2}
              suffix="%"
              formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
            />
          </Card>
        </Col>
      </Row>
      
      <Title level={4} style={{ marginTop: '24px' }}>
        Principais Padrões Identificados
      </Title>
      
      <List
        itemLayout="vertical"
        dataSource={relevantRules}
        renderItem={(rule) => (
          <InsightCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getIconForAntecedent(rule.antecedents)}
                <span>{getInsightType(rule)}</span>
              </div>
            }
          >
            <div style={{ marginBottom: '12px' }}>
              <Text strong>Quando:</Text> <HighlightText>{formatAntecedent(rule.antecedents)}</HighlightText>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text strong>Então:</Text> <HighlightText>{formatConsequent(rule.consequents)}</HighlightText>
            </div>
            
            <Row gutter={16}>
              <Col span={8}>
                <div>
                  <Text strong>Confiança:</Text>
                  <Progress 
                    percent={Math.round(rule.confidence * 100)} 
                    status={rule.confidence > 0.5 ? 'success' : 'normal'}
                    format={() => `${(rule.confidence * 100).toFixed(1)}%`}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>Relevância (Lift):</Text>
                  <Progress 
                    percent={Math.round((rule.lift - 1) * 100)} 
                    status={rule.lift > 1.05 ? 'success' : 'normal'}
                    format={() => rule.lift.toFixed(2)}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <Text strong>Frequência (Support):</Text>
                  <Progress 
                    percent={Math.round(rule.support * 100)} 
                    status={rule.support > 0.15 ? 'success' : 'normal'}
                    format={() => `${(rule.support * 100).toFixed(1)}%`}
                  />
                </div>
              </Col>
            </Row>
          </InsightCard>
        )}
      />
      
      <Title level={4} style={{ marginTop: '24px' }}>
        Análise por Categoria
      </Title>
      
      <Row gutter={[16, 16]}>
        {Object.entries(groupedByConsequent).map(([consequent, rules]) => (
          <Col span={12} key={consequent}>
            <Card 
              title={formatConsequent({ [consequent]: rules[0].consequents[consequent] })}
              style={{ height: '100%' }}
            >
              <List
                size="small"
                dataSource={rules.slice(0, 3)}
                renderItem={(rule) => (
                  <List.Item>
                    <div>
                      <Text>{formatAntecedent(rule.antecedents)}</Text>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Confiança: {(rule.confidence * 100).toFixed(1)}% | 
                        Relevância: {rule.lift.toFixed(2)} | 
                        Frequência: {(rule.support * 100).toFixed(1)}%
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InsightsDashboard;