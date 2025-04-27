import React from 'react';
import { Table, Tag } from 'antd';
import styled from 'styled-components';

interface Consequents {
  [key: string]: string;
}

export interface Practice {
  antecedents: string;
  confidence: number;
  consequents: Consequents;
  lift: number;
  support: number;
}

interface BestPracticesTableProps {
  data: Practice[];
}

const Container = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const BestPracticesTable: React.FC<BestPracticesTableProps> = ({ data }) => {
  const columns = [
    {
      title: 'Antecedente',
      dataIndex: 'antecedents',
      key: 'antecedents',
    },
    {
      title: 'Consequente',
      key: 'consequents',
      render: (_: any, record: Practice) => {
        const [key, value] = Object.entries(record.consequents)[0];
        return (
          <Tag color="blue">
            {key}: {value}
          </Tag>
        );
      },
    },
    {
      title: 'Confiança (%)',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (value: number) => (
        <Tag color={value > 0.52 ? 'green' : value > 0.5 ? 'gold' : 'red'}>
          {(value * 100).toFixed(2)}%
        </Tag>
      ),
    },
    {
      title: 'Suporte (%)',
      dataIndex: 'support',
      key: 'support',
      render: (value: number) => (
        <span>{(value * 100).toFixed(2)}%</span>
      ),
    },
    {
      title: 'Lift',
      dataIndex: 'lift',
      key: 'lift',
      render: (value: number) => (
        <span>{value.toFixed(2)}</span>
      ),
    },
  ];

  return (
    <Container>
      <h2>Boas Práticas de Plantio</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(obj) => `${obj.antecedents}+${obj.confidence}`}
        pagination={{ pageSize: 10 }}
      />
    </Container>
  );
};
