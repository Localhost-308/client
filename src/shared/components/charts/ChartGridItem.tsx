import React, { CSSProperties, ReactNode } from 'react';

interface ChartGridItemProps {
  children: ReactNode;
  gridColumn?: string;
  gridRow?: string;
  columnSpan?: number;
  rowSpan?: number;
  style?: CSSProperties;
}

const ChartGridItem: React.FC<ChartGridItemProps> = ({
  children,
  gridColumn,
  gridRow,
  columnSpan = 1,
  rowSpan = 1,
  style = {}
}) => {
  const itemStyle: CSSProperties = {
    gridColumn: gridColumn || `span ${columnSpan}`,
    gridRow: gridRow || `span ${rowSpan}`,
    minHeight: '300px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    ...style
  };

  return <div style={itemStyle}>{children}</div>;
};

export default ChartGridItem;