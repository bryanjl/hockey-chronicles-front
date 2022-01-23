import React, { Component } from "react";
import Chart from "react-apexcharts";

class WinLossDrawChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          background: 'none',
          toolbar: {
            show: false
        }
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
        }
      },
      series: [
        {
          name: "Votes",
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