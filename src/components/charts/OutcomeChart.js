import React, { Component } from "react";
import Chart from "react-apexcharts";

class OutcomeChart extends Component {
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
          categories: [`${props.fight.data.players[1].lastName}`, 'draw', `${props.fight.data.players[0].lastName}`]
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
          data: [`${props.fight.data.outcome[props.fight.data.players[1].id]}`, `${props.fight.data.outcome.draw}`, `${props.fight.data.outcome[props.fight.data.players[0].id]}`]
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

export default OutcomeChart;