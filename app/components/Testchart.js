import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis,VictoryTheme } from 'victory';

class Testchart extends Component {
    render() {
        const data = [
            { key: 1, value: 13000 },
            { key: 2, value: 16500 },
            { key: 3, value: 14250 },
            { key: 4, value: 19000 }
        ];
        return (
            <div style={{ height: 500 + 'px' }}>
                <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                  <VictoryBar data={data} x="key" y="value" />
                </VictoryChart>
            </div>
        );
    }
}

export default Testchart;
