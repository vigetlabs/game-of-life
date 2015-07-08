let React = require("react"),
    Cell  = require("./cell");

module.exports = React.createClass({
  getInitialState() {
    return {
      width    : 20,
      height   : 20,
      data     : this.makeGrid(20, 20, (r, c) => false),
      stepping : false,
      interval : 100
    };
  },

  makeGrid(width, height, cb) {
    let grid = [];

    for (let row = 0; row < height; row++) {
      grid.push([]);

      for (let col = 0; col < width; col++) {
        grid[row].push(cb(row, col));
      }  
    } 

    return grid;
  },

  clickHandler(row, col) {
    if (this.state.stepping) {
      this.stop();
    } else {
      let newGrid = this.makeGrid(this.state.width, this.state.height, (r, c) => {
        return this.state.data[r][c] ^ (r == row && c == col);
      });

      this.setState({ data: newGrid });
    }
  },

  liveNeighbors(grid, row, col) {
    let count = 0,
        rows  = grid.length,
        cols  = grid[0].length,
        r, c;

    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        r = ((row + rowOffset) + rows) % rows;
        c = ((col + colOffset) + cols) % cols;

        if (grid[r][c] && !(r == row && c == col)) {
          count++;
        }
      }
    }

    return count;
  },

  step() {
    let newGrid = this.makeGrid(this.state.width, this.state.height, (r, c) => {
      let neighbors = this.liveNeighbors(this.state.data, r, c);

      if (this.state.data[r][c] && (neighbors == 2 || neighbors == 3)) {
        return true;
      } else if ((!this.state.data[r][c]) && (neighbors == 3)) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ data: newGrid });
  },

  reset() {
    this.stop();
    this.setState({ data: this.makeGrid(this.state.width, this.state.height, (r, c) => false) });
  },

  start() {
    this.setState({ stepping: window.setInterval(this.step, this.state.interval) });
  },

  stop() {
    window.clearInterval(this.state.stepping);
    this.setState({ stepping: false });
  },

  updateSize() {
    let newWidth  = React.findDOMNode(this.refs.widthInput).value,
        newHeight = React.findDOMNode(this.refs.heightInput).value;

    let newGrid = this.makeGrid(newWidth, newHeight, (r, c) => {
      if (r < this.state.height && c < this.state.width) {
        return this.state.data[r][c];
      } else {
        return false;
      }
    });

    this.setState({
      width  : newWidth,
      height : newHeight,
      data   : newGrid
    });
  },

  updateInterval() {
    let newInterval = React.findDOMNode(this.refs.intervalInput).value;

    if (this.state.stepping) {
      window.clearInterval(this.state.stepping);
      this.setState({ interval: newInterval, stepping: window.setInterval(this.step, newInterval) });
    } else {
      this.setState({ interval: newInterval });
    }
  },

  render() {
    let rows = [], handler = this.clickHandler, buttons = [];
    
    this.state.data.forEach(function(rowData, rowIndex) {
      let row = [];

      rowData.forEach(function(cell, colIndex) {
        row.push(
          <Cell
            alive={ cell }
            row={ rowIndex }
            col={ colIndex }
            clickHandler={ handler } />
        );
      });

      rows.push(<tr>{ row }</tr>);
    });

    if (this.state.stepping) {
      buttons.push(
        <button onClick={ this.stop }>{ String.fromCharCode(9641) }</button>
      );
    } else {
      buttons.push(
        <button onClick={ this.start }>{ String.fromCharCode(9654) }</button>
      );
    }

    buttons.push(<button onClick={ this.step } disabled={ this.state.stepping }>Step</button>);
    buttons.push(<button onClick={ this.reset }>Reset</button>);


    return (
      <div>
        <table>
          <tbody>
            { rows }
          </tbody>
        </table>

        <p>{ buttons }</p>

        <p>
          <input ref="widthInput" type="number" defaultValue={ this.state.width } />
          <span className="x">{ String.fromCharCode(215) }</span>
          <input ref="heightInput" type="number" defaultValue={ this.state.height } />
          <button onClick={ this.updateSize }>Update</button>
        </p>

        <p>
          <input ref="intervalInput" type="number" defaultValue={ this.state.interval } />
          <span className="x">ms</span>
          <button onClick={ this.updateInterval }>Update</button>
        </p>
      </div>
    );
  }
});
