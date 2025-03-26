import { useState, useEffect } from 'react';
import { CO2Type } from "../../../../shared/types/Co2Type";

export const useCO2Data = (co2: CO2Type[]) => {
    const [chartCO2Options, setChartCO2Options] = useState({});

    useEffect(() => {
        console.log(co2)
        if (co2.length > 0) {
            const orderedCO2 = [...co2].sort(
                (a, b) => new Date(a.measurement_date).getTime() - new Date(b.measurement_date).getTime()
            );
            const dates = orderedCO2.map((oc) => oc.measurement_date);
            const co2Ordered = orderedCO2.map((oc) => oc.total_avoided_co2);
            setChartCO2Options({
                xAxis: {
                    type: 'category',
                    data: dates,
                    name: 'Data',
                    nameLocation: 'middle',
                    nameGap: 25,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 12
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Emissões de CO2 (ton)',
                    nameLocation: 'middle',
                    nameGap: 45,
                    nameTextStyle: {
                        fontWeight: 'bold',
                        fontSize: 12
                    }
                },
                series: [
                    {
                        data: co2Ordered,
                        type: 'line',
                        smooth: true
                    }
                ]
            });
        }
    }, [co2]);

    return chartCO2Options;
};