import React from 'react';

import './styles/App.css'
import MyGrid from './MyGrid';

function intervalScheduling(tasks) {
  // Convert object to an array of intervals
  const intervals = Object.entries(tasks).map(([id, { width, x }]) => ({ id, start: x, end: x + width }));

  // Sort intervals by end time in ascending order
  intervals.sort((a, b) => a.end - b.end);

  const selectedTasks = [];
  let lastEndTime = -Infinity;

  // Greedy approach: Select non-overlapping intervals with earliest end time
  for (const interval of intervals) {
    if (interval.start >= lastEndTime) {
      selectedTasks.push(interval.id);
      lastEndTime = interval.end;
    }
  }

  return selectedTasks;
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      numberOfLines: 10,
      intervalData: {},
      result: []
    }
  }

  componentDidMount() {
    this.updateIntervalData();
  }

  updateResult(intervalData){
    const newResult = intervalScheduling(intervalData)
    this.setState({
      result: newResult
    })
    this.setState(prevState => {
      const updatedArray = Object.entries(prevState.intervalData).map(([key, item]) => {
        const color = newResult.includes(key) ? 'red' : 'gray';
        return [key, { ...item, color }];
      });
      return { intervalData: Object.fromEntries(updatedArray) };
    });
  }

  updateIntervalData() {
    const { numberOfLines } = this.state;
    const intervalData = Object.fromEntries(
      Array.from({ length: numberOfLines }, (_, i) => [i + 1, { width: 120, x: 0, color: 'gray' }])
    );
    this.setState({ intervalData });
    this.updateResult(intervalData)
  }

  handleDataChange = ({id, newInterval}) =>{
    this.setState(prevState => {
      const updatedIntervalData = {
        ...prevState.intervalData,
        [id]: {
          ...prevState.intervalData[id],
          ...newInterval
        }
      };
      this.updateResult(updatedIntervalData)
      return { intervalData: updatedIntervalData };
    });
  }

  handleNumberOfLinesChange = (event) =>{
    this.setState({
      numberOfLines: parseInt(event.target.value)
    })
    this.setState(prevState => {
      const currentNumberOfObjects = Object.keys(prevState.intervalData).length;
      const objectsToAdd = event.target.value - currentNumberOfObjects;
  
      if (objectsToAdd <= 0) {
        // No need to add objects, return the current state
        return null;
      }
  
      const newObjects = Array.from({ length: objectsToAdd }, (_, index) => {
        return { width: 120, x: 0, color: 'gray' };
      });
  
      const updatedIntervalData = {
        ...prevState.intervalData,
        ...Object.fromEntries(newObjects.map((obj, index) => [currentNumberOfObjects + index + 1, obj])),
      };
  
      return { intervalData: updatedIntervalData };
    });

  }

  render(){
    return (
      <div className="app">
        <nav className="navbar">
          <div className="navbar__logo">Logo</div>
          <ul className="navbar__links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <main className="main-content">
        <label htmlFor="linhasInput">Linhas:</label>
        <input
          type="number"
          id="linhasInput"
          name="linhas"
          pattern="[0-9]*"
          inputMode="numeric"
          min="0"
          onChange={this.handleNumberOfLinesChange}
          defaultValue="10"
        />
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <button onClick={()=> console.log(this.state)}>DEBUG</button>
            <MyGrid 
              numberOfLines={this.state.numberOfLines}
              intervalData={this.state.intervalData}
              onDataChange={this.handleDataChange}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;