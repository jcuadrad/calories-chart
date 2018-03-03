import React, { Component } from 'react';

import Papa from 'papaparse';
import { Chart } from 'chart.js'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      link: 'https://cdn.glitch.com/794ebe4e-78f8-4c05-8e1d-a4d8ec75f1b6%2FCaloresTest.csv?1520012647551',
      results: 'Nothing has been parsed yet!',
      chartData: 'Whaat'
    }
  }

  showResult = (results) => {
    this.setState({
      results: results,
      chartData: this._transform(results.data)
    });
    this._createChart(this.state.chartData);
    console.log(this.state.chartData);
  }

  _transform = (data) => {
    let chartData = {
        labels: [],
        datasets: [{
            label: 'Calories Burned',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ]
        }, {
            label: 'Calories Consumed',
            data: [],
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ]
        }
                  ]
    }
    data.forEach(point => {
      chartData.labels.push(point.Day);
      chartData.datasets[0].data.push(point['Calories Burned']);
      chartData.datasets[1].data.push(point['Calories Consumed']);
    });
    return chartData;
  }

  parseFiles() {
    Papa.parse(this.state.link, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.showResult(results);
        console.log(results);
      }
    })
  }

  _createChart = (data) => {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: 'white'
            }
          },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                    },
                    gridLines: {
                      color: 'white'
                    },
                    scaleLabel: {
                      fontColor: 'white'
                    }
                },
              ],
                xAxes: [{
                  ticks: {
                    beginAtZero:true,
                    fontColor: 'white'
                },
                  gridLines: {
                    color: 'white'
                  },
                  scaleLabel: {
                    fontColor: 'white'
                  }
                }]
            }
        }
    });
  }

  handleChange = (event) => {
    this.setState({link: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <FontAwesomeIcon icon={faInfoCircle} size="2x" className="info-icon" color="#43A4E6"/>
        <div className="title">
          <h1>Calories Chart</h1>
        </div>
        <div className="chart-container">
         <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        <div className="bottom">
          <div className="link-input">
            <h1>CSV</h1>
            <p>Put the link to your file here!</p>
            <div className="info">
              <input type="text" placeholder="https://...." value={this.state.link} onChange={this.handleChange}></input>
              <span className="button" onClick={() => this.parseFiles()}> PARSE! </span>
            </div>
          </div>
          <div className="raw-data">
            <pre>
              {JSON.stringify(this.state.results.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

