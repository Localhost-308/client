import React, { CSSProperties, ReactNode } from 'react';

interface ChartContainerProps {
  children: ReactNode;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: string;
  style?: CSSProperties;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))',
  gridTemplateRows = 'auto',
  gap = '20px',
  style = {}
}) => {
  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    ...style
  };

  return <div style={containerStyle}>{children}</div>;
};

export default ChartContainer;