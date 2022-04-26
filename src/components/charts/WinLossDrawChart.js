import React, { Component } from "react";
import Chart from "react-apexcharts";

class WinLossDrawChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ['#F74902'],
        chart: {
          id: "basic-bar",
          background: 'none',
          toolbar: {
            show: false
          },
        },
        xaxis: {
          categories: [`Wins`, 'Draws', `Losses`]
        },
        yaxis: {
            show: false
        },
        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            },
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 25, 27, 60]
          },
        },
      },
      
      series: [
        {
          name: "Total",
          data: [`${props.wins}`, `${props.draws}`, `${props.losses}`]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="200"
              height="200"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WinLossDrawChart;