import { useState, useEffect } from 'react';
import { TreeHealth } from '../../../../shared/types/treeHealth';


export const useTreeHealth = (treeHealth: TreeHealth | null) => {
    const [chartExampleOptions, setChartExampleOptions] = useState({});
    
    useEffect(() => {
        if (!treeHealth) return;
        const header = ['Health', 'Com Pragas', 'Morrendo', 'Saudáveis'];
        const result: any[][] = [header];
  
        for (const [technic, healtValues] of Object.entries(treeHealth)) {
            result.push([technic, healtValues.comPragas, healtValues.morrendo, healtValues.saudaveis]);
        }

        setChartExampleOptions( {
            legend: {},
            tooltip: {},
            dataset: {
              source: result
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
          });
    }, [treeHealth]);

    return chartExampleOptions;
};