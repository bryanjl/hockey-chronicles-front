import React, { Component } from "react";
import Chart from "react-apexcharts";

class WinByChart extends Component {
  constructor(props) {
    super(props);

    let { splitDecision, unanimousDecision, beatdown, tko, knockout, noDecision, draw } = props.winBy;

    this.state = {
      options: {
        colors: ['#F74902'],
        chart: {
            type: 'bar',
            height: 350
            },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
            },
        dataLabels: {
            enabled: false
            },
        xaxis: {
            categories: [
                'Split Decision (Slight Edge)', 'Unanimous Decision (Decisive Edge)', 'Beatdown', 'TKO', 'Knock Out', 'No-Decision', 'Draw'
            ],
            labels: {
                show: false
            }
        },
      },
      series: [{
            name: 'Votes',
            data: [splitDecision, unanimousDecision, beatdown, tko, knockout, noDecision, draw]
      }],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
                style={{ marginRight: '75px' }}
                options={this.state.options}
                series={this.state.series}
                type="bar"
                //   width="200"
                height="200"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WinByChart;