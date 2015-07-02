let React = require("react"),
    Cell  = require("./cell");

module.exports = React.createClass({
  getInitialState() {
    return {
      width    : 20,
      height   : 20,
      data     : this.makeGrid(20, 20, (r, c) => false),
      stepping : false
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
      let oldGrid = this.state.data;

      let newGrid = this.makeGrid(this.state.width, this.state.height, function(r, c) {
        return oldGrid[r][c] ^ (r == row && c == col);
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
    let oldGrid = this.state.data, counter = this.liveNeighbors;

    let newGrid = this.makeGrid(this.state.width, this.state.height, function(r, c) {
      let neighbors = counter(oldGrid, r, c);

      if (oldGrid[r][c] && (neighbors == 2 || neighbors == 3)) {
        return true;
      } else if ((!oldGrid[r][c]) && (neighbors == 3)) {
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
    this.setState({ stepping: window.setInterval(this.step, 100) });
  },

  stop() {
    window.clearInterval(this.state.stepping);
    this.setState({ stepping: false });
  },

  updateSize() {
    let newWidth  = React.findDOMNode(this.refs.widthInput).value,
        newHeight = React.findDOMNode(this.refs.heightInput).value,
        newGrid,
        oldWidth  = this.state.width,
        oldHeight = this.state.height,
        oldGrid   = this.state.data;

    newGrid = this.makeGrid(newWidth, newHeight, function(r, c) {
      if (r < oldHeight && c < oldWidth) {
        return oldGrid[r][c];
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
          <input ref="widthInput" type="number" defaultValue={this.state.width} size={ 5 } />
          <span className="x">{ String.fromCharCode(215) }</span>
          <input ref="heightInput" type="number" defaultValue={this.state.height} size={ 5 } />
          <button onClick={ this.updateSize }>Update</button>
        </p>
      </div>
    );
  }
});
