import React from "react";
import { Card, Tag, Space } from "antd";
import styled, { keyframes } from "styled-components";

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const StatusCard = styled(Card)<{ statuscolor: string }>`
  margin-top: 24px;
  animation: ${fadeIn} 0.5s ease-out;
  border-left: 4px solid ${props => props.statuscolor};
`;

const IconContainer = styled.div`
  font-size: 48px;
  animation: ${pulse} 2s infinite;
`;

const StatusTag = styled(Tag)<{ statuscolor: string }>`
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 20px;
  color: ${props => props.statuscolor};
  border-color: ${props => props.statuscolor};
`;

const DescriptionText = styled.div`
  color: rgba(0, 0, 0, 0.65);
`;

// Status configurations
const statusStyles = {
  "Saudáveis": {
    color: "#52c41a",
    bg: "#f6ffed",
    icon: "🌱",
    text: "Plantação Saudável"
  },
  "Com Pragas": {
    color: "#faad14",
    bg: "#fffbe6",
    icon: "🐛",
    text: "Plantação com Pragas"
  },
  "Morrendo": {
    color: "#f5222d",
    bg: "#fff1f0",
    icon: "💀",
    text: "Plantação Morrendo"
  }
};

interface PredictionStatusProps {
  status: "Saudáveis" | "Com Pragas" | "Morrendo";
}

const PredictionStatus: React.FC<PredictionStatusProps> = ({ status }) => {
  const currentStatus = statusStyles[status];

  return (
    <StatusCard 
      title="Status da Plantação"
      statuscolor={currentStatus.color}
      style={{width: '300px', height: '350px'}}
    >
      <Space direction="vertical" size="large" style={{ textAlign: 'center', width: '100%' }}>
        <IconContainer>
          {currentStatus.icon}
        </IconContainer>
        <StatusTag statuscolor={currentStatus.color}>
          {currentStatus.text}
        </StatusTag>
        <DescriptionText>
          {status === "Saudáveis"
            ? "Sua plantação terá ótimas condições!"
            : status === "Com Pragas"
            ? "Recomendamos ações para melhorar o controle de pragas."
            : "Atenção! Plantação precisa de cuidados urgentes."}
        </DescriptionText>
      </Space>
    </StatusCard>
  );
};

export default PredictionStatus;