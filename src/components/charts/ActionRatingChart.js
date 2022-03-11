import React, { Component } from "react";
import Chart from "react-apexcharts";

class ActionRatingChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [props.actionRating * 10],
        options: {
          chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#e7e7e7",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#999',
                  opacity: 1,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px',
                  //eslint-disable-next-line
                  formatter: function(value, {}){
                    return value/10
                  },
                  show: true
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
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
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Action'],
        },
      
      
      };
    }

  

    render() {
      
        
        return (
            <div className="app">
              <div className="row">
                <div className="chart">
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="radialBar"
                    width="200"
                    height="200"
                  />
                </div>
              </div>
            </div>
          );
    }
  }

  export default ActionRatingChart;
  