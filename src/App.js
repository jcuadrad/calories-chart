import React, { Component } from 'react';
import Papa from 'papaparse';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: 'Nothing!'
    }
    this.parseFiles = this.parseFiles.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  showResult(results) {
    this.setState({
      results: results
    });
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

  render() {
    return (
      <div className="App">
        <div onClick={() => this.parseFiles()}>
          <h1>PARSE!</h1>
        </div>
        <pre>
          {JSON.stringify(this.state.results, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;

