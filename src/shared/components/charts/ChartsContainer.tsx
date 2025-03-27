import './ChartsStyle.css'
import React from 'react';
import ReactECharts from 'echarts-for-react';

interface ChartConfig {
  options: any;
  title: string;
  fraction: number;
}

interface ChartsContainerProps {
  charts: ChartConfig[];
}

const ChartsContainer: React.FC<ChartsContainerProps> = ({ charts }) => {
  return (
    <div className="charts-container">
      {charts.map((chart, index) => (
        <div key={index}
          className="chart-card"
          style={{ gridColumn: `span ${chart.fraction}` }}>
          <h3>{chart.title}</h3>
          <ReactECharts option={chart.options} style={{ height: '400px', width: '100%' }} />
        </div>
      ))}
    </div>
  );
};

export default ChartsContainer;