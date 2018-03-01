import React, { Component } from 'react';
import Papa from 'papaparse';
import { Chart } from 'chart.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
                'rgba(255, 99, 132, 1)'
            ]
        }, {
            label: 'Calories Consumed',
            data: [],
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
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
    Papa.parse('https://cdn.glitch.com/794ebe4e-78f8-4c05-8e1d-a4d8ec75f1b6%2FCaloresTest.csv?1519881962478', {
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.parseFiles()}> PARSE! </button>
        <canvas id="myChart" width="400" height="400"></canvas>
        <pre>
          {JSON.stringify(this.state.results, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;

